import React from 'react';
import Link from 'next/link';
import {
  Lightbulb,
  Thermometer,
  ShieldAlert,
  Camera,
  ArrowRight,
  Calculator,
  Cpu,
} from 'lucide-react';
import { Hero } from '@/components/home/Hero';
import { CinematicRoomExperience } from '@/components/home/CinematicRoomExperience';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

const CORE_SYSTEMS = [
  {
    icon: Lightbulb,
    href: '/services/lighting',
    badge: 'Свет & Биоритмы',
    title: 'Умное освещение',
    desc: 'Микромодули без нуля в подрозетники, циркадные сценарии по биоритмам и mmWave радары присутствия.',
    color: 'from-amber-500/20 to-amber-600/5 text-amber-400 border-amber-500/30 hover:border-amber-400',
  },
  {
    icon: Thermometer,
    href: '/services/climate',
    badge: 'Микроклимат',
    title: 'Климат и тёплые полы',
    desc: 'Покомнатные Zigbee термоголовки, автоматика кондиционеров и приточной вентиляции по уровню CO2.',
    color: 'from-cyan-500/20 to-cyan-600/5 text-cyan-400 border-cyan-500/30 hover:border-cyan-400',
  },
  {
    icon: ShieldAlert,
    href: '/services/security',
    badge: 'Аварийная защита',
    title: 'Безопасность и протечки',
    desc: 'Шаровые краны 12V с перекрытием за 8-10 секунд, прямое Zigbee связывание без интернета, охрана периметра.',
    color: 'from-emerald-500/20 to-emerald-600/5 text-emerald-400 border-emerald-500/30 hover:border-emerald-400',
  },
  {
    icon: Camera,
    href: '/services/surveillance',
    badge: 'Приватность 100%',
    title: 'Видеонаблюдение и замки',
    desc: 'Биометрические смарт-замки Matter/Thread, умные домофоны с SIP и камеры с локальным хранилищем на NVR.',
    color: 'from-purple-500/20 to-purple-600/5 text-purple-400 border-purple-500/30 hover:border-purple-400',
  },
];

export default function HomePage() {
  return (
    <>
      {/* 1. Hero: УТП + 2 главные кнопки («Рассчитать смету» и «Услуги») */}
      <Hero />

      {/* 2. Фотореалистичный Sticky Scroll-Driven блок «Один день в умном доме» */}
      <CinematicRoomExperience />

      {/* 3. Компактная сетка из 4 направлений услуг со ссылками на отдельные страницы */}
      <section className="py-20 lg:py-24 bg-[#090D16] border-t border-slate-800/80">
        <Container>
          <div className="mx-auto max-w-2xl text-center mb-12 sm:mb-16">
            <Badge variant="amber" className="mb-3">
              Инженерные направления
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Четыре контура умного дома
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-300">
              Выберите систему для детального ознакомления с оборудованием, схемами подключения и готовыми тарифами:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CORE_SYSTEMS.map((sys) => {
              const Icon = sys.icon;
              return (
                <Link
                  key={sys.title}
                  href={sys.href}
                  className={`group relative p-6 sm:p-7 rounded-2xl border bg-gradient-to-br ${sys.color} transition-all duration-300 flex flex-col justify-between hover:scale-[1.02] hover:shadow-2xl`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-xl bg-slate-950/80 border border-white/10 flex items-center justify-center">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 border border-white/10">
                        {sys.badge}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2.5 group-hover:text-amber-300 transition-colors">
                      {sys.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {sys.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-slate-300 group-hover:text-white">
                    <span>Подробнее о системе</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 4. Короткий лаконичный финальный CTA-блок перехода в калькулятор сметы */}
      <section className="py-20 bg-gradient-to-b from-[#090D16] to-[#0D1322] border-t border-slate-800 text-center relative overflow-hidden">
        <Container>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
              <Cpu className="h-3.5 w-3.5" />
              <span>Расчёт спецификации за 2 минуты</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Готовы узнать стоимость вашего умного дома?
            </h2>
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Укажите тип объекта, площадь и количество комнат. Наш онлайн-калькулятор мгновенно подберёт
              реле, датчики и хабы с точной сметой и возможностью скачать PDF.
            </p>
            <div className="pt-3 flex flex-wrap justify-center gap-4">
              <Link href="/calculator">
                <Button size="lg" icon={<Calculator className="h-5 w-5" />}>
                  Рассчитать PDF-смету
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="outline" size="lg">
                  Все тарифы и услуги →
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
