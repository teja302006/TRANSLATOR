import { motion } from 'framer-motion';
import { FaArrowRightArrowLeft, FaCopy, FaHeart, FaLanguage, FaPlay, FaTrash } from 'react-icons/fa6';
import LanguageSelector from './LanguageSelector';
import VoiceButton from './VoiceButton';
import type { SavedItem } from '../utils/storage';

interface TranslatorCardProps {
  source: string;
  target: string;
  input: string;
  output: string;
  loading: boolean;
  error: string;
  languages: Array<{ code: string; name: string }>;
  isListening: boolean;
  isFavorite: boolean;
  setSource: (value: string) => void;
  setTarget: (value: string) => void;
  setInput: (value: string) => void;
  swapLanguages: () => void;
  handleTranslate: () => void;
  clearAll: () => void;
  copyOutput: () => void;
  speak: () => void;
  toggleFavorite: () => void;
  startListening: () => void;
  stopListening: () => void;
  history: SavedItem[];
}

function TranslatorCard({
  source,
  target,
  input,
  output,
  loading,
  error,
  languages,
  isListening,
  isFavorite,
  setSource,
  setTarget,
  setInput,
  swapLanguages,
  handleTranslate,
  clearAll,
  copyOutput,
  speak,
  toggleFavorite,
  startListening,
  stopListening,
  history,
}: TranslatorCardProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[32px] border border-white/10 bg-white/5 p-5 shadow-glow backdrop-blur-2xl md:p-8"
    >
      <div className="grid gap-5 lg:grid-cols-[1fr_auto_1fr] lg:items-end">
        <LanguageSelector label="From" value={source} options={languages} onChange={setSource} />

        <button
          type="button"
          aria-label="Swap languages"
          onClick={swapLanguages}
          className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-slate-900/70 text-white"
        >
          <FaArrowRightArrowLeft />
        </button>

        <LanguageSelector label="To" value={target} options={languages} onChange={setTarget} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <label className="block rounded-3xl border border-white/10 bg-slate-950/60 p-4">
          <span className="mb-3 block text-sm text-slate-300">Input</span>
          <textarea
            aria-label="Source text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            rows={7}
            className="min-h-[220px] w-full resize-none bg-transparent text-white outline-none"
            placeholder="Enter text to translate..."
          />
          <div className="mt-3 text-xs text-slate-400">{input.length} characters</div>
        </label>

        <label className="block rounded-3xl border border-white/10 bg-slate-950/60 p-4">
          <span className="mb-3 block text-sm text-slate-300">Translation</span>
          <textarea
            aria-label="Translation output"
            value={output}
            readOnly
            rows={7}
            className="min-h-[220px] w-full resize-none bg-transparent text-white outline-none"
            placeholder="Your translation appears here..."
          />
          <div className="mt-3 text-xs text-slate-400">{output.length} characters</div>
        </label>
      </div>

      {error ? <div className="mt-4 rounded-2xl bg-rose-500/20 p-3 text-sm text-rose-100">{error}</div> : null}

      <div className="mt-5 flex flex-wrap gap-3">
        <button onClick={handleTranslate} className="rounded-full bg-gradient-to-r from-primary to-accent px-5 py-3 text-sm font-semibold text-white">
          {loading ? 'Translating...' : 'Translate'}
        </button>
        <button onClick={clearAll} className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm">Clear</button>
        <button onClick={copyOutput} className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm">Copy</button>
        <button onClick={speak} className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm">Speak</button>
        <button onClick={toggleFavorite} className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm">
          <span className="flex items-center gap-2">{isFavorite ? '♥ Favorited' : '♡ Favorite'}</span>
        </button>
        <VoiceButton listening={isListening} onStart={startListening} onStop={stopListening} />
      </div>

      <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-sm text-slate-300">
        <div className="flex items-center gap-2"><FaLanguage /> Recent language pair</div>
        <div className="mt-2 flex flex-wrap gap-2">
          {history.slice(0, 3).map((item) => (
            <span key={item.id} className="rounded-full bg-white/5 px-3 py-1 text-xs">{item.source} → {item.target}</span>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export default TranslatorCard;
