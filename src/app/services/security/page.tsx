import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export const metadata: Metadata = {
  title: 'Защита от протечек и безопасность | SmartHome Lab',
  description: 'Монтаж систем защиты от протечек с автоматическим перекрытием кранов за 10 секунд. Датчики дыма, утечки газа, герконы окон и дверей, резервное питание.',
};

const SECURITY_CARDS = [
  {
    title: 'Автоперекрытие воды при первой капле',
    desc: 'Шаровые краны из горячекованой латуни (Neptun Bugatti Pro) с электроприводом перекрывают стояки ХВС и ГВС за 8-12 секунд при замыкании позолоченных контактов датчика.',
    badge: '100% защита от затопления',
  },
  {
    title: 'Прямая связь датчик-кран (Zigbee Binding)',
    desc: 'Связываем датчик протечки и реле сервопривода напрямую. Кран перекроется, даже если роутер отключен, завис сервер или в доме пропал Wi-Fi.',
    badge: 'Автономная работа',
  },
  {
    title: 'Резервное питание от аккумулятора',
    desc: 'В случае отключения электричества в доме или короткого замыкания блок бесперебойного питания 12V гарантирует перекрытие кранов и отправку тревожного сообщения.',
    badge: 'LiFePO4 резерв',
  },
  {
    title: 'Защита от закисания (автопроворот)',
    desc: 'Каждые 14 дней система в ночное время автоматически закрывает и открывает краны на 15 секунд. Это исключает отложение солей жесткости и гарантирует легкость хода.',
    badge: 'Самоочистка кранов',
  },
  {
    title: 'Датчики угарного газа (CO), метана и дыма',
    desc: 'Раннее оповещение о возгорании или тлении проводки. Сирена 85 дБ разбудит спящих, а умный дом включит аварийную подсветку путей эвакуации и отключит приточную вентиляцию.',
    badge: 'Пожарная безопасность',
  },
  {
    title: 'Охрана периметра «Никого нет дома»',
    desc: 'Включение охраны одной кнопкой у двери. Контроль открытия всех окон и дверей. При несанкционированном проникновении — громкая сирена и фото лица с камеры в Telegram.',
    badge: 'Охранный контур',
  },
];

export default function SecurityPage() {
  return (
    <div className="py-12 sm:py-16 bg-slate-950 text-white min-h-screen">
      <Container>
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8">
          <Link href="/" className="hover:text-amber-400">Главная</Link>
          <span>/</span>
          <Link href="/services" className="hover:text-amber-400">Услуги</Link>
          <span>/</span>
          <span className="text-emerald-400 font-semibold">Безопасность и протечки</span>
        </nav>

        {/* Hero Section */}
        <div className="max-w-4xl mb-16">
          <Badge variant="cyan" className="mb-4">
            🛡 Комплексная безопасность
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            Защита от протечек и аварий, <br />
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-amber-400 bg-clip-text text-transparent">
              которая спасает ваш ремонт и деньги
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed">
            Средний ущерб от залива соседей в Москве превышает 450 000 ₽.
            Умная система SmartHome Lab перекроет стояки за 10 секунд и уведомит вас в Telegram до того, как вода дойдет до плинтуса.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/calculator">
              <Button size="lg">Рассчитать комплект безопасности</Button>
            </Link>
            <Link href="/knowledge#leakage-sensors-and-shutoff-valves">
              <Button variant="outline" size="lg">Инструкция по монтажу кранов →</Button>
            </Link>
          </div>
        </div>

        {/* Security Cards */}
        <div className="mb-20">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-8">
            Надёжность каждого узла системы
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SECURITY_CARDS.map((c, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                    {c.badge}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-4 mb-2">{c.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Timing Infographic */}
        <div className="mb-20 p-8 rounded-3xl bg-slate-900 border border-slate-800">
          <h2 className="text-2xl font-bold text-white mb-6">Тайминг срабатывания при аварии</h2>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-3xl font-black text-amber-400 font-mono">0.05 с</div>
              <div className="text-xs font-semibold text-slate-200 mt-1">Детекция воды</div>
              <div className="text-[11px] text-slate-400 mt-1">Замыкание электродов датчика</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-3xl font-black text-cyan-400 font-mono">0.15 с</div>
              <div className="text-xs font-semibold text-slate-200 mt-1">Команда на реле</div>
              <div className="text-[11px] text-slate-400 mt-1">Прямой Zigbee сигнал на сервопривод</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-3xl font-black text-emerald-400 font-mono">8.0 с</div>
              <div className="text-xs font-semibold text-slate-200 mt-1">Стояки перекрыты</div>
              <div className="text-[11px] text-slate-400 mt-1">Поворот крана на 90 градусов</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-3xl font-black text-purple-400 font-mono">1.2 с</div>
              <div className="text-xs font-semibold text-slate-200 mt-1">Алерт в Telegram</div>
              <div className="text-[11px] text-slate-400 mt-1">Push с адресом и планом помещения</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-cyan-950/40 border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold text-white">Установите защиту от протечек до чистового монтажа</h3>
            <p className="text-slate-300 text-sm mt-1 max-w-xl">
              Смонтируем сервоприводы кранов и расставим датчики в сантехшкафу, кухне и санузлах за 1 день.
            </p>
          </div>
          <Link href="/contacts">
            <Button size="lg" className="whitespace-nowrap">Заказать монтаж защиты</Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}
