import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllOutils, getOutilById, getAllSecteurs } from '@/lib/content';
import ToolCard from '@/components/ToolCard';
import Breadcrumb from '@/components/Breadcrumb';
import Footer from '@/components/Footer';

export async function generateStaticParams() {
  return getAllOutils().map((t: any) => ({ id: t.id }));
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const tool = getOutilById(params.id) as any;
  if (!tool) return {};
  return {
    title: `Alternatives à ${tool.name} en 2026 — Les meilleurs outils similaires | Lumina AI`,
    description: `Vous cherchez une alternative à ${tool.name} ? Découvrez les meilleurs outils similaires testés par Lumina AI. Comparatif prix, fonctionnalités et cas d'usage.`,
    alternates: { canonical: `https://lumina-ai.fr/alternatives/${params.id}/` },
  };
}

export default function AlternativesPage({ params }: { params: { id: string } }) {
  const tool = getOutilById(params.id) as any;
  if (!tool) notFound();

  const allOutils = getAllOutils();
  const secteurs = getAllSecteurs();

  // Alternatives = même catégorie OU même secteur, exclu l'outil lui-même
  const byCat = allOutils.filter((t: any) =>
    t.id !== params.id && t.category && t.category === tool.category
  );
  const bySector = allOutils.filter((t: any) =>
    t.id !== params.id &&
    !byCat.find((b: any) => b.id === t.id) &&
    t.sector.some((s: string) => tool.sector.includes(s))
  );

  const alternatives = [...byCat, ...bySector].slice(0, 8);

  return (
    <>
      <div className="page-header">
        <div className="container">
          <Breadcrumb crumbs={[
            { label: 'Accueil', href: '/' },
            { label: 'Outils IA', href: '/outils' },
            { label: tool.name, href: `/outil/${params.id}` },
            { label: `Alternatives à ${tool.name}` },
          ]} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <img src={tool.logo} alt={tool.name} style={{ width: '56px', height: '56px', borderRadius: '12px', objectFit: 'cover', border: '1px solid var(--border)' }} />
            <div>
              <h1 className="display-lg">Alternatives à {tool.name}</h1>
              <p className="text-muted">{alternatives.length} outil{alternatives.length > 1 ? 's' : ''} similaire{alternatives.length > 1 ? 's' : ''} sélectionné{alternatives.length > 1 ? 's' : ''}</p>
            </div>
          </div>

          {/* Pourquoi chercher une alternative */}
          <div style={{ background: 'var(--accent-soft)', borderRadius: 'var(--radius)', padding: '16px 20px', marginTop: '16px', maxWidth: '680px', fontSize: '14px', color: 'var(--ink-muted)', lineHeight: 1.65 }}>
            <strong style={{ color: 'var(--ink)' }}>{tool.name}</strong> — {tool.tagline}<br />
            <span style={{ fontSize: '12px' }}>Prix actuel : <strong>{tool.priceDetails || tool.priceType}</strong> · Catégorie : {tool.category}</span>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {alternatives.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">🔍</div>
              <h3>Pas encore d'alternatives répertoriées</h3>
              <p><Link href="/outils" className="btn btn-ghost btn-sm">Explorer tous les outils</Link></p>
            </div>
          ) : (
            <>
              {byCat.length > 0 && (
                <>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.3rem', marginBottom: '20px' }}>
                    Même type d'outil
                  </h2>
                  <div className="grid-4" style={{ marginBottom: '48px' }}>
                    {byCat.slice(0, 4).map((t: any) => <ToolCard key={t.id} tool={t} />)}
                  </div>
                </>
              )}
              {bySector.length > 0 && (
                <>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.3rem', marginBottom: '20px' }}>
                    Même secteur
                  </h2>
                  <div className="grid-4">
                    {bySector.slice(0, 4).map((t: any) => <ToolCard key={t.id} tool={t} />)}
                  </div>
                </>
              )}
            </>
          )}

          {/* Retour vers la fiche outil */}
          <div style={{ marginTop: '48px', padding: '32px 40px', background: 'var(--surface-2)', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, marginBottom: '4px' }}>Vous restez sur {tool.name} ?</div>
              <p style={{ color: 'var(--ink-muted)', fontSize: '14px' }}>Consultez la fiche complète avec fonctionnalités et cas d'usage.</p>
            </div>
            <Link href={`/outil/${params.id}`} className="btn btn-primary">Voir la fiche {tool.name} →</Link>
          </div>
        </div>
      </section>

      <Footer secteurs={secteurs} />
    </>
  );
}
