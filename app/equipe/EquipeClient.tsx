'use client';

import Link from 'next/link';
import { useTina } from 'tinacms/dist/react';
import Breadcrumb from '@/components/Breadcrumb';
import Footer from '@/components/Footer';

interface Props { data: any; query: string; variables: object; secteurs: any[]; }

export default function EquipeClient({ data, query, variables, secteurs }: Props) {
  const { data: tinaData } = useTina({ data, query, variables });
  const equipe = tinaData.equipe;

  return (
    <>
      <div className="page-header">
        <div className="container">
          <Breadcrumb crumbs={[{ label: 'Accueil', href: '/' }, { label: "L'équipe" }]} />
          <h1 className="display-lg">{equipe.title || "L'équipe Lumina AI"}</h1>
          <p className="sub">{equipe.subtitle}</p>
        </div>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: '840px' }}>
          {equipe.intro && (
            <p style={{ fontSize: '17px', lineHeight: 1.8, color: 'var(--ink-muted)', marginBottom: '56px' }}>{equipe.intro}</p>
          )}

          {equipe.members && equipe.members.length > 0 && (
            <div style={{ marginBottom: '56px' }}>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.4rem', marginBottom: '28px' }}>L'équipe</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {equipe.members.map((m: any, i: number) => (
                  <div key={i} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', padding: '24px', background: 'var(--surface-2)', borderRadius: 'var(--radius-lg)' }}>
                    {m.avatar
                      ? <img src={m.avatar} alt={m.name} style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                      : <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--accent-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '1.5rem' }}>👤</div>
                    }
                    <div>
                      <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.05rem', marginBottom: '4px' }}>{m.name}</div>
                      <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.04em', marginBottom: '10px' }}>{m.role}</div>
                      <p style={{ fontSize: '14px', color: 'var(--ink-muted)', lineHeight: 1.65, margin: 0 }}>{m.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {equipe.values && equipe.values.length > 0 && (
            <div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.4rem', marginBottom: '28px' }}>Nos valeurs</h2>
              <div className="grid-3" style={{ gap: '20px' }}>
                {equipe.values.map((v: any, i: number) => (
                  <div key={i} style={{ padding: '24px', background: 'var(--surface-2)', borderRadius: 'var(--radius-lg)', borderTop: '3px solid var(--accent)' }}>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1rem', marginBottom: '10px' }}>{v.title}</h3>
                    <p style={{ fontSize: '14px', color: 'var(--ink-muted)', lineHeight: 1.65, margin: 0 }}>{v.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ marginTop: '56px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn-primary">Nous contacter →</Link>
            <Link href="/qui-sommes-nous" className="btn btn-ghost">Approche éditoriale</Link>
          </div>
        </div>
      </section>

      <Footer secteurs={secteurs} />
    </>
  );
}
