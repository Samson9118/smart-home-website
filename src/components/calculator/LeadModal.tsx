'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, Phone, MessageSquare, AlertCircle, Loader2 } from 'lucide-react';
import { EstimateResult } from '@/lib/calculator/types';
import { leadFormSchema } from '@/lib/calculator/schema';
import { siteConfig } from '@/config/site';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  estimate: EstimateResult;
}

export const LeadModal: React.FC<LeadModalProps> = ({
  isOpen,
  onClose,
  estimate,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [messenger, setMessenger] = useState<'telegram' | 'max' | 'phone'>('telegram');
  const [contactHandle, setContactHandle] = useState('');
  const [comment, setComment] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const formData = {
      name,
      phone,
      messenger,
      contactHandle: contactHandle || undefined,
      comment: comment || undefined,
      honeypot,
      calculatorInputs: estimate.inputs,
    };

    const validation = leadFormSchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0].toString()] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({
          global: data.error || 'Произошла ошибка при отправке заявки. Попробуйте еще раз.',
        });
        return;
      }

      setIsSuccess(true);
    } catch {
      setErrors({
        global: 'Не удалось связаться с сервером. Пожалуйста, напишите нам в Telegram напрямую.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setName('');
    setPhone('');
    setContactHandle('');
    setComment('');
    setIsSuccess(false);
    setErrors({});
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-dark-950/80 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-lg rounded-2xl border border-slate-700/80 bg-dark-900 p-6 sm:p-8 shadow-2xl z-10"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-5 right-5 inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-dark-800 transition-colors"
              aria-label="Закрыть модальное окно"
            >
              <X className="h-5 w-5" />
            </button>

            {isSuccess ? (
              <div className="py-6 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 mb-4 shadow-glow-glass">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Заявка и смета приняты!
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed max-w-md mx-auto mb-6">
                  Инженер проверит техническую совместимость оборудования под ваш объект ({estimate.inputs.area} м², {estimate.inputs.rooms} комн.) и свяжется с вами в течение 15 минут в выбранном мессенджере.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href={`https://t.me/${siteConfig.telegramBot}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 px-5 py-2.5 text-sm font-semibold text-cyan-300 hover:bg-cyan-500/20 transition-all"
                  >
                    <Send className="h-4 w-4" />
                    <span>Перейти в Telegram-чат</span>
                  </a>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center justify-center rounded-xl bg-dark-800 px-5 py-2.5 text-sm font-medium text-slate-300 hover:text-white transition-colors"
                  >
                    Закрыть
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                    Персональный инженерный расчёт
                  </span>
                  <h3 id="modal-title" className="text-2xl font-bold text-white mt-1">
                    Отправить смету инженеру
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Итого по смете: <span className="font-semibold text-white">{estimate.totalPrice.toLocaleString('ru-RU')} ₽</span> ({estimate.equipment.length} позиций оборудования)
                  </p>
                </div>

                {errors.global && (
                  <div className="mb-4 flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/30 p-3 text-xs text-red-400">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{errors.global}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Honeypot field (hidden from real users) */}
                  <input
                    type="text"
                    name="website"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    style={{ display: 'none' }}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                  />

                  {/* Name field */}
                  <div>
                    <label htmlFor="lead-name" className="block text-xs font-medium text-slate-300 mb-1">
                      Ваше имя <span className="text-amber-400">*</span>
                    </label>
                    <input
                      id="lead-name"
                      type="text"
                      required
                      placeholder="Алексей"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`w-full rounded-xl border bg-dark-950 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                        errors.name ? 'border-red-500' : 'border-slate-700'
                      }`}
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
                  </div>

                  {/* Phone field */}
                  <div>
                    <label htmlFor="lead-phone" className="block text-xs font-medium text-slate-300 mb-1">
                      Телефон <span className="text-amber-400">*</span>
                    </label>
                    <input
                      id="lead-phone"
                      type="tel"
                      required
                      placeholder="+7 (999) 000-00-00"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={`w-full rounded-xl border bg-dark-950 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                        errors.phone ? 'border-red-500' : 'border-slate-700'
                      }`}
                    />
                    {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone}</p>}
                  </div>

                  {/* Messenger Choice */}
                  <div>
                    <span className="block text-xs font-medium text-slate-300 mb-1.5">
                      Куда отправить подтверждение и PDF?
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setMessenger('telegram')}
                        className={`flex items-center justify-center gap-1.5 rounded-xl border p-2.5 text-xs font-medium transition-all ${
                          messenger === 'telegram'
                            ? 'border-cyan-500 bg-cyan-500/10 text-cyan-300 shadow-glow-cyan'
                            : 'border-slate-700 bg-dark-950 text-slate-300 hover:border-slate-600'
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
                            ? 'border-amber-500 bg-amber-500/10 text-amber-300 shadow-glow-amber'
                            : 'border-slate-700 bg-dark-950 text-slate-300 hover:border-slate-600'
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
                            : 'border-slate-700 bg-dark-950 text-slate-300 hover:border-slate-600'
                        }`}
                      >
                        <Phone className="h-3.5 w-3.5" />
                        <span>Звонок</span>
                      </button>
                    </div>
                  </div>

                  {/* Telegram / MAX username */}
                  {messenger !== 'phone' && (
                    <div>
                      <label htmlFor="lead-handle" className="block text-xs font-medium text-slate-300 mb-1">
                        Ваш ник в {messenger === 'telegram' ? 'Telegram' : 'MAX'} (необязательно)
                      </label>
                      <input
                        id="lead-handle"
                        type="text"
                        placeholder="@username"
                        value={contactHandle}
                        onChange={(e) => setContactHandle(e.target.value)}
                        className="w-full rounded-xl border border-slate-700 bg-dark-950 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                    </div>
                  )}

                  {/* Comment */}
                  <div>
                    <label htmlFor="lead-comment" className="block text-xs font-medium text-slate-300 mb-1">
                      Комментарий или пожелания к объекту
                    </label>
                    <textarea
                      id="lead-comment"
                      rows={2}
                      placeholder="Например: есть дизайн-проект, чистовой ремонт готов"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-dark-950 px-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-3.5 text-sm font-bold text-dark-950 shadow-glow-amber hover:from-amber-400 hover:to-amber-500 transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Отправка данных...</span>
                        </>
                      ) : (
                        <span>Отправить смету и получить консультацию</span>
                      )}
                    </button>
                    <p className="mt-2 text-center text-[11px] text-slate-500">
                      Нажимая кнопку, вы соглашаетесь на обработку персональных данных. Никакого спама.
                    </p>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
