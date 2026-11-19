'use client';

import React, { useState } from 'react';
import {
  Send,
  Clock,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Cpu,
  Layers,
  Wrench,
  CheckCircle2,
} from 'lucide-react';
import { EstimateResult } from '@/lib/calculator/types';
import { PdfDownloadButton } from '@/components/pdf/PdfDownloadButton';

interface EstimateSummaryProps {
  estimate: EstimateResult;
  onRequestLead: () => void;
}

export const EstimateSummary: React.FC<EstimateSummaryProps> = ({
  estimate,
  onRequestLead,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  const totalDeviceUnits = estimate.equipment.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <aside className="sticky top-28 space-y-6">
      {/* Main Total Estimate Card */}
      <div className="glass-card rounded-2xl p-6 sm:p-7 border border-amber-500/40 bg-gradient-to-b from-dark-900/90 to-dark-950/95 shadow-glow-glass relative overflow-hidden">
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Итоговая стоимость проекта
          </span>
          <span className="flex items-center gap-1 text-xs text-slate-400">
            <Clock className="h-3.5 w-3.5 text-cyan-400" />
            {estimate.estimatedDays === 1 ? '1 день' : `${estimate.estimatedDays} дня`}
          </span>
        </div>

        {/* Big Total Price */}
        <div className="mb-6">
          <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {estimate.totalPrice.toLocaleString('ru-RU')}
            <span className="text-xl sm:text-2xl font-bold text-amber-400 ml-1.5">₽</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Оборудование + чистовой монтаж + пусконаладка сценариев
          </p>
        </div>

        {/* Cost Breakdown */}
        <div className="space-y-3 border-t border-slate-800/80 pt-4 text-sm">
          <div className="flex items-center justify-between text-slate-300">
            <span className="flex items-center gap-2 text-xs sm:text-sm">
              <Cpu className="h-4 w-4 text-cyan-400 shrink-0" />
              Оборудование ({totalDeviceUnits} шт.):
            </span>
            <span className="font-semibold text-white">
              {estimate.totalEquipmentPrice.toLocaleString('ru-RU')} ₽
            </span>
          </div>

          <div className="flex items-center justify-between text-slate-300">
            <span className="flex items-center gap-2 text-xs sm:text-sm">
              <Wrench className="h-4 w-4 text-amber-400 shrink-0" />
              Чистовой монтаж:
            </span>
            <span className="font-semibold text-white">
              {estimate.installationPrice.toLocaleString('ru-RU')} ₽
            </span>
          </div>

          <div className="flex items-center justify-between text-slate-300">
            <span className="flex items-center gap-2 text-xs sm:text-sm">
              <Layers className="h-4 w-4 text-emerald-400 shrink-0" />
              Пусконаладка и сценарии:
            </span>
            <span className="font-semibold text-white">
              {estimate.setupPrice.toLocaleString('ru-RU')} ₽
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 space-y-3 pt-4 border-t border-slate-800/80">
          <button
            type="button"
            onClick={onRequestLead}
            className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-3.5 text-sm font-bold text-dark-950 shadow-glow-amber hover:from-amber-400 hover:to-amber-500 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
          >
            <Send className="h-4 w-4" />
            <span>Отправить смету инженеру</span>
          </button>

          <PdfDownloadButton estimate={estimate} className="w-full" variant="secondary" />
        </div>

        {/* Guarantees */}
        <div className="mt-5 pt-4 border-t border-slate-800 text-xs text-slate-400 space-y-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>Фиксируем цену в официальном договоре</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0" />
            <span>2 года полной гарантии на монтаж и технику</span>
          </div>
        </div>
      </div>

      {/* Module Breakdown and Specification Accordion */}
      <div className="glass-card rounded-2xl p-5 border border-slate-800">
        <button
          type="button"
          data-testid="toggle-specifications"
          onClick={() => setShowDetails(!showDetails)}
          className="flex w-full items-center justify-between text-left text-sm font-bold text-white transition-colors hover:text-cyan-400"
          aria-expanded={showDetails}
        >
          <span>Спецификация оборудования ({estimate.equipment.length} поз.)</span>
          {showDetails ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>

        {showDetails && (
          <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-3 max-h-[420px] overflow-y-auto pr-1">
            {estimate.equipment.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-slate-800/80 bg-dark-950/80 p-3 text-xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="font-semibold text-white leading-tight block">
                      {item.name}
                    </span>
                    <span className="text-[10px] text-amber-400 uppercase font-semibold">
                      {item.brand} • {item.quantity} шт. × {item.unitPrice.toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                  <span className="font-bold text-slate-200 shrink-0">
                    {item.totalPrice.toLocaleString('ru-RU')} ₽
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
};
