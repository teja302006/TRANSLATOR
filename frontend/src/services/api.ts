const API_BASE_URL = 'http://127.0.0.1:8000/api';

export async function translateText(text: string, sourceLang: string, targetLang: string) {
  const response = await fetch(`${API_BASE_URL}/translate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text, source: sourceLang, target: targetLang }),
  });

  if (!response.ok) {
    throw new Error('Translation request failed');
  }

  return response.json();
}

export async function getLanguages() {
  const response = await fetch(`${API_BASE_URL}/languages`);
  if (!response.ok) {
    throw new Error('Failed to fetch languages');
  }
  return response.json();
}
