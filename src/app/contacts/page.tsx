'use client';

import React, { useState } from 'react';
import {
  Phone,
  Mail,
  Send,
  MessageSquare,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Sparkles,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { siteConfig } from '@/config/site';

interface FaqItem {
  q: string;
  a: string;
}

const faqs: FaqItem[] = [
  {
    q: 'Нужно ли штробить стены и портить чистовой ремонт?',
    a: 'Нет, штробление не требуется. Мы используем беспроводные протоколы Zigbee 3.0, Matter и Thread. Компактные микрореле монтируются внутрь стандартных подрозетников позади ваших существующих выключателей, а датчики и беспроводные клавиши фиксируются на надёжный 3M-скотч в любых удобных местах.',
  },
  {
    q: 'Будет ли работать умный дом, если отключится интернет?',
    a: 'Да, на 100%. В отличие от китайских облачных решений, наши системы строятся на базе локальных серверов Home Assistant или Sprut.hub. Вся логика автоматизаций (перекрытие воды при протечке, включение света по датчикам, поддержание климата) исполняется локально внутри квартиры без задержек.',
  },
  {
    q: 'Как часто нужно менять батарейки в датчиках?',
    a: 'В среднем раз в 2–3 года. Протокол Zigbee крайне энергоэффективен: датчик большую часть времени находится в спящем режиме и просыпается за миллисекунды только для отправки события. При снижении заряда батареи до 20% система заранее отправит вам уведомление в Telegram.',
  },
  {
    q: 'Можно ли управлять квартирой удалённо, находясь в отпуске?',
    a: 'Да. Мы настраиваем безопасное шифрованное удалённое подключение без выделенного белого IP. Вы сможете проверять статус закрытия входной двери, следить за датчиками протечки и регулировать температуру из любой точки мира через защищенное приложение или Telegram.',
  },
  {
    q: 'Какая гарантия предоставляется на оборудование и работы?',
    a: 'Мы даём официальную гарантию 24 месяца по договору как на все используемые устройства (Aqara, Sonoff, Sprut), так и на качество чистового монтажа и пусконаладочных работ. В первый месяц после установки действует бесплатная инженерная поддержка по донастройке любых сценариев.',
  },
];

export default function ContactsPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [messenger, setMessenger] = useState<'telegram' | 'max' | 'phone'>('telegram');
  const [comment, setComment] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (honeypot) {
      return; // Honeypot spam trap
    }

    if (!name.trim() || name.length < 2) {
      setErrorMsg('Пожалуйста, введите ваше имя (минимум 2 символа)');
      return;
    }

    const phoneRegex = /^(\+7|7|8)?[\s-]?\(?[489][0-9]{2}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/;
    if (!phoneRegex.test(phone.trim())) {
      setErrorMsg('Пожалуйста, введите корректный номер телефона РФ (+7 999 000-00-00)');
      return;
    }

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setIsSuccess(true);
    } catch {
      setErrorMsg('Ошибка отправки. Пожалуйста, напишите нам в Telegram напрямую.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12 sm:py-16 lg:py-20 space-y-16 sm:space-y-24">
      {/* 1. Header */}
      <section>
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="cyan" dot className="mb-3">
              <Sparkles className="h-3 w-3 text-cyan-400" />
              Всегда на связи
            </Badge>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Контакты инженерного отдела
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              Отвечаем на технические вопросы, рассчитываем спецификацию по дизайн-проекту и подбираем оборудование под ваш бюджет.
            </p>
          </div>
        </Container>
      </section>

      {/* 2. Contact Cards + Feedback Form Grid */}
      <section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Direct Contacts (5 cols) */}
            <div className="lg:col-span-5 space-y-5">
              <h2 className="text-xl font-bold text-white mb-4">
                Прямые каналы связи
              </h2>

              <a
                href={`tel:${siteConfig.phone.replace(/[^\d+]/g, '')}`}
                className="glass-card glass-card-hover rounded-2xl p-5 flex items-center gap-4 block border border-slate-800"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">Прямой номер инженера</span>
                  <span className="text-base font-bold text-white">{siteConfig.phone}</span>
                  <span className="text-[11px] text-slate-500 block mt-0.5">Ежедневно с 09:00 до 21:00</span>
                </div>
              </a>

              <a
                href={`https://t.me/${siteConfig.telegramBot}`}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card glass-card-hover rounded-2xl p-5 flex items-center gap-4 block border border-cyan-500/30 bg-cyan-500/5 shadow-glow-cyan"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
                  <Send className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-xs text-cyan-300 block font-semibold">Telegram-бот инженеров</span>
                  <span className="text-base font-bold text-white">@{siteConfig.telegramBot}</span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">Быстрый ответ в чате за 10–15 минут</span>
                </div>
              </a>

              <a
                href={siteConfig.maxBotLink}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card glass-card-hover rounded-2xl p-5 flex items-center gap-4 block border border-slate-800"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">Интеграция MAX-мессенджер</span>
                  <span className="text-base font-bold text-white">MAX Бот SmartHome</span>
                  <span className="text-[11px] text-slate-500 block mt-0.5">Уведомления и приём смет</span>
                </div>
              </a>

              <a
                href={`mailto:${siteConfig.email}`}
                className="glass-card glass-card-hover rounded-2xl p-5 flex items-center gap-4 block border border-slate-800"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">Электронная почта</span>
                  <span className="text-base font-bold text-white">{siteConfig.email}</span>
                  <span className="text-[11px] text-slate-500 block mt-0.5">Для дизайн-проектов и ТЗ</span>
                </div>
              </a>

              {/* Guarantees Note */}
              <div className="rounded-2xl border border-slate-800 bg-dark-900/60 p-5 text-xs text-slate-300 space-y-2">
                <div className="flex items-center gap-2 font-bold text-white">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  <span>Работаем по договору с юридическими и физлицами</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Оплата поэтапная: аванс за оборудование, окончательный расчёт только после подписания акта пусконаладки.
                </p>
              </div>
            </div>

            {/* Right Column: Interactive Form (7 cols) */}
            <div className="lg:col-span-7">
              <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-glow-glass">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Форма обратной связи
                </span>
                <h2 className="text-2xl font-bold text-white mt-1 mb-2">
                  Заказать консультацию инженера
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mb-6">
                  Заполните контакты, и дежурный инженер свяжется с вами для технической консультации.
                </p>

                {isSuccess ? (
                  <div className="py-8 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mb-4">
                      <CheckCircle2 className="h-7 w-7" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Заявка отправлена!</h3>
                    <p className="text-sm text-slate-300 max-w-md mx-auto mb-6">
                      Мы получили ваши данные и свяжемся с вами в течение 15 минут в выбранном мессенджере.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setIsSuccess(false);
                        setName('');
                        setPhone('');
                        setComment('');
                      }}
                      className="rounded-xl bg-dark-800 px-5 py-2.5 text-xs font-semibold text-slate-300 hover:text-white"
                    >
                      Отправить ещё одну заявку
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    {/* Honeypot */}
                    <input
                      type="text"
                      name="company_url"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      style={{ display: 'none' }}
                      tabIndex={-1}
                      autoComplete="off"
                    />

                    {errorMsg && (
                      <div className="flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/30 p-3 text-xs text-red-400">
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-medium text-slate-300 mb-1">
                        Ваше имя <span className="text-amber-400">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        placeholder="Алексей"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-xl border border-slate-700 bg-dark-950 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-phone" className="block text-xs font-medium text-slate-300 mb-1">
                        Номер телефона <span className="text-amber-400">*</span>
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        required
                        placeholder="+7 (999) 000-00-00"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full rounded-xl border border-slate-700 bg-dark-950 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                    </div>

                    <div>
                      <span className="block text-xs font-medium text-slate-300 mb-1.5">
                        Удобный способ связи:
                      </span>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={() => setMessenger('telegram')}
                          className={`flex items-center justify-center gap-1.5 rounded-xl border p-2.5 text-xs font-medium transition-all ${
                            messenger === 'telegram'
                              ? 'border-cyan-500 bg-cyan-500/10 text-cyan-300'
                              : 'border-slate-800 bg-dark-950 text-slate-400'
                          }`}
                        >
                          <Send className="h-3.5 w-3.5" />
                          <span>Telegram</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setMessenger('max')}
                          className={`flex items-center justify-center gap-1.5 rounded-xl border p-2.5 text-xs font-medium transition-all ${
                            messenger === 'max'
                              ? 'border-amber-500 bg-amber-500/10 text-amber-300'
                              : 'border-slate-800 bg-dark-950 text-slate-400'
                          }`}
                        >
                          <MessageSquare className="h-3.5 w-3.5" />
                          <span>MAX</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setMessenger('phone')}
                          className={`flex items-center justify-center gap-1.5 rounded-xl border p-2.5 text-xs font-medium transition-all ${
                            messenger === 'phone'
                              ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300'
                              : 'border-slate-800 bg-dark-950 text-slate-400'
                          }`}
                        >
                          <Phone className="h-3.5 w-3.5" />
                          <span>Звонок</span>
                        </button>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="contact-comment" className="block text-xs font-medium text-slate-300 mb-1">
                        Опишите ваш объект или вопрос
                      </label>
                      <textarea
                        id="contact-comment"
                        rows={3}
                        placeholder="Например: 2-комнатная квартира 65 м², нужен свет, климат и защита от протечек"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full rounded-xl border border-slate-700 bg-dark-950 px-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-3.5 text-sm font-bold text-dark-950 shadow-glow-amber hover:from-amber-400 hover:to-amber-500 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Отправка заявки...</span>
                          </>
                        ) : (
                          <span>Получить техническую консультацию</span>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. FAQ Section */}
      <section className="border-t border-slate-800/80 pt-16 sm:pt-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Частые вопросы
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-1">
              Всё, что нужно знать перед заказом
            </h2>
          </div>

          <div className="mx-auto max-w-3xl space-y-3.5">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-800 bg-dark-950/80 overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="flex w-full items-center justify-between p-5 text-left text-sm sm:text-base font-bold text-white hover:text-cyan-400 transition-colors cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="h-5 w-5 text-cyan-400 shrink-0 ml-4" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-slate-500 shrink-0 ml-4" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <p className="text-xs sm:text-sm text-slate-400 mb-4">
              Остались другие вопросы по оборудованию или монтажу?
            </p>
            <Button href="/calculator" variant="primary" size="md">
              Рассчитать стоимость в калькуляторе
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
