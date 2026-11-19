import React from 'react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { siteConfig } from '@/config/site';
import { Phone, Mail, Send, MessageSquare } from 'lucide-react';

export const metadata = {
  title: 'Контакты и связь с инженером',
  description: 'Свяжитесь с нами для консультации по умному дому через Telegram, телефон или MAX-бота.',
};

export default function ContactsPage() {
  return (
    <div className="py-16 lg:py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="cyan" className="mb-3">
            Связь с нами
          </Badge>
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
            Контакты инженерного отдела
          </h1>
          <p className="mt-4 text-lg text-slate-300">
            Отвечаем на технические вопросы, рассчитываем смету по дизайн-проекту и подбираем оборудование.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 text-left">
            <a
              href={`tel:${siteConfig.phone.replace(/[^\d+]/g, '')}`}
              className="glass-card glass-card-hover rounded-2xl p-6 flex items-center gap-4"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 shrink-0">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Прямой телефон</p>
                <p className="text-base font-bold text-white">{siteConfig.phone}</p>
              </div>
            </a>

            <a
              href={`mailto:${siteConfig.email}`}
              className="glass-card glass-card-hover rounded-2xl p-6 flex items-center gap-4"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shrink-0">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Электронная почта</p>
                <p className="text-base font-bold text-white">{siteConfig.email}</p>
              </div>
            </a>

            <a
              href={`https://t.me/${siteConfig.telegramBot}`}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card glass-card-hover rounded-2xl p-6 flex items-center gap-4"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shrink-0">
                <Send className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Telegram инженера</p>
                <p className="text-base font-bold text-white">@{siteConfig.telegramBot}</p>
              </div>
            </a>

            <a
              href={siteConfig.maxBotLink}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card glass-card-hover rounded-2xl p-6 flex items-center gap-4"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 shrink-0">
                <MessageSquare className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs text-slate-400">MAX Бот</p>
                <p className="text-base font-bold text-white">Интеграция MAX</p>
              </div>
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}
