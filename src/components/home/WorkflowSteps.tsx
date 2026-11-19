import React from 'react';
import { Calculator, ClipboardCheck, Wrench, ShieldCheck, ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

const steps = [
  {
    num: '01',
    title: 'Экспресс-смета за 2 минуты',
    desc: 'Вы задаете площадь, количество комнат и пожелания в онлайн-калькуляторе. Система сразу формирует точную спецификацию оборудования и работ с PDF.',
    icon: Calculator,
    color: 'from-amber-500/20 to-amber-600/5 text-amber-400 border-amber-500/30',
  },
  {
    num: '02',
    title: 'Выезд инженера и замер радиосети',
    desc: 'Инженер выезжает на объект, проверяет глубину подрозетников, замеряет уровень сигнала Zigbee/Thread сканером и согласовывает места установки датчиков.',
    icon: ClipboardCheck,
    color: 'from-cyan-500/20 to-cyan-600/5 text-cyan-400 border-cyan-500/30',
  },
  {
    num: '03',
    title: 'Чистовой монтаж за 1–2 дня',
    desc: 'Установка микрореле, кранов с приводами, карнизов и датчиков в чистовой интерьер. Без пыли, без штробления стен и без повреждения отделки.',
    icon: Wrench,
    color: 'from-emerald-500/20 to-emerald-600/5 text-emerald-400 border-emerald-500/30',
  },
  {
    num: '04',
    title: 'Сценарии, Алиса и гарантия 2 года',
    desc: 'Настройка локального сервера, создание сценариев («Кино», «Утро», «Я ушёл»), подключение умных колонок, обучение семьи и подписания гарантийного договора.',
    icon: ShieldCheck,
    color: 'from-purple-500/20 to-purple-600/5 text-purple-400 border-purple-500/30',
  },
];

export const WorkflowSteps: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 border-t border-slate-800/80 bg-dark-950">
      <Container>
        <div className="mx-auto max-w-2xl text-center mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Прозрачный процесс
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
            Как мы создаем ваш умный дом под ключ
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            От первой онлайн-сметы до сдачи работающей системы с гарантией по договору
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className={`glass-card glass-card-hover rounded-2xl p-6 border bg-gradient-to-br ${step.color} relative flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-dark-900 border border-white/10">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-2xl font-black text-slate-600">
                      {step.num}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Button href="/calculator" variant="primary" size="lg" icon={<ArrowRight className="h-4 w-4" />} iconPosition="right">
            Начать с расчёта сметы онлайн
          </Button>
        </div>
      </Container>
    </section>
  );
};
