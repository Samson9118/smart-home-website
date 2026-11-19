import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export const metadata: Metadata = {
  title: 'Умное освещение и биоритмы | Проектирование и монтаж под ключ',
  description: 'Проектирование и монтаж систем умного освещения в Москве и МО: микромодули в подрозетники с нулём и без нуля, циркадный свет, трековые системы, шторы, mmWave радары присутствия.',
};

const LIGHTING_FEATURES = [
  {
    title: 'Монтаж без штробления и переделки ремонта',
    desc: 'Устанавливаем компактные Zigbee микромодули (Sonoff ZBMiniL2, Aqara T1) прямо в существующие подрозетники за механическими клавишами. Работают даже при отсутствии нулевого провода (No Neutral).',
    badge: 'Скрытый монтаж',
  },
  {
    title: 'Биодинамический (циркадный) свет',
    desc: 'Автоматическая подстройка цветовой температуры в течение дня: бодрящий холодный белый 5500K утром и днём для продуктивности, теплый янтарный 2700K вечером для естественной выработки мелатонина.',
    badge: 'Здоровье и сон',
  },
  {
    title: 'Радары присутствия человека (mmWave)',
    desc: 'В отличие от примитивных ИК-датчиков движения, радары фиксируют дыхание сидящего или спящего человека. Свет в кабинете, спальне или санузле никогда не выключится случайно.',
    badge: '24/60 ГГц радары',
  },
  {
    title: 'Умные карнизы и римские шторы',
    desc: 'Автоматическое открытие на рассвете и закрытие на закате по астрономическому таймеру. Синхронизация с датчиками освещенности и сценарием «Домашний кинотеатр».',
    badge: 'Бесшумные моторы',
  },
  {
    title: 'Адресная контурная подсветка (WLED)',
    desc: 'Скрытая подсветка парящих потолков, теневых плинтусов и кухонных фартуков с плавным бегущим включением и мягким ночным режимом на 10% яркости.',
    badge: 'RGBW / CCT',
  },
  {
    title: 'Сценарные беспроводные выключатели',
    desc: 'Наклейте выключатель в любое удобное место (у кровати, у входной двери, на стекло). Кнопка «Выключить всё» гасит свет во всей квартире одним касанием.',
    badge: 'До 5 лет на батарейке',
  },
];

const PACKAGES = [
  {
    name: 'Базовый: Квартира-студия / 1-комн.',
    price: 'от 38 000 ₽',
    equipment: 'Sonoff / Tuya Zigbee',
    includes: [
      'До 6 групп управляемого освещения',
      'Микромодули без нуля в подрозетники',
      '2 беспроводных дублирующих выключателя',
      'Координатор Zigbee 3.0 + настройка шлюза',
      'Сценарий «Выключить всё» при выходе',
      'Голосовое управление (Алиса / Маруся)',
    ],
  },
  {
    name: 'Оптимум: 2-3 комнатная квартира',
    price: 'от 79 000 ₽',
    equipment: 'Aqara / Sonoff Zigbee 3.0',
    popular: true,
    includes: [
      'До 16 групп света (диммирование, треки, ленты)',
      '3 радарных датчика присутствия mmWave',
      '2 электрокарниза для штор с Zigbee моторами',
      'Сценарный пульт у изголовья кровати',
      'Циркадное автоматическое освещение',
      'Интеграция в Apple Home / Home Assistant',
    ],
  },
  {
    name: 'Премиум / Локальный: Коттедж / Пентхаус',
    price: 'от 145 000 ₽',
    equipment: 'Sprut.hub + Aqara Pro + WLED',
    includes: [
      'Неограниченное число групп DALI / Zigbee',
      'Адресная подсветка лестниц и теневых плинтусов',
      'Уличный архитектурный и ландшафтный свет',
      '100% локальный сервер без зависимости от интернета',
      'Прямое связывание (Binding) устройств со скоростью 15 мс',
      'Гарантия на монтаж и оборудование 3 года',
    ],
  },
];

export default function LightingPage() {
  return (
    <div className="py-12 sm:py-16 bg-slate-950 text-white min-h-screen">
      <Container>
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8">
          <Link href="/" className="hover:text-amber-400">Главная</Link>
          <span>/</span>
          <Link href="/services" className="hover:text-amber-400">Услуги</Link>
          <span>/</span>
          <span className="text-amber-400 font-semibold">Умное освещение</span>
        </nav>

        {/* Hero Section */}
        <div className="max-w-4xl mb-16">
          <Badge variant="amber" className="mb-4">
            💡 Интеллектуальный свет & Биоритмы
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            Умное освещение, <br />
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-cyan-400 bg-clip-text text-transparent">
              которое чувствует ваше присутствие
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed">
            От мягкого циркадного рассвета до полного погружения в атмосферу вечернего киносеанса.
            Монтируем умные микромодули в подрозетники без повреждения отделки и штробления стен.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/calculator">
              <Button size="lg">Рассчитать стоимость освещения</Button>
            </Link>
            <Link href="/knowledge#relay-wiring-neutral-vs-no-neutral">
              <Button variant="outline" size="lg">Схема монтажа без нуля →</Button>
            </Link>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="mb-20">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-8">
            Что даёт умное освещение SmartHome Lab
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {LIGHTING_FEATURES.map((f, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                    {f.badge}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-4 mb-2">{f.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Turnkey Packages */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-white">Готовые решения под ключ</h2>
            <p className="text-sm text-slate-400 mt-2">
              Включают сертифицированное оборудование, инженерный монтаж, программирование сценариев и обучение.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {PACKAGES.map((pkg, idx) => (
              <div
                key={idx}
                className={`relative p-8 rounded-2xl border flex flex-col justify-between ${
                  pkg.popular
                    ? 'bg-gradient-to-b from-slate-900 via-slate-900 to-amber-950/30 border-amber-500/60 shadow-xl shadow-amber-500/10'
                    : 'bg-slate-900/60 border-slate-800'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-black uppercase tracking-wider shadow">
                    Хит выбора заказчиков
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-bold text-white">{pkg.name}</h3>
                  <div className="text-xs text-cyan-400 font-mono mt-1 mb-4">{pkg.equipment}</div>
                  <div className="text-3xl font-black text-amber-400 mb-6">{pkg.price}</div>
                  <ul className="space-y-3 text-sm text-slate-300 mb-8">
                    {pkg.includes.map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="text-emerald-400 font-bold">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link href="/calculator" className="w-full">
                  <Button variant={pkg.popular ? 'primary' : 'outline'} className="w-full">
                    Выбрать этот комплект
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* CTA banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-cyan-950/40 border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold text-white">Нужен индивидуальный световой проект?</h3>
            <p className="text-slate-300 text-sm mt-1 max-w-xl">
              Пришлите дизайн-проект или план квартиры — инженер рассчитает точное количество реле, блоков питания и карнизов за 2 часа.
            </p>
          </div>
          <Link href="/contacts">
            <Button size="lg" className="whitespace-nowrap">Получить консультацию инженера</Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}
