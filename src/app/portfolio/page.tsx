'use client';

import React, { useState } from 'react';
import {
  Building2,
  Home,
  Cpu,
  Clock,
  CheckCircle,
  Calculator,
  Send,
  Sparkles,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { siteConfig } from '@/config/site';

interface PortfolioCase {
  id: string;
  type: 'apartment' | 'house';
  typeLabel: string;
  title: string;
  location: string;
  area: string;
  rooms: string;
  budget: string;
  duration: string;
  hub: string;
  brands: string[];
  description: string;
  results: string[];
  scenarios: string[];
}

const cases: PortfolioCase[] = [
  {
    id: 'case-1',
    type: 'apartment',
    typeLabel: 'Квартира',
    title: '3-комнатная квартира в ЖК «Символ»',
    location: 'г. Москва, Лефортово',
    area: '86 м²',
    rooms: '3 комнаты + кухня-гостиная',
    budget: '185 000 ₽',
    duration: '2 рабочих дня',
    hub: 'Home Assistant на Mini-PC + Sprut.stick Pro',
    brands: ['Aqara', 'Sonoff', 'Яндекс Алиса'],
    description:
      'Беспроводная автоматизация в полностью готовом чистовом ремонте. Установлено 14 реле Aqara T2 в круглые подрозетники, система защиты от протечек на кранах Bugatti и покомнатный климат-контроль.',
    results: [
      '14 световых групп без штробления и замены проводки',
      'Защита от протечек с автоматическим перекрытием за 6 секунд',
      'Интеграция 3 умных колонок Яндекс Станция с Алисой',
      'Локальное управление без интернета и задержек',
    ],
    scenarios: ['«Я ушёл»', '«Кинозал»', '«Плавный рассвет»', '«Авто-климат»'],
  },
  {
    id: 'case-2',
    type: 'house',
    typeLabel: 'Загородный дом',
    title: 'Двухэтажный коттедж из бруса',
    location: 'Московская обл., Новорижское ш.',
    area: '210 м²',
    rooms: '5 комнат + терраса и котельная',
    budget: '320 000 ₽',
    duration: '3 рабочих дня',
    hub: 'Sprut.hub CE (локальный контроллер)',
    brands: ['Sprut', 'Aqara', 'Neptun', 'Sonoff'],
    description:
      'Комплексная автоматизация загородного дома. Силовые реле Sonoff установлены на DIN-рейку в слаботочный щит, по комнатам расставлены климатические сенсоры Sprut и электрокарнизы Aqara.',
    results: [
      'Отопление: покомнатное управление сервоприводами коллектора и радиаторами',
      'Экономия до 35% на отоплении электрическим котлом по ночному тарифу',
      'Контроль периметра и уличного освещения террасы по датчикам движения',
      'Полная автономность при обрывах проводного интернета',
    ],
    scenarios: ['«Режим Эко +16°C»', '«Приезд хозяев»', '«Охрана периметра»', '«Ночной коридор»'],
  },
  {
    id: 'case-3',
    type: 'apartment',
    typeLabel: 'Квартира',
    title: 'Дизайнерская студия в ЖК «Петровский»',
    location: 'г. Санкт-Петербург',
    area: '42 м²',
    rooms: 'Студия (спальня + кухня-гостиная)',
    budget: '74 000 ₽',
    duration: '1 рабочий день',
    hub: 'Aqara Hub M3 (Matter & Thread)',
    brands: ['Aqara', 'Яндекс Алиса'],
    description:
      'Компактный бюджетный проект в стиле минимализм. Управление биодинамическим светом, кондиционером через ИК-порт хаба M3 и электрокарнизом рулонных штор.',
    results: [
      'Биодинамический свет: теплый янтарный вечером, холодный днем',
      'Электрокарниз рулонной шторы со встроенным аккумулятором',
      'Управление с одной миниатюрной беспроводной кнопки на прикроватной тумбе',
      'Срок монтажа — всего 5 часов без пыли и грязи',
    ],
    scenarios: ['«Доброе утро»', '«Работа за ноутбуком»', '«Режим отдыха»'],
  },
  {
    id: 'case-4',
    type: 'house',
    typeLabel: 'Загородный дом',
    title: 'Таунхаус в эко-посёлке',
    location: 'Республика Татарстан, г. Казань',
    area: '145 м²',
    rooms: '4 комнаты + гараж',
    budget: '240 000 ₽',
    duration: '2 рабочих дня',
    hub: 'Home Assistant + Яндекс Станция Миди',
    brands: ['Aqara', 'Tuya Zigbee', 'Sonoff'],
    description:
      'Умный климат на термоголовках Aqara E1, радары присутствия FP2 с разделением гостиной на зоны и привод гаражных ворот через сухое реле Sonoff.',
    results: [
      'Радар FP2 в гостиной: свет включается только в той зоне, где сидят люди',
      'Контроль 2 стояков воды и автоматическое оповещение в Telegram',
      'Сценарий «Выключить всё» на выходе в гараж',
      'Поддержка управления из приложения Apple Home и голосом с Алисой',
    ],
    scenarios: ['«Выезд на работу»', '«Уютный ужин»', '«Автоматический климат»'],
  },
];

export default function PortfolioPage() {
  const [filter, setFilter] = useState<'all' | 'apartment' | 'house'>('all');

  const filteredCases =
    filter === 'all' ? cases : cases.filter((c) => c.type === filter);

  return (
    <div className="py-12 sm:py-16 lg:py-20">
      <Container>
        {/* Page Header */}
        <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-16">
          <Badge variant="amber" dot className="mb-3">
            <Sparkles className="h-3 w-3 text-amber-400" />
            Реальные кейсы
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Реализованные проекты умных домов
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Посмотрите примеры конфигураций оборудования, реализованные сценарии и точные бюджеты под ключ.
          </p>

          {/* Filter Pills */}
          <div className="mt-8 flex justify-center gap-2">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-all ${
                filter === 'all'
                  ? 'bg-amber-500 text-dark-950 shadow-glow-amber'
                  : 'bg-dark-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              Все объекты ({cases.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter('apartment')}
              className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-all ${
                filter === 'apartment'
                  ? 'bg-cyan-500 text-dark-950 shadow-glow-cyan'
                  : 'bg-dark-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Building2 className="h-4 w-4" />
              <span>Квартиры</span>
            </button>
            <button
              type="button"
              onClick={() => setFilter('house')}
              className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-all ${
                filter === 'house'
                  ? 'bg-cyan-500 text-dark-950 shadow-glow-cyan'
                  : 'bg-dark-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Home className="h-4 w-4" />
              <span>Загородные дома</span>
            </button>
          </div>
        </div>

        {/* Portfolio Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {filteredCases.map((c) => (
            <div
              key={c.id}
              className="glass-card glass-card-hover rounded-3xl p-6 sm:p-8 border border-slate-800 flex flex-col justify-between"
            >
              <div>
                {/* Card Top Metadata */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-cyan-500/10 border border-cyan-500/30 px-2.5 py-0.5 text-xs font-semibold text-cyan-400">
                      {c.typeLabel}
                    </span>
                    <span className="text-xs text-slate-400">{c.location}</span>
                  </div>
                  <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> Срок: {c.duration}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  {c.title}
                </h2>

                {/* Metrics Highlights Bar */}
                <div className="grid grid-cols-3 gap-2 rounded-2xl bg-dark-950/80 p-3.5 border border-slate-800/80 mb-5 text-center text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Площадь</span>
                    <span className="font-bold text-white text-sm">{c.area}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Бюджет под ключ</span>
                    <span className="font-bold text-amber-400 text-sm">{c.budget}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Комнаты</span>
                    <span className="font-bold text-white text-sm">{c.rooms.split(' ')[0]} комн.</span>
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed mb-5">
                  {c.description}
                </p>

                {/* Hub and Brands */}
                <div className="rounded-xl border border-slate-800 bg-dark-900/60 p-3.5 mb-5 space-y-2 text-xs">
                  <div className="flex items-start gap-2">
                    <Cpu className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-400">Хаб системы: </span>
                      <span className="font-semibold text-white">{c.hub}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap pt-1">
                    <span className="text-slate-400 mr-1">Бренды:</span>
                    {c.brands.map((b) => (
                      <span
                        key={b}
                        className="rounded-lg bg-dark-950 border border-slate-700 px-2 py-0.5 text-[11px] font-semibold text-slate-200"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Results */}
                <div className="space-y-2 mb-5">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Что было сделано:
                  </span>
                  {c.results.map((res, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{res}</span>
                    </div>
                  ))}
                </div>

                {/* Scenarios pills */}
                <div className="flex items-center gap-1.5 flex-wrap text-xs pt-1">
                  <span className="text-slate-400 text-[11px] mr-1">Сценарии:</span>
                  {c.scenarios.map((sc) => (
                    <span
                      key={sc}
                      className="rounded-md bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 text-[11px] text-amber-300 font-medium"
                    >
                      {sc}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Action */}
              <div className="mt-6 pt-5 border-t border-slate-800 flex items-center justify-between">
                <Button href="/calculator" variant="outline" size="sm" className="w-full">
                  Рассчитать аналогичный объект
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Box */}
        <div className="mt-16 rounded-3xl border border-amber-500/30 bg-gradient-to-r from-dark-900 to-dark-950 p-8 sm:p-12 text-center">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Хотите такой же умный дом без пыли и штробления?
          </h3>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            Получите персональный расчёт спецификации оборудования под планировку вашей квартиры или дома прямо сейчас.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Button href="/calculator" variant="primary" size="lg" icon={<Calculator className="h-5 w-5" />}>
              Перейти в онлайн-калькулятор
            </Button>
            <a
              href={`https://t.me/${siteConfig.telegramBot}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-dark-800 px-6 py-3.5 text-sm font-semibold text-slate-200 hover:text-white hover:border-cyan-500/50 transition-all"
            >
              <Send className="h-4 w-4 text-cyan-400" />
              <span>Задать вопрос инженеру</span>
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}
