from pydantic import BaseModel, Field


class TranslationRequest(BaseModel):
    text: str = Field(..., min_length=1)
    source: str = Field(default="en")
    target: str = Field(default="ta")


class TranslationResponse(BaseModel):
    translatedText: str


class LanguageOption(BaseModel):
    code: str
    name: str
