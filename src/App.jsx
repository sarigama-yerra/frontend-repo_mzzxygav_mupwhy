import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import WhyChoose from './components/WhyChoose';
import Questionnaire from './components/Questionnaire';
import DietPlan from './components/DietPlan';
import Motivation from './components/Motivation';

const App = () => {
  const [route, setRoute] = useState(window.location.hash || '#/home');
  const [plan, setPlan] = useState(null);

  useEffect(() => {
    const savedPlan = localStorage.getItem('fitlife_plan');
    if (savedPlan) setPlan(JSON.parse(savedPlan));
  }, []);

  const navigate = (hash) => setRoute(hash);

  const handleStart = () => {
    window.location.hash = '#/questionario';
  };

  const handlePlanReady = (p) => {
    setPlan(p);
    window.location.hash = '#/dieta';
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar current={route} onNavigate={navigate} />

      {route === '#/home' && (
        <>
          <HeroSection onStart={handleStart} />
          <WhyChoose />
        </>
      )}

      {route === '#/questionario' && <Questionnaire onPlanReady={handlePlanReady} />}

      {route === '#/dieta' && <DietPlan plan={plan} />}

      {route === '#/motivazione' && <Motivation />}

      <footer className="w-full border-t border-white/10 bg-black py-10 text-center text-sm text-white/70">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-20">
          <p>© {new Date().getFullYear()} FitLife — Vivere sano, con equilibrio.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
