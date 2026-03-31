'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useTina } from 'tinacms/dist/react';
import Breadcrumb from '@/components/Breadcrumb';
import Footer from '@/components/Footer';

interface Props { data: any; query: string; variables: object; secteurs: any[]; }

export default function FaqClient({ data, query, variables, secteurs }: Props) {
  const { data: tinaData } = useTina({ data, query, variables });
  const faqData = tinaData.faq;
  const faqs = faqData.faqs ?? [];
  const [open, setOpen] = useState<number | null>(0);

  return (
    <>
      <div className="page-header">
        <div className="container">
          <Breadcrumb crumbs={[{ label: 'Accueil', href: '/' }, { label: 'FAQ' }]} />
          <h1 className="display-lg">{faqData.title || 'Questions fréquentes'}</h1>
          <p className="sub">{faqData.subtitle}</p>
        </div>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: '760px' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {faqs.map((f: any, i: number) => (
              <div key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', font: 'inherit', gap: '16px' }}
                >
                  <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1rem', color: 'var(--ink)', lineHeight: 1.3 }}>{f.question}</span>
                  <span style={{ flexShrink: 0, width: '24px', height: '24px', borderRadius: '50%', background: open === i ? 'var(--accent)' : 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .2s', color: open === i ? 'white' : 'var(--ink-muted)', fontSize: '16px' }}>
                    {open === i ? '−' : '+'}
                  </span>
                </button>
                {open === i && (
                  <div style={{ paddingBottom: '20px', fontSize: '15px', color: 'var(--ink-muted)', lineHeight: 1.75 }}>{f.answer}</div>
                )}
              </div>
            ))}
          </div>

          <div style={{ marginTop: '64px', padding: '32px 40px', background: 'var(--surface-2)', borderRadius: 'var(--radius-lg)', textAlign: 'center', border: '1px dashed var(--border)' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, marginBottom: '8px' }}>Vous n'avez pas trouvé votre réponse ?</h3>
            <p style={{ color: 'var(--ink-muted)', marginBottom: '20px', fontSize: '14px' }}>Notre équipe répond sous 48h ouvrées.</p>
            <Link href="/contact" className="btn btn-primary">Nous contacter →</Link>
          </div>
        </div>
      </section>

      <Footer secteurs={secteurs} />
    </>
  );
}
