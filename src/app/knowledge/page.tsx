import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { KnowledgeView } from '@/components/knowledge/KnowledgeView';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'База знаний: как выбрать и смонтировать датчики умного дома',
  description: 'Инженерные инструкции по выбору датчиков движения и присутствия mmWave, схемам скрытого монтажа реле без нуля, расстановке датчиков протечки и шаровых кранов.',
};

export default function KnowledgePage() {
  return (
    <div className="py-12 sm:py-16 bg-slate-950 text-white min-h-screen">
      <Container>
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8">
          <Link href="/" className="hover:text-amber-400">Главная</Link>
          <span>/</span>
          <span className="text-amber-400 font-semibold">База знаний и монтаж</span>
        </nav>

        {/* Header */}
        <div className="max-w-4xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
            📚 Обучающие материалы SmartHome Lab
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Гид по выбору и монтажу датчиков
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Практические инструкции, принципиальные электросхемы и советы инженеров.
            Узнайте, как не ошибиться с выбором датчиков и избежать переделки ремонта.
          </p>
        </div>

        {/* Interactive Knowledge Component */}
        <KnowledgeView />

        {/* Bottom Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-white">Не хотите рисковать самостоятельным монтажом?</h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Наши сертифицированные инженеры аккуратно смонтируют датчики, реле и краны без пыли и с гарантией 3 года.
            </p>
          </div>
          <Link href="/calculator">
            <Button size="lg" className="whitespace-nowrap">Рассчитать монтаж под ключ</Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}
