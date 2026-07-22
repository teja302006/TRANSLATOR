import { FaTrash } from 'react-icons/fa6';
import type { SavedItem } from '../utils/storage';

interface HistoryProps {
  items: SavedItem[];
  onDelete: (id: string) => void;
  onClear: () => void;
}

function History({ items, onDelete, onClear }: HistoryProps) {
  return (
    <section className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">History</h3>
        <button onClick={onClear} className="rounded-full border border-white/15 px-3 py-1 text-sm">
          Clear all
        </button>
      </div>

      <div className="space-y-3">
        {items.length === 0 ? (
          <p className="text-sm text-slate-400">No translations yet.</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="rounded-2xl border border-white/10 bg-slate-900/50 p-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-400">{item.sourceText}</p>
                  <p className="mt-1 font-medium text-white">{item.translatedText}</p>
                </div>
                <button onClick={() => onDelete(item.id)} aria-label="Delete translation" className="rounded-full p-2 text-slate-400 hover:text-white">
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default History;
