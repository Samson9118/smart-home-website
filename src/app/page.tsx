import React from 'react';
import Link from 'next/link';
import {
  Lightbulb,
  Thermometer,
  ShieldAlert,
  Camera,
  ArrowRight,
  BookOpen,
  Radio,
  Calculator,
} from 'lucide-react';
import { Hero } from '@/components/home/Hero';
import { DynamicDayCycle } from '@/components/home/DynamicDayCycle';
import { InteractiveMeshDiagram } from '@/components/home/InteractiveMeshDiagram';
import { WorkflowSteps } from '@/components/home/WorkflowSteps';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { articles } from '@/data/articles';

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
    title: 'Камеры, домофоны и замки',
    desc: 'Биометрические смарт-замки Matter/Thread, умные домофоны с SIP и камеры с локальным хранилищем на NVR.',
    color: 'from-purple-500/20 to-purple-600/5 text-purple-400 border-purple-500/30 hover:border-purple-400',
  },
];

export default function HomePage() {
  return (
    <>
      {/* 1. Modernized Hero */}
      <Hero />

      {/* 2. Interactive Scroll-driven Day Cycle Lighting Experience */}
      <DynamicDayCycle />

      {/* 3. Core Systems Navigator (Разгруженные карточки с прямыми ссылками на новые страницы) */}
      <section className="py-20 bg-slate-950 border-t border-slate-850">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-12">
            <Badge variant="amber" className="mb-3">
              Четыре контура автоматизации
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Выберите инженерное направление
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-300">
              Каждая система может работать автономно или объединяться в единый слаженный организм.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CORE_SYSTEMS.map((sys) => {
              const Icon = sys.icon;
              return (
                <Link
                  key={sys.title}
                  href={sys.href}
                  className={`group relative p-6 rounded-2xl border bg-gradient-to-br ${sys.color} transition-all duration-300 flex flex-col justify-between hover:scale-[1.02] hover:shadow-xl`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-slate-950/80 border border-white/10 flex items-center justify-center">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 border border-white/10">
                        {sys.badge}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
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

      {/* 4. Wireless Mesh Architecture */}
      <InteractiveMeshDiagram />

      {/* 6. Knowledge Base & Protocol Articles Teaser */}
      <section className="py-20 bg-slate-900/60 border-t border-slate-800">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-6">
              <Badge variant="cyan">База знаний и протоколы</Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Учитесь и понимайте свой умный дом
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Мы открыто делимся 8-летним инженерным опытом: как устроена сеть Zigbee 3.0, чем отличается Matter от Thread,
                как смонтировать реле без нуля и почему mmWave радары превосходят обычные датчики движения.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link href="/knowledge">
                  <Button variant="primary" size="md" icon={<BookOpen className="h-4 w-4" />}>
                    Гид по монтажу датчиков
                  </Button>
                </Link>
                <Link href="/articles">
                  <Button variant="secondary" size="md" icon={<Radio className="h-4 w-4" />}>
                    Все статьи о протоколах
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {articles.slice(0, 2).map((art) => (
                <div
                  key={art.slug}
                  className="p-6 rounded-2xl bg-slate-950 border border-slate-800 hover:border-amber-500/50 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider mb-2">
                      {art.readingTime} чтения • {art.category}
                    </div>
                    <h3 className="text-base font-bold text-white mb-2 line-clamp-2">
                      <Link href={`/articles/${art.slug}`} className="hover:text-amber-400">
                        {art.title}
                      </Link>
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-4">
                      {art.summary}
                    </p>
                  </div>
                  <Link
                    href={`/articles/${art.slug}`}
                    className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                  >
                    Читать статью →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 7. Turnkey Workflow Steps */}
      <WorkflowSteps />

      {/* 8. Interactive Calculator CTA Banner */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900 border-t border-slate-800 text-center">
        <Container>
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Рассчитайте персональную смету за 2 минуты
            </h2>
            <p className="text-slate-300 text-base">
              Укажите площадь, количество комнат и выберите бренд оборудования.
              Мгновенный расчёт стоимости оборудования, монтажа и скачивание PDF-сметы.
            </p>
            <div className="pt-2">
              <Link href="/calculator">
                <Button size="lg" icon={<Calculator className="h-5 w-5" />}>
                  Открыть онлайн-калькулятор сметы
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
