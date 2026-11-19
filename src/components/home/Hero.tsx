'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Calculator,
  ArrowRight,
  Shield,
  Wifi,
  Mic,
  FileText,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { siteConfig } from '@/config/site';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
      {/* Background Gradients and Ambient Glows */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/3 -left-40 -z-10 h-[400px] w-[500px] rounded-full bg-amber-500/10 blur-[100px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 right-[-100px] -z-10 h-[450px] w-[500px] rounded-full bg-cyan-600/10 blur-[130px]"
        aria-hidden="true"
      />

      {/* Grid Pattern Overlay */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(#1E293B_1px,transparent_1px)] [background-size:24px_24px] opacity-40"
        aria-hidden="true"
      />

      <Container>
        <div className="mx-auto max-w-4xl text-center">
          {/* Top Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2"
          >
            <Badge variant="cyan" dot className="px-3.5 py-1 text-xs">
              <Sparkles className="h-3 w-3 text-cyan-400" />
              Беспроводной умный дом • Zigbee 3.0, Matter & Thread
            </Badge>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.15]"
          >
            Проектирование и монтаж умного дома{' '}
            <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
              без штробления
            </span>{' '}
            и пыли
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg"
          >
            Создаем сценарии освещения, климата, штор и безопасности на базе{' '}
            <span className="font-semibold text-white">Aqara, Sonoff, Sprut и Tuya Zigbee</span>. Локальные хабы{' '}
            <span className="text-cyan-400 font-medium">Home Assistant</span> и{' '}
            <span className="text-amber-400 font-medium">Яндекс Алиса</span> для управления голосом.
          </motion.p>

          {/* Call-to-Action Buttons: 2 главные кнопки с достаточным воздухом */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-col items-center justify-center gap-3.5 sm:flex-row sm:gap-4"
          >
            <Button
              href="/calculator"
              variant="primary"
              size="lg"
              icon={<Calculator className="h-5 w-5" />}
              className="w-full sm:w-auto"
            >
              Рассчитать смету
            </Button>

            <Button
              href="/services"
              variant="outline"
              size="lg"
              icon={<ArrowRight className="h-4 w-4" />}
              iconPosition="right"
              className="w-full sm:w-auto"
            >
              Услуги
            </Button>
          </motion.div>

          {/* Supported Brands Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3"
          >
            <span className="text-xs uppercase tracking-wider text-slate-500 font-medium mr-1">
              Оборудование:
            </span>
            {siteConfig.supportedBrands.map((brand) => (
              <span
                key={brand.name}
                className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1 text-xs font-semibold backdrop-blur-sm ${brand.badgeColor}`}
              >
                <CheckCircle2 className="h-3 w-3 shrink-0" />
                <span>{brand.name}</span>
                <span className="hidden sm:inline text-[10px] opacity-75 font-normal">
                  ({brand.category})
                </span>
              </span>
            ))}
          </motion.div>
        </div>

        {/* 4 Feature Value Proposition Cards */}
        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.45 }}
            className="glass-card glass-card-hover rounded-2xl p-6 relative overflow-hidden"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 mb-4 shadow-glow-amber">
              <Wifi className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Чистовой монтаж</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Беспроводные протоколы Zigbee 3.0 и Matter. Установка в чистовой интерьер за 1-2 дня без пыли, шума и штробления стен.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="glass-card glass-card-hover rounded-2xl p-6 relative overflow-hidden"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mb-4 shadow-glow-cyan">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">100% Локально</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Автоматизации климата, света и защиты от протечек работают автономно даже при аварии у провайдера или отключении интернета.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.55 }}
            className="glass-card glass-card-hover rounded-2xl p-6 relative overflow-hidden"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 mb-4">
              <Mic className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Голосовой контроль</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Глубокая интеграция с Яндекс Алисой, Home Assistant и Apple Home. Любые сценарии одной фразой: «Алиса, мы ушли».
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="glass-card glass-card-hover rounded-2xl p-6 relative overflow-hidden"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-4">
              <FileText className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Смета за 2 минуты</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Интерактивный онлайн-калькулятор рассчитает количество оборудования под вашу площадь и сразу сгенерирует подробный PDF.
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};
