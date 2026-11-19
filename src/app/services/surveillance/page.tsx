import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export const metadata: Metadata = {
  title: 'Видеонаблюдение, умные домофоны и замки | SmartHome Lab',
  description: 'Монтаж биометрических смарт-замков (Matter/Zigbee), умных видеодомофонов и поворотных 2K/4K камер. 100% приватность: локальный архив на NAS/NVR без передачи видео в зарубежные облака.',
};

const SURVEILLANCE_ITEMS = [
  {
    title: 'Биометрические смарт-замки (Aqara, Kaadas, Philips)',
    desc: 'Вход без ключей: отпечаток пальца (распознавание 0.5 сек), Apple Home Key в Apple Watch/iPhone, NFC-метки и одноразовые PIN-коды для клининга или курьера. Автоматическое запирание при закрытии двери.',
    badge: 'Биометрия & Matter',
  },
  {
    title: 'Умные видеодомофоны с трансляцией на ТВ и смартфон',
    desc: 'Звонок в дверь выводит изображение гостя на экраны телевизоров, планшеты на стене и смартфон. Вы можете поговорить с курьером и открыть дверь удалённо из любой точки мира.',
    badge: 'SIP & Home Assistant',
  },
  {
    title: 'Локальное видеонаблюдение 2K/4K без абонентской платы',
    desc: 'Поворотные и купольные камеры с поддержкой ночного видения и распознавания людей/животных. Видеопоток пишется на локальный регистратор NVR / домашний сервер NAS (Synology, TrueNAS).',
    badge: 'Локальный архив NVR',
  },
  {
    title: 'Шторка приватности (Privacy Shutter)',
    desc: 'Когда вы возвращаетесь домой и снимаете систему с охраны, камеры внутри комнат физически закрывают объектив шторкой или отворачиваются в стену. Ваша личная жизнь защищена на 100%.',
    badge: 'Полная приватность',
  },
  {
    title: 'Детекция движения и распознавание лиц локальным ИИ',
    desc: 'Камеры с нейросетевым детектором (Frigate NVR / Coral TPU) отличают члена семьи от незнакомца, игнорируют движение веток за окном или робота-пылесоса.',
    badge: 'AI Frigate / Coral',
  },
  {
    title: 'Связка замка со сценариями дома',
    desc: 'Каждый член семьи может запускать персонализированный сценарий: папа заходит — включается один свет и радио Business FM; ребёнок заходит — включается теплый свет и родителям приходит пуш «Ребёнок дома».',
    badge: 'Персонализация',
  },
];

export default function SurveillancePage() {
  return (
    <div className="py-12 sm:py-16 bg-slate-950 text-white min-h-screen">
      <Container>
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8">
          <Link href="/" className="hover:text-amber-400">Главная</Link>
          <span>/</span>
          <Link href="/services" className="hover:text-amber-400">Услуги</Link>
          <span>/</span>
          <span className="text-purple-400 font-semibold">Видеонаблюдение и замки</span>
        </nav>

        {/* Hero Section */}
        <div className="max-w-4xl mb-16">
          <Badge variant="cyan" className="mb-4">
            📹 Видеонаблюдение & Умные замки
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            Контроль доступа и видео, <br />
            <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-amber-400 bg-clip-text text-transparent">
              где приватность стоит на первом месте
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed">
            Умные замки с биометрией, домофоны с переадресацией на телефон и камеры с локальным хранением данных.
            Никаких платных подписок за хранение видео и никаких утечек в сторонние китайские облака.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/calculator">
              <Button size="lg">Рассчитать стоимость системы</Button>
            </Link>
            <Link href="/contacts">
              <Button variant="outline" size="lg">Заказать подбор замка под дверь →</Button>
            </Link>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="mb-20">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-8">
            Оборудование и возможности видеоконтроля
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SURVEILLANCE_ITEMS.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-purple-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20">
                    {item.badge}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-4 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy Comparison Table */}
        <div className="mb-20 p-8 rounded-3xl bg-slate-900 border border-slate-800">
          <h2 className="text-2xl font-bold text-white mb-6">
            Сравнение: Обычные облачные камеры vs Локальная система SmartHome Lab
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-xs text-slate-400 uppercase">
                  <th className="py-3 px-4">Параметр</th>
                  <th className="py-3 px-4 text-rose-400">Обычные китайские облачные камеры</th>
                  <th className="py-3 px-4 text-emerald-400 font-bold">Решение SmartHome Lab (NVR / Home Assistant)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                <tr>
                  <td className="py-3 px-4 font-semibold text-white">Где хранится видео</td>
                  <td className="py-3 px-4 text-slate-400">Серверы в Китае / США, риск блокировки</td>
                  <td className="py-3 px-4 text-emerald-400">На локальном защищённом диске внутри вашей квартиры</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-white">Абонентская плата</td>
                  <td className="py-3 px-4 text-slate-400">300-800 ₽/мес за каждую камеру</td>
                  <td className="py-3 px-4 text-emerald-400">0 ₽ навсегда, никаких ежемесячных платежей</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-white">Шторка приватности</td>
                  <td className="py-3 px-4 text-slate-400">Редко, камера часто пишет звук и видео 24/7</td>
                  <td className="py-3 px-4 text-emerald-400">Физическое закрытие объектива шторкой при снятии охраны</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-white">Интеграция с домом</td>
                  <td className="py-3 px-4 text-slate-400">Только в отдельном приложении бренда</td>
                  <td className="py-3 px-4 text-emerald-400">Вывод на экран телевизора, в Apple Home, планшеты на стене</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-cyan-950/40 border border-purple-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold text-white">Подберём смарт-замок под толщину и замок вашей двери</h3>
            <p className="text-slate-300 text-sm mt-1 max-w-xl">
              Проверим тип замкового механизма (евроцилиндр / врезной замок) и установим замок без люфтов и повреждения полотна.
            </p>
          </div>
          <Link href="/contacts">
            <Button size="lg" className="whitespace-nowrap">Консультация по замкам и камерам</Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}
