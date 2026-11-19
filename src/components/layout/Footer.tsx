import React from 'react';
import Link from 'next/link';
import { Cpu, Send, Phone, Mail, ShieldCheck, Zap, Radio, MessageSquare } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { Container } from '@/components/ui/Container';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 text-slate-300">
      <Container className="py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Column 1: Company Profile (2 cols on lg) */}
          <div className="space-y-4 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-amber-500 p-[1px]">
                <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-slate-950">
                  <Cpu className="h-4 w-4 text-cyan-400" />
                </div>
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                SmartHome<span className="text-amber-400">.Lab</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 max-w-sm">
              Проектирование и монтаж надежного беспроводного умного дома. Работаем с квартирами и загородными домами без штробления и повреждения чистового ремонта.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={`https://t.me/${siteConfig.telegramBot}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 border border-slate-700 text-cyan-400 hover:text-white hover:bg-slate-800 hover:border-cyan-500/50 transition-colors"
                aria-label="Telegram бот"
              >
                <Send className="h-4 w-4" />
              </a>
              <a
                href={siteConfig.maxBotLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 border border-slate-700 text-amber-400 hover:text-white hover:bg-slate-800 hover:border-amber-500/50 transition-colors"
                aria-label="MAX бот"
              >
                <MessageSquare className="h-4 w-4" />
              </a>
              <a
                href={`tel:${siteConfig.phone.replace(/[^\d+]/g, '')}`}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 border border-slate-700 text-emerald-400 hover:text-white hover:bg-slate-800 hover:border-emerald-500/50 transition-colors"
                aria-label="Телефон"
              >
                <Phone className="h-4 w-4" />
              </a>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-2 text-xs">
              <span className="rounded bg-slate-900 border border-amber-500/30 px-2 py-0.5 text-amber-400 font-mono text-[11px]">
                Aqara
              </span>
              <span className="rounded bg-slate-900 border border-cyan-500/30 px-2 py-0.5 text-cyan-400 font-mono text-[11px]">
                Sonoff
              </span>
              <span className="rounded bg-slate-900 border border-emerald-500/30 px-2 py-0.5 text-emerald-400 font-mono text-[11px]">
                Sprut
              </span>
              <span className="rounded bg-slate-900 border border-blue-500/30 px-2 py-0.5 text-blue-400 font-mono text-[11px]">
                Tuya Zigbee
              </span>
            </div>
            <div className="pt-2 text-xs text-slate-500 space-y-1">
              <p className="flex items-center gap-1.5">
                <Radio className="h-3.5 w-3.5 text-cyan-400" /> Mesh-сеть с самовосстановлением
              </p>
              <p className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> 100% локальная работа без облака
              </p>
              <p className="flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-amber-400" /> Монтаж за 1-2 дня без пыли
              </p>
            </div>
          </div>

          {/* Column 2: Systems */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Направления
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/services/lighting" className="text-slate-400 hover:text-amber-400 transition-colors">
                  💡 Умное освещение
                </Link>
              </li>
              <li>
                <Link href="/services/climate" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  🌡 Умный климат
                </Link>
              </li>
              <li>
                <Link href="/services/security" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  🛡 Защита от протечек
                </Link>
              </li>
              <li>
                <Link href="/services/surveillance" className="text-slate-400 hover:text-purple-400 transition-colors">
                  📹 Видеонаблюдение и замки
                </Link>
              </li>
              <li className="pt-1">
                <Link href="/services" className="text-xs text-amber-400 hover:underline">
                  Все готовые пакеты →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Knowledge & Protocols */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Обучение & Статьи
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/knowledge" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  📚 База знаний по монтажу
                </Link>
              </li>
              <li>
                <Link href="/knowledge#relay-wiring-neutral-vs-no-neutral" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  ⚡ Монтаж реле без нуля
                </Link>
              </li>
              <li>
                <Link href="/knowledge#sensor-selection-pir-vs-mmwave" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  📡 Радары mmWave vs PIR
                </Link>
              </li>
              <li>
                <Link href="/articles" className="text-slate-400 hover:text-amber-400 transition-colors">
                  📡 Разбор протокола Zigbee 3.0
                </Link>
              </li>
              <li>
                <Link href="/articles/matter-and-thread-explained" className="text-slate-400 hover:text-amber-400 transition-colors">
                  🌐 Что такое Matter и Thread
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contacts & Guarantee */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Контакты
            </h3>
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <Phone className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
                <div>
                  <a
                    href={`tel:${siteConfig.phone.replace(/[^\d+]/g, '')}`}
                    className="hover:text-white text-slate-200 transition-colors"
                  >
                    {siteConfig.phone}
                  </a>
                  <p className="text-xs text-slate-500">Пн–Вс с 09:00 до 21:00</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-cyan-400 shrink-0" />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="hover:text-white transition-colors"
                >
                  {siteConfig.email}
                </a>
              </div>
              <div className="pt-2">
                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 text-xs text-slate-400">
                  <span className="font-semibold text-slate-200">Гарантия 2 года</span> по договору на всё оборудование и монтажные работы.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800/80 pt-8 text-xs text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} {siteConfig.name}. Все права защищены.</p>
          <div className="flex items-center gap-6">
            <Link href="/contacts" className="hover:text-slate-400 transition-colors">
              Контакты инженеров
            </Link>
            <Link href="/calculator" className="text-amber-400 hover:text-amber-300 transition-colors">
              Онлайн-калькулятор сметы
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};
