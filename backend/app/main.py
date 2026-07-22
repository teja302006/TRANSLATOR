from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import settings
from .models import LanguageOption, TranslationRequest, TranslationResponse
from .translate import build_provider

app = FastAPI(title=settings.app_name)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

provider = build_provider(settings.translation_provider, settings.gemini_api_key)

SUPPORTED_LANGUAGES = [
    LanguageOption(code="auto", name="Auto Detect"),
    LanguageOption(code="en", name="English"),
    LanguageOption(code="es", name="Spanish"),
    LanguageOption(code="fr", name="French"),
    LanguageOption(code="de", name="German"),
    LanguageOption(code="it", name="Italian"),
    LanguageOption(code="pt", name="Portuguese"),
    LanguageOption(code="ja", name="Japanese"),
    LanguageOption(code="ko", name="Korean"),
    LanguageOption(code="zh", name="Chinese"),
    LanguageOption(code="hi", name="Hindi"),
    LanguageOption(code="ta", name="Tamil"),
]


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}


@app.get(f"{settings.api_prefix}/languages")
def list_languages() -> list[LanguageOption]:
    return SUPPORTED_LANGUAGES


@app.post(f"{settings.api_prefix}/translate", response_model=TranslationResponse)
def translate(request: TranslationRequest) -> TranslationResponse:
    output = provider.translate(request.text, request.source, request.target)
    return TranslationResponse(translatedText=output)
