import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa6';

interface VoiceButtonProps {
  listening: boolean;
  onStart: () => void;
  onStop: () => void;
}

function VoiceButton({ listening, onStart, onStop }: VoiceButtonProps) {
  return (
    <button
      type="button"
      aria-label={listening ? 'Stop listening' : 'Start listening'}
      onClick={listening ? onStop : onStart}
      className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${
        listening ? 'bg-rose-500 text-white' : 'border border-white/15 bg-white/5 text-slate-100'
      }`}
    >
      {listening ? <FaMicrophoneSlash /> : <FaMicrophone />}
      {listening ? 'Stop' : 'Mic'}
    </button>
  );
}

export default VoiceButton;
