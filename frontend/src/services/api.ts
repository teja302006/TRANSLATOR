const API_BASE_URL = "/api";

export interface TranslationResponse {
  translatedText: string;
}

export interface Language {
  code: string;
  name: string;
}

export async function translateText(
  text: string,
  sourceLang: string,
  targetLang: string
): Promise<TranslationResponse> {
  const response = await fetch(`${API_BASE_URL}/translate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
      source: sourceLang,
      target: targetLang,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Translation request failed");
  }

  return response.json();
}

export async function getLanguages(): Promise<Language[]> {
  const response = await fetch(`${API_BASE_URL}/languages`);

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Failed to fetch languages");
  }

  return response.json();
}