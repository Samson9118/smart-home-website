import React from 'react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';

export const metadata = {
  title: 'Портфолио проектов',
  description: 'Примеры реализованных объектов, сборки слаботочных щитов и схем автоматизации.',
};

export default function PortfolioPage() {
  return (
    <div className="py-16 lg:py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="amber" className="mb-3">
            Наши кейсы
          </Badge>
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
            Реализованные проекты умных домов
          </h1>
          <p className="mt-4 text-lg text-slate-300">
            Фотографии монтажа, схемы автоматизации и примеры сборки щитов в квартирах и коттеджах.
          </p>
        </div>
      </Container>
    </div>
  );
}
