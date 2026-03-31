'use client';

import Link from 'next/link';
import { useTina } from 'tinacms/dist/react';
import Breadcrumb from '@/components/Breadcrumb';
import Footer from '@/components/Footer';

interface Props {
  data: any; query: string; variables: object;
  outils: any[]; secteurs: any[];
}

export default function SelectionClient({ data, query, variables, outils, secteurs }: Props) {
  const { data: tinaData } = useTina({ data, query, variables });
  const sel = tinaData.selections;

  return (
    <>
      {sel.coverPhoto && (
        <div style={{ position: 'relative', paddingTop: 'var(--nav-h)', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <img src={sel.coverPhoto} alt={sel.coverAlt || sel.title || ''} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(.3)' }} />
          </div>
          <div className="container" style={{ position: 'relative', zIndex: 1, padding: '56px 24px 48px' }}>
            <Breadcrumb crumbs={[{ label: 'Accueil', href: '/' }, { label: 'Sélections', href: '/selections' }, { label: sel.title || '' }]} />
            <div style={{ display: 'inline-block', background: 'var(--accent)', color: 'white', fontSize: '11px', fontWeight: 700, padding: '4px 12px', borderRadius: '99px', marginBottom: '16px' }}>
              🎯 Sélection — {outils.length} outil{outils.length > 1 ? 's' : ''}
            </div>
            <h1 className="display-lg" style={{ color: 'white', marginBottom: '12px' }}>{sel.title}</h1>
            <p style={{ color: 'rgba(255,255,255,.8)', fontSize: '16px', maxWidth: '640px' }}>{sel.description}</p>
          </div>
        </div>
      )}

      {!sel.coverPhoto && (
        <div className="page-header">
          <div className="container">
            <Breadcrumb crumbs={[{ label: 'Accueil', href: '/' }, { label: 'Sélections', href: '/selections' }, { label: sel.title || '' }]} />
            <h1 className="display-lg">{sel.title}</h1>
            <p className="sub">{sel.description}</p>
          </div>
        </div>
      )}

      <section className="section">
        <div className="container">
          {sel.intro && (
            <div style={{ maxWidth: '720px', marginBottom: '48px' }}>
              <p style={{ fontSize: '17px', lineHeight: 1.8, color: 'var(--ink-muted)' }}>{sel.intro}</p>
            </div>
          )}

          {outils.length === 0 ? (
            <div className="empty-state"><div className="empty-state-icon">🔧</div><h3>Outils en cours de référencement</h3></div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {outils.map((t: any, i: number) => (
                <div key={t.id} style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', padding: '28px 0', borderBottom: i < outils.length - 1 ? '1px solid var(--border)' : 'none' }}>
                  <div style={{ flexShrink: 0, width: '40px', height: '40px', background: i === 0 ? 'var(--accent)' : 'var(--surface-2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1rem', color: i === 0 ? 'white' : 'var(--ink-muted)' }}>
                    {i + 1}
                  </div>
                  <img src={t.logo} alt={t.name} style={{ width: '52px', height: '52px', borderRadius: '12px', objectFit: 'cover', border: '1px solid var(--border)', flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px', flexWrap: 'wrap' }}>
                      <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.1rem' }}>{t.name}</h3>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--ink-muted)', background: 'var(--surface-2)', padding: '2px 10px', borderRadius: '99px' }}>{t.priceType}</span>
                      {t.badge && <span className={`badge badge-${t.badge}`}>{t.badgeLabel || t.badge}</span>}
                    </div>
                    <p style={{ fontSize: '14px', color: 'var(--ink-muted)', marginBottom: '12px', lineHeight: 1.6 }}>{t.tagline}</p>
                    {t.features && t.features.length > 0 && (
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '12px' }}>
                        {t.features.slice(0, 3).map((f: string, j: number) => (
                          <span key={j} style={{ fontSize: '12px', color: 'var(--ink-muted)', background: 'var(--surface-2)', padding: '3px 10px', borderRadius: '99px' }}>✓ {f}</span>
                        ))}
                      </div>
                    )}
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      <Link href={`/outil/${t.id}`} className="btn btn-ghost btn-sm">Voir la fiche →</Link>
                      {t.url && t.url !== '#' && (
                        <a href={t.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">Essayer {t.name}</a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {sel.tags && sel.tags.length > 0 && (
            <div className="tag-list" style={{ marginTop: '48px' }}>
              {sel.tags.map((t: string, i: number) => <span key={i} className="tag">{t}</span>)}
            </div>
          )}

          <div style={{ marginTop: '64px', padding: '40px', background: 'var(--surface-2)', borderRadius: 'var(--radius-lg)', textAlign: 'center', border: '1px dashed var(--border)' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '12px' }}>🎯</div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, marginBottom: '8px' }}>Voir toutes nos sélections</h3>
            <p style={{ color: 'var(--ink-muted)', marginBottom: '20px', fontSize: '14px' }}>D'autres listes thématiques pour chaque profil et usage.</p>
            <Link href="/selections" className="btn btn-primary">Toutes les sélections →</Link>
          </div>
        </div>
      </section>

      <Footer secteurs={secteurs} />
    </>
  );
}
