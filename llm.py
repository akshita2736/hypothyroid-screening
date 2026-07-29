import json
import os

from groq import Groq

SYSTEM_PROMPT = """You are an AI assistant helping explain a machine learning screening result.
Do NOT diagnose.
Do NOT recommend medication.
Do NOT recommend supplements.
Do NOT recommend dosages.
Return valid JSON only.
Keep the summary under 120 words.
Return exactly this structure:
{ "summary": "...", "diet_do": ["...", "..."], "diet_avoid": ["...", "..."] }
"""

MODEL_NAME = "llama-3.3-70b-versatile"

_client = None


def _get_client() -> Groq:
    global _client
    if _client is None:
        api_key = os.environ.get("GROQ_API_KEY")
        if not api_key:
            raise RuntimeError("GROQ_API_KEY is not set. Add it to your .env file.")
        _client = Groq(api_key=api_key)
    return _client


def generate_clinical_summary(prediction: str, confidence: float, inputs: dict) -> dict:
    client = _get_client()

    user_prompt = (
        f"Screening result: {prediction}\n"
        f"Confidence: {confidence:.0%}\n"
        f"Patient values: {json.dumps(inputs)}\n\n"
        "Explain this result in plain language for the patient and give general dietary "
        "guidance appropriate to this thyroid status."
    )

    completion = client.chat.completions.create(
        model=MODEL_NAME,
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_prompt},
        ],
        temperature=0.3,
        response_format={"type": "json_object"},
    )

    data = json.loads(completion.choices[0].message.content)

    return {
        "summary": data.get("summary", ""),
        "diet_do": data.get("diet_do", []),
        "diet_avoid": data.get("diet_avoid", []),
    }
