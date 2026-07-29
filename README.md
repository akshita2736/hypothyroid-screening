# Women's Hypothyroidism Screening System

A full-stack AI-powered web application for early screening of hypothyroidism in women using Machine Learning and Large Language Models. The system predicts thyroid status from clinical features or thyroid laboratory reports and provides AI-generated explanations with dietary recommendations.

---

## Overview

Hypothyroidism is one of the most common endocrine disorders affecting women. Early identification can help prevent long-term complications and improve quality of life.

This project combines:

- Machine Learning for thyroid status prediction
- PDF report parsing for automated laboratory value extraction
- Large Language Models for personalized explanations
- Modern full-stack web technologies for an interactive user experience

---

## Features

### Machine Learning Prediction
- Random Forest classifier trained on a women-centric thyroid dataset
- Predicts:
  - Negative
  - Compensated Hypothyroidism
  - Primary Hypothyroidism
- Confidence score and class probabilities

### Laboratory Report Parsing
- Upload thyroid blood test reports (PDF)
- Automatically extracts:
  - TSH
  - T3
  - TT4
  - T4U
  - FTI

### AI Health Insights
- Plain-language explanation of prediction
- Lifestyle guidance
- Foods to include
- Foods to avoid
- Medical disclaimer

### Modern Web Application
- FastAPI backend
- React + Vite frontend
- Responsive UI
- Interactive charts
- PDF upload
- Error handling
- Loading indicators

---

## Screenshots

### Home Page

> Add screenshot here

![Home](screenshots/home.png)

---

### Screening Page

> Add screenshot here

![Screening](screenshots/screening.png)

---

### Prediction Results

> Add screenshot here

![Results](screenshots/results.png)

---

## Tech Stack

### Backend

- FastAPI
- Python
- Scikit-learn
- Pandas
- NumPy
- pdfplumber
- Groq API

### Frontend

- React
- Vite
- Tailwind CSS
- React Router

### Machine Learning

- Random Forest
- Feature Engineering
- StandardScaler
- Joblib

---

## Project Structure

```
hypothyroid-screening/

├── backend/
│   ├── main.py
│   ├── predictor.py
│   ├── report_parser.py
│   ├── llm.py
│   ├── schemas.py
│   ├── models/
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## Model Performance

The deployed model is based on our research on women-centric hypothyroidism detection.

### Dataset

- UCI Thyroid Disease Dataset
- Female patient records only
- 6,073 instances
- Three target classes

### Preprocessing

- Missing value handling
- Duplicate removal
- Feature engineering
- Label encoding
- Outlier handling
- Standardization

### Class Imbalance

- SMOTE

### Best Performing Model

| Model | Accuracy |
|--------|---------:|
| Random Forest | **96.81%** |

Performance Metrics

- Accuracy: **96.808%**
- Precision: **95.719%**
- Recall: **97.085%**

---

## API Endpoints

### Health Check

```
GET /health
```

Returns application status and model availability.

---

### Predict Thyroid Status

```
POST /predict
```

Input

- Age
- Clinical features
- Thyroid hormone values

Returns

- Predicted class
- Confidence score
- Class probabilities
- AI-generated explanation
- Diet recommendations

---

### Parse Laboratory Report

```
POST /parse-report
```

Uploads a thyroid laboratory report and extracts:

- TSH
- T3
- TT4
- T4U
- FTI

---

## Installation

### Clone Repository

```bash
git clone https://github.com/akshita2736/hypothyroid-screening.git
```

---

### Backend

```bash
cd backend

python -m venv .venv

source .venv/bin/activate
```

Windows

```powershell
.venv\Scripts\activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Create

```
.env
```

```
GROQ_API_KEY=YOUR_API_KEY
```

Run

```bash
uvicorn main:app --reload
```

---

### Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## Future Improvements

- OCR support for scanned medical reports
- Additional thyroid disorders (Hyperthyroidism)
- Explainable AI visualizations (SHAP)
- User authentication
- Patient history dashboard
- Doctor portal
- Cloud deployment
- Mobile application
- Electronic Health Record integration

---

## Disclaimer

This application is intended for educational and research purposes only.

It should **not** be used as a substitute for professional medical diagnosis or treatment. Users should always consult a qualified healthcare professional for clinical decisions.

---

## Research

This web application extends our published work on women-centric hypothyroidism detection by transforming the machine learning model into a deployable full-stack clinical screening prototype.

---

## Author

**Akshita Sharma**

B.Tech Computer Science & Engineering (Artificial Intelligence)

Indira Gandhi Delhi Technical University for Women (IGDTUW)

GitHub: https://github.com/akshita2736

LinkedIn: *(Add your LinkedIn URL here)*
