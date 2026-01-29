
import React from 'react';
import { CricketPlayer } from '../types';
import StatBar from './StatBar';

const PlayerProfile: React.FC<{ player: CricketPlayer; onBack: () => void }> = ({ player, onBack }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button 
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-emerald-700 font-semibold hover:text-emerald-900 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to Archives
      </button>

      <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-100">
        {/* Header Section */}
        <div className="bg-slate-900 p-8 md:p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 opacity-10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <span className="inline-block px-3 py-1 bg-amber-500 text-black text-[10px] font-black uppercase tracking-widest rounded-full mb-4">
                  {player.country} | {player.role}
                </span>
                <h1 className="text-4xl md:text-6xl font-serif font-bold mb-2">{player.fullName}</h1>
                <p className="text-xl md:text-2xl text-slate-300 italic font-serif">"{player.nickname || 'The Legend'}"</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg border border-white/20">
                <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Era Rating</p>
                <p className="text-2xl font-bold text-amber-400">{player.eraRating}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Sidebar Info */}
          <div className="lg:col-span-4 bg-slate-50 p-8 border-r border-slate-200">
            <div className="mb-8">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Personal Details</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-slate-500 uppercase">Born</p>
                  <p className="font-semibold text-slate-800">{player.dateOfBirth} in {player.placeOfBirth}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase">Style</p>
                  <p className="font-semibold text-slate-800">{player.battingStyle}</p>
                  <p className="font-semibold text-slate-800">{player.bowlingStyle}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase">Active Years</p>
                  <p className="font-semibold text-slate-800">{player.playingEra}</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Career Metrics</h3>
              {player.careerStatistics.map((stat, idx) => (
                <div key={idx} className="mb-6 p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-bold text-emerald-700">{stat.format}</span>
                    <span className="text-xs px-2 py-0.5 bg-slate-100 rounded text-slate-600">{stat.matches} Matches</span>
                  </div>
                  {stat.runs !== undefined && <StatBar label="Runs" value={stat.runs} max={20000} color="bg-emerald-500" />}
                  {stat.wickets !== undefined && <StatBar label="Wickets" value={stat.wickets} max={800} color="bg-amber-500" />}
                  <StatBar label="Average" value={stat.average} max={100} color="bg-blue-500" />
                </div>
              ))}
            </div>

            <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100">
              <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-widest mb-2">Did You Know?</h4>
              <ul className="space-y-2">
                {player.interestingFacts.map((fact, idx) => (
                  <li key={idx} className="text-sm text-emerald-900 flex gap-2">
                    <span className="text-emerald-400">•</span> {fact}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-8 p-8 md:p-12 space-y-10">
            <section>
              <h2 className="text-3xl font-serif font-bold text-slate-800 mb-4 border-b pb-2">Technical Mastery & Style</h2>
              <p className="text-lg text-slate-600 leading-relaxed font-serif">{player.strengths}</p>
            </section>

            <section>
              <h2 className="text-3xl font-serif font-bold text-slate-800 mb-4 border-b pb-2">Historical Impact</h2>
              <p className="text-lg text-slate-600 leading-relaxed italic border-l-4 border-amber-400 pl-6 bg-amber-50 py-4">
                {player.impact}
              </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <section>
                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <span className="text-amber-500 text-2xl">🏆</span> Major Achievements
                </h3>
                <ul className="space-y-3">
                  {player.majorAchievements.map((ach, idx) => (
                    <li key={idx} className="flex gap-3 text-slate-700 text-sm">
                      <span className="w-1.5 h-1.5 mt-1.5 bg-slate-300 rounded-full shrink-0"></span>
                      {ach}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <span className="text-blue-500 text-2xl">🎬</span> Iconic Moments
                </h3>
                <ul className="space-y-3">
                  {player.iconicMoments.map((moment, idx) => (
                    <li key={idx} className="flex gap-3 text-slate-700 text-sm">
                      <span className="w-1.5 h-1.5 mt-1.5 bg-blue-300 rounded-full shrink-0"></span>
                      {moment}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <section className="bg-slate-50 p-8 rounded-xl border-t-4 border-slate-900">
              <h3 className="text-2xl font-serif font-bold text-slate-800 mb-2">Legacy Summary</h3>
              <p className="text-xl text-slate-700 leading-relaxed font-serif italic">
                "{player.legacySummary}"
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerProfile;
