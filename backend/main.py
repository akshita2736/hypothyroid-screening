from dotenv import load_dotenv
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from llm import generate_clinical_summary
from predictor import MODEL_LOADED, predict
from report_parser import parse_report
from schemas import ParseResponse, PredictionRequest, PredictionResponse

load_dotenv()

app = FastAPI(title="Women's Hypothyroidism Screening API")

# Tighten allow_origins to your deployed frontend URL before shipping to production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

DISCLAIMER = "This is a screening estimate, not a medical diagnosis. Consult a doctor for confirmation."

# Used when the Groq call fails — the prediction itself must still succeed.
FALLBACK_SUMMARY = {
    "summary": (
        "An AI-generated explanation isn't available right now. Please refer to the "
        "prediction and confidence score above, and consult a healthcare professional "
        "for interpretation."
    ),
    "diet_do": [],
    "diet_avoid": [],
}


@app.get("/health")
def health():
    return {"status": "ok", "model_loaded": MODEL_LOADED}


@app.post("/predict", response_model=PredictionResponse)
def predict_endpoint(payload: PredictionRequest):
    result = predict(payload)

    try:
        summary_data = generate_clinical_summary(
            prediction=result["prediction"],
            confidence=result["confidence"],
            inputs=payload.model_dump(),
        )
    except Exception:
        # The ML prediction must always be returned even if the LLM call fails.
        summary_data = FALLBACK_SUMMARY

    return PredictionResponse(
        prediction=result["prediction"],
        confidence=result["confidence"],
        probabilities=result["probabilities"],
        summary=summary_data["summary"],
        diet_do=summary_data["diet_do"],
        diet_avoid=summary_data["diet_avoid"],
        disclaimer=DISCLAIMER,
    )


@app.post("/parse-report", response_model=ParseResponse)
async def parse_report_endpoint(file: UploadFile = File(...)):
    contents = await file.read()
    result = parse_report(contents, file.filename)
    return ParseResponse(**result)
