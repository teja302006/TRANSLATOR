from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(
    title="Lingua AI API",
    version="1.0.0"
)

# -----------------------------
# CORS
# -----------------------------
origins = [
    "https://translator-xi-eight.vercel.app",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# Models
# -----------------------------
class TranslationRequest(BaseModel):
    text: str
    source: str
    target: str

# -----------------------------
# Root
# -----------------------------
@app.get("/")
def root():
    return {
        "message": "Lingua AI Backend Running"
    }

# -----------------------------
# Health
# -----------------------------
@app.get("/health")
def health():
    return {
        "status": "healthy"
    }

# -----------------------------
# Languages
# -----------------------------
@app.get("/api/languages")
def languages():
    return [
        {"code":"auto","name":"Auto Detect"},
        {"code":"en","name":"English"},
        {"code":"ta","name":"Tamil"},
        {"code":"hi","name":"Hindi"},
        {"code":"fr","name":"French"},
        {"code":"es","name":"Spanish"},
        {"code":"de","name":"German"},
        {"code":"it","name":"Italian"},
        {"code":"pt","name":"Portuguese"},
        {"code":"ja","name":"Japanese"},
        {"code":"ko","name":"Korean"},
        {"code":"zh","name":"Chinese"}
    ]

# -----------------------------
# Translate
# -----------------------------
@app.post("/api/translate")
def translate(request: TranslationRequest):
    return {
        "translatedText": f"[{request.target.upper()}] {request.text}"
    }