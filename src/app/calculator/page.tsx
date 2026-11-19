import React from 'react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';

export const metadata = {
  title: 'Интерактивный онлайн-калькулятор сметы',
  description: 'Расчёт стоимости оборудования и монтажа умного дома с генерацией PDF-сметы.',
};

export default function CalculatorPage() {
  return (
    <div className="py-16 lg:py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="cyan" className="mb-3">
            Этап 2 • Разработка калькулятора
          </Badge>
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
            Интерактивный калькулятор сметы
          </h1>
          <p className="mt-4 text-lg text-slate-300">
            Здесь будет доступен полноценный конфигуратор умного дома (выбор площади, комнат, брендов Aqara/Sonoff/Sprut и расчет оборудования с генерацией PDF-сметы).
          </p>
        </div>
      </Container>
    </div>
  );
}
