'use client';

import Link from 'next/link';
import { useTina } from 'tinacms/dist/react';
import Breadcrumb from '@/components/Breadcrumb';
import Footer from '@/components/Footer';

interface Props { data: any; query: string; variables: object; secteurs: any[]; }

export default function GlossaireClient({ data, query, variables, secteurs }: Props) {
  const { data: tinaData } = useTina({ data, query, variables });
  const terms = [...(tinaData.glossaire.terms ?? [])].sort((a: any, b: any) => a.term.localeCompare(b.term, 'fr'));

  const byLetter: Record<string, any[]> = {};
  terms.forEach((t: any) => {
    const l = t.term[0].toUpperCase();
    if (!byLetter[l]) byLetter[l] = [];
    byLetter[l].push(t);
  });
  const letters = Object.keys(byLetter).sort();

  return (
    <>
      <div className="page-header">
        <div className="container">
          <Breadcrumb crumbs={[{ label: 'Accueil', href: '/' }, { label: 'Glossaire IA' }]} />
          <h1 className="display-lg">📖 Glossaire IA</h1>
          <p className="sub">Tous les termes de l'intelligence artificielle expliqués simplement, sans jargon.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '48px', paddingBottom: '24px', borderBottom: '1px solid var(--border)' }}>
            {letters.map(l => (
              <a key={l} href={`#lettre-${l}`} className="alpha-link" style={{ width: '34px', height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', border: '1.5px solid var(--border)', fontSize: '13px', fontWeight: 700, color: 'var(--ink-muted)', textDecoration: 'none' }}>
                {l}
              </a>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
            {letters.map(letter => (
              <div key={letter} id={`lettre-${letter}`}>
                <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '2rem', color: 'var(--accent)', marginBottom: '20px', borderBottom: '2px solid var(--accent-soft)', paddingBottom: '8px' }}>{letter}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {byLetter[letter].map((t: any, i: number) => (
                    <div key={i} style={{ padding: '20px 24px', background: 'var(--surface-2)', borderRadius: 'var(--radius)', borderLeft: '3px solid var(--accent)' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '8px', flexWrap: 'wrap' }}>
                        <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.05rem', lineHeight: 1.2 }}>{t.term}</h2>
                        {t.category && (
                          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent)', background: 'var(--accent-soft)', padding: '2px 10px', borderRadius: '99px', flexShrink: 0 }}>{t.category}</span>
                        )}
                      </div>
                      <p style={{ fontSize: '14px', color: 'var(--ink-muted)', lineHeight: 1.7, margin: 0 }}>{t.definition}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '64px', padding: '32px 40px', background: 'var(--surface-2)', borderRadius: 'var(--radius-lg)', textAlign: 'center', border: '1px dashed var(--border)' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, marginBottom: '8px' }}>Un terme manque ?</h3>
            <p style={{ color: 'var(--ink-muted)', marginBottom: '20px', fontSize: '14px' }}>Signalez-le via notre page contact et on l'ajoute.</p>
            <Link href="/contact" className="btn btn-primary">Suggérer un terme →</Link>
          </div>
        </div>
      </section>

      <Footer secteurs={secteurs} />
    </>
  );
}
