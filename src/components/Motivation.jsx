import React, { useMemo } from 'react';
import { CheckCircle2, Flame } from 'lucide-react';

const challenges = [
  { id: 'water', text: 'Bevi 2L di acqua al giorno' },
  { id: 'steps', text: 'Fai 10.000 passi' },
  { id: 'fruit', text: 'Mangia 3 porzioni di frutta' },
  { id: 'veggies', text: 'Aggiungi 2 tazze di verdure' },
  { id: 'sleep', text: 'Dormi 7–8 ore' },
];

const Motivation = () => {
  const weekly = useMemo(() => {
    const idx = Math.floor(Date.now() / (1000 * 60 * 60 * 24 * 7)) % challenges.length;
    return challenges[idx];
  }, []);

  const saved = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('fitlife_progress') || '{}') : {};
  const completed = saved[weekly.id] || false;

  const toggle = () => {
    const current = JSON.parse(localStorage.getItem('fitlife_progress') || '{}');
    current[weekly.id] = !completed;
    localStorage.setItem('fitlife_progress', JSON.stringify(current));
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <section className="w-full bg-black py-16 text-white" id="motivazione">
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        <div className="mb-6 flex items-center gap-3">
          <Flame className="h-6 w-6 text-emerald-400" />
          <h2 className="text-3xl font-bold md:text-4xl">Motivazione</h2>
        </div>
        <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
          <div className="text-sm uppercase tracking-widest text-white/70">Sfida della settimana</div>
          <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
            <p className="text-lg font-medium text-white">{weekly.text}</p>
            <button
              onClick={toggle}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 font-semibold shadow-sm transition-colors ${completed ? 'bg-emerald-600 text-white' : 'bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/20'}`}
            >
              <CheckCircle2 className="h-5 w-5" />
              {completed ? 'Completata' : 'Segna come fatta'}
            </button>
          </div>
          <p className="mt-3 text-white/70">
            Torna ogni giorno per monitorare i progressi. Lo stato è salvato localmente nel tuo browser.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Motivation;
