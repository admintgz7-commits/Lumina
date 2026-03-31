'use client';
import { useState } from 'react';
import Link from 'next/link';
import BlogCard from '@/components/BlogCard';

export default function BlogClient({ articles, secteurs }: { articles: any[]; secteurs: any[] }) {
  const [activeSector, setActiveSector] = useState<string | null>(null);

  const filtered = activeSector ? articles.filter((a: any) => a.sector === activeSector) : articles;
  const first = filtered[0];
  const rest = filtered.slice(1);

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1 className="display-lg">Blog & Analyses</h1>
          <p className="sub">Décryptages, guides et retours d'expérience sur l'IA professionnelle.</p>
        </div>
      </div>

      <div className="filters-bar">
        <div className="container">
          <div className="sector-nav">
            <button className={`sector-pill ${!activeSector ? 'active' : ''}`} onClick={() => setActiveSector(null)}>
              Tous <span className="sector-pill-count">{articles.length}</span>
            </button>
            {secteurs.map((s: any) => {
              const n = articles.filter((a: any) => a.sector === s.id).length;
              if (n === 0) return null;
              return (
                <button key={s.id} className={`sector-pill ${activeSector === s.id ? 'active' : ''}`} onClick={() => setActiveSector(s.id)}>
                  {s.label} <span className="sector-pill-count">{n}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {filtered.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📝</div>
              <h3>Aucun article dans ce secteur</h3>
              <p>Revenez bientôt ou <button className="btn btn-ghost btn-sm" onClick={() => setActiveSector(null)}>explorez tous les articles</button></p>
            </div>
          ) : (
            <>
              {first && (
                <Link href={`/article/${first.slug}`} className="card" style={{ cursor: 'pointer', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, marginBottom: '40px', overflow: 'hidden' }}>
                  <img src={first.coverPhoto} alt={first.title} style={{ width: '100%', height: '320px', objectFit: 'cover' }} loading="lazy" />
                  <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div className="blog-card-label">{first.sectorLabel}</div>
                    <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1.6rem', marginBottom: '16px', lineHeight: 1.2 }}>{first.title}</h2>
                    <p style={{ color: 'var(--ink-muted)', fontSize: '14px', lineHeight: 1.65, marginBottom: '20px' }}>{first.intro}</p>
                    <div className="blog-card-meta" style={{ marginBottom: '20px' }}>
                      <span>{first.date || ''}</span><span>·</span><span>{first.readTime}</span>
                    </div>
                    <span className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>Lire l'article →</span>
                  </div>
                </Link>
              )}
              {rest.length > 0 && (
                <div className="grid-3">
                  {rest.map((a: any) => <BlogCard key={a.slug} article={a} />)}
                </div>
              )}
            </>
          )}

          <div style={{ marginTop: '64px', padding: '40px', background: 'var(--surface-2)', borderRadius: 'var(--radius-lg)', textAlign: 'center', border: '1px dashed var(--border)' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '12px' }}>✍️</div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, marginBottom: '8px' }}>Envie de contribuer ?</h3>
            <p style={{ color: 'var(--ink-muted)', marginBottom: '20px', fontSize: '14px' }}>Partagez votre expertise sur l'IA dans votre secteur.</p>
            <Link href="/contact" className="btn btn-primary">Proposer un article →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
