'use client';

import React, { useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import { FileDown, Loader2, CheckCircle } from 'lucide-react';
import { EstimateResult } from '@/lib/calculator/types';
import { EstimatePdfDocument } from './EstimatePdfDocument';

interface PdfDownloadButtonProps {
  estimate: EstimateResult;
  className?: string;
  variant?: 'primary' | 'secondary' | 'card';
}

export const PdfDownloadButton: React.FC<PdfDownloadButtonProps> = ({
  estimate,
  className = '',
  variant = 'secondary',
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleDownload = async () => {
    if (isGenerating) return;

    setIsGenerating(true);
    setIsDone(false);

    try {
      // Dynamic rendering of PDF document to blob
      const doc = <EstimatePdfDocument estimate={estimate} />;
      const asPdf = pdf(doc);
      const blob = await asPdf.toBlob();

      // Trigger browser file download
      const fileName = `SmartHome_Lab_Smeta_${estimate.inputs.propertyType}_${estimate.inputs.area}m2.pdf`;
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setIsDone(true);
      setTimeout(() => setIsDone(false), 3000);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Ошибка при генерации PDF. Пожалуйста, попробуйте еще раз или свяжитесь с инженером в Telegram.');
    } finally {
      setIsGenerating(false);
    }
  };

  const baseStyles =
    'inline-flex items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-all cursor-pointer active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-amber-500 to-amber-600 text-dark-950 px-5 py-3.5 shadow-glow-amber hover:from-amber-400 hover:to-amber-500',
    secondary:
      'border border-cyan-500/40 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-400 px-5 py-3 shadow-glow-cyan',
    card: 'w-full border border-slate-700 bg-dark-900 text-slate-200 hover:text-white hover:bg-dark-800 px-4 py-2.5',
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={isGenerating}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      aria-label="Скачать PDF-смету"
    >
      {isGenerating ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin text-cyan-400" />
          <span>Формирование PDF...</span>
        </>
      ) : isDone ? (
        <>
          <CheckCircle className="h-4 w-4 text-emerald-400" />
          <span>Смета скачана!</span>
        </>
      ) : (
        <>
          <FileDown className="h-4 w-4" />
          <span>Скачать PDF-смету</span>
        </>
      )}
    </button>
  );
};
