'use client';

import Link from 'next/link';
import { useTina } from 'tinacms/dist/react';
import Breadcrumb from '@/components/Breadcrumb';
import Footer from '@/components/Footer';

interface Props {
  data: any;
  query: string;
  variables: object;
  relatedTools: any[];
  relatedArticles: any[];
  secteurs: any[];
  altCount: number;
}

export default function OutilClient({ data, query, variables, relatedTools, relatedArticles, secteurs, altCount }: Props) {
  const { data: tinaData } = useTina({ data, query, variables });
  const tool = tinaData.outils;

  const badgeCls: Record<string, string> = { best: 'badge-best', new: 'badge-new', api: 'badge-api' };
  const mainSecteur = tool.sector?.[0] ? secteurs.find((s: any) => s.id === tool.sector[0]) as any : null;

  return (
    <>
      <div className="tool-hero">
        <div className="container">
          <Breadcrumb crumbs={[
            { label: 'Accueil', href: '/' },
            { label: 'Outils IA', href: '/outils' },
            ...(mainSecteur ? [{ label: mainSecteur.label, href: `/secteur/${mainSecteur.id}` }] : []),
            { label: tool.name },
          ]} />
          <div className="tool-hero-inner">
            {tool.logo && <img src={tool.logo} alt={tool.name} className="tool-hero-logo" />}
            <div className="tool-hero-content">
              <h1 className="tool-hero-name display-lg">{tool.name}</h1>
              <p className="tool-hero-tagline">{tool.tagline}</p>
              <div className="tool-hero-badges">
                {tool.badge && <span className={`badge ${badgeCls[tool.badge] || ''}`}>{tool.badgeLabel || tool.badge}</span>}
                {tool.apiReady && <span className="badge badge-api">API ready</span>}
              </div>
              <div className="tool-hero-actions">
                {tool.url && (
                  <a href={tool.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
                    Essayer {tool.name} →
                  </a>
                )}
                {altCount > 0 && (
                  <Link href={`/alternatives/${tool.identifiant}`} className="btn btn-ghost btn-lg">
                    {altCount} alternative{altCount > 1 ? 's' : ''} →
                  </Link>
                )}
              </div>
            </div>
            <div style={{ flexShrink: 0, minWidth: '220px' }}>
              <div style={{ padding: '20px', background: 'var(--surface-2)', borderRadius: 'var(--radius)' }}>
                <div style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '.06em', color: 'var(--ink-muted)', marginBottom: '8px' }}>Tarif</div>
                <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1rem', color: 'var(--ink)', marginBottom: '4px' }}>{tool.priceDetails || 'Sur devis'}</div>
                <div style={{ fontSize: '12px', color: 'var(--ink-muted)' }}>{tool.priceType}</div>
              </div>
              <div style={{ marginTop: '12px', padding: '14px 20px', background: 'var(--accent-soft)', borderRadius: 'var(--radius)', fontSize: '12px', color: 'var(--ink-muted)', lineHeight: 1.5 }}>
                ℹ️ <em>Analyse indépendante. Liens affiliés possibles — sans frais pour vous.</em>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ gap: '56px', alignItems: 'start' }}>
            <div>
              <h2 className="display-md" style={{ marginBottom: '20px' }}>À propos</h2>
              <p style={{ fontSize: '16px', lineHeight: 1.75, color: 'var(--ink-muted)' }}>{tool.description || tool.tagline}</p>

              {tool.features && tool.features.length > 0 && (
                <div style={{ marginTop: '32px' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, marginBottom: '16px' }}>Fonctionnalités clés</h3>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {tool.features.map((f: string, i: number) => (
                      <li key={i} style={{ display: 'flex', gap: '10px', fontSize: '14px', color: 'var(--ink-muted)' }}>
                        <span style={{ color: 'var(--accent)', fontWeight: 700, flexShrink: 0 }}>✓</span>{f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {tool.useCases && tool.useCases.length > 0 && (
                <div style={{ marginTop: '28px' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, marginBottom: '16px' }}>Pour qui ?</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {tool.useCases.map((u: string, i: number) => (
                      <div key={i} style={{ background: 'var(--surface-2)', borderRadius: 'var(--radius)', padding: '12px 16px', fontSize: '14px', color: 'var(--ink-muted)' }}>→ {u}</div>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ marginTop: '28px' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, marginBottom: '16px' }}>Catégories</h3>
                <div className="tag-list">
                  {(tool.sector ?? []).map((s: string) => {
                    const sec = secteurs.find((x: any) => x.id === s);
                    return <Link key={s} href={`/secteur/${s}`} className="tag">{(sec as any)?.label || s}</Link>;
                  })}
                  {(tool.tags ?? []).map((t: string, i: number) => <span key={i} className="tag">{t}</span>)}
                </div>
              </div>
            </div>

            <div>
              {relatedTools.length > 0 && (
                <div style={{ marginBottom: '36px' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, marginBottom: '16px' }}>Outils similaires</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {relatedTools.map((t: any) => (
                      <Link key={t.id} href={`/outil/${t.id}`} className="card" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <img src={t.logo} alt={t.name} style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '14px' }}>{t.name}</div>
                          <div style={{ fontSize: '12px', color: 'var(--ink-muted)' }}>{t.priceType}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  {altCount > 3 && (
                    <Link href={`/alternatives/${tool.identifiant}`} style={{ display: 'block', marginTop: '12px', fontSize: '13px', color: 'var(--accent)', fontWeight: 600 }}>
                      Voir toutes les alternatives ({altCount}) →
                    </Link>
                  )}
                </div>
              )}

              {relatedArticles.length > 0 && (
                <div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, marginBottom: '16px' }}>Articles liés</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {relatedArticles.map((a: any) => (
                      <Link key={a.slug} href={`/article/${a.slug}`} className="card blog-card">
                        <div style={{ padding: '16px' }}>
                          <div className="blog-card-label">{a.sectorLabel}</div>
                          <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px' }}>{a.title}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer secteurs={secteurs} />
    </>
  );
}
