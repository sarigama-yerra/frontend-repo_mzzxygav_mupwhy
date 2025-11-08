import React, { useMemo } from 'react';
import { Utensils, Flame, Droplets, Salad } from 'lucide-react';

const Stat = ({ label, value }) => (
  <div className="rounded-xl bg-white/70 p-4 text-center shadow-sm ring-1 ring-black/5">
    <div className="text-xs uppercase tracking-wide text-indigo-900/60">{label}</div>
    <div className="mt-1 text-xl font-bold text-indigo-900">{value}</div>
  </div>
);

const MealCard = ({ title, items }) => (
  <div className="rounded-2xl bg-white p-5 shadow-md ring-1 ring-black/5">
    <div className="mb-2 flex items-center gap-2 text-indigo-900">
      <Utensils className="h-5 w-5" />
      <h4 className="text-lg font-semibold">{title}</h4>
    </div>
    <ul className="ml-5 list-disc space-y-1 text-indigo-900/80">
      {items.map((it, idx) => (
        <li key={idx}>{it}</li>
      ))}
    </ul>
  </div>
);

const Tip = ({ children }) => (
  <div className="rounded-xl bg-emerald-50 p-3 text-emerald-900 ring-1 ring-emerald-200">
    {children}
  </div>
);

const DietPlan = ({ plan }) => {
  const quote = useMemo(() => {
    const quotes = [
      'Small steps every day lead to big change.',
      'Eat colorful, move often, sleep well.',
      'Discipline is choosing what you want most.',
      'Hydration fuels energy and focus.',
      'Consistency beats intensity.',
    ];
    const idx = new Date().getDate() % quotes.length;
    return quotes[idx];
  }, []);

  if (!plan) {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('fitlife_plan') : null;
    if (!saved) return null;
    plan = JSON.parse(saved);
  }

  return (
    <section className="w-full bg-gradient-to-b from-indigo-50 to-white py-16 text-indigo-900" id="plan">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">Your Mediterranean Diet Plan</h2>
            <p className="mt-2 text-indigo-900/70">
              Focus: {plan.focus}. Built around the Mediterranean food pyramid.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat label="Calories" value={`${plan.calories} kcal`} />
            <Stat label="Protein" value={`${plan.macros.protein} g`} />
            <Stat label="Carbs" value={`${plan.macros.carbs} g`} />
            <Stat label="Fats" value={`${plan.macros.fats} g`} />
          </div>
        </div>

        <div className="mb-8 grid gap-6 md:grid-cols-2">
          {plan.meals.map((m, i) => (
            <MealCard key={i} title={m.name} items={m.items} />
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Tip>
            <div className="mb-1 flex items-center gap-2 font-semibold"><Salad className="h-4 w-4"/>Base foods</div>
            Fruits, vegetables, whole grains, legumes, and water form the base of your day.
          </Tip>
          <Tip>
            <div className="mb-1 flex items-center gap-2 font-semibold"><Flame className="h-4 w-4"/>Moderation</div>
            Include lean proteins and dairy in moderation; enjoy sweets and added fats occasionally.
          </Tip>
          <Tip>
            <div className="mb-1 flex items-center gap-2 font-semibold"><Droplets className="h-4 w-4"/>Hydration</div>
            Aim for 2 liters of water daily. Herbal teas and sparkling water are great too.
          </Tip>
        </div>

        <div className="mt-10 rounded-2xl bg-indigo-900 p-6 text-white shadow-lg">
          <div className="text-sm uppercase tracking-widest text-emerald-300">Quote of the day</div>
          <p className="mt-2 text-xl font-medium text-emerald-100">“{quote}”</p>
        </div>
      </div>
    </section>
  );
};

export default DietPlan;
