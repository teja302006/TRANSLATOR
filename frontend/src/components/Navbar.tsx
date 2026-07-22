import { HiSparkles } from 'react-icons/hi2';

function Navbar() {
  return (
    <nav className="sticky top-0 z-20 flex items-center justify-between border-b border-white/10 bg-slate-950/60 px-5 py-4 backdrop-blur-xl md:px-8">
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-gradient-to-r from-primary to-accent p-2">
          <HiSparkles className="text-lg text-white" />
        </div>
        <div>
          <h1 className="text-xl font-semibold">Lingua AI</h1>
          <p className="text-xs text-slate-400">Universal Translator</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm">History</button>
        <button className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm">GitHub</button>
      </div>
    </nav>
  );
}

export default Navbar;
