import React from 'react';
import {
  Lightbulb,
  Thermometer,
  ShieldAlert,
  Blinds,
  Sliders,
  Calculator,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';
import { Hero } from '@/components/home/Hero';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { siteConfig } from '@/config/site';

const keySystems = [
  {
    icon: Lightbulb,
    title: 'Умное освещение',
    desc: 'Беспроводные микромодули и умные выключатели в стандартные подрозетники. Плавное диммирование, биодинамический свет и сценарии присутствия.',
    color: 'from-amber-500/20 to-amber-600/5 text-amber-400 border-amber-500/30',
  },
  {
    icon: Thermometer,
    title: 'Климат и тёплые полы',
    desc: 'Управление радиаторами, кондиционерами и сервоприводами тёплого пола по точным датчикам температуры и влажности в каждой комнате.',
    color: 'from-cyan-500/20 to-cyan-600/5 text-cyan-400 border-cyan-500/30',
  },
  {
    icon: ShieldAlert,
    title: 'Защита от протечек',
    desc: 'Беспроводные датчики протечки с прямым перекрытием кранов за 5 секунд даже без интернета. Моментальное оповещение на телефон.',
    color: 'from-emerald-500/20 to-emerald-600/5 text-emerald-400 border-emerald-500/30',
  },
  {
    icon: Blinds,
    title: 'Электрокарнизы и шторы',
    desc: 'Бесшумные электроприводы для штор и рулонных жалюзи. Автоматическое открытие на рассвете и закрытие в режиме «Кино».',
    color: 'from-purple-500/20 to-purple-600/5 text-purple-400 border-purple-500/30',
  },
  {
    icon: Sliders,
    title: 'Мультирум и безопасность',
    desc: 'Датчики открытия дверей, датчики движения и присутствия с контролем периметра и push-уведомлениями в Telegram.',
    color: 'from-blue-500/20 to-blue-600/5 text-blue-400 border-blue-500/30',
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Systems Preview Section */}
      <section className="py-16 lg:py-24 border-t border-slate-800/80 bg-dark-950/60">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="amber" className="mb-3">
              Возможности системы
            </Badge>
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Что умеет современный беспроводной дом
            </h2>
            <p className="mt-4 text-base text-slate-400">
              Все элементы связываются в единую отказоустойчивую сеть с управлением из одного приложения и голосом через Алису.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {keySystems.map((system) => {
              const Icon = system.icon;
              return (
                <div
                  key={system.title}
                  className={`glass-card glass-card-hover rounded-2xl p-6 border bg-gradient-to-br ${system.color}`}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-dark-900 border border-white/10 mb-5">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2.5">
                    {system.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-300">
                    {system.desc}
                  </p>
                </div>
              );
            })}

            {/* CTA Card in Grid */}
            <div className="glass-card rounded-2xl p-6 border border-amber-500/40 bg-gradient-to-br from-amber-500/10 via-dark-900 to-dark-950 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
                  Интерактивный расчёт
                </span>
                <h3 className="text-xl font-bold text-white mt-2 mb-3">
                  Хотите узнать стоимость под ваш объект?
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Выберите площадь квартиры или дома, бренд оборудования и получите готовую спецификацию за 2 минуты.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-amber-500/20">
                <Button
                  href="/calculator"
                  variant="primary"
                  size="md"
                  icon={<Calculator className="h-4 w-4" />}
                  className="w-full"
                >
                  Перейти в калькулятор
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Trust & Brands Section */}
      <section className="py-16 lg:py-20 border-t border-slate-800/80">
        <Container>
          <div className="rounded-3xl border border-slate-800 bg-gradient-to-b from-dark-900/90 to-dark-950/90 p-8 lg:p-12 shadow-glow-glass relative overflow-hidden">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <Badge variant="cyan" className="mb-3">
                  Платформы и экосистемы
                </Badge>
                <h2 className="text-2xl font-bold text-white sm:text-3xl">
                  Свобода выбора без привязки к одному бренду
                </h2>
                <p className="mt-4 text-slate-300 leading-relaxed">
                  Мы проектируем гибкие гибридные системы: например, силовые реле Sonoff в щите, дизайнерские датчики и беспроводные выключатели Aqara в комнатах, а в качестве мозгов — сервер Home Assistant или локальный Sprut.hub.
                </p>
                <div className="mt-6 space-y-2.5">
                  <div className="flex items-center gap-2.5 text-sm text-slate-200">
                    <CheckCircle className="h-4 w-4 text-cyan-400 shrink-0" />
                    <span>Поддержка российских экосистем: Яндекс Алиса, Сбер Салют</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-slate-200">
                    <CheckCircle className="h-4 w-4 text-cyan-400 shrink-0" />
                    <span>Совместимость с Apple HomeKit через Matter и Home Assistant</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-slate-200">
                    <CheckCircle className="h-4 w-4 text-cyan-400 shrink-0" />
                    <span>Полный доступ к коду автоматизаций и настройкам для заказчика</span>
                  </div>
                </div>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Button href="/calculator" variant="primary" size="md">
                    Рассчитать смету
                  </Button>
                  <Button href="/services" variant="secondary" size="md" icon={<ArrowRight className="h-4 w-4" />} iconPosition="right">
                    Все услуги и тарифы
                  </Button>
                </div>
              </div>

              {/* Brands matrix */}
              <div className="grid grid-cols-2 gap-4">
                {siteConfig.supportedBrands.map((b) => (
                  <div
                    key={b.name}
                    className="rounded-2xl border border-slate-800 bg-dark-950/80 p-5 text-center transition-colors hover:border-slate-700"
                  >
                    <span className="text-xl font-bold text-white tracking-wide">
                      {b.name}
                    </span>
                    <p className="mt-1 text-xs text-slate-400">{b.category}</p>
                  </div>
                ))}
                <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/5 p-5 text-center">
                  <span className="text-xl font-bold text-cyan-400 tracking-wide">
                    Home Assistant
                  </span>
                  <p className="mt-1 text-xs text-slate-400">Локальный сервер</p>
                </div>
                <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5 text-center">
                  <span className="text-xl font-bold text-amber-400 tracking-wide">
                    Яндекс Алиса
                  </span>
                  <p className="mt-1 text-xs text-slate-400">Голосовой помощник</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
