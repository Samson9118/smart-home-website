import React from 'react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Calculator } from 'lucide-react';

export const metadata = {
  title: 'Услуги и готовые комплекты',
  description: 'Проектирование и монтаж систем освещения, климата, безопасности и мультирум умного дома.',
};

export default function ServicesPage() {
  return (
    <div className="py-16 lg:py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="amber" className="mb-3">
            Услуги и решения
          </Badge>
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
            Комплексные решения для квартир и загородных домов
          </h1>
          <p className="mt-4 text-lg text-slate-300">
            Готовые пакеты автоматизации под разный бюджет: от базовой безопасности до премиальных локальных серверов.
          </p>
          <div className="mt-8">
            <Button href="/calculator" variant="primary" size="lg" icon={<Calculator className="h-5 w-5" />}>
              Перейти в интерактивный калькулятор
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
