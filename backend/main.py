from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from deep_translator import GoogleTranslator

app = FastAPI(
    title="Lingua AI API",
    version="1.0.0"
)

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

class TranslationRequest(BaseModel):
    text: str
    source: str
    target: str

@app.get("/")
def root():
    return {"message": "Lingua AI Backend Running"}

@app.get("/health")
def health():
    return {"status": "healthy"}

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

@app.post("/api/translate")
def translate(request: TranslationRequest):
    try:
        source = "auto" if request.source == "auto" else request.source

        translated = GoogleTranslator(
            source=source,
            target=request.target
        ).translate(request.text)

        return {
            "translatedText": translated
        }

    except Exception as e:
        return {
            "translatedText": f"Translation Error: {str(e)}"
        }