from dataclasses import dataclass
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()


@dataclass
class Settings:
    app_name: str = "Lingua AI API"
    translation_provider: str = os.getenv("TRANSLATION_PROVIDER", "gemini")
    gemini_api_key: str | None = os.getenv("GEMINI_API_KEY")
    api_prefix: str = "/api"


settings = Settings()
