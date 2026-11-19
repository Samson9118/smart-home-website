'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type TimeOfDay = 'day' | 'evening' | 'night' | 'morning';

interface CyclePhase {
  id: TimeOfDay;
  timeRange: string;
  name: string;
  badge: string;
  tempK: string;
  lux: string;
  colorHex: string;
  lightingState: string;
  curtainsState: string;
  climateState: string;
  sensorsActive: string[];
  description: string;
  windowBg: string;
  roomOverlay: string;
  ambientGlow: string;
  bulbOpacity: number;
  lightWarmth: string;
}

const PHASES: Record<TimeOfDay, CyclePhase> = {
  day: {
    id: 'day',
    timeRange: '12:00 — 16:00',
    name: 'Дневной продуктивный свет',
    badge: 'Биоритмы и фокус',
    tempK: '5500 K',
    lux: '450 Lux',
    colorHex: '#38BDF8',
    lightingState: 'Рассеянный нейтральный свет 40% (автояркость по люксметру)',
    curtainsState: 'Шторы полностью открыты (100%), естественный свет',
    climateState: 'Комфорт 22.5°C, приточная вентиляция на 2-й скорости (CO2 < 650 ppm)',
    sensorsActive: ['Люксметр за окном', 'mmWave радар рабочего места', 'Датчик CO2 и влажности'],
    description: 'Интеллектуальный баланс: пока светит солнце, светильники снижают мощность, экономя до 40% электроэнергии. Цветовая температура 5500К стимулирует выработку серотонина и концентрацию внимания.',
    windowBg: 'radial-gradient(ellipse at top, #38bdf8 0%, #0284c7 40%, #0369a1 100%)',
    roomOverlay: 'rgba(56, 189, 248, 0.08)',
    ambientGlow: '0 0 80px rgba(56, 189, 248, 0.35)',
    bulbOpacity: 0.35,
    lightWarmth: '#BAE6FD',
  },
  evening: {
    id: 'evening',
    timeRange: '18:30 — 22:00',
    name: 'Вечерний релакс и уют',
    badge: 'Теплый закат',
    tempK: '2700 K',
    lux: '180 Lux',
    colorHex: '#F59E0B',
    lightingState: 'Мягкий теплый свет 2700K: треки 30%, парящий плинтус 60%',
    curtainsState: 'Умные карнизы закрываются с заходом солнца',
    climateState: 'Тихий режим кондиционера 21°C, теплый пол в гостиной',
    sensorsActive: ['Датчик заката (astro-timer)', 'Датчик открытия двери', 'Радар присутствия зоны ТВ'],
    description: 'Плавный спад цветовой температуры подготавливает организм к отдыху. Никаких слепящих люстр — включаются скрытые светодиодные ленты и бра.',
    windowBg: 'radial-gradient(ellipse at bottom, #b45309 0%, #7c2d12 40%, #1e1b4b 100%)',
    roomOverlay: 'rgba(245, 158, 11, 0.12)',
    ambientGlow: '0 0 100px rgba(245, 158, 11, 0.45)',
    bulbOpacity: 0.8,
    lightWarmth: '#FDE68A',
  },
  night: {
    id: 'night',
    timeRange: '23:00 — 05:30',
    name: 'Ночной режим охраны и тишины',
    badge: 'Глубокий сон',
    tempK: '2000 K',
    lux: '15 Lux (по запросу)',
    colorHex: '#6366F1',
    lightingState: 'Основной свет 0%. При шагах — деликатная подсветка пола на 8%',
    curtainsState: 'Шторы Blackout на 100% блокируют уличные фонари',
    climateState: 'Ночная прохлада 19.5°C для идеальной фазы сна',
    sensorsActive: ['Охранные герконы окон', 'Датчики протечки воды', 'PIR-датчик ночника пола'],
    description: 'Дом засыпает вместе с вами. Все приборы в спящем режиме, охрана периметра активна. Если встать ночью за водой, мягкий янтарный свет подсветит путь, не разбудив глаза.',
    windowBg: 'radial-gradient(ellipse at center, #1e1b4b 0%, #0f172a 60%, #020617 100%)',
    roomOverlay: 'rgba(30, 27, 75, 0.25)',
    ambientGlow: '0 0 40px rgba(99, 102, 241, 0.15)',
    bulbOpacity: 0.08,
    lightWarmth: '#FED7AA',
  },
  morning: {
    id: 'morning',
    timeRange: '06:30 — 09:00',
    name: 'Циркадный рассвет и пробуждение',
    badge: 'Световой будильник',
    tempK: '4000 K',
    lux: '320 Lux',
    colorHex: '#FBBF24',
    lightingState: 'Световой будильник: яркость растет от 0% до 80% за 20 минут',
    curtainsState: 'Карнизы бесшумно приоткрываются на 50%, впуская утро',
    climateState: 'Подогрев плитки в ванной до 26°C к моменту звонка будильника',
    sensorsActive: ['Световой таймер биоритмов', 'Датчик движения ванной', 'Датчик температуры пола'],
    description: 'Физиологичное пробуждение без резких звуков: свет медленно нагревается, шторы впускают естественное утро, а пол в санузле уже нагрелся к вашему приходу.',
    windowBg: 'radial-gradient(ellipse at bottom, #fde047 0%, #fb923c 45%, #38bdf8 100%)',
    roomOverlay: 'rgba(251, 191, 36, 0.14)',
    ambientGlow: '0 0 90px rgba(251, 191, 36, 0.4)',
    bulbOpacity: 0.7,
    lightWarmth: '#FEF08A',
  },
};

const PHASE_ORDER: TimeOfDay[] = ['day', 'evening', 'night', 'morning'];

export const DynamicDayCycle: React.FC = () => {
  const [activePhase, setActivePhase] = useState<TimeOfDay>('day');
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);

  // Auto-cycle simulation when user is not manually interacting
  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setActivePhase((prev) => {
        const nextIndex = (PHASE_ORDER.indexOf(prev) + 1) % PHASE_ORDER.length;
        return PHASE_ORDER[nextIndex];
      });
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const current = PHASES[activePhase];

  return (
    <section className="relative py-20 bg-gradient-to-b from-slate-950 via-[#0B1120] to-slate-950 border-y border-slate-800/80 overflow-hidden">
      {/* Background radial glow synced with active phase */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-1000 ease-in-out opacity-40 blur-3xl"
        style={{ background: current.ambientGlow }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            Умная динамика света и биоритмов
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Свет, который живёт <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-cyan-400 bg-clip-text text-transparent">
              в ритме ваших суток
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Освещение меняется автоматически: стимулирует энергию днём, расслабляет вечером
            и деликатно подсвечивает путь ночью, не нарушая выработку мелатонина.
          </p>
        </div>

        {/* Phase Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-10">
          {PHASE_ORDER.map((phaseKey) => {
            const p = PHASES[phaseKey];
            const isActive = activePhase === phaseKey;
            return (
              <button
                key={phaseKey}
                onClick={() => {
                  setActivePhase(phaseKey);
                  setIsAutoPlay(false);
                }}
                className={`relative px-4 sm:px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center gap-2.5 border ${
                  isActive
                    ? 'bg-slate-800 text-white border-amber-500/60 shadow-lg shadow-amber-500/20'
                    : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: p.colorHex }}
                />
                <span className="capitalize">{p.name.split(' ')[0]}</span>
                <span className="hidden md:inline text-xs text-slate-400">({p.timeRange.split(' ')[0]})</span>
              </button>
            );
          })}
          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            title={isAutoPlay ? 'Приостановить автопереключение' : 'Включить автопереключение'}
            className="px-3 py-3 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-white transition-colors text-xs"
          >
            {isAutoPlay ? '⏸ Пауза' : '▶ Авто'}
          </button>
        </div>

        {/* Interactive Visual Experience Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Visual Room Simulation (7 columns) */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl border border-slate-800 bg-slate-950 p-4 sm:p-6 shadow-2xl overflow-hidden min-h-[420px] flex flex-col justify-between">
              {/* Outside Sky / Window view */}
              <div
                className="absolute inset-0 transition-all duration-1000 ease-in-out"
                style={{ background: current.windowBg, opacity: 0.85 }}
              />

              {/* Room Lighting Overlay */}
              <div
                className="absolute inset-0 transition-all duration-1000 ease-in-out pointer-events-none"
                style={{ backgroundColor: current.roomOverlay }}
              />

              {/* Status Header on Visual */}
              <div className="relative z-10 flex items-center justify-between backdrop-blur-md bg-slate-950/60 border border-slate-700/50 rounded-xl px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full animate-pulse"
                    style={{ backgroundColor: current.colorHex }}
                  />
                  <span className="text-white font-bold text-sm tracking-wide">{current.name}</span>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <span className="text-amber-400 font-bold">{current.tempK}</span>
                  </span>
                  <span className="hidden sm:inline border-l border-slate-700 pl-4 text-cyan-300">
                    {current.lux}
                  </span>
                </div>
              </div>

              {/* Stylized Room Interior Graphic */}
              <div className="relative z-10 my-8 py-4 flex flex-col items-center justify-center">
                {/* Ceiling Pendant / Track Light with Ray Effect */}
                <div className="relative flex flex-col items-center">
                  {/* Track fixture */}
                  <div className="w-48 sm:w-72 h-2.5 bg-slate-800 rounded-full border border-slate-700 shadow-md flex justify-around items-center px-4">
                    <div className="w-3 h-3 rounded-full bg-slate-600" />
                    <div className="w-3 h-3 rounded-full bg-slate-600" />
                    <div className="w-3 h-3 rounded-full bg-slate-600" />
                  </div>

                  {/* Pendant Lamp */}
                  <div className="w-0.5 h-12 bg-slate-700" />
                  <div
                    className="w-16 h-8 rounded-b-2xl border border-slate-600 shadow-lg relative flex items-center justify-center transition-all duration-700"
                    style={{
                      backgroundColor: current.lightWarmth,
                      boxShadow: `0 10px 40px ${current.colorHex}`,
                      opacity: current.bulbOpacity + 0.2,
                    }}
                  >
                    <span className="text-[10px] font-black text-slate-900 tracking-tighter">LED</span>
                  </div>

                  {/* Light Cone / Beam */}
                  <div
                    className="w-64 sm:w-96 h-40 transition-all duration-1000 pointer-events-none"
                    style={{
                      background: `linear-gradient(to bottom, ${current.colorHex}55 0%, transparent 100%)`,
                      clipPath: 'polygon(35% 0%, 65% 0%, 100% 100%, 0% 100%)',
                      opacity: current.bulbOpacity,
                    }}
                  />
                </div>

                {/* Living Room Silhouettes */}
                <div className="w-full max-w-md flex items-end justify-between px-6 border-b-2 border-slate-800 pb-2">
                  {/* Smart Curtain */}
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] text-slate-400 mb-1">Шторы</span>
                    <div
                      className="w-10 sm:w-14 h-24 rounded-t-sm transition-all duration-700 border border-slate-700"
                      style={{
                        backgroundColor: activePhase === 'night' ? '#0f172a' : '#334155',
                        opacity: activePhase === 'night' ? 0.95 : 0.4,
                      }}
                    />
                  </div>

                  {/* Smart Sofa / Relaxation */}
                  <div className="flex flex-col items-center">
                    <div className="w-28 sm:w-44 h-12 bg-slate-800/80 rounded-t-xl border border-slate-700 flex items-center justify-center">
                      <span className="text-[10px] text-slate-400">Зона присутствия</span>
                    </div>
                  </div>

                  {/* mmWave Sensor Pillar */}
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full bg-cyan-400/90 shadow-lg shadow-cyan-400/50 animate-pulse" />
                    <div className="w-1 h-14 bg-slate-700" />
                    <span className="text-[9px] text-cyan-300 mt-1">mmWave 60G</span>
                  </div>
                </div>
              </div>

              {/* Bottom Realtime State Pill */}
              <div className="relative z-10 backdrop-blur-md bg-slate-950/70 border border-slate-800 rounded-xl p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
                <span className="text-slate-400">Активные датчики:</span>
                <div className="flex flex-wrap gap-1.5">
                  {current.sensorsActive.map((sensor, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-slate-800/80 text-cyan-300 border border-cyan-500/20 text-[11px]"
                    >
                      ✓ {sensor}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Phase Telemetry and Details (5 columns) */}
          <div className="lg:col-span-5 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="space-y-6"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-semibold">
                      {current.badge}
                    </span>
                    <span className="text-slate-400 text-xs font-mono">{current.timeRange}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">{current.name}</h3>
                  <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
                    {current.description}
                  </p>
                </div>

                {/* Subsystems Status Card */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
                      💡
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-200">Освещение</div>
                      <div className="text-xs text-slate-400 mt-0.5">{current.lightingState}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 border-t border-slate-800/80 pt-3">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0">
                      🪟
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-200">Карнизы и шторы</div>
                      <div className="text-xs text-slate-400 mt-0.5">{current.curtainsState}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 border-t border-slate-800/80 pt-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
                      🌡
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-200">Микроклимат</div>
                      <div className="text-xs text-slate-400 mt-0.5">{current.climateState}</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    Zigbee 3.0 / Thread
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    Локальный контроллер 0 мс задержки
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
