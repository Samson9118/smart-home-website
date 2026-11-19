'use client';

import React, { useState } from 'react';
import {
  Sun,
  LogOut,
  Film,
  Moon,
  Mic,
  Lightbulb,
  Thermometer,
  ShieldAlert,
  Blinds,
  Tv,
} from 'lucide-react';

interface ScenarioAction {
  system: string;
  action: string;
  icon: React.ElementType;
}

interface Scenario {
  id: string;
  title: string;
  voiceCommand: string;
  trigger: string;
  badge: string;
  badgeColor: string;
  description: string;
  actions: ScenarioAction[];
}

const scenarios: Scenario[] = [
  {
    id: 'morning',
    title: 'Сценарий «Утро»',
    voiceCommand: '«Алиса, доброе утро»',
    trigger: 'Будильник на смартфоне или голосовая команда',
    badge: 'Комфортный подъем',
    badgeColor: 'border-amber-500/40 text-amber-400 bg-amber-500/10',
    description:
      'Мягкое и плавное пробуждение без раздражающего звука будильника. Дом сам подготавливает идеальную атмосферу для нового дня.',
    actions: [
      {
        system: 'Электрокарнизы',
        action: 'Шторы в спальне бесшумно открываются на 40% для естественного света',
        icon: Blinds,
      },
      {
        system: 'Освещение',
        action: 'В ванной и коридоре включается теплый приглушенный свет 30%',
        icon: Lightbulb,
      },
      {
        system: 'Климат',
        action: 'Полотенцесушитель и теплый пол прогреваются до комфортных +24°C',
        icon: Thermometer,
      },
      {
        system: 'Мультимедиа',
        action: 'Колонка с Алисой рассказывает прогноз погоды и включает любимую музыку',
        icon: Mic,
      },
    ],
  },
  {
    id: 'leave',
    title: 'Сценарий «Я ушёл»',
    voiceCommand: '«Алиса, мы ушли» или кнопка у двери',
    trigger: 'Нажатие беспроводного выключателя у выхода или геолокация',
    badge: '100% Безопасность',
    badgeColor: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10',
    description:
      'Одно нажатие перед выходом из дома полностью переводит квартиру в защищенный энергосберегающий режим.',
    actions: [
      {
        system: 'Освещение и розетки',
        action: 'Гаснет весь свет во всех комнатах, отключаются розетки утюга и плойки',
        icon: Lightbulb,
      },
      {
        system: 'Климат',
        action: 'Термостаты радиаторов и кондиционеры переходят в режим эко (+18°C)',
        icon: Thermometer,
      },
      {
        system: 'Водоснабжение',
        action: 'Активируется режим повышенного контроля протечек кранов Bugatti',
        icon: ShieldAlert,
      },
      {
        system: 'Охрана',
        action: 'Включаются датчики открытия окон и радары присутствия с push в Telegram',
        icon: Tv,
      },
    ],
  },
  {
    id: 'cinema',
    title: 'Сценарий «Кино»',
    voiceCommand: '«Алиса, включай кино»',
    trigger: 'Голосовая команда или запуск ТВ с пульта',
    badge: 'Атмосфера кинотеатра',
    badgeColor: 'border-purple-500/40 text-purple-400 bg-purple-500/10',
    description:
      'Превращает гостиную в настоящий кинозал за 3 секунды с правильной подсветкой без бликов на экране.',
    actions: [
      {
        system: 'Электрокарнизы',
        action: 'Блэкаут-шторы полностью закрываются, блокируя уличный свет',
        icon: Blinds,
      },
      {
        system: 'Освещение',
        action: 'Основной свет гаснет, плавно зажигается фоновая янтарная подсветка ТВ на 15%',
        icon: Lightbulb,
      },
      {
        system: 'Климат',
        action: 'Кондиционер переключается в бесшумный ночной режим (19 дБ)',
        icon: Thermometer,
      },
      {
        system: 'Мультимедиа',
        action: 'Включается ресивер, звук переводится на акустическую систему',
        icon: Tv,
      },
    ],
  },
  {
    id: 'night',
    title: 'Сценарий «Ночь»',
    voiceCommand: '«Алиса, спокойной ночи»',
    trigger: 'Голосовая команда или время 23:30',
    badge: 'Глубокий сон',
    badgeColor: 'border-blue-500/40 text-blue-400 bg-blue-500/10',
    description:
      'Дом засыпает вместе с вами. Полная тишина, защита от случайных протечек и подсветка ночного пути.',
    actions: [
      {
        system: 'Освещение',
        action: 'Выключается весь оставшийся свет в квартире',
        icon: Lightbulb,
      },
      {
        system: 'Умный ночник',
        action: 'Датчики движения в коридоре и санузле включают мягкий янтарный свет на 5%',
        icon: Lightbulb,
      },
      {
        system: 'Шторы',
        action: 'Все электрокарнизы закрываются для приватности',
        icon: Blinds,
      },
      {
        system: 'Климат',
        action: 'Оптимальная температура для выработки мелатонина (+19.5°C)',
        icon: Thermometer,
      },
    ],
  },
];

export const ScenarioSwitcher: React.FC = () => {
  const [selectedScenarioId, setSelectedScenarioId] = useState('morning');

  const selectedScenario =
    scenarios.find((s) => s.id === selectedScenarioId) || scenarios[0];

  return (
    <div className="glass-card rounded-3xl border border-slate-800 p-6 sm:p-8 lg:p-10 shadow-glow-glass">
      {/* Scenario Buttons Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {scenarios.map((s) => {
          const isSelected = selectedScenarioId === s.id;
          const getIcon = () => {
            switch (s.id) {
              case 'morning':
                return <Sun className="h-4 w-4" />;
              case 'leave':
                return <LogOut className="h-4 w-4" />;
              case 'cinema':
                return <Film className="h-4 w-4" />;
              case 'night':
                return <Moon className="h-4 w-4" />;
              default:
                return null;
            }
          };

          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setSelectedScenarioId(s.id)}
              className={`flex items-center justify-center gap-2 rounded-xl border p-3.5 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                isSelected
                  ? 'border-amber-500 bg-amber-500/15 text-amber-300 shadow-glow-amber'
                  : 'border-slate-800 bg-dark-900/60 text-slate-300 hover:border-slate-700 hover:text-white'
              }`}
            >
              {getIcon()}
              <span>{s.title.replace('Сценарий ', '')}</span>
            </button>
          );
        })}
      </div>

      {/* Active Scenario Details Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Info Column */}
        <div className="lg:col-span-5 space-y-4">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${selectedScenario.badgeColor}`}
          >
            {selectedScenario.badge}
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            {selectedScenario.title}
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            {selectedScenario.description}
          </p>

          <div className="rounded-2xl border border-slate-800 bg-dark-950/80 p-4 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-amber-400 font-semibold">
              <Mic className="h-4 w-4 shrink-0" />
              <span>Голосовая команда:</span>
            </div>
            <p className="text-white text-sm font-mono pl-6">
              {selectedScenario.voiceCommand}
            </p>
            <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-800">
              <span className="text-slate-300">Триггер:</span> {selectedScenario.trigger}
            </div>
          </div>
        </div>

        {/* Actions List Column */}
        <div className="lg:col-span-7 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Синхронные действия устройств (за 1–2 секунды):
          </span>
          {selectedScenario.actions.map((act, index) => {
            const IconComponent = act.icon;
            return (
              <div
                key={index}
                className="flex items-start gap-3.5 rounded-xl border border-slate-800 bg-dark-950/70 p-3.5 text-xs sm:text-sm text-slate-200"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  <IconComponent className="h-4 w-4" />
                </div>
                <div>
                  <span className="font-semibold text-white block mb-0.5">
                    {act.system}
                  </span>
                  <span className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {act.action}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
