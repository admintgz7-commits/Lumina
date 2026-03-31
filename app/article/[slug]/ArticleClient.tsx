'use client';

import Link from 'next/link';
import { useTina } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';

const DISCLAIMER = `Cet article est le fruit d'une analyse indépendante. Lumina AI n'a reçu aucune rémunération de la part des éditeurs d'outils mentionnés pour la rédaction de ce contenu. Certains liens de ce site sont des liens affiliés : si vous vous abonnez à un outil via notre lien, nous percevons une commission sans que cela ne change le prix que vous payez. Cette politique n'influence pas nos recommandations éditoriales.`;

interface Props {
  data: any;
  query: string;
  variables: object;
  related: any[];
  secteurs: any[];
}

export default function ArticleClient({ data, query, variables, related, secteurs }: Props) {
  const { data: tinaData } = useTina({ data, query, variables });
  const article = tinaData.articles;

  return (
    <>
      <div className="article-header">
        <div className="container" style={{ maxWidth: '840px', paddingTop: 'calc(var(--nav-h) + 48px)' }}>
          <Link href="/blog" className="btn btn-ghost btn-sm" style={{ marginBottom: '24px' }}>← Retour au blog</Link>
          <div className="article-label">{article.sectorLabel}</div>
          <h1 className="article-title">{article.title}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px', fontSize: '13px', color: 'var(--ink-muted)' }}>
            {article.date && <span>📅 {article.date}</span>}
            <span>⏱ {article.readTime}</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '840px', paddingBottom: '80px' }}>
        {article.coverPhoto && (
          <img src={article.coverPhoto} alt={article.coverAlt || article.title} className="article-cover" loading="lazy" />
        )}

        <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '16px 20px', margin: '32px 0', fontSize: '13px', color: 'var(--ink-muted)', lineHeight: 1.6 }}>
          <strong style={{ color: 'var(--ink)' }}>ℹ️ Transparence éditoriale</strong> — {DISCLAIMER}
        </div>

        <div className="article-body">
          {article.intro && (
            <p style={{ fontSize: '17px', lineHeight: 1.8, fontWeight: 400 }}>{article.intro}</p>
          )}

          {article.pullQuote && (
            <div className="pull-quote"><p>{article.pullQuote}</p></div>
          )}

          {(article.sections ?? []).map((s: any, i: number) => (
            <div key={i}>
              <h2>{s.title}</h2>
              {s.body && <TinaMarkdown content={s.body} />}
            </div>
          ))}

          {article.faq && article.faq.length > 0 && (
            <div style={{ marginTop: '40px' }}>
              <h2>Questions fréquentes</h2>
              {article.faq.map((f: any, i: number) => (
                <div key={i} style={{ marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>{f.question}</h3>
                  <p style={{ color: 'var(--ink-muted)', lineHeight: 1.7 }}>{f.answer}</p>
                </div>
              ))}
            </div>
          )}

          <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '16px 20px', margin: '32px 0', fontSize: '13px', color: 'var(--ink-muted)', lineHeight: 1.6 }}>
            <strong style={{ color: 'var(--ink)' }}>ℹ️ Transparence éditoriale</strong> — {DISCLAIMER}
          </div>

          <div className="tag-list" style={{ marginTop: '36px' }}>
            {(article.tags ?? []).map((t: string, i: number) => (
              <span key={i} className="tag">{t}</span>
            ))}
          </div>
        </div>

        {related.length > 0 && (
          <div style={{ marginTop: '64px', paddingTop: '48px', borderTop: '1px solid var(--border)' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.3rem', marginBottom: '24px' }}>Articles qui pourraient vous intéresser</h3>
            <div className="grid-2">
              {related.map((a: any) => <BlogCard key={a.slug} article={a} />)}
            </div>
          </div>
        )}
      </div>

      <Footer secteurs={secteurs} />
    </>
  );
}
