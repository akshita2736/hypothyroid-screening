# Women's Hypothyroidism Screening System

An AI-powered web application for early screening of hypothyroidism in women. The system combines machine learning, automated thyroid report parsing, and LLM-generated explanations to provide an end-to-end screening experience.

> **Disclaimer:** This project is intended for educational and research purposes only and should not be used as a substitute for professional medical diagnosis.

## Live Demo

- 🌐 **Application:** https://hypothyroid-screening.vercel.app/
- 📖 **API Documentation:** https://hypothyroid-screening.onrender.com/docs

---

## Features

- ML-based hypothyroidism prediction using a Random Forest classifier
- Upload thyroid laboratory reports (PDF)
- Automatic extraction of thyroid biomarkers from reports
- Manual input of laboratory values and medical history
- AI-generated explanation of predictions using Groq LLM
- FastAPI backend with interactive Swagger documentation
- Responsive React + Vite frontend

---

## Tech Stack

**Frontend**
- React
- Vite
- JavaScript

**Backend**
- FastAPI
- Python
- Uvicorn

**Machine Learning**
- Scikit-learn
- Random Forest
- Pandas
- NumPy

**AI & Report Parsing**
- Groq API (Llama 3.3 70B)
- pdfplumber

---

## Project Structure

```
hypothyroid-screening/
├── backend/
│   ├── models/
│   ├── main.py
│   ├── predictor.py
│   ├── report_parser.py
│   └── requirements.txt
│
└── frontend/
    ├── src/
    ├── package.json
    └── vite.config.js
```

---

## API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/health` | Health check |
| POST | `/predict` | Predict thyroid status |
| POST | `/parse-report` | Extract thyroid values from uploaded report |

---

## Local Setup

### Clone Repository

```bash
git clone https://github.com/akshita2736/hypothyroid-screening.git
cd hypothyroid-screening
```

### Backend

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

# Linux/macOS
source venv/bin/activate

pip install -r requirements.txt

uvicorn main:app --reload
```

### Frontend

```bash
cd frontend

npm install
npm run dev
```

---

## Environment Variables

Create `.env` files in the `backend` and `frontend` directories using the provided `.env.example` files.

---

## Future Improvements

- Improved OCR for diverse report formats
- Support for additional thyroid biomarkers
- User authentication
- Patient history tracking
- Doctor dashboard
- Explainable AI visualizations
