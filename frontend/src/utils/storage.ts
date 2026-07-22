const HISTORY_KEY = 'lingua-ai-history';
const FAVORITES_KEY = 'lingua-ai-favorites';

export interface SavedItem {
  id: string;
  sourceText: string;
  translatedText: string;
  source: string;
  target: string;
  createdAt: string;
}

export function readStoredItems<T>(key: string): T[] {
  try {
    const value = localStorage.getItem(key);
    return value ? (JSON.parse(value) as T[]) : [];
  } catch {
    return [];
  }
}

export function writeStoredItems<T>(key: string, items: T[]) {
  localStorage.setItem(key, JSON.stringify(items));
}

export function loadHistory(): SavedItem[] {
  return readStoredItems<SavedItem>(HISTORY_KEY);
}

export function saveHistory(items: SavedItem[]) {
  writeStoredItems(HISTORY_KEY, items);
}

export function loadFavorites(): SavedItem[] {
  return readStoredItems<SavedItem>(FAVORITES_KEY);
}

export function saveFavorites(items: SavedItem[]) {
  writeStoredItems(FAVORITES_KEY, items);
}
