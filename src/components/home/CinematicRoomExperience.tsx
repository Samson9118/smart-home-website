'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  Sun,
  Moon,
  Sunset,
  Sunrise,
  ShieldCheck,
  Zap,
  Thermometer,
  Sparkles,
} from 'lucide-react';

export const CinematicRoomExperience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState<number>(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    restDelta: 0.001,
  });

  // Interpolated visual values across the 4 stages:
  // 0.0 -> 06:00 (Пробуждение)
  // 0.33 -> 09:00 (День / Свет выключен)
  // 0.66 -> 18:00 (Вечерний уют)
  // 1.0 -> 22:00 (Ночной режим)

  // Window outdoor view gradients
  const skyBackground = useTransform(
    smoothProgress,
    [0, 0.25, 0.33, 0.58, 0.66, 0.85, 1],
    [
      'linear-gradient(to bottom, #1e1b4b 0%, #7c2d12 40%, #fdba74 85%, #fef08a 100%)', // 06:00 Рассвет
      'linear-gradient(to bottom, #1e1b4b 0%, #7c2d12 40%, #fdba74 85%, #fef08a 100%)',
      'linear-gradient(to bottom, #0284c7 0%, #38bdf8 50%, #bae6fd 100%)', // 09:00 Яркий день
      'linear-gradient(to bottom, #0284c7 0%, #38bdf8 50%, #bae6fd 100%)',
      'linear-gradient(to bottom, #1e1b4b 0%, #831843 35%, #ea580c 75%, #fde047 100%)', // 18:00 Закат
      'linear-gradient(to bottom, #1e1b4b 0%, #831843 35%, #ea580c 75%, #fde047 100%)',
      'linear-gradient(to bottom, #020617 0%, #090d16 50%, #0f172a 100%)', // 22:00 Ночь
    ]
  );

  // Interior overall ambient overlay
  const roomLightOverlay = useTransform(
    smoothProgress,
    [0, 0.33, 0.66, 1],
    [
      'rgba(251, 191, 36, 0.12)', // 06:00 мягкое золотистое тепло
      'rgba(255, 255, 255, 0.02)', // 09:00 натуральный свет без искусственных ламп
      'rgba(245, 158, 11, 0.22)', // 18:00 глубокий янтарный вечер
      'rgba(15, 23, 42, 0.65)', // 22:00 ночной полумрак
    ]
  );

  // Ceiling track lights opacity & glow
  const trackLightOpacity = useTransform(
    smoothProgress,
    [0, 0.25, 0.33, 0.58, 0.66, 0.85, 1],
    [0.35, 0.2, 0.0, 0.0, 0.75, 0.75, 0.0] // В 09:00 и 22:00 основной свет выключен (0.0)
  );

  const trackLightColor = useTransform(
    smoothProgress,
    [0, 0.33, 0.66, 1],
    ['#FDE68A', '#FFFFFF', '#FBBF24', '#38BDF8']
  );

  // Hidden baseboard / nightlight floor strip
  const floorLightOpacity = useTransform(
    smoothProgress,
    [0, 0.33, 0.66, 0.85, 1],
    [0.2, 0.0, 0.6, 0.6, 0.35] // Ночью деликатный ночник
  );

  // Curtains position (width in percent: 0% open, 100% closed)
  const curtainWidthPercent = useTransform(
    smoothProgress,
    [0, 0.33, 0.66, 1],
    ['35%', '10%', '65%', '98%'] // 06:00 приоткрыты, 09:00 открыты, 18:00 прикрыты, 22:00 Blackout закрыты
  );

  // Sun / Moon vertical position in window
  const celestialY = useTransform(smoothProgress, [0, 0.33, 0.66, 1], ['50%', '15%', '55%', '25%']);
  const celestialScale = useTransform(smoothProgress, [0, 0.33, 0.66, 1], [1.2, 1.4, 1.3, 0.9]);
  const celestialColor = useTransform(
    smoothProgress,
    [0, 0.33, 0.66, 1],
    ['#FDE047', '#FEF08A', '#EA580C', '#E2E8F0']
  );

  // Scenario telemetry stages
  const STAGES = [
    {
      time: '06:00',
      period: 'УТРО',
      name: 'Сценарий «Мягкое пробуждение»',
      icon: Sunrise,
      badge: 'Циркадный свет • Рассвет',
      color: '#FBBF24',
      lightStatus: 'Плавное нарастание 30% (3000 K)',
      curtainsStatus: 'Приоткрыты на 65% (впускают рассвет)',
      climateStatus: 'Ванная 25°C, комната 21.5°C',
      activeSensors: ['Световой будильник', 'mmWave спальня', 'Теплый пол ванной'],
      description:
        'Биодинамическое пробуждение без стресса: свет медленно теплеет, шторы впускают утренний горизонт, а пол в санузле уже прогрет к вашему подъёму.',
      progressAnchor: 0.0,
    },
    {
      time: '09:00',
      period: 'ДЕНЬ',
      name: 'Сценарий «Уход из дома / Эко»',
      icon: Sun,
      badge: 'Свет выключен (0%) • Энергосбережение',
      color: '#38BDF8',
      lightStatus: '0% — Искусственный свет ПОЛНОСТЬЮ ВЫКЛЮЧЕН',
      curtainsStatus: 'Распахнуты на 100% (естественный свет)',
      climateStatus: 'Режим «Эко» 19°C (экономия до 35%)',
      activeSensors: ['Охранные герконы окон', 'Датчики протечки', 'Люксметр фасада'],
      description:
        'Вы ушли на работу. Умный дом сам выключил забытый свет во всех комнатах, перевёл отопление в эко-режим и активировал охрану периметра.',
      progressAnchor: 0.33,
    },
    {
      time: '18:00',
      period: 'ВЕЧЕР',
      name: 'Сценарий «Вечерний релакс и уют»',
      icon: Sunset,
      badge: 'Теплый закат • 2700 K',
      color: '#F59E0B',
      lightStatus: 'Теплый свет 2700K: треки 40%, парящий плинтус 70%',
      curtainsStatus: 'Закрываются с заходом солнца (70%)',
      climateStatus: 'Комфорт 22°C, чистый воздух (CO2 < 600 ppm)',
      activeSensors: ['Радар присутствия ТВ', 'Датчик открытия двери', 'Астро-таймер заката'],
      description:
        'Возвращение в уютную гавань: мягкая скрытая янтарная подсветка снимает усталость глаз, шторы закрываются от уличных взглядов, включается любимый плейлист.',
      progressAnchor: 0.66,
    },
    {
      time: '22:00',
      period: 'НОЧЬ',
      name: 'Сценарий «Глубокий сон и охрана»',
      icon: Moon,
      badge: 'Ночной режим • Полная тишина',
      color: '#818CF8',
      lightStatus: 'Основной свет 0%. При шагах — деликатный пол 8%',
      curtainsStatus: '100% Blackout (полная темнота)',
      climateStatus: 'Ночная прохлада 19.5°C для выработки мелатонина',
      activeSensors: ['Охрана периметра', 'Датчик шагов кровати', 'Антипротечка стояков'],
      description:
        'Дом засыпает. Все приборы переведены в беззвучный режим. Если вы встанете ночью за водой — мягкая линия вдоль плинтуса подсветит дорогу без ослепления.',
      progressAnchor: 1.0,
    },
  ];

  // Track active stage index for UI details
  useEffect(() => {
    return smoothProgress.on('change', (latest) => {
      if (latest < 0.2) setCurrentScenarioIndex(0);
      else if (latest < 0.5) setCurrentScenarioIndex(1);
      else if (latest < 0.8) setCurrentScenarioIndex(2);
      else setCurrentScenarioIndex(3);
    });
  }, [smoothProgress]);

  const activeStage = STAGES[currentScenarioIndex];
  const StageIcon = activeStage.icon;

  // Jump to specific time with smooth scroll
  const scrollToStage = (anchor: number) => {
    if (!containerRef.current) return;
    const top = containerRef.current.offsetTop;
    const height = containerRef.current.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: top + height * anchor,
      behavior: 'smooth',
    });
  };

  return (
    <div
      ref={containerRef}
      className="relative bg-slate-950 text-white min-h-[380vh] border-y border-slate-800"
    >
      {/* Sticky Fullscreen Staging Canvas */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        {/* Top Control Bar & Live Timeline HUD */}
        <header className="relative z-30 pt-4 px-4 sm:px-8 max-w-7xl mx-auto w-full">
          <div className="backdrop-blur-xl bg-slate-950/80 border border-slate-800/90 rounded-2xl p-3 sm:p-4 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Left: Section Pill */}
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg shadow-md transition-colors duration-500"
                style={{ backgroundColor: `${activeStage.color}25`, color: activeStage.color }}
              >
                <StageIcon className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold tracking-wider uppercase text-cyan-400">
                    Scroll-Driven Smart Home
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="text-xs font-semibold text-slate-300">
                    Крутите страницу вниз ↓
                  </span>
                </div>
                <div className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                  <span style={{ color: activeStage.color }} className="font-mono text-xl">
                    {activeStage.time}
                  </span>
                  <span className="hidden sm:inline text-slate-500">|</span>
                  <span className="text-sm sm:text-base font-bold truncate max-w-xs sm:max-w-md">
                    {activeStage.name.replace('Сценарий ', '')}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Quick Jump Buttons (06:00, 09:00, 18:00, 22:00) */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {STAGES.map((st, idx) => {
                const isActive = currentScenarioIndex === idx;
                return (
                  <button
                    key={st.time}
                    onClick={() => scrollToStage(st.progressAnchor)}
                    className={`px-2.5 sm:px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all border ${
                      isActive
                        ? 'bg-slate-800 text-white shadow-lg border-amber-400'
                        : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                    }`}
                    style={isActive ? { borderColor: st.color, color: st.color } : {}}
                  >
                    <span>{st.time}</span>
                    <span className="hidden md:inline ml-1 text-[10px] opacity-75">{st.period}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </header>

        {/* ============================================================== */}
        {/* CENTER: PHOTOREALISTIC DYNAMIC 3D/VECTOR ROOM SCENE             */}
        {/* ============================================================== */}
        <div className="relative flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 py-2 flex items-center justify-center overflow-hidden">
          {/* Main Room Viewport */}
          <div className="relative w-full h-[58vh] sm:h-[66vh] rounded-3xl border-2 border-slate-800/90 overflow-hidden shadow-2xl bg-slate-950 flex flex-col justify-end">
            {/* 1. OUTSIDE SKY & PANORAMA (behind the panoramic glass window) */}
            <motion.div
              className="absolute inset-0 transition-all duration-300"
              style={{ background: skyBackground }}
            >
              {/* Sun or Moon Celestial Body */}
              <motion.div
                className="absolute right-1/4 w-20 h-20 sm:w-28 sm:h-28 rounded-full shadow-2xl transition-all duration-500 flex items-center justify-center"
                style={{
                  top: celestialY,
                  scale: celestialScale,
                  backgroundColor: celestialColor,
                  boxShadow: `0 0 80px ${activeStage.color}`,
                }}
              >
                {/* Sun rays or Moon craters */}
                <div className="w-full h-full rounded-full opacity-40 mix-blend-overlay" />
              </motion.div>

              {/* Distant City Skyline Silhouettes */}
              <div
                className="absolute bottom-0 inset-x-0 h-32 sm:h-44 opacity-80"
                style={{
                  backgroundImage: `radial-gradient(ellipse at bottom, rgba(15,23,42,0.95) 0%, rgba(2,6,23,0.98) 100%)`,
                  clipPath:
                    'polygon(0% 100%, 0% 70%, 5% 70%, 5% 55%, 10% 55%, 10% 75%, 16% 75%, 16% 40%, 22% 40%, 22% 80%, 28% 80%, 28% 60%, 35% 60%, 35% 30%, 42% 30%, 42% 70%, 50% 70%, 50% 50%, 58% 50%, 58% 85%, 65% 85%, 65% 35%, 72% 35%, 72% 65%, 80% 65%, 80% 45%, 88% 45%, 88% 75%, 94% 75%, 94% 55%, 100% 55%, 100% 100%)',
                }}
              />
            </motion.div>

            {/* 2. SMART CURTAINS (Automated electric tracks on left and right) */}
            <div className="absolute inset-0 pointer-events-none z-10 flex justify-between">
              {/* Left Smart Curtain */}
              <motion.div
                className="h-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-r border-slate-700 shadow-2xl transition-all"
                style={{ width: curtainWidthPercent }}
              >
                {/* Fabric folds */}
                <div className="w-full h-full opacity-30 bg-[repeating-linear-gradient(90deg,#000_0px,#000_15px,transparent_15px,transparent_30px)]" />
              </motion.div>

              {/* Right Smart Curtain */}
              <motion.div
                className="h-full bg-gradient-to-l from-slate-900 via-slate-800 to-slate-900 border-l border-slate-700 shadow-2xl transition-all"
                style={{ width: curtainWidthPercent }}
              >
                <div className="w-full h-full opacity-30 bg-[repeating-linear-gradient(90deg,#000_0px,#000_15px,transparent_15px,transparent_30px)]" />
              </motion.div>
            </div>

            {/* 3. INTERIOR ARCHITECTURE (Walls, Ceiling, Floor) */}
            <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between">
              {/* Top Ceiling with Magnetic Track Light Rail */}
              <div className="relative w-full h-16 bg-gradient-to-b from-slate-950 via-slate-900 to-transparent flex flex-col items-center pt-3 px-10">
                {/* Track fixture rail */}
                <div className="w-3/4 max-w-2xl h-2.5 rounded-full bg-slate-950 border border-slate-700 flex justify-around items-center px-6 shadow-xl">
                  {/* Spotlights */}
                  <div className="w-3 h-3 rounded-full bg-slate-700" />
                  <div className="w-3 h-3 rounded-full bg-slate-700" />
                  <div className="w-3 h-3 rounded-full bg-slate-700" />
                  <div className="w-3 h-3 rounded-full bg-slate-700" />
                </div>

                {/* Overhead Spotlight Light Cones (Active in 06:00 and 18:00) */}
                <motion.div
                  className="w-3/4 max-w-2xl h-48 sm:h-64 flex justify-around transition-all duration-500"
                  style={{ opacity: trackLightOpacity }}
                >
                  <motion.div
                    className="w-28 sm:w-36 h-full"
                    style={{
                      background: `linear-gradient(to bottom, ${trackLightColor}88 0%, transparent 100%)`,
                      clipPath: 'polygon(40% 0%, 60% 0%, 100% 100%, 0% 100%)',
                    }}
                  />
                  <motion.div
                    className="w-28 sm:w-36 h-full"
                    style={{
                      background: `linear-gradient(to bottom, ${trackLightColor}88 0%, transparent 100%)`,
                      clipPath: 'polygon(40% 0%, 60% 0%, 100% 100%, 0% 100%)',
                    }}
                  />
                </motion.div>
              </div>

              {/* Dynamic Baseboard Floor Nightlight Strip */}
              <motion.div
                className="w-full h-2.5 transition-all duration-300"
                style={{
                  backgroundColor: activeStage.color,
                  opacity: floorLightOpacity,
                  boxShadow: `0 0 30px ${activeStage.color}, 0 0 60px ${activeStage.color}`,
                }}
              />
            </div>

            {/* 4. MODERN FURNITURE & LIVING ROOM SILHOUETTE */}
            <div className="relative z-20 w-full flex items-end justify-between px-6 sm:px-16 pb-4">
              {/* Left: Designer Lounge Chair / Table */}
              <div className="hidden sm:flex flex-col items-center">
                <div className="w-24 h-14 rounded-t-2xl bg-slate-800/90 border border-slate-700 shadow-xl" />
                <div className="w-12 h-6 bg-slate-900 border-x border-slate-700" />
              </div>

              {/* Center: Premium Low-Profile Sofa & Coffee Table */}
              <div className="flex flex-col items-center">
                {/* Floating mmWave presence sensor badge */}
                <div className="mb-3 px-3 py-1 rounded-full bg-slate-950/90 border border-cyan-500/50 text-cyan-400 text-xs font-mono flex items-center gap-2 shadow-lg backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  <span>mmWave 60GHz: {currentScenarioIndex === 1 ? 'НЕТ ЛЮДЕЙ' : 'ПРИСУТСТВИЕ'}</span>
                </div>

                {/* Minimalist modern sofa */}
                <div className="w-64 sm:w-96 h-20 sm:h-24 rounded-t-3xl bg-slate-900/95 border-t-2 border-x-2 border-slate-700/80 shadow-2xl flex items-center justify-center p-3">
                  <div className="w-full h-full rounded-2xl bg-slate-800/60 border border-slate-700/50 flex items-center justify-around px-4">
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                      Зона отдыха
                    </span>
                    <span className="text-xs text-amber-400 font-bold">
                      {activeStage.climateStatus.split(',')[0]}
                    </span>
                  </div>
                </div>

                {/* Dark wood low table */}
                <div className="w-44 sm:w-64 h-3 bg-slate-950 rounded-full border border-slate-800 shadow" />
              </div>

              {/* Right: Smart Hub Pillar & Floor Lamp */}
              <div className="flex flex-col items-center">
                <motion.div
                  className="w-10 h-10 rounded-2xl border flex items-center justify-center shadow-lg transition-all"
                  style={{
                    backgroundColor: '#0f172a',
                    borderColor: activeStage.color,
                    boxShadow: `0 0 20px ${activeStage.color}66`,
                  }}
                >
                  <Sparkles className="h-5 w-5" style={{ color: activeStage.color }} />
                </motion.div>
                <div className="w-1 h-20 bg-slate-800 mt-1" />
                <div className="w-10 h-2 bg-slate-950 rounded-full border border-slate-700" />
              </div>
            </div>

            {/* 5. OVERALL ROOM ATMOSPHERE TINT OVERLAY */}
            <motion.div
              className="absolute inset-0 pointer-events-none transition-all duration-300 z-15"
              style={{ backgroundColor: roomLightOverlay }}
            />
          </div>
        </div>

        {/* ============================================================== */}
        {/* BOTTOM HUD: LIVE SCENARIO TELEMETRY & HARDWARE STATE            */}
        {/* ============================================================== */}
        <footer className="relative z-30 pb-5 px-4 sm:px-8 max-w-7xl mx-auto w-full">
          <div className="backdrop-blur-xl bg-slate-950/85 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-2xl grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Status Narrative (6 cols) */}
            <div className="md:col-span-6 space-y-1.5">
              <div className="flex items-center gap-2">
                <span
                  className="text-xs font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border"
                  style={{
                    backgroundColor: `${activeStage.color}15`,
                    color: activeStage.color,
                    borderColor: `${activeStage.color}40`,
                  }}
                >
                  {activeStage.badge}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Задержка: &lt;20 мс
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-white">
                {activeStage.name}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeStage.description}
              </p>
            </div>

            {/* Real Hardware Action Breakdown (6 cols) */}
            <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="text-slate-400 font-bold flex items-center gap-1.5">
                  <Zap className="h-3.5 w-3.5 text-amber-400" />
                  <span>Освещение:</span>
                </div>
                <div className="text-white font-mono font-medium truncate">
                  {activeStage.lightStatus}
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="text-slate-400 font-bold flex items-center gap-1.5">
                  <Thermometer className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Климат:</span>
                </div>
                <div className="text-white font-mono font-medium truncate">
                  {activeStage.climateStatus}
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="text-slate-400 font-bold flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Шторы & Карнизы:</span>
                </div>
                <div className="text-white font-mono font-medium truncate">
                  {activeStage.curtainsStatus}
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="text-slate-400 font-bold">Активные датчики:</div>
                <div className="text-cyan-300 font-mono truncate">
                  {activeStage.activeSensors.join(' • ')}
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
