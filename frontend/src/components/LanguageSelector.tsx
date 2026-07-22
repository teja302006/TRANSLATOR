interface LanguageSelectorProps {
  value: string;
  options: Array<{ code: string; name: string }>;
  onChange: (value: string) => void;
  label: string;
}

function LanguageSelector({ value, options, onChange, label }: LanguageSelectorProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-slate-300">{label}</span>
      <select
        aria-label={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-white/15 bg-slate-900/70 px-4 py-3 text-white outline-none"
      >
        {options.map((option) => (
          <option key={option.code} value={option.code}>
            {option.name}
          </option>
        ))}
      </select>
    </label>
  );
}

export default LanguageSelector;
