'use client';

import React, { useState } from 'react';
import { guides, GuideTopic } from '@/data/guides';

export const KnowledgeView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'selection' | 'mounting' | 'wiring'>('all');
  const [activeGuideId, setActiveGuideId] = useState<string>(guides[0]?.id || '');

  const filteredGuides = selectedCategory === 'all'
    ? guides
    : guides.filter((g) => g.category === selectedCategory);

  const activeGuide: GuideTopic = guides.find((g) => g.id === activeGuideId) || guides[0];

  return (
    <div className="space-y-12">
      {/* Category filter pills */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
            selectedCategory === 'all'
              ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow'
              : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
          }`}
        >
          Все инструкции ({guides.length})
        </button>
        <button
          onClick={() => setSelectedCategory('selection')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
            selectedCategory === 'selection'
              ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow'
              : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
          }`}
        >
          🔍 Выбор датчиков
        </button>
        <button
          onClick={() => setSelectedCategory('wiring')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
            selectedCategory === 'wiring'
              ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow'
              : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
          }`}
        >
          ⚡ Электромонтаж реле (с/без нуля)
        </button>
        <button
          onClick={() => setSelectedCategory('mounting')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
            selectedCategory === 'mounting'
              ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow'
              : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
          }`}
        >
          💧 Монтаж защиты от протечек
        </button>
      </div>

      {/* Main 2-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Navigation Sidebar (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider px-1">
            Руководства и схемы:
          </div>
          {filteredGuides.map((guide) => {
            const isSel = guide.id === activeGuide.id;
            return (
              <button
                key={guide.id}
                onClick={() => setActiveGuideId(guide.id)}
                className={`w-full text-left p-4 rounded-2xl border transition-all ${
                  isSel
                    ? 'bg-slate-900 border-amber-500/80 shadow-lg shadow-amber-500/10'
                    : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/40'
                }`}
              >
                <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                  {guide.badge}
                </span>
                <h3 className="text-sm font-bold text-white mt-2.5 mb-1">{guide.title}</h3>
                <p className="text-xs text-slate-400 line-clamp-2">{guide.subtitle}</p>
              </button>
            );
          })}
        </div>

        {/* Detailed Guide Viewer (8 cols) */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8">
          <div>
            <div className="inline-block text-xs font-mono font-bold text-amber-400 uppercase tracking-wider px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/20 mb-3">
              {activeGuide.badge}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">{activeGuide.title}</h2>
            <p className="mt-3 text-base text-slate-300 leading-relaxed">{activeGuide.description}</p>
          </div>

          {/* Comparison Matrix Table if available */}
          {activeGuide.comparisonTable && (
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
                <span>📊</span> {activeGuide.comparisonTable.caption}
              </h3>
              <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/80">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="border-b border-slate-800 bg-slate-900/90 text-cyan-400 font-mono uppercase tracking-wider text-[11px]">
                    <tr>
                      {activeGuide.comparisonTable.headers.map((h, hIdx) => (
                        <th key={hIdx} className="p-3 sm:p-4 font-bold">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/70 text-slate-300">
                    {activeGuide.comparisonTable.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-900/40 transition-colors">
                        <td className="p-3 sm:p-4 font-semibold text-white whitespace-nowrap">{row[0]}</td>
                        <td className="p-3 sm:p-4 text-slate-300">{row[1]}</td>
                        <td className="p-3 sm:p-4 text-emerald-400 font-medium">{row[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Steps */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <span>📋</span> Пошаговые инженерные рекомендации
            </h3>
            {activeGuide.steps.map((st) => (
              <div
                key={st.stepNumber}
                className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800/90 space-y-3"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 font-black flex items-center justify-center text-xs shrink-0">
                    {st.stepNumber}
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-white">{st.title}</h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-10">
                  {st.description}
                </p>

                {/* Optional pro-tip */}
                {st.proTip && (
                  <div className="ml-10 p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-xs text-cyan-300 flex items-start gap-2">
                    <span className="text-sm">💡</span>
                    <div>
                      <span className="font-bold">Совет инженера: </span>
                      {st.proTip}
                    </div>
                  </div>
                )}

                {/* Optional ASCII / Wiring diagram */}
                {st.diagram && (
                  <div className="ml-10 p-3 rounded-xl bg-slate-950 border border-slate-700/60 font-mono text-xs text-amber-300 overflow-x-auto whitespace-pre">
                    {st.diagram}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Common Mistakes */}
          <div className="p-6 rounded-2xl bg-red-950/20 border border-red-500/30 space-y-3">
            <h4 className="text-sm font-bold text-red-400 flex items-center gap-2">
              <span>⚠️</span> Типичные ошибки самостоятельного монтажа
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 pl-4 list-disc">
              {activeGuide.commonMistakes.map((m, i) => (
                <li key={i}>{m}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
