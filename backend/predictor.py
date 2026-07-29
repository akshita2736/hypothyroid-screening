from pathlib import Path

import joblib
import pandas as pd

from schemas import PredictionRequest

MODEL_PATH = Path(__file__).parent / "models" / "thyroid_model_bundle.pkl"

_bundle = joblib.load(MODEL_PATH)
_model = _bundle["model"]
_scaler = _bundle["scaler"]
_num_cols = _bundle["num_cols"]           # ['age', 'TSH', 'T3', 'TT4', 'T4U', 'FTI']
_binary_cols = _bundle["binary_cols"]     # 14 binary clinical-history columns
_feature_order = _bundle["feature_order"]  # exact column order the model expects
_label_classes = _bundle["label_classes"]  # ['-', 'F', 'G']

# Frontend never sees the raw class symbols ("-", "F", "G") — only these friendly labels.
_SHORT_LABELS = {
    "-": "Negative",
    "F": "Primary Hypothyroidism",
    "G": "Compensated Hypothyroidism",
}

MODEL_LOADED = True  # set once we reach this point without the joblib.load above raising


def predict(payload: PredictionRequest) -> dict:
    """
    Runs inference for a single patient.

    Important: `num_cols` (scaled by the stored scaler) includes 'age', which sits at a
    different position in `feature_order` than the other scaled hormone columns. We build
    the row by column NAME and scale by column NAME, then reindex to `feature_order` right
    before predict_proba — this makes the actual column order in the DataFrame irrelevant
    and avoids a subtle bug where age silently isn't scaled.
    """
    row = {col: float(getattr(payload, col)) for col in _num_cols}
    row.update({col: int(getattr(payload, col)) for col in _binary_cols})

    df = pd.DataFrame([row])

    # Scale only num_cols (by name), matching how the scaler was fit during training
    df[_num_cols] = _scaler.transform(df[_num_cols])

    # Reindex to the exact order the model was trained on
    X = df[_feature_order]

    proba = _model.predict_proba(X)[0]
    pred_idx = int(proba.argmax())
    pred_class = _label_classes[pred_idx]

    probabilities = {
        _SHORT_LABELS[cls]: float(p) for cls, p in zip(_label_classes, proba)
    }

    return {
        "prediction": _SHORT_LABELS[pred_class],
        "confidence": round(float(proba[pred_idx]) * 100, 1),  # percentage, e.g. 95.5
        "probabilities": probabilities,
    }
