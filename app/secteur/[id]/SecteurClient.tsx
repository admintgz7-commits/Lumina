'use client';

import Link from 'next/link';
import { useTina } from 'tinacms/dist/react';
import ToolCard from '@/components/ToolCard';
import BlogCard from '@/components/BlogCard';
import Breadcrumb from '@/components/Breadcrumb';
import Footer from '@/components/Footer';

const CATEGORY_LABELS: Record<string, string> = {
  'website-builder': 'Créateur de site', 'seo-writing': 'Rédaction SEO', 'social-media': 'Réseaux sociaux',
  'branding': 'Branding', 'image-gen': 'Génération image', 'image-editing': 'Retouche image',
  'video-avatar': 'Avatar vidéo', 'video-gen': 'Vidéo IA', 'video-editing': 'Montage vidéo',
  'audio': 'Audio', 'copywriting': 'Copywriting', 'business-ideas': 'Idées business',
  'business-planning': 'Business plan', '3d-video': '3D & Vidéo',
};

interface Props {
  data: any; query: string; variables: object;
  outils: any[]; articles: any[]; secteurs: any[]; id: string; categories: string[];
}

export default function SecteurClient({ data, query, variables, outils, articles, secteurs, categories }: Props) {
  const { data: tinaData } = useTina({ data, query, variables });
  const secteur = tinaData.secteurs;

  return (
    <>
      <div style={{ position: 'relative', paddingTop: 'var(--nav-h)', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          {secteur.photo && <img src={secteur.photo} alt={secteur.label || ''} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(.35)' }} />}
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 1, padding: '64px 24px 56px' }}>
          <Breadcrumb crumbs={[{ label: 'Accueil', href: '/' }, { label: 'Outils IA', href: '/outils' }, { label: secteur.label || '' }]} />
          <div style={{ display: 'inline-block', background: 'rgba(91,94,246,.85)', color: 'white', fontSize: '11px', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', padding: '4px 12px', borderRadius: '99px', marginBottom: '16px' }}>
            {outils.length} outil{outils.length > 1 ? 's' : ''}
          </div>
          <h1 className="display-lg" style={{ color: 'white', marginBottom: '12px' }}>{secteur.headline || secteur.label}</h1>
          <p style={{ color: 'rgba(255,255,255,.8)', fontSize: '16px', maxWidth: '600px' }}>{secteur.sub}</p>
        </div>
      </div>

      {categories.length > 1 && (
        <div style={{ background: 'var(--surface-2)', borderBottom: '1px solid var(--border)', padding: '16px 0' }}>
          <div className="container">
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
              <span className="filter-label">Sous-catégories :</span>
              {categories.map(c => {
                const n = outils.filter((t: any) => t.category === c).length;
                return (
                  <Link key={c} href={`/outils?secteur=${secteur.identifiant}&categorie=${c}`} className="sector-pill">
                    {CATEGORY_LABELS[c] || c} <span className="sector-pill-count">{n}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '12px' }}>
            <h2 className="display-md">Tous les outils</h2>
            <Link href={`/outils?secteur=${secteur.identifiant}`} className="btn btn-ghost">Filtrer & trier →</Link>
          </div>
          {outils.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">🔍</div>
              <h3>Aucun outil dans ce secteur pour l'instant</h3>
              <p><Link href="/outils" className="btn btn-ghost btn-sm">Voir tous les outils</Link></p>
            </div>
          ) : (
            <div className="grid-4">{outils.map((t: any) => <ToolCard key={t.id} tool={t} />)}</div>
          )}
        </div>
      </section>

      {articles.length > 0 && (
        <section className="section" style={{ background: 'var(--surface-2)' }}>
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h2 className="display-md" style={{ marginBottom: '4px' }}>Articles sur {secteur.label}</h2>
                <p className="text-muted">Guides et analyses pour ce secteur</p>
              </div>
              <Link href="/blog" className="btn btn-ghost">Tous les articles →</Link>
            </div>
            <div className="grid-3">{articles.slice(0, 3).map((a: any) => <BlogCard key={a.slug} article={a} />)}</div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container">
          <h2 className="display-md" style={{ marginBottom: '28px' }}>Autres secteurs</h2>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {secteurs.filter((s: any) => s.id !== secteur.identifiant).map((s: any) => (
              <Link key={s.id} href={`/secteur/${s.id}`} className="card" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 20px' }}>
                <img src={s.photo} alt={s.label} style={{ width: '36px', height: '36px', borderRadius: '6px', objectFit: 'cover' }} />
                <span style={{ fontWeight: 600, fontSize: '14px' }}>{s.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer secteurs={secteurs} />
    </>
  );
}
