import { useEffect, useMemo, useState } from 'react';
import { getLanguages, translateText } from '../services/api';
import { languageOptions, toLanguageLabel } from '../utils/languages';
import { loadFavorites, loadHistory, saveFavorites, saveHistory, type SavedItem } from '../utils/storage';

export function useTranslator() {
  const [source, setSource] = useState('en');
  const [target, setTarget] = useState('ta');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [history, setHistory] = useState<SavedItem[]>([]);
  const [favorites, setFavorites] = useState<SavedItem[]>([]);
  const [languages, setLanguages] = useState(languageOptions);
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  useEffect(() => {
    setHistory(loadHistory());
    setFavorites(loadFavorites());
    void getLanguages().then((items: any[]) => setLanguages([{ code: 'auto', name: 'Auto Detect' }, ...items]));
  }, []);

  useEffect(() => {
    saveHistory(history);
  }, [history]);

  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites]);

  useEffect(() => {
    const SpeechRecognitionCtor = window.SpeechRecognition || (window as typeof window & { webkitSpeechRecognition?: typeof SpeechRecognition }).webkitSpeechRecognition;
    if (!SpeechRecognitionCtor) {
      return;
    }

    const speechRecognition = new SpeechRecognitionCtor();
    speechRecognition.continuous = true;
    speechRecognition.interimResults = true;
    speechRecognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = Array.from(event.results)
        .map((result: SpeechRecognitionResult) => result[0]?.transcript ?? '')
        .join(' ');
      setInput(transcript);
    };
    speechRecognition.onend = () => setIsListening(false);
    setRecognition(speechRecognition);
  }, []);

  const isFavorite = useMemo(() => favorites.some((item) => item.translatedText === output), [favorites, output]);

  const swapLanguages = () => {
    setSource(target);
    setTarget(source);
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  const handleTranslate = async () => {
    const text = input.trim();
    if (!text) {
      setError('Please enter text to translate.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const data = await translateText(text, source, target);
      setOutput(data.translatedText);
      const item: SavedItem = {
        id: `${Date.now()}`,
        sourceText: text,
        translatedText: data.translatedText,
        source,
        target,
        createdAt: new Date().toISOString(),
      };
      setHistory((current) => [item, ...current].slice(0, 8));
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Unable to translate right now.');
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = () => {
    if (!output.trim()) return;

    const item: SavedItem = {
      id: `${Date.now()}`,
      sourceText: input,
      translatedText: output,
      source,
      target,
      createdAt: new Date().toISOString(),
    };

    setFavorites((current) => {
      const exists = current.some((favorite) => favorite.translatedText === output);
      return exists ? current.filter((favorite) => favorite.translatedText !== output) : [item, ...current];
    });
  };

  const startListening = () => {
    if (!recognition) {
      setError('Speech recognition is not supported in this browser.');
      return;
    }
    recognition.start();
    setIsListening(true);
  };

  const stopListening = () => {
    recognition?.stop();
    setIsListening(false);
  };

  const speak = () => {
    if (!output) return;
    const synthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(output);
    utterance.lang = target;
    synthesis.cancel();
    synthesis.speak(utterance);
  };

  const copyOutput = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
  };

  const deleteHistoryItem = (id: string) => {
    setHistory((current) => current.filter((item) => item.id !== id));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const removeFavorite = (id: string) => {
    setFavorites((current) => current.filter((item) => item.id !== id));
  };

  return {
    source,
    target,
    input,
    output,
    loading,
    error,
    history,
    favorites,
    languages,
    isListening,
    isFavorite,
    setSource,
    setTarget,
    setInput,
    setOutput,
    swapLanguages,
    clearAll,
    handleTranslate,
    toggleFavorite,
    startListening,
    stopListening,
    speak,
    copyOutput,
    deleteHistoryItem,
    clearHistory,
    removeFavorite,
    toLanguageLabel,
  };
}
