
import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-emerald-900 text-white py-8 px-6 shadow-xl border-b-4 border-amber-500">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight">
              Cricket History <span className="text-amber-400 italic font-medium">Intelligence Engine</span>
            </h1>
            <p className="text-emerald-100 mt-2 font-light opacity-90 max-w-xl">
              Exploring the evolution of the Gentleman's Game from 16th Century pastures to the modern global stage.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="text-right hidden sm:block">
              <span className="block text-xs uppercase tracking-widest text-amber-500 font-bold">Archives v1.0</span>
              <span className="block text-sm font-serif">Curated by AI Historians</span>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-grow max-w-6xl w-full mx-auto p-4 md:p-8">
        {children}
      </main>

      <footer className="bg-slate-900 text-slate-400 py-6 px-6 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Cricket History Intelligence Engine. Empowered by Gemini AI.</p>
      </footer>
    </div>
  );
};

export default Layout;
