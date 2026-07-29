from typing import Dict, List, Optional

from pydantic import BaseModel, Field


class PredictionRequest(BaseModel):
    age: float = Field(..., ge=0, le=120)
    TSH: float = Field(..., ge=0)
    T3: float = Field(..., ge=0)
    TT4: float = Field(..., ge=0)
    T4U: float = Field(..., ge=0)
    FTI: float = Field(..., ge=0)

    on_thyroxine: bool
    query_on_thyroxine: bool
    on_antithyroid_meds: bool
    sick: bool
    pregnant: bool
    thyroid_surgery: bool
    I131_treatment: bool
    query_hypothyroid: bool
    query_hyperthyroid: bool
    lithium: bool
    goitre: bool
    tumor: bool
    hypopituitary: bool
    psych: bool


class PredictionResponse(BaseModel):
    prediction: str
    confidence: float
    probabilities: Dict[str, float]
    summary: str
    diet_do: List[str]
    diet_avoid: List[str]
    disclaimer: str


class ParseResponse(BaseModel):
    extracted: Dict[str, Optional[float]]
    note: Optional[str] = None
