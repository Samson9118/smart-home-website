import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { articles } from '@/data/articles';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return { title: 'Статья не найдена' };

  return {
    title: `${article.title} | SmartHome Lab`,
    description: article.summary,
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="py-12 sm:py-16 bg-slate-950 text-white min-h-screen">
      <Container>
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8">
          <Link href="/" className="hover:text-amber-400">Главная</Link>
          <span>/</span>
          <Link href="/articles" className="hover:text-amber-400">Статьи</Link>
          <span>/</span>
          <span className="text-amber-400 font-semibold truncate max-w-xs">{article.title}</span>
        </nav>

        {/* Article Header */}
        <header className="max-w-4xl mx-auto mb-12">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400 mb-4">
            <span className="px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold uppercase">
              {article.category}
            </span>
            <span>⏱ {article.readingTime}</span>
            <span>•</span>
            <span>{article.date}</span>
            <span>•</span>
            <span className="text-cyan-400">{article.author}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            {article.title}
          </h1>

          <div className="mt-6 p-6 rounded-2xl bg-slate-900 border-l-4 border-amber-500 text-slate-200 text-base sm:text-lg leading-relaxed">
            {article.content.lead}
          </div>
        </header>

        {/* Article Body */}
        <div className="max-w-4xl mx-auto space-y-12">
          {article.content.sections.map((sec, idx) => (
            <section key={idx} className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {sec.title}
              </h2>

              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                {sec.paragraphs.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>

              {/* Code or Diagram Box */}
              {sec.codeOrDiagram && (
                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 font-mono text-xs sm:text-sm text-cyan-300 overflow-x-auto whitespace-pre my-6">
                  {sec.codeOrDiagram}
                </div>
              )}

              {/* Key Takeaways */}
              {sec.keyTakeaways && sec.keyTakeaways.length > 0 && (
                <div className="p-6 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 space-y-2.5 my-6">
                  <div className="text-sm font-bold text-cyan-400 flex items-center gap-2">
                    <span>💡</span> Ключевые выводы раздела:
                  </div>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-slate-300 pl-4 list-disc">
                    {sec.keyTakeaways.map((point, kIdx) => (
                      <li key={kIdx}>{point}</li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          ))}

          {/* Tags */}
          <div className="pt-6 border-t border-slate-800 flex flex-wrap gap-2">
            {article.tags.map((tag, i) => (
              <span
                key={i}
                className="text-xs px-3 py-1 rounded-lg bg-slate-900 text-slate-300 border border-slate-800"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Back & CTA */}
          <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-white">Хотите применить эти технологии в вашем доме?</h3>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">
                Рассчитайте спецификацию оборудования на Zigbee 3.0 и Matter в нашем интерактивном калькуляторе.
              </p>
            </div>
            <Link href="/calculator">
              <Button size="lg" className="whitespace-nowrap">Открыть калькулятор сметы</Button>
            </Link>
          </div>
        </div>
      </Container>
    </article>
  );
}
