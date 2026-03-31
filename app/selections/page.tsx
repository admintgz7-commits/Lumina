import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllSelections, getAllSecteurs } from '@/lib/content';
import Breadcrumb from '@/components/Breadcrumb';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Sélections thématiques — Les meilleurs outils IA par usage | Lumina AI',
  description: 'Nos sélections d\'outils IA par thématique : coachs, freelances, budget serré, vidéo, contenu… Des listes courtes et actionnables pour choisir vite.',
  alternates: { canonical: 'https://lumina-ai.fr/selections/' },
};

export default function SelectionsPage() {
  const selections = getAllSelections();
  const secteurs = getAllSecteurs();

  return (
    <>
      <div className="page-header">
        <div className="container">
          <Breadcrumb crumbs={[{ label: 'Accueil', href: '/' }, { label: 'Sélections' }]} />
          <h1 className="display-lg">🎯 Sélections thématiques</h1>
          <p className="sub">Des listes courtes et actionnables. Pour chaque usage ou profil, les outils qui font vraiment la différence.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {selections.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">🎯</div>
              <h3>Sélections en cours de création</h3>
              <p>Revenez bientôt ou <Link href="/outils" className="btn btn-ghost btn-sm">explorez tous les outils</Link></p>
            </div>
          ) : (
            <div className="grid-2" style={{ gap: '28px' }}>
              {selections.map((s: any) => (
                <Link key={s.slug} href={`/selections/${s.slug}`} className="card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                  {s.coverPhoto && (
                    <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
                      <img src={s.coverPhoto} alt={s.coverAlt || s.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,.55) 0%, transparent 60%)' }} />
                      <div style={{ position: 'absolute', bottom: '14px', left: '16px' }}>
                        <span style={{ background: 'var(--accent)', color: 'white', fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '99px' }}>
                          {s.outils?.length || 0} outils
                        </span>
                      </div>
                    </div>
                  )}
                  <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div className="blog-card-label">{s.date || 'Sélection'}</div>
                    <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.15rem', lineHeight: 1.25 }}>{s.title}</h2>
                    <p style={{ fontSize: '14px', color: 'var(--ink-muted)', lineHeight: 1.6, flex: 1 }}>{s.description}</p>
                    <div className="tag-list">
                      {(s.tags || []).map((t: string, i: number) => <span key={i} className="tag">{t}</span>)}
                    </div>
                    <span className="btn btn-ghost btn-sm" style={{ alignSelf: 'flex-start', marginTop: '8px' }}>Voir la sélection →</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer secteurs={secteurs} />
    </>
  );
}
