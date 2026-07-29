import re
from io import BytesIO

import pdfplumber

MAX_FILE_SIZE = 5 * 1024 * 1024  # 5 MB

# Lightweight, deliberately not a general-purpose lab report parser.
# Looks for the 5 hormone values only; anything not found comes back as null.
PATTERNS = {
    "TSH": r"TSH[^0-9\-]{0,20}([\d.]+)",
    "T3": r"\bT3\b[^0-9\-]{0,20}([\d.]+)",
    "TT4": r"(?:TT4|Total\s*T4)[^0-9\-]{0,20}([\d.]+)",
    "T4U": r"T4U[^0-9\-]{0,20}([\d.]+)",
    "FTI": r"FTI[^0-9\-]{0,20}([\d.]+)",
}

NOT_FOUND_NOTE = "Couldn't extract values. Please enter manually."


def _empty_result(note: str) -> dict:
    return {"extracted": {k: None for k in PATTERNS}, "note": note}


def parse_report(file_bytes: bytes, filename: str) -> dict:
    if not filename.lower().endswith(".pdf"):
        return _empty_result("Only PDF files are supported. Please enter values manually.")

    if len(file_bytes) > MAX_FILE_SIZE:
        return _empty_result("File exceeds the 5MB limit. Please enter values manually.")

    try:
        text = ""
        with pdfplumber.open(BytesIO(file_bytes)) as pdf:
            for page in pdf.pages:
                text += (page.extract_text() or "") + "\n"
    except Exception:
        return _empty_result(NOT_FOUND_NOTE)

    extracted = {}
    for key, pattern in PATTERNS.items():
        match = re.search(pattern, text, re.IGNORECASE)
        extracted[key] = float(match.group(1)) if match else None

    note = None if any(extracted.values()) else NOT_FOUND_NOTE
    return {"extracted": extracted, "note": note}
