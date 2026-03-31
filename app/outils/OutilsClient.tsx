'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import ToolCard from '@/components/ToolCard';
import SearchBar from '@/components/SearchBar';

const CATEGORY_LABELS: Record<string, string> = {
  'website-builder': 'Créateur de site',
  'seo-writing': 'Rédaction SEO',
  'social-media': 'Réseaux sociaux',
  'branding': 'Branding',
  'image-gen': 'Génération image',
  'image-editing': 'Retouche image',
  'video-avatar': 'Avatar vidéo',
  'video-gen': 'Vidéo IA',
  'video-editing': 'Montage vidéo',
  'audio': 'Audio',
  'copywriting': 'Copywriting',
  'business-ideas': 'Idées business',
  'business-planning': 'Business plan',
  '3d-video': '3D & Vidéo',
};

const SORT_OPTIONS = [
  { value: 'default', label: 'Par défaut' },
  { value: 'name', label: 'Nom (A→Z)' },
  { value: 'price-asc', label: 'Prix (gratuit en premier)' },
  { value: 'newest', label: 'Nouveautés' },
];

export default function OutilsClient({ outils, secteurs }: { outils: any[]; secteurs: any[] }) {
  const searchParams = useSearchParams();
  const [activeSector, setActiveSector] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('default');
  const [page, setPage] = useState(1);
  const PER_PAGE = 16;

  useEffect(() => {
    if (!searchParams) return;
    const s = searchParams.get('secteur');
    const c = searchParams.get('categorie');
    if (s) setActiveSector(s);
    if (c) setActiveCategory(c);
  }, [searchParams]);

  // Reset page on filter change
  useEffect(() => { setPage(1); }, [activeSector, activeFilter, activeCategory, sortBy]);

  // Sous-catégories disponibles pour le secteur actif
  const availableCategories = Array.from(new Set(
    outils
      .filter((t: any) => !activeSector || t.sector.includes(activeSector))
      .map((t: any) => t.category)
      .filter(Boolean)
  ));

  let filtered = outils.filter((t: any) => {
    if (activeSector && !t.sector.includes(activeSector)) return false;
    if (activeCategory && t.category !== activeCategory) return false;
    if (activeFilter === 'tested') return t.tested;
    if (activeFilter === 'free') return t.priceType === 'Gratuit' || t.priceType === 'Freemium';
    if (activeFilter === 'api') return t.apiReady;
    if (activeFilter === 'new') return t.badge === 'new';
    return true;
  });

  // Tri
  if (sortBy === 'name') filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
  if (sortBy === 'price-asc') {
    const order = ['Gratuit', 'Freemium', 'Payant', 'Sur devis'];
    filtered = [...filtered].sort((a, b) => order.indexOf(a.priceType) - order.indexOf(b.priceType));
  }
  if (sortBy === 'newest') filtered = [...filtered].sort((a, b) => (b.badge === 'new' ? 1 : 0) - (a.badge === 'new' ? 1 : 0));

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const currentSecteur = activeSector ? secteurs.find((s: any) => s.id === activeSector) : null;

  return (
    <>
      <div className="page-header">
        <div className="container">
          {/* Breadcrumb */}
          <nav style={{ marginBottom: '16px', fontSize: '13px', color: 'var(--ink-muted)' }}>
            <Link href="/" style={{ color: 'var(--ink-muted)' }}>Accueil</Link>
            <span style={{ margin: '0 6px', opacity: .4 }}>›</span>
            {currentSecteur
              ? <><Link href="/outils" style={{ color: 'var(--ink-muted)' }}>Outils IA</Link><span style={{ margin: '0 6px', opacity: .4 }}>›</span><span style={{ color: 'var(--ink)', fontWeight: 600 }}>{currentSecteur.label}</span></>
              : <span style={{ color: 'var(--ink)', fontWeight: 600 }}>Outils IA</span>
            }
          </nav>
          <h1 className="display-lg">
            {currentSecteur ? currentSecteur.headline || `Outils IA — ${currentSecteur.label}` : 'Tous les outils IA'}
          </h1>
          <p className="sub">
            {currentSecteur ? currentSecteur.sub || '' : 'Notre sélection complète, filtrée par secteur professionnel.'}
          </p>
          {/* Barre de recherche */}
          <div style={{ marginTop: '24px', maxWidth: '480px' }}>
            <SearchBar outils={outils} />
          </div>
        </div>
      </div>

      <div className="filters-bar">
        <div className="container">
          <div className="filters-inner" style={{ flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>

            {/* Ligne 1 : Secteurs */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', width: '100%' }}>
              <span className="filter-label" style={{ minWidth: '60px' }}>Secteur :</span>
              <div className="sector-nav">
                <button className={`sector-pill ${!activeSector ? 'active' : ''}`} onClick={() => { setActiveSector(null); setActiveCategory(null); }}>
                  Tous <span className="sector-pill-count">{outils.length}</span>
                </button>
                {secteurs.map((s: any) => {
                  const n = outils.filter((t: any) => t.sector.includes(s.id)).length;
                  return (
                    <button key={s.id} className={`sector-pill ${activeSector === s.id ? 'active' : ''}`} onClick={() => { setActiveSector(s.id); setActiveCategory(null); }}>
                      {s.label} <span className="sector-pill-count">{n}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Ligne 2 : Sous-catégories (si secteur actif) */}
            {availableCategories.length > 1 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span className="filter-label" style={{ minWidth: '60px' }}>Type :</span>
                <button className={`sector-pill ${!activeCategory ? 'active' : ''}`} style={{ fontSize: '12px' }} onClick={() => setActiveCategory(null)}>Tous</button>
                {availableCategories.map(c => (
                  <button key={c} className={`sector-pill ${activeCategory === c ? 'active' : ''}`} style={{ fontSize: '12px' }} onClick={() => setActiveCategory(c)}>
                    {CATEGORY_LABELS[c] || c}
                  </button>
                ))}
              </div>
            )}

            {/* Ligne 3 : Filtres rapides + tri */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', width: '100%' }}>
              <div className="filter-group">
                <span className="filter-label">Filtrer :</span>
                {(['all', 'tested', 'free', 'api', 'new'] as const).map(f => {
                  const labels = { all: 'Tous', tested: 'Testés ✓', free: 'Gratuit/Freemium', api: 'API ready', new: '🆕 Nouveautés' };
                  return (
                    <button key={f} className={`sector-pill ${activeFilter === f ? 'active' : ''}`} style={{ fontSize: '12px' }} onClick={() => setActiveFilter(f)}>
                      {labels[f]}
                    </button>
                  );
                })}
              </div>
              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="filter-label">Trier :</span>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  style={{ padding: '6px 12px', borderRadius: '99px', border: '1.5px solid var(--border)', fontSize: '12px', fontWeight: 600, color: 'var(--ink-muted)', background: 'var(--surface)', cursor: 'pointer', font: 'inherit' }}
                >
                  {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
            </div>

          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {filtered.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">🔍</div>
              <h3>Aucun outil pour ces critères</h3>
              <p>Essayez un autre filtre ou <button className="btn btn-ghost btn-sm" onClick={() => { setActiveSector(null); setActiveFilter('all'); setActiveCategory(null); }}>réinitialisez</button></p>
            </div>
          ) : (
            <>
              <div style={{ marginBottom: '16px', fontSize: '13px', color: 'var(--ink-muted)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span><strong style={{ color: 'var(--ink)' }}>{filtered.length}</strong> outil{filtered.length > 1 ? 's' : ''} trouvé{filtered.length > 1 ? 's' : ''}</span>
                {totalPages > 1 && <span>Page {page} / {totalPages}</span>}
              </div>
              <div className="grid-4">
                {paginated.map((t: any) => <ToolCard key={t.id} tool={t} />)}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '48px' }}>
                  <button className="btn btn-ghost btn-sm" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} style={{ opacity: page === 1 ? .4 : 1 }}>← Précédent</button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                    <button key={p} className={`sector-pill ${page === p ? 'active' : ''}`} style={{ width: '36px', height: '36px', padding: 0, justifyContent: 'center' }} onClick={() => setPage(p)}>{p}</button>
                  ))}
                  <button className="btn btn-ghost btn-sm" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} style={{ opacity: page === totalPages ? .4 : 1 }}>Suivant →</button>
                </div>
              )}
            </>
          )}

          <div style={{ marginTop: '64px', padding: '40px', background: 'var(--surface-2)', borderRadius: 'var(--radius-lg)', textAlign: 'center', border: '1px dashed var(--border)' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '12px' }}>🛠</div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, marginBottom: '8px' }}>Vous connaissez un outil qui manque ?</h3>
            <p style={{ color: 'var(--ink-muted)', marginBottom: '20px', fontSize: '14px' }}>Suggérez-le à notre équipe. Si il passe notre test, il sera référencé.</p>
            <Link href="/soumettre" className="btn btn-primary">Soumettre un outil →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
