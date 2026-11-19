'use client';

import React, { useState, useMemo } from 'react';
import { CalculatorInputs } from '@/lib/calculator/types';
import { calculateEstimate } from '@/lib/calculator/calculate';
import { CalculatorForm } from './CalculatorForm';
import { EstimateSummary } from './EstimateSummary';
import { LeadModal } from './LeadModal';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Sparkles } from 'lucide-react';

const initialInputs: CalculatorInputs = {
  propertyType: 'apartment',
  area: 65,
  rooms: 2,
  bathrooms: 1,
  hub: 'home-assistant',
  brandTier: 'optimum',
  modules: {
    lighting: true,
    climate: true,
    leakage: true,
    curtains: false,
    security: true,
  },
};

export const CalculatorView: React.FC = () => {
  const [inputs, setInputs] = useState<CalculatorInputs>(initialInputs);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  // Recalculate estimate reactively on every input change
  const estimate = useMemo(() => {
    return calculateEstimate(inputs);
  }, [inputs]);

  return (
    <div className="py-12 sm:py-16 lg:py-20">
      <Container>
        {/* Page Header */}
        <div className="mx-auto max-w-3xl text-center mb-12">
          <Badge variant="cyan" dot className="mb-3">
            <Sparkles className="h-3 w-3 text-cyan-400" />
            Интерактивный конфигуратор 2026
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Калькулятор сметы умного дома
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Выберите параметры вашего объекта, предпочтительные бренды и экосистему. Стоимость оборудования и монтажа пересчитывается мгновенно в реальном времени.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Form Controls (7 cols) */}
          <div className="lg:col-span-7">
            <CalculatorForm inputs={inputs} onChange={setInputs} />
          </div>

          {/* Right Column: Sticky Estimate Summary (5 cols) */}
          <div className="lg:col-span-5">
            <EstimateSummary
              estimate={estimate}
              onRequestLead={() => setIsLeadModalOpen(true)}
            />
          </div>
        </div>

        {/* Lead Generation & Estimate Confirmation Modal */}
        <LeadModal
          isOpen={isLeadModalOpen}
          onClose={() => setIsLeadModalOpen(false)}
          estimate={estimate}
        />
      </Container>
    </div>
  );
};
