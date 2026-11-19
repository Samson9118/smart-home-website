import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export const metadata: Metadata = {
  title: 'Умный климат-контроль и теплые полы | SmartHome Lab',
  description: 'Автоматизация отопления, кондиционирования, теплых полов и приточной вентиляции по датчикам температуры, влажности и CO2. Экономия до 35% на отоплении.',
};

const CLIMATE_FEATURES = [
  {
    title: 'Покомнатное управление радиаторами отопления',
    desc: 'Беспроводные Zigbee термоголовки регулируют подачу теплоносителя в каждой комнате индивидуально. В спальне ночью поддерживается 19.5°C, в детской 22°C, а в пустых комнатах температура снижается.',
    badge: 'Zigbee термоголовки',
  },
  {
    title: 'Умные термостаты теплых полов',
    desc: 'Интеграция электрических и водяных теплых полов. Автоматический прогрев плитки в ванной к вашему пробуждению и переход в режим экономии, когда дома никого нет.',
    badge: 'Теплый пол 220В',
  },
  {
    title: 'Интеграция кондиционеров без костылей',
    desc: 'Связываем сплит-системы (Daikin, Mitsubishi, Haier, Gree) с умным домом через ИК-шлюзы или сухие контакты плат управления. Кондиционер никогда не работает против открытого окна.',
    badge: 'Сплит-системы',
  },
  {
    title: 'Контроль свежести воздуха (CO2 и бризеры)',
    desc: 'Растет уровень углекислого газа (CO2 > 800 ppm)? Умный дом автоматически увеличивает скорость приточной вентиляции или бризера (Tion, Xiaomi), возвращая бодрость и чистый кислород.',
    badge: 'CO2 & Влажность',
  },
  {
    title: 'Сценарий «Проветривание»',
    desc: 'При открытии окна герконовый датчик моментально перекрывает термоголовку радиатора и отключает кондиционер, чтобы вы не грели и не охлаждали улицу.',
    badge: 'Экономия до 35%',
  },
  {
    title: 'Увлажнение и защита от сухого воздуха',
    desc: 'Зимой влажность в квартирах с центральным отоплением падает до опасных 20%. Система поддерживает здоровые 45-55% RH, управляя ультразвуковыми и традиционными увлажнителями.',
    badge: 'Здоровый сон',
  },
];

export default function ClimatePage() {
  return (
    <div className="py-12 sm:py-16 bg-slate-950 text-white min-h-screen">
      <Container>
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8">
          <Link href="/" className="hover:text-amber-400">Главная</Link>
          <span>/</span>
          <Link href="/services" className="hover:text-amber-400">Услуги</Link>
          <span>/</span>
          <span className="text-cyan-400 font-semibold">Умный климат</span>
        </nav>

        {/* Hero Section */}
        <div className="max-w-4xl mb-16">
          <Badge variant="cyan" className="mb-4">
            🌡 Автоматический микроклимат
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            Идеальный климат <br />
            <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-amber-400 bg-clip-text text-transparent">
              в каждой комнате без ручной настройки
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed">
            Связываем отопление, теплые полы, кондиционеры и вентиляцию в единую согласованную систему.
            Забудьте о битвах за пульт от кондиционера и духоте по утрам.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/calculator">
              <Button size="lg">Рассчитать стоимость климат-контроля</Button>
            </Link>
            <Link href="/portfolio">
              <Button variant="outline" size="lg">Смотреть примеры щитов →</Button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="mb-20">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-8">
            Как работает умный климат-контроль
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CLIMATE_FEATURES.map((f, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                    {f.badge}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-4 mb-2">{f.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Integration Architecture Block */}
        <div className="mb-20 p-8 rounded-3xl bg-slate-900/80 border border-slate-800">
          <h2 className="text-2xl font-bold text-white mb-4">
            Почему климатические системы конфликтуют без единого центра?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-slate-300 leading-relaxed">
            <div>
              <div className="text-amber-400 font-bold mb-2">Обычная квартира:</div>
              <p>
                Батарея жарит на полную мощность, в комнате становится душно. Вы включаете кондиционер на охлаждение.
                В итоге приборы борются друг с другом, счёт за электричество растёт, а на полу образуется сквозняк.
              </p>
            </div>
            <div>
              <div className="text-cyan-400 font-bold mb-2">С системой SmartHome Lab:</div>
              <p>
                Единый алгоритм отслеживает реальную температуру и влажность. Если нужно охладить комнату — сначала плавно
                перекрывается термоголовка батареи. Если открыто окно — кондиционер останавливается сам.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-emerald-950/40 border border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold text-white">Узнайте, как автоматизировать ваш климат</h3>
            <p className="text-slate-300 text-sm mt-1 max-w-xl">
              Подскажем, какие термоголовки подойдут к вашим радиаторам и как скрыто подключить кондиционеры к Zigbee / Matter.
            </p>
          </div>
          <Link href="/contacts">
            <Button size="lg" className="whitespace-nowrap">Связаться с инженером</Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}
