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
  Blinds,
  Radio,
} from 'lucide-react';

interface ScenarioStage {
  time: string;
  period: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  badge: string;
  color: string;
  imageSrc: string;
  fallbackGradient: string;
  hotspots: {
    curtains: string;
    lighting: string;
    sensor: string;
    climate: string;
  };
  description: string;
  progressAnchor: number;
}

const STAGES: ScenarioStage[] = [
  {
    time: '06:00',
    period: 'Утро',
    name: 'Сценарий «Мягкое пробуждение»',
    icon: Sunrise,
    badge: 'Циркадный свет • Рассвет',
    color: '#FBBF24',
    imageSrc: '/images/scenarios/morning.jpg',
    fallbackGradient: 'linear-gradient(135deg, #1e1b4b 0%, #7c2d12 40%, #fdba74 85%, #fef08a 100%)',
    hotspots: {
      curtains: 'Шторы Aqara: Приоткрыты 65%',
      lighting: 'Магнитные треки: 3000 K • 30%',
      sensor: 'mmWave 60GHz: Присутствие (Спальня)',
      climate: 'Климат: 21.5°C • Пол ванной: 25°C',
    },
    description:
      'Биодинамическое пробуждение: свет плавно нагревается, электрокарнизы впускают рассветный горизонт, а пол в санузле уже прогрет к подъёму.',
    progressAnchor: 0.0,
  },
  {
    time: '09:00',
    period: 'Я ушёл',
    name: 'Сценарий «Уход из дома / Эко»',
    icon: Sun,
    badge: 'Свет выключен (0%) • Энергосбережение',
    color: '#38BDF8',
    imageSrc: '/images/scenarios/away.jpg',
    fallbackGradient: 'linear-gradient(135deg, #0284c7 0%, #38bdf8 50%, #bae6fd 100%)',
    hotspots: {
      curtains: 'Шторы Aqara: Открыты 100% (Инсоляция)',
      lighting: 'Свет: ВЫКЛЮЧЕН (0% • Эко)',
      sensor: 'Охрана: Нет людей (Дом пуст)',
      climate: 'Климат: Эко 19°C (Экономия 35%)',
    },
    description:
      'Вы ушли по делам. Умный дом отключил забытый свет во всех комнатах, перевёл климат в режим экономии и активировал охранный контур.',
    progressAnchor: 0.33,
  },
  {
    time: '20:00',
    period: 'Кино',
    name: 'Сценарий «Вечерний релакс и уют»',
    icon: Sunset,
    badge: 'Теплый закат • 2700 K',
    color: '#F59E0B',
    imageSrc: '/images/scenarios/cinema.jpg',
    fallbackGradient: 'linear-gradient(135deg, #1e1b4b 0%, #831843 35%, #ea580c 75%, #fde047 100%)',
    hotspots: {
      curtains: 'Шторы Aqara: Закрыты 70% (Уют)',
      lighting: 'Релакс-свет: 2700 K • 40%',
      sensor: 'mmWave 60GHz: Присутствие (Зона ТВ)',
      climate: 'Климат: 22°C • CO2 580 ppm',
    },
    description:
      'Мягкая скрытая янтарная подсветка снимает усталость глаз, шторы защищают от взглядов с улицы, а комната подготовлена к вечернему просмотру.',
    progressAnchor: 0.66,
  },
  {
    time: '23:30',
    period: 'Ночь',
    name: 'Сценарий «Глубокий сон и охрана»',
    icon: Moon,
    badge: 'Ночной режим • Полная тишина',
    color: '#818CF8',
    imageSrc: '/images/scenarios/night.jpg',
    fallbackGradient: 'linear-gradient(135deg, #020617 0%, #090d16 50%, #0f172a 100%)',
    hotspots: {
      curtains: 'Шторы Aqara: 100% Blackout (Темнота)',
      lighting: 'Ночник пола: 2000 K • 8%',
      sensor: 'Охрана периметра: АКТИВНА',
      climate: 'Климат: Ночь 19.5°C (Сон)',
    },
    description:
      'Шторы блэкаут создают абсолютную темноту. Если встать ночью — деликатная линия вдоль плинтуса мягко осветит путь без ослепления.',
    progressAnchor: 1.0,
  },
];

export const CinematicRoomExperience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState<number>(0);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 75,
    damping: 22,
    restDelta: 0.001,
  });

  // Layered crossfades across stages
  const opacityMorning = useTransform(smoothProgress, [0, 0.22, 0.32], [1, 1, 0]);
  const opacityAway = useTransform(smoothProgress, [0.22, 0.32, 0.54, 0.65], [0, 1, 1, 0]);
  const opacityCinema = useTransform(smoothProgress, [0.55, 0.66, 0.85, 0.95], [0, 1, 1, 0]);
  const opacityNight = useTransform(smoothProgress, [0.86, 0.96, 1], [0, 1, 1]);

  // Subtle zoom/parallax effect (1.0 -> 1.04)
  const roomScale = useTransform(smoothProgress, [0, 1], [1, 1.04]);

  // Update active stage for HUD narrative
  useEffect(() => {
    return smoothProgress.on('change', (latest) => {
      if (latest < 0.2) setCurrentScenarioIndex(0);
      else if (latest < 0.52) setCurrentScenarioIndex(1);
      else if (latest < 0.82) setCurrentScenarioIndex(2);
      else setCurrentScenarioIndex(3);
    });
  }, [smoothProgress]);

  const activeStage = STAGES[currentScenarioIndex];
  const StageIcon = activeStage.icon;

  const scrollToStage = (anchor: number) => {
    if (!containerRef.current) return;
    const top = containerRef.current.offsetTop;
    const height = containerRef.current.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: top + height * anchor,
      behavior: 'smooth',
    });
  };

  const handleImageError = (src: string) => {
    setImageErrors((prev) => ({ ...prev, [src]: true }));
  };

  const layerOpacities = [opacityMorning, opacityAway, opacityCinema, opacityNight];

  return (
    <div
      ref={containerRef}
      className="relative bg-[#090D16] text-white min-h-[380vh] border-y border-slate-800"
    >
      {/* Sticky Fullscreen Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        {/* TOP BAR / NAVIGATION HUD */}
        <header className="relative z-30 pt-4 px-4 sm:px-8 max-w-7xl mx-auto w-full">
          <div className="backdrop-blur-xl bg-slate-950/85 border border-slate-850 rounded-2xl p-3 sm:p-4 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Left: Branding & Status */}
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg shadow-md transition-colors duration-500 shrink-0"
                style={{ backgroundColor: `${activeStage.color}20`, color: activeStage.color }}
              >
                <StageIcon className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold tracking-wider uppercase text-cyan-400">
                    Один день в умном доме
                  </span>
                  <span className="text-slate-600 hidden sm:inline">•</span>
                  <span className="text-xs font-semibold text-slate-400 hidden sm:inline">
                    Крутите страницу вниз ↓
                  </span>
                </div>
                <div className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                  <span style={{ color: activeStage.color }} className="font-mono text-xl">
                    {activeStage.time}
                  </span>
                  <span className="text-slate-500">|</span>
                  <span className="text-sm sm:text-base font-bold truncate max-w-xs sm:max-w-md">
                    {activeStage.name.replace('Сценарий ', '')}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Clickable Timeline Buttons */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {STAGES.map((st, idx) => {
                const isActive = currentScenarioIndex === idx;
                return (
                  <button
                    key={st.time}
                    onClick={() => scrollToStage(st.progressAnchor)}
                    className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all border ${
                      isActive
                        ? 'bg-slate-800 text-white shadow-lg'
                        : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                    }`}
                    style={isActive ? { borderColor: st.color, color: st.color } : {}}
                  >
                    <span>{st.time}</span>
                    <span className="hidden md:inline ml-1.5 text-[10px] opacity-80">{st.period}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </header>

        {/* ============================================================== */}
        {/* CENTER: PHOTOREALISTIC STACK OF SCENARIO INTERIORS              */}
        {/* ============================================================== */}
        <div className="relative flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 py-2 flex items-center justify-center overflow-hidden">
          <div className="relative w-full h-[58vh] sm:h-[66vh] rounded-3xl border border-slate-800 overflow-hidden shadow-2xl bg-[#090D16]">
            {/* Photo stack with smooth opacity crossfade and parallax zoom */}
            <motion.div className="absolute inset-0 w-full h-full" style={{ scale: roomScale }}>
              {STAGES.map((stage, sIdx) => {
                const hasError = imageErrors[stage.imageSrc];
                return (
                  <motion.div
                    key={stage.time}
                    className="absolute inset-0 w-full h-full"
                    style={{ opacity: layerOpacities[sIdx] }}
                  >
                    {/* Fallback gradient if image fails or before it loads */}
                    <div
                      className="absolute inset-0 w-full h-full transition-opacity"
                      style={{ background: stage.fallbackGradient }}
                    />

                    {/* Realistic Photo Layer */}
                    {!hasError && (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={stage.imageSrc}
                        alt={stage.name}
                        onError={() => handleImageError(stage.imageSrc)}
                        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
                      />
                    )}
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Seamless Vignette & Dark Tint to blend with #090D16 */}
            <div className="pointer-events-none absolute inset-0 z-10 shadow-[inset_0_0_100px_rgba(9,13,22,0.85)] ring-1 ring-inset ring-white/10 bg-gradient-to-t from-[#090D16]/90 via-transparent to-[#090D16]/60" />

            {/* ============================================================== */}
            {/* ANIMATED HUD HOTSPOTS WITH REAL PERCENTAGE COORDINATES         */}
            {/* ============================================================== */}
            <div className="absolute inset-0 z-20 pointer-events-none p-4 sm:p-6">
              {/* Hotspot 1: Window / Curtains (top: 28%, left: 20%) */}
              <div
                className="absolute flex items-center gap-2 transition-all duration-500"
                style={{ top: '28%', left: '18%' }}
              >
                <div className="relative flex items-center justify-center">
                  <span
                    className="absolute w-6 h-6 rounded-full animate-ping opacity-75"
                    style={{ backgroundColor: activeStage.color }}
                  />
                  <div
                    className="relative w-3.5 h-3.5 rounded-full border-2 border-white shadow-lg"
                    style={{ backgroundColor: activeStage.color }}
                  />
                </div>
                <div className="hidden md:flex items-center gap-1.5 backdrop-blur-md bg-slate-950/85 border border-slate-700/80 px-2.5 py-1 rounded-lg text-xs font-medium text-white shadow-xl">
                  <Blinds className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                  <span className="font-mono text-[11px]">{activeStage.hotspots.curtains}</span>
                </div>
              </div>

              {/* Hotspot 2: Ceiling / Lighting (top: 14%, left: 52%) */}
              <div
                className="absolute flex items-center gap-2 transition-all duration-500"
                style={{ top: '14%', left: '50%' }}
              >
                <div className="relative flex items-center justify-center">
                  <span
                    className="absolute w-6 h-6 rounded-full animate-ping opacity-75"
                    style={{ backgroundColor: activeStage.color }}
                  />
                  <div
                    className="relative w-3.5 h-3.5 rounded-full border-2 border-white shadow-lg"
                    style={{ backgroundColor: activeStage.color }}
                  />
                </div>
                <div className="hidden md:flex items-center gap-1.5 backdrop-blur-md bg-slate-950/85 border border-slate-700/80 px-2.5 py-1 rounded-lg text-xs font-medium text-white shadow-xl">
                  <Zap className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                  <span className="font-mono text-[11px]">{activeStage.hotspots.lighting}</span>
                </div>
              </div>

              {/* Hotspot 3: Wall mmWave Presence Sensor (top: 40%, left: 82%) */}
              <div
                className="absolute flex items-center gap-2 transition-all duration-500"
                style={{ top: '40%', left: '80%' }}
              >
                <div className="relative flex items-center justify-center">
                  <span
                    className="absolute w-6 h-6 rounded-full animate-ping opacity-75"
                    style={{ backgroundColor: activeStage.color }}
                  />
                  <div
                    className="relative w-3.5 h-3.5 rounded-full border-2 border-white shadow-lg"
                    style={{ backgroundColor: activeStage.color }}
                  />
                </div>
                <div className="hidden md:flex items-center gap-1.5 backdrop-blur-md bg-slate-950/85 border border-slate-700/80 px-2.5 py-1 rounded-lg text-xs font-medium text-white shadow-xl">
                  <Radio className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                  <span className="font-mono text-[11px]">{activeStage.hotspots.sensor}</span>
                </div>
              </div>

              {/* Hotspot 4: Climate & Heated Floor (top: 72%, left: 36%) */}
              <div
                className="absolute flex items-center gap-2 transition-all duration-500"
                style={{ top: '72%', left: '34%' }}
              >
                <div className="relative flex items-center justify-center">
                  <span
                    className="absolute w-6 h-6 rounded-full animate-ping opacity-75"
                    style={{ backgroundColor: activeStage.color }}
                  />
                  <div
                    className="relative w-3.5 h-3.5 rounded-full border-2 border-white shadow-lg"
                    style={{ backgroundColor: activeStage.color }}
                  />
                </div>
                <div className="hidden md:flex items-center gap-1.5 backdrop-blur-md bg-slate-950/85 border border-slate-700/80 px-2.5 py-1 rounded-lg text-xs font-medium text-white shadow-xl">
                  <Thermometer className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span className="font-mono text-[11px]">{activeStage.hotspots.climate}</span>
                </div>
              </div>

              {/* Center Overlay Tag on Active Stage */}
              <div className="absolute bottom-4 left-4 z-20">
                <div
                  className="px-3 py-1.5 rounded-xl backdrop-blur-md bg-slate-950/80 border text-xs font-mono font-bold flex items-center gap-2 shadow-2xl"
                  style={{ borderColor: `${activeStage.color}60` }}
                >
                  <Sparkles className="h-3.5 w-3.5" style={{ color: activeStage.color }} />
                  <span className="text-white">{activeStage.badge}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM TELEMETRY / HARDWARE ACTION HUD */}
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

            {/* Hardware Breakdown Grid (6 cols) */}
            <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="text-slate-400 font-bold flex items-center gap-1.5">
                  <Zap className="h-3.5 w-3.5 text-amber-400" />
                  <span>Освещение:</span>
                </div>
                <div className="text-white font-mono font-medium truncate">
                  {activeStage.hotspots.lighting}
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="text-slate-400 font-bold flex items-center gap-1.5">
                  <Thermometer className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Климат:</span>
                </div>
                <div className="text-white font-mono font-medium truncate">
                  {activeStage.hotspots.climate}
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="text-slate-400 font-bold flex items-center gap-1.5">
                  <Blinds className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Шторы & Карнизы:</span>
                </div>
                <div className="text-white font-mono font-medium truncate">
                  {activeStage.hotspots.curtains}
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="text-slate-400 font-bold flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-indigo-400" />
                  <span>Датчик присутствия:</span>
                </div>
                <div className="text-cyan-300 font-mono truncate">
                  {activeStage.hotspots.sensor}
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
