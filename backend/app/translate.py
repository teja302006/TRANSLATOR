from __future__ import annotations

import logging
from abc import ABC, abstractmethod
from google import genai
from google.genai import types

logger = logging.getLogger(__name__)


class TranslationProvider(ABC):
    @abstractmethod
    def translate(self, text: str, source: str, target: str) -> str:
        raise NotImplementedError


class MockTranslationProvider(TranslationProvider):
    def translate(self, text: str, source: str, target: str) -> str:
        return f"[{target.upper()}] {text}"


class GeminiTranslationProvider(TranslationProvider):
    def __init__(self, api_key: str | None):
        self.api_key = api_key
        self.model_name = "gemini-3.6-flash"
        self._initialized = False
        
        if not self.api_key:
            logger.warning("GEMINI_API_KEY is not configured. Gemini translation will be disabled.")
            return

        try:
            self.client = genai.Client(api_key=self.api_key)
            self._initialized = True
            self._setup_model()
        except Exception as e:
            logger.error(f"Failed to initialize Gemini Client: {str(e)}")

    def _setup_model(self):
        try:
            available_models = list(self.client.models.list())
            supported_model_names = []
            for m in available_models:
                methods = m.supported_actions or []
                if "generateContent" in methods:
                    supported_model_names.append(m.name)

            priorities = [
                "models/gemini-3.6-flash",
                "gemini-3.6-flash",
                "models/gemini-3.5-flash",
                "gemini-3.5-flash",
                "models/gemini-3.1-flash-lite",
                "gemini-3.1-flash-lite",
                "models/gemini-2.5-flash",
                "gemini-2.5-flash",
                "models/gemini-2.0-flash",
                "gemini-2.0-flash",
                "models/gemini-1.5-flash",
                "gemini-1.5-flash",
            ]

            selected_model = None
            for p in priorities:
                short_p = p.replace("models/", "")
                matched_name = None
                for name in supported_model_names:
                    short_name = name.replace("models/", "")
                    if name == p or short_name == short_p:
                        matched_name = name
                        break
                
                if matched_name:
                    try:
                        self.client.models.generate_content(
                            model=matched_name,
                            contents="Ping",
                            config={"max_output_tokens": 5}
                        )
                        selected_model = matched_name
                        break
                    except Exception:
                        continue

            if not selected_model:
                for name in supported_model_names:
                    if "flash" in name.lower() and name not in priorities:
                        try:
                            self.client.models.generate_content(
                                model=name,
                                contents="Ping",
                                config={"max_output_tokens": 5}
                            )
                            selected_model = name
                            break
                        except Exception:
                            continue

            if selected_model:
                self.model_name = selected_model
                logger.info(f"Gemini provider selected model: {selected_model}")
            else:
                self.model_name = "models/gemini-3.6-flash"
        except Exception as e:
            logger.error(f"Error selecting Gemini model: {str(e)}")
            self.model_name = "models/gemini-3.6-flash"

    def translate(self, text: str, source: str, target: str) -> str:
        if not self._initialized or not self.client:
            raise RuntimeError("Gemini API client is not initialized. Please configure GEMINI_API_KEY.")

        # Handle identity translation
        if source != "auto" and source == target:
            return text

        # Map language codes to English names for prompt instructions
        languages = {
            "en": "English",
            "es": "Spanish",
            "fr": "French",
            "de": "German",
            "it": "Italian",
            "pt": "Portuguese",
            "ja": "Japanese",
            "ko": "Korean",
            "zh": "Chinese",
            "hi": "Hindi",
            "ta": "Tamil",
        }
        
        source_name = languages.get(source.lower(), "Auto Detect")
        target_name = languages.get(target.lower(), target)

        prompt = (
            f"Translate the following text. "
            f"Maintain the exact formatting, newlines, spacing, and tone of the original text. "
            f"Do not add any explanations, notes, metadata, or preambles. Output only the final translated text."
            f"\n\n"
            f"Translation parameters:\n"
            f"- Source Language: {source_name}\n"
            f"- Target Language: {target_name}\n\n"
            f"Text to translate:\n"
            f"\"\"\"\n{text}\n\"\"\""
        )

        try:
            response = self.client.models.generate_content(
                model=self.model_name,
                contents=prompt,
                config=types.GenerateContentConfig(
                    temperature=0.2,
                )
            )
            
            if not response.text:
                raise RuntimeError("Empty response from Gemini API")
                
            return response.text.strip()
        except Exception as e:
            logger.error(f"Gemini API translation error: {str(e)}")
            raise RuntimeError(f"Translation failed: {str(e)}")


def build_provider(provider_name: str, api_key: str | None) -> TranslationProvider:
    provider_name = (provider_name or "gemini").lower()
    if provider_name == "gemini" and api_key:
        try:
            prov = GeminiTranslationProvider(api_key)
            if prov._initialized:
                return prov
        except Exception as e:
            logger.error(f"Error building Gemini provider, falling back to Mock: {str(e)}")
    return MockTranslationProvider()
