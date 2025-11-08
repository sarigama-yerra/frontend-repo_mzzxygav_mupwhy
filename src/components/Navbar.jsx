import React, { useState, useEffect } from 'react';

const routes = [
  { path: '#/home', label: 'Home' },
  { path: '#/questionario', label: 'Questionario' },
  { path: '#/dieta', label: 'Dieta' },
  { path: '#/motivazione', label: 'Motivazione' },
];

const Navbar = ({ current, onNavigate }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onHashChange = () => {
      setOpen(false);
      onNavigate(window.location.hash || '#/home');
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [onNavigate]);

  const navigate = (path) => {
    window.location.hash = path;
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/70 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10 lg:px-20">
        <div className="flex items-center gap-2 text-white">
          <div className="h-3 w-3 rounded-full bg-emerald-400" />
          <span className="font-semibold">FitLife</span>
        </div>

        <nav className="hidden gap-6 text-sm font-medium text-white/80 md:flex">
          {routes.map((r) => (
            <button
              key={r.path}
              onClick={() => navigate(r.path)}
              className={`hover:text-white ${current === r.path ? 'text-white' : ''}`}
            >
              {r.label}
            </button>
          ))}
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Apri menu"
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-white md:hidden"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
            <path fillRule="evenodd" d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75Zm0 5.25c0-.414.336-.75.75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Zm.75 4.5a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75Z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-black/90 px-6 py-4 md:hidden">
          <div className="mx-auto grid max-w-7xl gap-2">
            {routes.map((r) => (
              <button
                key={r.path}
                onClick={() => navigate(r.path)}
                className={`w-full rounded-lg px-3 py-2 text-left text-white/80 hover:bg-white/5 hover:text-white ${current === r.path ? 'bg-white/5 text-white' : ''}`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
