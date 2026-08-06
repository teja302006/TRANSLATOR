from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Lingua AI API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class TranslationRequest(BaseModel):
    text: str
    source: str
    target: str

# Root
@app.get("/")
def root():
    return {"message": "Lingua AI Backend Running"}

# Health
@app.get("/api/health")
def health():
    return {
        "status": "healthy",
        "gemini_api_configured": False,
        "message": "Backend is running."
    }

# Languages
@app.get("/api/languages")
def get_languages():
    return [
        {"code": "auto", "name": "Auto Detect"},
        {"code": "en", "name": "English"},
        {"code": "ta", "name": "Tamil"},
        {"code": "hi", "name": "Hindi"},
        {"code": "fr", "name": "French"},
        {"code": "es", "name": "Spanish"},
        {"code": "de", "name": "German"},
        {"code": "it", "name": "Italian"},
        {"code": "pt", "name": "Portuguese"},
        {"code": "ja", "name": "Japanese"},
        {"code": "ko", "name": "Korean"},
        {"code": "zh", "name": "Chinese"}
    ]

# Translate
@app.post("/api/translate")
def translate(req: TranslationRequest):
    return {
        "translatedText": f"{req.text} ({req.target})",
        "detectedLanguage": req.source,
        "detectedLanguageName": req.source
    }