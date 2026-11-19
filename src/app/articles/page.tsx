import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { articles } from '@/data/articles';

export const metadata: Metadata = {
  title: 'Статьи о протоколах умного дома: Zigbee, Matter, Thread | SmartHome Lab',
  description: 'Экспертные статьи о технологиях беспроводного умного дома: как устроен Zigbee Mesh, чем Thread отличается от Matter, сравнение протоколов и локальная работа без интернета.',
};

export default function ArticlesPage() {
  return (
    <div className="py-12 sm:py-16 bg-slate-950 text-white min-h-screen">
      <Container>
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8">
          <Link href="/" className="hover:text-amber-400">Главная</Link>
          <span>/</span>
          <span className="text-amber-400 font-semibold">Статьи о протоколах</span>
        </nav>

        {/* Header */}
        <div className="max-w-4xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
            📡 Инженерная экспертиза
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Всё о протоколах умного дома
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Подробно и без маркетингового шума объясняем физику и логику работы Zigbee 3.0, Matter, Thread и Home Assistant.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((art) => (
            <article
              key={art.slug}
              className="p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4 text-xs font-mono text-slate-400">
                  <span className="px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold uppercase">
                    {art.category}
                  </span>
                  <span>{art.readingTime} чтения</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-amber-400 transition-colors mb-3">
                  <Link href={`/articles/${art.slug}`}>{art.title}</Link>
                </h2>

                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  {art.summary}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {art.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800/80 text-cyan-300 border border-cyan-500/20"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span>{art.author}</span>
                <Link
                  href={`/articles/${art.slug}`}
                  className="font-bold text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1"
                >
                  Читать статью →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </div>
  );
}
