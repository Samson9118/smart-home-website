import React from 'react';
import type { Metadata } from 'next';
import { CalculatorView } from '@/components/calculator/CalculatorView';

export const metadata: Metadata = {
  title: 'Интерактивный онлайн-калькулятор сметы умного дома',
  description:
    'Расчёт стоимости оборудования Aqara, Sonoff, Sprut и Tuya Zigbee, стоимости чистового монтажа и пусконаладки с мгновенной сметой.',
};

export default function CalculatorPage() {
  return <CalculatorView />;
}
