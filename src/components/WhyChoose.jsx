import React from 'react';
import { Apple, Dumbbell, Sparkles } from 'lucide-react';

const Feature = ({ icon: Icon, title, description }) => (
  <div className="rounded-2xl bg-white/5 p-6 text-white shadow-md ring-1 ring-white/10 backdrop-blur">
    <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-300">
      <Icon className="h-6 w-6" />
    </div>
    <h3 className="mb-2 text-lg font-semibold">{title}</h3>
    <p className="text-white/70">{description}</p>
  </div>
);

const WhyChoose = () => {
  return (
    <section className="relative -mt-12 w-full bg-black py-16 text-white md:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-20">
        <h2 className="text-3xl font-bold md:text-4xl">Perché scegliere FitLife</h2>
        <p className="mt-2 max-w-2xl text-white/70">
          Indicazioni basate sulla scienza con un approccio umano. Piccoli passi, grandi risultati nel tempo.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Feature
            icon={Apple}
            title="Piramide Alimentare Mediterranea"
            description="Pasti equilibrati e colorati: frutta, verdura, cereali integrali e grassi buoni."
          />
          <Feature
            icon={Dumbbell}
            title="Personalizzato per te"
            description="Si adatta a peso, altezza, abitudini e livello di attività — da sedentario a sportivo."
          />
          <Feature
            icon={Sparkles}
            title="Motivazione integrata"
            description="Sfide settimanali e frasi ispirazionali per mantenere alta la costanza."
          />
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
