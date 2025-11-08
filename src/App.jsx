import React, { useState, useEffect } from 'react';
import HeroSection from './components/HeroSection';
import WhyChoose from './components/WhyChoose';
import Questionnaire from './components/Questionnaire';
import DietPlan from './components/DietPlan';
import Motivation from './components/Motivation';

const App = () => {
  const [view, setView] = useState('home');
  const [plan, setPlan] = useState(null);

  useEffect(() => {
    const savedPlan = localStorage.getItem('fitlife_plan');
    if (savedPlan) setPlan(JSON.parse(savedPlan));
  }, []);

  const handleStart = () => {
    setView('questionnaire');
    const el = document.getElementById('questionnaire');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePlanReady = (p) => {
    setPlan(p);
    setView('plan');
    setTimeout(() => {
      const el = document.getElementById('plan');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  return (
    <div className="min-h-screen bg-white text-indigo-900">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10 lg:px-20">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-emerald-400" />
            <span className="font-semibold">FitLife</span>
          </div>
          <nav className="hidden gap-6 text-sm font-medium sm:flex">
            <button onClick={() => setView('home')} className={`hover:text-indigo-700 ${view==='home'?'text-indigo-900':'text-indigo-700/70'}`}>Home</button>
            <button onClick={() => setView('questionnaire')} className={`hover:text-indigo-700 ${view==='questionnaire'?'text-indigo-900':'text-indigo-700/70'}`}>Questionnaire</button>
            <button onClick={() => setView('plan')} className={`hover:text-indigo-700 ${view==='plan'?'text-indigo-900':'text-indigo-700/70'}`}>Diet Plan</button>
            <button onClick={() => setView('motivation')} className={`hover:text-indigo-700 ${view==='motivation'?'text-indigo-900':'text-indigo-700/70'}`}>Motivation</button>
          </nav>
        </div>
      </header>

      {/* Views */}
      <main>
        <HeroSection onStart={handleStart} />
        <WhyChoose />
        {(view === 'questionnaire' || view === 'home') && (
          <Questionnaire onPlanReady={handlePlanReady} />
        )}
        {(view === 'plan' || plan) && <DietPlan plan={plan} />}
        <Motivation />
      </main>

      {/* Footer */}
      <footer className="w-full bg-indigo-900 py-10 text-center text-sm text-white/80">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-20">
          <p>© {new Date().getFullYear()} FitLife — Built with love for healthy habits.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
