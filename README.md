# Women's Hypothyroidism Screening System

An AI-powered web application for early hypothyroidism screening in women. The system combines a machine learning classifier with automated thyroid report parsing and LLM-generated clinical explanations to provide an end-to-end screening experience.

> **Disclaimer:** This application is intended for educational and research purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment.

---

## Live Demo

- **Frontend:** https://hypothyroid-screening.vercel.app/
- **Backend API:** https://hypothyroid-screening.onrender.com
- **API Documentation (Swagger):** https://hypothyroid-screening.onrender.com/docs

---

## Features

- Early screening for hypothyroidism using a trained Random Forest classifier
- Upload thyroid laboratory reports (PDF)
- Automatic extraction of thyroid biomarkers using OCR and regex-based parsing
- Manual entry of laboratory values and clinical history
- AI-generated explanation of prediction using Groq LLM
- RESTful FastAPI backend
- Responsive React + Vite frontend
- Interactive API documentation with Swagger UI

---

## Tech Stack


### Frontend - 
React, Vite, JavaScript, CSS

### Backend - FastAPI, Python, Uvicorn

### Machine Learning - Scikit-learn, Random Forest Classifier, Pandas, NumPy

### AI - Groq API, Llama 3.3 70B Versatile

### Report Processing
- pdfplumber
- OCR

---

## Project Structure

```
hypothyroid-screening/
│
├── backend/
│   ├── models/
│   ├── main.py
│   ├── predictor.py
│   ├── report_parser.py
│   ├── llm.py
│   ├── schemas.py
│   └── requirements.txt
│
└── frontend/
    ├── src/
    ├── package.json
    ├── vite.config.js
    └── index.html
```

---

## Workflow

```
User
   │
   ▼
Upload PDF / Manual Input
   │
   ▼
Report Parsing
   │
   ▼
Feature Extraction
   │
   ▼
Random Forest Prediction
   │
   ▼
Groq LLM Explanation
   │
   ▼
Prediction Result
```

---

## API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/health` | Health check |
| POST | `/predict` | Predict hypothyroidism |
| POST | `/parse-report` | Parse uploaded thyroid report |

Complete API documentation is available at:

https://hypothyroid-screening.onrender.com/docs

---

## Local Setup

### Clone Repository

```bash
git clone https://github.com/akshita2736/hypothyroid-screening.git
cd hypothyroid-screening
```

---

## Backend Setup

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

Backend runs on:

```
http://localhost:8000
```

Swagger Docs:

```
http://localhost:8000/docs
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## Environment Variables

### Backend

Create a `.env` file inside the `backend` folder.

```env
GROQ_API_KEY=YOUR_GROQ_API_KEY
GROQ_MODEL=llama-3.3-70b-versatile
```

### Frontend

Create a `.env` file inside the `frontend` folder.

```env
VITE_API_URL=http://localhost:8000
```

For production:

```env
VITE_API_URL=https://hypothyroid-screening.onrender.com
```

---

## Model Information

- Algorithm: Random Forest Classifier
- Task: Multi-class thyroid classification
- Target: Hypothyroidism screening
- Input:
  - Thyroid laboratory values
  - Clinical history features
- Output:
  - Predicted thyroid status
  - Confidence score
  - AI-generated explanation

---

## Deployment

### Frontend

Hosted on Vercel

https://hypothyroid-screening.vercel.app/

### Backend

Hosted on Render

https://hypothyroid-screening.onrender.com

---

## Future Improvements

- Improved OCR for diverse laboratory report formats
- Additional thyroid biomarkers support
- Explainable AI visualizations
- User authentication
- Patient history tracking
- Doctor dashboard
- Cloud database integration
- Multilingual support

---

## Author

**Akshita Sharma**

- GitHub: https://github.com/akshita2736
- LinkedIn: https://www.linkedin.com/in/akshita-sharma/

---

## Citation

If you use this project for research or educational purposes, please cite the associated work appropriately.

---

## License

This project is released under the MIT License.
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
