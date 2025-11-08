import React, { useMemo } from 'react';
import { Utensils, Flame, Droplets, Salad, Info } from 'lucide-react';

const Stat = ({ label, value }) => (
  <div className="rounded-xl bg-white/5 p-4 text-center text-white shadow-sm ring-1 ring-white/10">
    <div className="text-xs uppercase tracking-wide text-white/60">{label}</div>
    <div className="mt-1 text-xl font-bold">{value}</div>
  </div>
);

const MealCard = ({ title, items }) => (
  <div className="rounded-2xl bg-white/5 p-5 text-white shadow-md ring-1 ring-white/10">
    <div className="mb-2 flex items-center gap-2">
      <Utensils className="h-5 w-5" />
      <h4 className="text-lg font-semibold">{title}</h4>
    </div>
    <ul className="ml-5 list-disc space-y-1 text-white/80">
      {items.map((it, idx) => (
        <li key={idx}>{it}</li>
      ))}
    </ul>
  </div>
);

const Tip = ({ children }) => (
  <div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-200 ring-1 ring-emerald-500/30">
    {children}
  </div>
);

const DietPlan = ({ plan }) => {
  const quote = useMemo(() => {
    const quotes = [
      'Piccoli passi ogni giorno portano a grandi cambiamenti.',
      'Mangia a colori, muoviti spesso, dormi bene.',
      'La disciplina è scegliere ciò che vuoi di più.',
      "L’idratazione alimenta energia e concentrazione.",
      'La costanza batte l’intensità.',
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
    <section className="w-full bg-black py-16 text-white" id="plan">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">Il tuo piano alimentare mediterraneo</h2>
            <p className="mt-2 text-white/70">
              Focus: {plan.focus}. Basato sulla Piramide Alimentare Mediterranea.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat label="Calorie" value={`${plan.calories} kcal`} />
            <Stat label="Proteine" value={`${plan.macros.protein} g`} />
            <Stat label="Carboidrati" value={`${plan.macros.carbs} g`} />
            <Stat label="Grassi" value={`${plan.macros.fats} g`} />
          </div>
        </div>

        <div className="mb-8 grid gap-6 md:grid-cols-2">
          {plan.meals.map((m, i) => (
            <MealCard key={i} title={m.name} items={m.items} />
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Tip>
            <div className="mb-1 flex items-center gap-2 font-semibold"><Salad className="h-4 w-4"/>Base</div>
            Frutta, verdura, cereali integrali, legumi e acqua: la base della giornata.
          </Tip>
          <Tip>
            <div className="mb-1 flex items-center gap-2 font-semibold"><Flame className="h-4 w-4"/>Moderazione</div>
            Proteine magre e latticini con moderazione; dolci e grassi aggiunti solo occasionalmente.
          </Tip>
          <Tip>
            <div className="mb-1 flex items-center gap-2 font-semibold"><Droplets className="h-4 w-4"/>Idratazione</div>
            Punta a 2 litri d’acqua al giorno. Tisane e acqua frizzante sono ottime alternative.
          </Tip>
        </div>

        <div className="mt-10 rounded-2xl bg-white/5 p-6 text-white shadow-lg ring-1 ring-white/10">
          <div className="mb-2 flex items-center gap-2 text-emerald-300"><Info className="h-5 w-5"/> Perché questi alimenti per te</div>
          <p className="leading-relaxed text-white/80">{plan.reasoning}</p>
        </div>

        <div className="mt-6 rounded-2xl bg-emerald-600 p-6 text-white shadow-lg">
          <div className="text-sm uppercase tracking-widest text-emerald-100">Frase del giorno</div>
          <p className="mt-2 text-xl font-medium">“{quote}”</p>
        </div>
      </div>
    </section>
  );
};

export default DietPlan;
