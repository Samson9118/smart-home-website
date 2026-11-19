'use client';

import React, { useState } from 'react';
import {
  Cpu,
  Radio,
  Zap,
  Mic,
  Thermometer,
  ShieldAlert,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

type FeatureTab = 'mesh' | 'local' | 'voice' | 'hybrid';

interface TabConfig {
  id: FeatureTab;
  title: string;
  badge: string;
  headline: string;
  description: string;
  highlights: string[];
}

const tabs: TabConfig[] = [
  {
    id: 'mesh',
    title: 'Mesh-сеть Zigbee 3.0 / Matter',
    badge: 'Без мёртвых зон',
    headline: 'Каждое реле в розетке или выключателе усиливает радиосигнал',
    description:
      'В отличие от обычного Wi-Fi, где все устройства перегружают один роутер, в сети Zigbee и Thread все питаемые от 220V устройства (микрореле, умные розетки) работают как ретрансляторы (роутеры). Сигнал перепрыгивает сквозь любые бетонные стены без задержек.',
    highlights: [
      'Самовосстановление: при отказе одного узла сигнал мгновенно находит обходной путь',
      'Не забивает Wi-Fi роутер и не требует кабелей UTP к каждому выключателю',
      'Батарейные датчики работают до 3–5 лет от одной часовой батарейки CR2032/CR2450',
    ],
  },
  {
    id: 'local',
    title: '100% Автономность',
    badge: 'Локальная логика',
    headline: 'Система работает автономно даже при обрыве оптоволокна провайдера',
    description:
      'Все сценарии автоматизации (перекрытие воды при протечке, включение света по датчику движения, поддержание температуры радиаторов) исполняются внутри локального контроллера Home Assistant или Sprut.hub в вашей квартире.',
    highlights: [
      'Нулевая задержка: отклик света на беспроводной выключатель менее 40 мс',
      'Безопасность кранов: вода перекроется, даже если интернета нет уже месяц',
      'Конфиденциальность: видеопотоки камер и телеметрия не уходят на китайские серверы',
    ],
  },
  {
    id: 'voice',
    title: 'Голосовые ассистенты',
    badge: 'Алиса & Siri',
    headline: 'Управляйте сценариями одной фразой через умные колонки',
    description:
      'Прямая интеграция сервера умного дома с Яндекс Алисой и Apple HomeKit. Все устройства отображаются в приложении «Дом с Алисой» и объединяются в удобные голосовые сценарии.',
    highlights: [
      '«Алиса, спокойной ночи» — гасит весь свет, перекрывает воду и включает охрану',
      '«Алиса, открой шторы на 50%» — точная пошаговая регулировка электрокарнизов',
      'Голосовое подтверждение температуры и предупреждение о протечке',
    ],
  },
  {
    id: 'hybrid',
    title: 'Мультибрендовая свобода',
    badge: 'Без привязки',
    headline: 'Объединяем Aqara, Sonoff, Sprut и Tuya в единый слаженный оркестр',
    description:
      'Вам не нужно выбирать один закрытый бренд. Мы собираем оптимальный гибрид: силовые реле Sonoff в щите, элегантные дизайнерские беспроводные переключатели Aqara в комнатах и локальный мозг Home Assistant.',
    highlights: [
      'Экономия до 40% бюджета за счёт точного подбора надежных устройств под каждую задачу',
      'Поддержка нового универсального стандарта Matter и протокола Thread',
      'Возможность в любой момент самостоятельно докупить и привязать новый датчик',
    ],
  },
];

export const InteractiveMeshDiagram: React.FC = () => {
  const [activeTab, setActiveTab] = useState<FeatureTab>('mesh');

  const currentTab = tabs.find((t) => t.id === activeTab) || tabs[0];

  return (
    <section className="py-16 sm:py-20 lg:py-24 border-t border-slate-800/80 bg-dark-950/80 relative overflow-hidden">
      {/* Background glow effects */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/4 -z-10 h-[400px] w-[500px] -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[130px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 right-1/4 -z-10 h-[350px] w-[450px] rounded-full bg-amber-500/10 blur-[120px]"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 mb-3">
            <Radio className="h-3.5 w-3.5" />
            Архитектура и надёжность
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Как работает современный беспроводной дом
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Без проводов по плинтусам, без штробления чистового ремонта и без риска отказа из-за проблем с интернетом.
          </p>
        </div>

        {/* Interactive Tabs Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 mb-10">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col text-left rounded-2xl border p-4 sm:p-5 transition-all cursor-pointer ${
                  isActive
                    ? 'border-cyan-500 bg-cyan-500/10 shadow-glow-cyan'
                    : 'border-slate-800 bg-dark-900/60 hover:bg-dark-800/80 hover:border-slate-700'
                }`}
              >
                <span
                  className={`text-[11px] font-bold uppercase tracking-wider mb-1.5 ${
                    isActive ? 'text-amber-400' : 'text-slate-500'
                  }`}
                >
                  {tab.badge}
                </span>
                <span className="text-sm sm:text-base font-bold text-white leading-snug">
                  {tab.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tab Content + Visual Diagram Card */}
        <div className="glass-card rounded-3xl border border-slate-800 p-6 sm:p-8 lg:p-10 shadow-glow-glass">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Explanatory Content */}
            <div className="lg:col-span-7 space-y-5">
              <span className="rounded-full bg-amber-500/15 border border-amber-500/30 px-3 py-1 text-xs font-semibold text-amber-400 inline-block">
                {currentTab.badge}
              </span>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                {currentTab.headline}
              </h3>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {currentTab.description}
              </p>

              <div className="space-y-3 pt-2">
                {currentTab.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400 mt-0.5">
                      ✓
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap gap-3">
                <Button href="/calculator" variant="primary" size="md">
                  Рассчитать смету для квартиры
                </Button>
                <Button href="/services" variant="outline" size="md">
                  Все готовые пакеты
                </Button>
              </div>
            </div>

            {/* Right: Visual Node Diagram */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl border border-slate-800 bg-dark-950/90 p-6 overflow-hidden">
                <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-4 text-center">
                  Топология беспроводной сети в квартире
                </div>

                {/* Central Server */}
                <div className="mx-auto max-w-[200px] rounded-xl border border-cyan-500/50 bg-cyan-500/15 p-3.5 text-center shadow-glow-cyan mb-6">
                  <div className="flex h-9 w-9 mx-auto items-center justify-center rounded-lg bg-cyan-500 text-dark-950 font-black mb-1.5">
                    <Cpu className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-bold text-white block">Home Assistant</span>
                  <span className="text-[10px] text-cyan-300">Локальный координатор</span>
                </div>

                {/* Mesh Connecting Nodes Grid */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {/* Router Node 1 */}
                  <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-3 text-center">
                    <Zap className="h-4 w-4 text-amber-400 mx-auto mb-1" />
                    <span className="text-[11px] font-bold text-white block">Реле Aqara T2</span>
                    <span className="text-[9px] text-slate-400">Роутер света (220V)</span>
                  </div>

                  {/* Router Node 2 */}
                  <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-3 text-center">
                    <Zap className="h-4 w-4 text-amber-400 mx-auto mb-1" />
                    <span className="text-[11px] font-bold text-white block">Реле Sonoff ZBMINI</span>
                    <span className="text-[9px] text-slate-400">Роутер розеток (220V)</span>
                  </div>
                </div>

                {/* End Battery Devices */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="rounded-lg border border-slate-800 bg-dark-900 p-2 text-center">
                    <Thermometer className="h-3.5 w-3.5 text-cyan-400 mx-auto mb-1" />
                    <span className="text-[9px] text-slate-300 block">Датчик климата</span>
                    <span className="text-[8px] text-slate-500">CR2032</span>
                  </div>

                  <div className="rounded-lg border border-slate-800 bg-dark-900 p-2 text-center">
                    <ShieldAlert className="h-3.5 w-3.5 text-emerald-400 mx-auto mb-1" />
                    <span className="text-[9px] text-slate-300 block">Датчик протечки</span>
                    <span className="text-[8px] text-slate-500">IP67</span>
                  </div>

                  <div className="rounded-lg border border-slate-800 bg-dark-900 p-2 text-center">
                    <Mic className="h-3.5 w-3.5 text-purple-400 mx-auto mb-1" />
                    <span className="text-[9px] text-slate-300 block">Яндекс Алиса</span>
                    <span className="text-[8px] text-purple-400">Голос</span>
                  </div>
                </div>

                {/* Footer badge */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 text-center text-[10px] text-slate-400">
                  <span className="text-emerald-400 font-semibold">● Защищенная локальная сеть:</span> ключи шифрования AES-128
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
