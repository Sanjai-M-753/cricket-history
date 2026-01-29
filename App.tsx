
import React, { useState, useEffect, useCallback } from 'react';
import Layout from './components/Layout';
import { EraType, CricketPlayer, EraInfo } from './types';
import { ERAS, COUNTRIES, ROLES } from './constants';
import { fetchPlayersForEra, fetchPlayerDetails, fetchEraInsight } from './services/gemini';
import PlayerProfile from './components/PlayerProfile';

const App: React.FC = () => {
  const [currentEra, setCurrentEra] = useState<EraInfo>(ERAS[1]); // Default to Golden Age
  const [playersList, setPlayersList] = useState<string[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<CricketPlayer | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [eraInsight, setEraInsight] = useState<string>('');
  
  // Filter States
  const [filterCountry, setFilterCountry] = useState<string>('');
  const [filterRole, setFilterRole] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const loadEraData = useCallback(async () => {
    setLoading(true);
    try {
      const [names, insight] = await Promise.all([
        fetchPlayersForEra(currentEra.name, {
          country: filterCountry || undefined,
          role: filterRole || undefined,
          search: searchTerm || undefined
        }),
        fetchEraInsight(currentEra.name)
      ]);
      setPlayersList(names);
      setEraInsight(insight);
    } catch (error) {
      console.error("Error loading era data", error);
    } finally {
      setLoading(false);
    }
  }, [currentEra, filterCountry, filterRole, searchTerm]);

  useEffect(() => {
    loadEraData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentEra, filterCountry, filterRole]); // Explicitly not on searchTerm to allow button-triggered search

  const handlePlayerClick = async (name: string) => {
    setLoading(true);
    try {
      const details = await fetchPlayerDetails(name);
      setSelectedPlayer(details);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error("Error loading player details", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    loadEraData();
  };

  if (selectedPlayer) {
    return (
      <Layout>
        <PlayerProfile player={selectedPlayer} onBack={() => setSelectedPlayer(null)} />
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Era Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden mb-12">
        <div className="p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center border-b border-slate-100">
          <div className="flex-1">
            <span className="text-amber-600 font-bold uppercase tracking-widest text-xs mb-2 block">Currently Exploring</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-800 mb-4">{currentEra.name}</h2>
            <p className="text-lg text-slate-600 leading-relaxed font-serif max-w-2xl">
              {currentEra.description}
            </p>
          </div>
          <div className="w-full md:w-auto flex flex-col gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Select Era</span>
            <div className="flex flex-wrap gap-2">
              {ERAS.map((era) => (
                <button
                  key={era.id}
                  onClick={() => setCurrentEra(era)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                    currentEra.id === era.id 
                    ? 'bg-emerald-900 text-white shadow-lg scale-105' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {era.id.charAt(0).toUpperCase() + era.id.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline Insight */}
        <div className="bg-emerald-50/50 p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-serif font-bold text-emerald-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">🏛️</span> Historical Narrative
              </h3>
              <div className="prose prose-slate max-w-none text-slate-700 font-serif leading-relaxed italic">
                {loading ? (
                  <div className="animate-pulse flex flex-col gap-2">
                    <div className="h-4 bg-slate-200 rounded w-full"></div>
                    <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                    <div className="h-4 bg-slate-200 rounded w-4/6"></div>
                  </div>
                ) : (
                  <p>{eraInsight}</p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="p-6 bg-white rounded-xl border border-emerald-100 shadow-sm">
                <h4 className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-2">Evolution Benchmark</h4>
                <p className="text-slate-700 text-sm font-serif">{currentEra.keyEvolution}</p>
              </div>
              <div className="p-6 bg-amber-50 rounded-xl border border-amber-100 shadow-sm">
                <h4 className="text-xs font-bold text-amber-700 uppercase tracking-widest mb-2">Did You Know?</h4>
                <p className="text-slate-700 text-sm font-serif">{currentEra.didYouKnow}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="mb-12 sticky top-4 z-20">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 p-4 md:p-6 flex flex-col md:flex-row gap-4">
          <form onSubmit={handleSearch} className="flex-grow flex items-center bg-slate-100 rounded-lg px-4 border border-slate-200 focus-within:ring-2 ring-emerald-500 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
            <input 
              type="text" 
              placeholder="Search specific legends or events..."
              className="bg-transparent border-none focus:ring-0 w-full p-2 text-slate-800 placeholder-slate-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
          
          <div className="flex flex-wrap gap-2 md:w-auto">
            <select 
              value={filterCountry}
              onChange={(e) => setFilterCountry(e.target.value)}
              className="bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm font-medium text-slate-600 focus:ring-2 ring-emerald-500"
            >
              <option value="">All Countries</option>
              {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            
            <select 
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm font-medium text-slate-600 focus:ring-2 ring-emerald-500"
            >
              <option value="">All Roles</option>
              {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
            
            <button 
              onClick={loadEraData}
              className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-emerald-700 transition-colors shadow-lg"
            >
              Apply
            </button>
          </div>
        </div>
      </div>

      {/* Players Grid */}
      <div>
        <div className="flex justify-between items-center mb-8 border-b border-slate-200 pb-4">
          <h3 className="text-2xl font-serif font-bold text-slate-800">
            Era Icons <span className="text-slate-400 text-lg ml-2 font-light">({playersList.length} Found)</span>
          </h3>
          <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">Select a player to delve into history</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1,2,3,4,5,6,7,8].map(i => (
              <div key={i} className="bg-slate-50 border border-slate-100 h-64 rounded-xl animate-pulse flex items-center justify-center">
                <div className="w-12 h-12 bg-slate-200 rounded-full"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {playersList.length > 0 ? playersList.map((name, idx) => (
              <button
                key={idx}
                onClick={() => handlePlayerClick(name)}
                className="group relative bg-white border border-slate-200 p-8 rounded-xl shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-left overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-600 transform scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom"></div>
                <div className="mb-4 w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                  <span className="text-xl font-serif font-bold">{idx + 1}</span>
                </div>
                <h4 className="text-xl font-serif font-bold text-slate-800 group-hover:text-emerald-800 transition-colors leading-tight mb-2">
                  {name}
                </h4>
                <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">Historical Profile</p>
                <div className="mt-6 flex items-center text-emerald-600 font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  Read More
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </button>
            )) : (
              <div className="col-span-full py-20 text-center">
                <div className="text-6xl mb-4 opacity-20">🏏</div>
                <h3 className="text-2xl font-serif text-slate-400 italic">No archives found matching these criteria in the {currentEra.name}.</h3>
                <button 
                  onClick={() => {setFilterCountry(''); setFilterRole(''); setSearchTerm('');}}
                  className="mt-4 text-emerald-600 font-bold hover:underline"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Era Navigation Hint */}
      <div className="mt-20 border-t border-slate-200 pt-12 flex flex-col items-center">
        <p className="text-slate-400 font-serif italic mb-6">Explore the next chapter of the Gentleman's Game</p>
        <div className="flex gap-4">
          {ERAS.findIndex(e => e.id === currentEra.id) < ERAS.length - 1 && (
            <button 
              onClick={() => setCurrentEra(ERAS[ERAS.findIndex(e => e.id === currentEra.id) + 1])}
              className="bg-slate-900 text-white px-8 py-3 rounded-full font-bold hover:bg-emerald-900 transition-all flex items-center gap-2 shadow-xl"
            >
              Next Era
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default App;
