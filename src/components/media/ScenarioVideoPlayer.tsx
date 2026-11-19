'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export interface VideoScene {
  id: string;
  title: string;
  badge: string;
  durationSec: number;
  description: string;
  activeSensors: {
    name: string;
    type: string;
    protocol: string;
    latency: string;
    icon: string;
    action: string;
    proSpec: string;
  }[];
  timelineEvents: {
    timeSec: number;
    title: string;
    detail: string;
  }[];
  canvasVisual: {
    bgColor: string;
    ambientColor: string;
    activeElements: string[];
    logLine: string;
  };
}

const SCENES: VideoScene[] = [
  {
    id: 'arrival',
    title: 'Сценарий: «Возвращение домой»',
    badge: 'Биометрия & Свет',
    durationSec: 12,
    description: 'Открытие умного биометрического замка по отпечатку пальца запускает каскад: снятие с охраны, мягкий свет в прихожей, комфортная температура и любимый трек.',
    activeSensors: [
      {
        name: 'Aqara Smart Lock U200',
        type: 'Биометрический смарт-замок',
        protocol: 'Matter over Thread',
        latency: '15 мс',
        icon: '🔐',
        action: 'Распознавание владельца и отпирание ригелей за 0.8 сек',
        proSpec: 'Отпечаток пальца, NFC-карта, Apple Home Key, одноразовые PIN-коды',
      },
      {
        name: 'Aqara Door Sensor T1',
        type: 'Герконовый датчик открытия',
        protocol: 'Zigbee 3.0',
        latency: '20 мс',
        icon: '🚪',
        action: 'Фиксация распахивания двери и включение света в прихожей',
        proSpec: 'Питание от CR1632 на 3 года, скрытая установка в торец двери',
      },
      {
        name: 'Sonoff ZBMiniL2 Extreme',
        type: 'Микромодуль реле без нуля',
        protocol: 'Zigbee 3.0',
        latency: '25 мс',
        icon: '⚡',
        action: 'Плавное включение трекового освещения коридора на 50%',
        proSpec: 'Размеры 39.5x32x18 мм, монтаж в любой стандартный подрозетник',
      },
    ],
    timelineEvents: [
      { timeSec: 1, title: '00:01 — Прикосновение к замку', detail: 'Авторизация по отпечатку (Match 99.8%)' },
      { timeSec: 4, title: '00:04 — Дверь открыта', detail: 'Геркон фиксирует размыкание контакта' },
      { timeSec: 7, title: '00:07 — Снятие охраны', detail: 'Камеры переходят в приватный режим (шторка закрыта)' },
      { timeSec: 10, title: '00:10 — Свет и климат', detail: 'Кондиционер переходит из Eco в Comfort 22°C' },
    ],
    canvasVisual: {
      bgColor: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
      ambientColor: '#F59E0B',
      activeElements: ['Замок разблокирован', 'Прихожая 3000K', 'Камеры: Шторка Privacy'],
      logLine: '[MQTT/Zigbee] Device "lock_front_door" unlocked by User: Master (fingerprint_1)',
    },
  },
  {
    id: 'leakage',
    title: 'Сценарий: «Защита от протечки (10 секунд)»',
    badge: 'Аварийная автоматика',
    durationSec: 10,
    description: 'При попадании воды на электроды датчика умный дом мгновенно перекрывает подачу воды шаровыми кранами с сервоприводом и присылает экстренный алерт в Telegram.',
    activeSensors: [
      {
        name: 'Tuya Water Leak Sensor',
        type: 'Беспроводной датчик протечки',
        protocol: 'Zigbee 3.0',
        latency: '12 мс',
        icon: '💧',
        action: 'Замыкание позолоченных контактов каплями воды',
        proSpec: 'Класс защиты IP67, работа от батарейки CR2032 до 4 лет',
      },
      {
        name: 'Neptun Bugatti Pro 12V',
        type: 'Кран шаровый с электроприводом',
        protocol: 'Сухой контакт / Zigbee реле',
        latency: '8 сек (полное закрытие)',
        icon: '🛑',
        action: 'Поворот латунного шара на 90 градусов и сброс давления',
        proSpec: 'Крутящий момент 16 Н*м, давление до 40 бар, резервный АКБ',
      },
      {
        name: 'SmartHome Lab Alert Service',
        type: 'Сервер нотификаций',
        protocol: 'REST / Telegram API',
        latency: '150 мс',
        icon: '📲',
        action: 'Push-уведомление инженеру и звонок владельцу квартиры',
        proSpec: 'Приоритетный пуш через bypass режима «Не беспокоить»',
      },
    ],
    timelineEvents: [
      { timeSec: 1, title: '00:01 — Детекция воды', detail: 'Датчик под стиральной машиной зафиксировал влагу' },
      { timeSec: 3, title: '00:03 — Сигнал на перекрытие', detail: 'Zigbee Binding напрямую активирует реле сервопривода' },
      { timeSec: 7, title: '00:07 — Стояки перекрыты', detail: 'Холодная и горячая вода полностью перекрыты' },
      { timeSec: 9, title: '00:09 — Экстренный алерт', detail: 'Сообщение отправлено в Telegram с точным адресом датчика' },
    ],
    canvasVisual: {
      bgColor: 'linear-gradient(135deg, #1e293b 0%, #312e81 100%)',
      ambientColor: '#06B6D4',
      activeElements: ['Датчик протечки ВАННА: ALARM', 'Краны: ЗАКРЫТО 100%', 'Telegram: Push отправлен'],
      logLine: '[Binding Event] "leak_sensor_laundry" -> "valve_cold_water" STATE: CLOSED (Reason: LEAK)',
    },
  },
  {
    id: 'cinema',
    title: 'Сценарий: «Домашний кинотеатр»',
    badge: 'Атмосфера & Мультимедиа',
    durationSec: 10,
    description: 'Одна голосовая команда «Алиса, включай кино» или нажатие беспроводной кнопки: шторы блэкаут опускаются, проектор выдвигается, а подсветка переходит в глубокий тёплый полумрак.',
    activeSensors: [
      {
        name: 'Aqara Curtain Driver E1',
        type: 'Привод рулонных и раздвижных штор',
        protocol: 'Zigbee 3.0',
        latency: '30 мс',
        icon: '🪟',
        action: 'Бесшумное закрытие плотных штор Blackout со скоростью 12 см/с',
        proSpec: 'Тяговое усилие до 12 кг, встроенный аккумулятор Type-C',
      },
      {
        name: 'Aqara mmWave Presence FP2',
        type: 'Радар зон присутствия человека',
        protocol: 'Wi-Fi / Home Assistant',
        latency: '40 мс',
        icon: '📡',
        action: 'Контроль нахождения зрителей на диване (3 зоны детекции)',
        proSpec: 'Сетка 30 зон, отслеживание до 5 человек одновременно',
      },
      {
        name: 'WLED Addressable Controller',
        type: 'Адресный контроллер подсветки',
        protocol: 'Wi-Fi / Local UDP',
        latency: '10 мс',
        icon: '🌈',
        action: 'Фоновая подсветка экрана Ambilight в цвет изображения',
        proSpec: 'Поддержка WS2812B/SK6812, 120 FPS, чистый белый канал RGBW',
      },
    ],
    timelineEvents: [
      { timeSec: 1, title: '00:01 — Команда сценария', detail: 'Голос: «Алиса, смотрим кино»' },
      { timeSec: 3, title: '00:03 — Затемнение окон', detail: 'Умные карнизы на 100% блокируют внешние источники' },
      { timeSec: 6, title: '00:06 — Выключение люстр', detail: 'Плавный fade-out основного света за 3 секунды' },
      { timeSec: 9, title: '00:09 — Запуск Ambilight', detail: 'Включение мягкой задней подсветки ТВ на 15%' },
    ],
    canvasVisual: {
      bgColor: 'linear-gradient(135deg, #090d16 0%, #172554 100%)',
      ambientColor: '#8B5CF6',
      activeElements: ['Шторы: 0% Закрыты', 'Свет: Ambilight 15%', 'Проектор: ВКЛЮЧЕН'],
      logLine: '[Scene Trigger] cinema_mode activated by Voice Assistant. Target room: Living Room',
    },
  },
];

export const ScenarioVideoPlayer: React.FC = () => {
  const [activeSceneIndex, setActiveSceneIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [progressSec, setProgressSec] = useState<number>(0);
  const [selectedSensorIdx, setSelectedSensorIdx] = useState<number>(0);

  const scene = SCENES[activeSceneIndex];

  // Playback timer ticker
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgressSec((prev) => {
        if (prev >= scene.durationSec) {
          // loop or go to next scene
          return 0;
        }
        return Number((prev + 0.5).toFixed(1));
      });
    }, 500);
    return () => clearInterval(interval);
  }, [isPlaying, scene.durationSec]);

  // Reset progress when scene changes
  const switchScene = (idx: number) => {
    setActiveSceneIndex(idx);
    setProgressSec(0);
    setSelectedSensorIdx(0);
  };

  const progressPercent = Math.min(100, (progressSec / scene.durationSec) * 100);

  return (
    <section className="py-20 bg-slate-950 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <span>🎬</span> Интерактивный видео-шоукейс
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Сценарии и датчики в действии
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            Посмотрите, как взаимодействуют между собой датчики, исполнительные реле и приводы.
            Задержка передачи команд — менее 25 миллисекунд.
          </p>
        </div>

        {/* Scene Selection Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
          {SCENES.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => switchScene(idx)}
              className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all border ${
                activeSceneIndex === idx
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/25 font-bold'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
              }`}
            >
              {s.title.replace('Сценарий: ', '')}
            </button>
          ))}
        </div>

        {/* Video Player Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Visual Player Screen (8 cols) */}
          <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            {/* Screen Header / Simulated Camera feed */}
            <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                <span className="font-mono text-red-400 font-bold uppercase tracking-wider">LIVE SIMULATION 4K</span>
                <span className="text-slate-600">|</span>
                <span className="text-slate-300 font-semibold">{scene.badge}</span>
              </div>
              <div className="font-mono text-slate-400">
                00:{String(Math.floor(progressSec)).padStart(2, '0')} / 00:{String(scene.durationSec).padStart(2, '0')}
              </div>
            </div>

            {/* Simulated Animated Video Canvas */}
            <div
              className="relative min-h-[380px] sm:min-h-[440px] p-6 flex flex-col justify-between transition-colors duration-700"
              style={{ background: scene.canvasVisual.bgColor }}
            >
              {/* Top Sensor Activity Badges */}
              <div className="flex flex-wrap gap-2 z-10">
                {scene.canvasVisual.activeElements.map((el, idx) => (
                  <div
                    key={idx}
                    className="backdrop-blur-md bg-slate-950/80 border border-slate-700/60 px-3 py-1.5 rounded-lg text-xs font-medium text-white flex items-center gap-1.5 shadow"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    {el}
                  </div>
                ))}
              </div>

              {/* Center Scene Animation Graphic */}
              <div className="my-auto py-6 flex flex-col items-center justify-center text-center z-10">
                <motion.div
                  key={`${scene.id}-${progressSec > 5 ? 'second' : 'first'}`}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-slate-950/80 border-2 border-amber-500/50 shadow-2xl flex items-center justify-center text-4xl sm:text-5xl mb-4"
                  style={{ boxShadow: `0 0 50px ${scene.canvasVisual.ambientColor}66` }}
                >
                  {scene.activeSensors[selectedSensorIdx]?.icon || '⚡'}
                </motion.div>
                <div className="text-xl sm:text-2xl font-black text-white">{scene.title}</div>
                <div className="mt-2 text-xs sm:text-sm text-slate-300 max-w-md">
                  {scene.description}
                </div>
              </div>

              {/* Console log ticker */}
              <div className="backdrop-blur-md bg-black/60 border border-slate-800 rounded-lg p-2.5 font-mono text-xs text-emerald-400 truncate z-10">
                <span className="text-slate-500 mr-2">&gt;</span>
                {scene.canvasVisual.logLine}
              </div>
            </div>

            {/* Playback Controls & Scrubber */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 space-y-3">
              {/* Progress bar */}
              <div
                className="w-full bg-slate-800 h-2 rounded-full overflow-hidden cursor-pointer relative"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const ratio = clickX / rect.width;
                  setProgressSec(Number((ratio * scene.durationSec).toFixed(1)));
                }}
              >
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-cyan-400 transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-9 h-9 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center font-bold transition-colors"
                  >
                    {isPlaying ? '⏸' : '▶'}
                  </button>
                  <button
                    onClick={() => setProgressSec(0)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
                  >
                    Перемотка в начало
                  </button>
                </div>
                <div className="text-xs text-slate-400">
                  Кликните на прогресс-бар для быстрой перемотки
                </div>
              </div>
            </div>
          </div>

          {/* Sensors Inspector Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <h3 className="text-base font-bold text-white flex items-center gap-2 mb-4">
                <span>🔍</span> Задействованные датчики и реле
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                Выберите устройство для просмотра технических характеристик и протокола:
              </p>

              {/* Sensor list selector */}
              <div className="space-y-2.5">
                {scene.activeSensors.map((sensor, sIdx) => {
                  const isSel = selectedSensorIdx === sIdx;
                  return (
                    <button
                      key={sIdx}
                      onClick={() => setSelectedSensorIdx(sIdx)}
                      className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 ${
                        isSel
                          ? 'bg-slate-800 border-amber-500/70 shadow-md shadow-amber-500/10'
                          : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      <span className="text-2xl">{sensor.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div className="text-xs font-bold text-white truncate">{sensor.name}</div>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                            {sensor.protocol}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5 truncate">{sensor.type}</div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Detailed Inspector Card */}
              {scene.activeSensors[selectedSensorIdx] && (
                <div className="mt-5 p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between items-center text-slate-400 border-b border-slate-800/80 pb-2">
                    <span>Скорость отклика:</span>
                    <span className="text-emerald-400 font-mono font-bold">
                      {scene.activeSensors[selectedSensorIdx].latency}
                    </span>
                  </div>
                  <div className="text-slate-300 font-semibold pt-1">
                    Действие в сценарии:
                  </div>
                  <div className="text-slate-400 text-[11px]">
                    {scene.activeSensors[selectedSensorIdx].action}
                  </div>
                  <div className="text-slate-300 font-semibold pt-2">
                    Спецификация монтажа:
                  </div>
                  <div className="text-slate-400 text-[11px]">
                    {scene.activeSensors[selectedSensorIdx].proSpec}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Link to Knowledge Base */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-950/40 to-slate-900 border border-cyan-500/30 text-xs">
              <div className="font-bold text-cyan-400 mb-1">Хотите знать, как смонтировать эти датчики?</div>
              <p className="text-slate-400 mb-3">
                В нашей базе знаний собраны схемы скрытого монтажа реле без нуля и карта зон детекции.
              </p>
              <a
                href="/knowledge"
                className="inline-flex items-center gap-1.5 text-white font-semibold hover:text-amber-400 transition-colors"
              >
                Открыть руководство по монтажу →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
