import React from 'react';
import type { Metadata } from 'next';
import {
  CheckCircle,
  Calculator,
  Send,
  Sparkles,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ScenarioSwitcher } from '@/components/services/ScenarioSwitcher';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Услуги и готовые комплекты умного дома',
  description:
    'Проектирование и монтаж систем освещения, климата, электрокарнизов и защиты от протечек на базе Aqara, Sonoff, Sprut и Tuya.',
};

const packages = [
  {
    title: '«Защита и безопасность»',
    target: 'Студии и 1-комнатные квартиры',
    price: 'от 49 000 ₽',
    badge: 'Быстрый старт',
    badgeColor: 'text-blue-400 border-blue-500/30 bg-blue-500/10',
    description: 'Базовый комплект для защиты квартиры от затопления, пожара и взлома входной зоны.',
    items: [
      'Умная колонка Яндекс Станция с Zigbee',
      '2 крана с электроприводом Bugatti (ГВС/ХВС)',
      '3 беспроводных датчика протечки воды',
      'Датчик открытия входной двери с оповещением',
      'Чистовой монтаж и настройка сценариев за 1 день',
    ],
  },
  {
    title: '«Оптимальный комфорт»',
    target: '2–3 комнатные квартиры',
    price: 'от 95 000 ₽',
    badge: 'Хит продаж',
    badgeColor: 'text-amber-400 border-amber-500/30 bg-amber-500/15',
    description: 'Полный контроль света, климата и безопасности с голосовым управлением Алисой.',
    items: [
      'Центральный хаб Aqara Hub M3 или Home Assistant',
      'Умное освещение: 8-12 групп света (реле без нуля)',
      '3 датчика микроклимата + управление кондиционером',
      'Комплекс защиты от протечек с автоперекрытием',
      'Беспроводные выключатели со сценарием «Выключить всё»',
      'Монтаж за 1-2 дня без повреждения чистовой отделки',
    ],
  },
  {
    title: '«Флагман / Под ключ»',
    target: 'Большие квартиры и загородные дома',
    price: 'от 175 000 ₽',
    badge: 'Максимум возможностей',
    badgeColor: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/15',
    description: 'Бескомпромиссная локальная система с электрокарнизами, радарами присутствия и резервированием.',
    items: [
      'Локальный сервер Home Assistant на Mini-PC + Sprut.stick',
      'Умное освещение во всех комнатах + биодинамика',
      'Покомнатное управление радиаторами и тёплым полом',
      'Электрокарнизы для штор в спальне и гостиной',
      'Радары присутствия человека mmWave FP1E/FP2',
      'Полная интеграция с Алисой, Siri и Telegram-ботом',
    ],
  },
];

const ecosystemComparison = [
  {
    name: 'Home Assistant + Sprut.stick',
    pros: '100% автономность, любые бренды, сложные сценарии, дашборды на планшет',
    cons: 'Требует первичной профессиональной настройки инженером',
    local: '100% Локально',
    voice: 'Алиса, Siri, Google',
  },
  {
    name: 'Sprut.hub CE (Россия)',
    pros: 'Отечественная разработка, стабильный быстрый отклик, нативный HomeKit и Алиса',
    cons: 'Чуть выше стоимость аппаратного контроллера',
    local: '100% Локально',
    voice: 'Алиса, Apple HomeKit',
  },
  {
    name: 'Aqara Home (Хаб M3)',
    pros: 'Официальный флагман, поддержка Matter, элегантный дизайн, простое приложение',
    cons: 'Ориентирован преимущественно на датчики экосистемы Aqara',
    local: 'Локально для Zigbee/Matter',
    voice: 'Алиса, Siri, Google, Салют',
  },
  {
    name: 'Яндекс Станция с Zigbee',
    pros: 'Голос прямо из коробки, не нужен отдельный хаб, простое добавление',
    cons: 'Сложные ветвистые сценарии ограничены возможностями приложения',
    local: 'Частично (только простые связки)',
    voice: 'Яндекс Алиса',
  },
];

export default function ServicesPage() {
  return (
    <div className="py-12 sm:py-16 lg:py-20 space-y-20 sm:space-y-28">
      {/* 1. Services Hero */}
      <section>
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="amber" dot className="mb-3">
              <Sparkles className="h-3 w-3 text-amber-400" />
              Готовые решения под ключ
            </Badge>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Услуги и пакеты автоматизации
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              От точечной защиты от протечек до комплексного умного дома премиум-класса на базе Zigbee 3.0, Matter и Thread.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button href="/calculator" variant="primary" size="lg" icon={<Calculator className="h-5 w-5" />}>
                Рассчитать персональную смету
              </Button>
              <a
                href={`https://t.me/${siteConfig.telegramBot}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-dark-800 px-6 py-3.5 text-sm font-semibold text-slate-200 hover:text-white hover:border-cyan-500/50 transition-all"
              >
                <Send className="h-4 w-4 text-cyan-400" />
                <span>Консультация с инженером</span>
              </a>
            </div>

            {/* Sub-specialization Navigation Pills */}
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
              <a
                href="/services/lighting"
                className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 transition-all group"
              >
                <span className="text-xl">💡</span>
                <div className="text-xs font-bold text-white mt-2 group-hover:text-amber-400">Умный свет</div>
                <div className="text-[11px] text-slate-400">Циркадность & mmWave →</div>
              </a>
              <a
                href="/services/climate"
                className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 transition-all group"
              >
                <span className="text-xl">🌡</span>
                <div className="text-xs font-bold text-white mt-2 group-hover:text-cyan-400">Климат-контроль</div>
                <div className="text-[11px] text-slate-400">Теплый пол & CO2 →</div>
              </a>
              <a
                href="/services/security"
                className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-all group"
              >
                <span className="text-xl">🛡</span>
                <div className="text-xs font-bold text-white mt-2 group-hover:text-emerald-400">Защита от протечек</div>
                <div className="text-[11px] text-slate-400">Краны 12V за 10 сек →</div>
              </a>
              <a
                href="/services/surveillance"
                className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-purple-500/50 transition-all group"
              >
                <span className="text-xl">📹</span>
                <div className="text-xs font-bold text-white mt-2 group-hover:text-purple-400">Камеры & Замки</div>
                <div className="text-[11px] text-slate-400">Локальный NVR архив →</div>
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Interactive Scenarios Section */}
      <section>
        <Container>
          <div className="mx-auto max-w-2xl text-center mb-10">
            <Badge variant="cyan" className="mb-2">
              Сценарии комфорта
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Попробуйте сценарии умного дома в действии
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Нажмите на сценарий, чтобы увидеть, какие устройства срабатывают синхронно
            </p>
          </div>

          <ScenarioSwitcher />
        </Container>
      </section>

      {/* 3. Ready-Made Turnkey Packages */}
      <section className="border-t border-slate-800/80 pt-16 sm:pt-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Готовые комплекты
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-1">
              Популярные пакеты с монтажом и гарантией
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-400">
              В каждый пакет включено оборудование, выезд инженера, чистовой монтаж и пусконаладка сценариев
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.title}
                className="glass-card glass-card-hover rounded-3xl p-7 border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${pkg.badgeColor}`}>
                      {pkg.badge}
                    </span>
                    <span className="text-xs text-slate-400">{pkg.target}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-1">{pkg.title}</h3>
                  <div className="text-2xl font-extrabold text-amber-400 mb-3">{pkg.price}</div>
                  <p className="text-xs text-slate-300 mb-6 leading-relaxed">{pkg.description}</p>

                  <div className="space-y-2.5 border-t border-slate-800 pt-5 text-xs text-slate-300">
                    {pkg.items.map((it, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <CheckCircle className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{it}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-5 border-t border-slate-800">
                  <Button href="/calculator" variant="primary" size="md" className="w-full">
                    Настроить в калькуляторе
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. Ecosystem Comparison Table */}
      <section className="border-t border-slate-800/80 pt-16 sm:pt-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center mb-12">
            <Badge variant="cyan" className="mb-2">
              Сравнение экосистем
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Какую платформу выбрать для вашего дома?
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Помогаем подобрать центральный хаб под ваши задачи, требования к приватности и бюджет
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-dark-950">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="border-b border-slate-800 bg-dark-900 text-slate-300 uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="p-4 sm:p-5">Платформа / Хаб</th>
                  <th className="p-4 sm:p-5">Преимущества</th>
                  <th className="p-4 sm:p-5">Особенности</th>
                  <th className="p-4 sm:p-5">Локальная работа</th>
                  <th className="p-4 sm:p-5">Голос</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {ecosystemComparison.map((eco) => (
                  <tr key={eco.name} className="hover:bg-dark-900/50 transition-colors">
                    <td className="p-4 sm:p-5 font-bold text-white">{eco.name}</td>
                    <td className="p-4 sm:p-5 text-slate-200">{eco.pros}</td>
                    <td className="p-4 sm:p-5 text-slate-400">{eco.cons}</td>
                    <td className="p-4 sm:p-5 font-semibold text-emerald-400">{eco.local}</td>
                    <td className="p-4 sm:p-5 font-semibold text-amber-400">{eco.voice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>
    </div>
  );
}
