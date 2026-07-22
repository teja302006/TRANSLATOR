from dataclasses import dataclass
import os


@dataclass
class Settings:
    app_name: str = "Lingua AI API"
    translation_provider: str = os.getenv("TRANSLATION_PROVIDER", "mock")
    gemini_api_key: str | None = os.getenv("GEMINI_API_KEY")
    api_prefix: str = "/api"


settings = Settings()
