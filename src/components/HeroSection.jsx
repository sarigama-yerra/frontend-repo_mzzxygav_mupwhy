import React from 'react';
import Spline from '@splinetool/react-spline';
import { ArrowRight } from 'lucide-react';

const HeroSection = ({ onStart }) => {
  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden bg-[#0b1226] text-white">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/2fSS9b44gtYBt4RI/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Gradient overlays for readability */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-[#0b1226]/90" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-6 px-6 py-24 md:px-10 lg:px-20">
        <span className="inline-flex items-center rounded-full bg-emerald-400/10 px-3 py-1 text-emerald-300 ring-1 ring-emerald-300/30">
          FitLife – Your Path to a Healthy Lifestyle
        </span>
        <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">
          Transform your lifestyle, one step at a time.
        </h1>
        <p className="max-w-2xl text-white/80 md:text-lg">
          Build lasting habits with a Mediterranean-inspired approach to nutrition, movement,
          and motivation. Get a personalized plan tailored to your body, goals, and daily routine.
        </p>
        <div className="mt-2">
          <button
            onClick={onStart}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 font-semibold text-[#0b1226] shadow-lg shadow-emerald-500/20 transition-transform hover:scale-[1.02] hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-300"
          >
            Start Now
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
