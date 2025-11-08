import React, { useMemo } from 'react';
import { CheckCircle2, Flame } from 'lucide-react';

const challenges = [
  { id: 'water', text: 'Drink 2L of water daily' },
  { id: 'steps', text: 'Walk 10,000 steps' },
  { id: 'fruit', text: 'Eat 3 servings of fruit' },
  { id: 'veggies', text: 'Add 2 cups of vegetables' },
  { id: 'sleep', text: 'Sleep 7–8 hours' },
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
    <section className="w-full bg-white py-16 text-indigo-900" id="motivation">
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        <div className="mb-6 flex items-center gap-3">
          <Flame className="h-6 w-6 text-emerald-500" />
          <h2 className="text-3xl font-bold md:text-4xl">Motivation</h2>
        </div>
        <div className="rounded-2xl bg-gradient-to-r from-emerald-100 to-teal-50 p-6 ring-1 ring-emerald-200">
          <div className="text-sm uppercase tracking-widest text-emerald-700">Weekly Challenge</div>
          <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
            <p className="text-lg font-medium text-emerald-900">{weekly.text}</p>
            <button
              onClick={toggle}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 font-semibold shadow-sm transition-colors ${completed ? 'bg-emerald-600 text-white' : 'bg-white text-emerald-700 ring-1 ring-emerald-300 hover:bg-emerald-50'}`}
            >
              <CheckCircle2 className="h-5 w-5" />
              {completed ? 'Completed' : 'Mark as done'}
            </button>
          </div>
          <p className="mt-3 text-emerald-800/80">
            Come back daily to track your progress. Your status is saved locally in your browser.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Motivation;
