import React from 'react';
import { Apple, Dumbbell, Sparkles } from 'lucide-react';

const Feature = ({ icon: Icon, title, description }) => (
  <div className="rounded-2xl bg-white/70 p-6 shadow-md shadow-indigo-900/5 ring-1 ring-black/5 backdrop-blur">
    <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700">
      <Icon className="h-6 w-6" />
    </div>
    <h3 className="mb-2 text-lg font-semibold text-indigo-900">{title}</h3>
    <p className="text-indigo-900/70">{description}</p>
  </div>
);

const WhyChoose = () => {
  return (
    <section className="relative -mt-12 w-full bg-white py-16 text-indigo-900 md:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-20">
        <h2 className="text-3xl font-bold md:text-4xl">Why Choose FitLife</h2>
        <p className="mt-2 max-w-2xl text-indigo-900/70">
          Science-backed guidance with a friendly tone. We turn small steps into long-term results.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Feature
            icon={Apple}
            title="Mediterranean food pyramid"
            description="Balanced, colorful meals centered on fruits, veggies, whole grains, and healthy fats."
          />
          <Feature
            icon={Dumbbell}
            title="Personalized to you"
            description="Adapts to your weight, height, habits, and activity level — from sedentary to gym-goer."
          />
          <Feature
            icon={Sparkles}
            title="Motivation built-in"
            description="Weekly challenges and inspiring quotes to keep your momentum strong."
          />
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
