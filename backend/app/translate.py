from __future__ import annotations

from abc import ABC, abstractmethod


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

    def translate(self, text: str, source: str, target: str) -> str:
        if not self.api_key:
            raise RuntimeError("GEMINI_API_KEY is not configured.")
        return f"Gemini translated '{text}' from {source} to {target}"


def build_provider(provider_name: str, api_key: str | None) -> TranslationProvider:
    provider_name = (provider_name or "mock").lower()
    if provider_name == "gemini":
        return GeminiTranslationProvider(api_key)
    return MockTranslationProvider()
