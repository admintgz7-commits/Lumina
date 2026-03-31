'use client';

import Link from 'next/link';
import { useTina } from 'tinacms/dist/react';
import ToolCard from '@/components/ToolCard';
import BlogCard from '@/components/BlogCard';
import Footer from '@/components/Footer';

interface Props {
  data: any; query: string; variables: object;
  outils: any[]; articles: any[]; secteurs: any[];
  displayOutils: any[];
}

export default function HomeClient({ data, query, variables, outils, articles, secteurs, displayOutils }: Props) {
  const { data: tinaData } = useTina({ data, query, variables });
  const home = tinaData.homepage;

  return (
    <>
      {home.announcement_enabled && home.announcement_text && (
        <div style={{ background: 'var(--accent)', color: 'white', textAlign: 'center', padding: '10px 24px', fontSize: '13px', fontWeight: 600, position: 'sticky', top: 'var(--nav-h)', zIndex: 90 }}>
          {home.announcement_url
            ? <Link href={home.announcement_url} style={{ color: 'white', textDecoration: 'underline' }}>{home.announcement_text}</Link>
            : <span>{home.announcement_text}</span>}
        </div>
      )}

      <section className="hero">
        <div className="container">
          <div className="hero-eyebrow">{home.hero_eyebrow || '✦ Intelligence Gallery'}</div>
          <h1 className="display-xl" dangerouslySetInnerHTML={{ __html: (home.hero_title || 'Trouvez l\'outil IA\nfait pour votre métier.').replace(/\n/g, '<br/>') }} />
          <p className="sub">{home.hero_subtitle}</p>
          <div className="hero-actions">
            <Link href="/outils" className="btn btn-primary btn-lg">{home.hero_cta_primary || 'Explorer les outils →'}</Link>
            <Link href="/blog" className="btn btn-ghost btn-lg">{home.hero_cta_secondary || 'Lire le blog'}</Link>
          </div>
          <div style={{ marginTop: '32px', padding: '12px 20px', background: 'rgba(91,94,246,.06)', borderRadius: 'var(--radius)', display: 'inline-block', fontSize: '12px', color: 'var(--ink-muted)', border: '1px solid rgba(91,94,246,.15)' }}>
            ℹ️ <strong>Transparence</strong> — {home.transparency_text}{' '}
            <Link href="/qui-sommes-nous" style={{ color: 'var(--accent)', fontSize: '12px', fontWeight: 600 }}>En savoir plus →</Link>
          </div>
          <div className="hero-stats">
            <div><div className="hero-stat-value">{outils.length}+</div><div className="hero-stat-label">Outils répertoriés</div></div>
            <div><div className="hero-stat-value">{secteurs.length}</div><div className="hero-stat-label">Secteurs couverts</div></div>
            <div><div className="hero-stat-value">{outils.filter((t: any) => t.tested).length}</div><div className="hero-stat-label">Outils testés</div></div>
            <div><div className="hero-stat-value">{articles.length}</div><div className="hero-stat-label">Articles publiés</div></div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--surface-2)' }}>
        <div className="container">
          <h2 className="display-md" style={{ marginBottom: '8px' }}>Par secteur</h2>
          <p className="text-muted" style={{ marginBottom: '36px' }}>Filtrez par domaine professionnel</p>
          <div className="grid-3">
            {secteurs.map((s: any) => {
              const count = outils.filter((t: any) => t.sector.includes(s.id)).length;
              return (
                <Link key={s.id} href={`/secteur/${s.id}`} className="card" style={{ cursor: 'pointer', overflow: 'hidden' }}>
                  <div style={{ position: 'relative', height: '140px', overflow: 'hidden' }}>
                    <img src={s.photo} alt={s.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(0,0,0,.6) 0%,transparent 60%)' }} />
                    <div style={{ position: 'absolute', bottom: '14px', left: '16px', color: 'white' }}>
                      <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1rem' }}>{s.label}</div>
                      <div style={{ fontSize: '12px', opacity: .8 }}>{count} outil{count > 1 ? 's' : ''}</div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h2 className="display-md" style={{ marginBottom: '4px' }}>{home.section_outils_title || 'Sélection de la semaine'}</h2>
              <p className="text-muted">{home.section_outils_subtitle}</p>
            </div>
            <Link href="/outils" className="btn btn-ghost">Voir tous les outils →</Link>
          </div>
          <div className="grid-4">{displayOutils.map((t: any) => <ToolCard key={t.id} tool={t} />)}</div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--surface-2)' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
            <div>
              <h2 className="display-md" style={{ marginBottom: '4px' }}>{home.section_blog_title || 'Derniers articles'}</h2>
              <p className="text-muted">{home.section_blog_subtitle}</p>
            </div>
            <Link href="/blog" className="btn btn-ghost">Tous les articles →</Link>
          </div>
          <div className="grid-3">{articles.slice(0, 3).map((a: any) => <BlogCard key={a.slug} article={a} />)}</div>
        </div>
      </section>

      <section className="newsletter">
        <div className="container">
          <h2>{home.newsletter_title || 'Chaque lundi, les nouveaux outils testés.'}</h2>
          <p>{home.newsletter_subtitle}</p>
          <div className="newsletter-form">
            <input type="email" placeholder="votre@email.com" />
            <button className="btn btn-primary">{home.newsletter_cta || "S'abonner gratuitement"}</button>
          </div>
        </div>
      </section>

      <Footer secteurs={secteurs} />
    </>
  );
}
