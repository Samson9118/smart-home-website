import React from 'react';
import Link from 'next/link';
import { Cpu, Send, Phone, Mail, ShieldCheck, Zap, Radio, MessageSquare } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { navItems } from '@/config/navigation';
import { Container } from '@/components/ui/Container';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-dark-950 text-slate-300">
      <Container className="py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Company Profile */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-amber-500 p-[1px]">
                <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-dark-950">
                  <Cpu className="h-4 w-4 text-cyan-400" />
                </div>
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                SmartHome<span className="text-amber-400">.Lab</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              Проектирование и монтаж надежного беспроводного умного дома. Работаем с квартирами и загородными домами без штробления и повреждения чистового ремонта.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={`https://t.me/${siteConfig.telegramBot}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-dark-800 border border-slate-700 text-cyan-400 hover:text-white hover:bg-dark-700 hover:border-cyan-500/50 transition-colors"
                aria-label="Telegram бот"
              >
                <Send className="h-4 w-4" />
              </a>
              <a
                href={siteConfig.maxBotLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-dark-800 border border-slate-700 text-amber-400 hover:text-white hover:bg-dark-700 hover:border-amber-500/50 transition-colors"
                aria-label="MAX бот"
              >
                <MessageSquare className="h-4 w-4" />
              </a>
              <a
                href={`tel:${siteConfig.phone.replace(/[^\d+]/g, '')}`}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-dark-800 border border-slate-700 text-emerald-400 hover:text-white hover:bg-dark-700 hover:border-emerald-500/50 transition-colors"
                aria-label="Телефон"
              >
                <Phone className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Навигация
            </h3>
            <ul className="space-y-2.5 text-sm">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-slate-400 hover:text-cyan-400 transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Protocols & Brands */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Бренды и протоколы
            </h3>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="rounded-lg bg-dark-800 border border-amber-500/30 px-2.5 py-1 text-amber-400">
                Aqara
              </span>
              <span className="rounded-lg bg-dark-800 border border-cyan-500/30 px-2.5 py-1 text-cyan-400">
                Sonoff
              </span>
              <span className="rounded-lg bg-dark-800 border border-emerald-500/30 px-2.5 py-1 text-emerald-400">
                Sprut
              </span>
              <span className="rounded-lg bg-dark-800 border border-blue-500/30 px-2.5 py-1 text-blue-400">
                Tuya Zigbee
              </span>
              <span className="rounded-lg bg-dark-800 border border-slate-700 px-2.5 py-1 text-slate-300">
                Home Assistant
              </span>
              <span className="rounded-lg bg-dark-800 border border-purple-500/30 px-2.5 py-1 text-purple-400">
                Яндекс Алиса
              </span>
              <span className="rounded-lg bg-dark-800 border border-slate-700 px-2.5 py-1 text-slate-300">
                Matter & Thread
              </span>
            </div>
            <div className="pt-2 text-xs text-slate-500 space-y-1">
              <p className="flex items-center gap-1.5">
                <Radio className="h-3.5 w-3.5 text-cyan-400" /> Mesh-сеть с резервированием
              </p>
              <p className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> 100% локальная работа без облака
              </p>
              <p className="flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-amber-400" /> Монтаж за 1-2 дня без пыли
              </p>
            </div>
          </div>

          {/* Column 4: Contacts & Guarantee */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Контакты инженеров
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
                <div className="rounded-xl border border-slate-800 bg-dark-900/60 p-3 text-xs text-slate-400">
                  <span className="font-semibold text-slate-200">Гарантия 2 года</span> по официальному договору на всё оборудование и пусконаладочные работы.
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
              Политика конфиденциальности
            </Link>
            <Link href="/calculator" className="text-amber-400 hover:text-amber-300 transition-colors">
              Онлайн-смета
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};
