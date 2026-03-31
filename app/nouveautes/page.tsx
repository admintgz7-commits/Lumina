import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllOutils, getAllArticles, getAllSecteurs } from '@/lib/content';
import ToolCard from '@/components/ToolCard';
import BlogCard from '@/components/BlogCard';
import Breadcrumb from '@/components/Breadcrumb';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Nouveautés — Derniers outils IA ajoutés | Lumina AI',
  description: 'Découvrez les derniers outils IA référencés sur Lumina AI. Nouveautés, mises à jour et outils récemment testés pour indépendants et coachs.',
  alternates: { canonical: 'https://lumina-ai.fr/nouveautes/' },
};

export default function NouveautesPage() {
  const allOutils = getAllOutils();
  const allArticles = getAllArticles();
  const secteurs = getAllSecteurs();

  const newOutils = allOutils.filter((t: any) => t.badge === 'new');
  const recentArticles = allArticles.slice(0, 6);
  const recentOutils = allOutils.slice(0, 8);

  return (
    <>
      <div className="page-header">
        <div className="container">
          <Breadcrumb crumbs={[{ label: 'Accueil', href: '/' }, { label: 'Nouveautés' }]} />
          <h1 className="display-lg">🆕 Nouveautés</h1>
          <p className="sub">Les derniers outils référencés et articles publiés sur Lumina AI.</p>
        </div>
      </div>

      {/* Outils marqués "new" */}
      {newOutils.length > 0 && (
        <section className="section">
          <div className="container">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <span style={{ display: 'inline-block', background: '#d1fae5', color: '#065f46', fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '99px', textTransform: 'uppercase', letterSpacing: '.04em', marginBottom: '8px' }}>Nouveau</span>
                <h2 className="display-md">Outils récemment ajoutés</h2>
              </div>
              <Link href="/outils?filtre=new" className="btn btn-ghost">Voir tous les nouveaux →</Link>
            </div>
            <div className="grid-4">
              {newOutils.map((t: any) => <ToolCard key={t.id} tool={t} />)}
            </div>
          </div>
        </section>
      )}

      {/* Derniers articles */}
      <section className={`section ${newOutils.length > 0 ? '' : ''}`} style={{ background: newOutils.length > 0 ? 'var(--surface-2)' : undefined }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
            <h2 className="display-md">Derniers articles</h2>
            <Link href="/blog" className="btn btn-ghost">Tous les articles →</Link>
          </div>
          <div className="grid-3">
            {recentArticles.map((a: any) => <BlogCard key={a.slug} article={a} />)}
          </div>
        </div>
      </section>

      {/* Derniers outils ajoutés (tous) */}
      <section className="section" style={{ background: newOutils.length > 0 ? undefined : 'var(--surface-2)' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
            <h2 className="display-md">Derniers outils référencés</h2>
            <Link href="/outils" className="btn btn-ghost">Tous les outils →</Link>
          </div>
          <div className="grid-4">
            {recentOutils.map((t: any) => <ToolCard key={t.id} tool={t} />)}
          </div>
        </div>
      </section>

      <Footer secteurs={secteurs} />
    </>
  );
}
