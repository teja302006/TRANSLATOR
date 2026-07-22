from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Translator AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class TranslationRequest(BaseModel):
    text: str
    source_lang: str
    target_lang: str


@app.get("/")
def read_root():
    return {"message": "Translator AI backend is running"}


@app.post("/translate")
def translate(request: TranslationRequest):
    return {
        "translation": f"{request.text} -> {request.target_lang}",
        "source_lang": request.source_lang,
        "target_lang": request.target_lang,
    }
