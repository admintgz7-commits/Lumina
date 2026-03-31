'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [ressourcesOpen, setRessourcesOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (!pathname) return false;
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav className="nav" id="nav">
        <div className="nav-inner">
          <Link href="/" className="nav-logo">Lumina <em>AI</em></Link>

          <div className="nav-links">
            <Link href="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>Accueil</Link>
            <Link href="/outils" className={`nav-link ${isActive('/outils') || isActive('/secteur') || isActive('/outil') ? 'active' : ''}`}>Outils IA</Link>
            <Link href="/blog" className={`nav-link ${isActive('/blog') || isActive('/article') ? 'active' : ''}`}>Blog</Link>

            {/* Dropdown Ressources */}
            <div style={{ position: 'relative' }}
              onMouseEnter={() => setRessourcesOpen(true)}
              onMouseLeave={() => setRessourcesOpen(false)}
            >
              <button type="button" className={`nav-link ${isActive('/selections') || isActive('/glossaire') || isActive('/faq') || isActive('/nouveautes') || isActive('/equipe') ? 'active' : ''}`}
                style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                Ressources
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ opacity: .6, transition: 'transform .15s', transform: ressourcesOpen ? 'rotate(180deg)' : 'none' }}>
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </button>

              {ressourcesOpen && (
                <div style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: '4px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-lg)', padding: '8px', minWidth: '200px', zIndex: 200 }}>
                  {[
                    { href: '/selections', label: '🎯 Sélections', desc: 'Listes par usage' },
                    { href: '/nouveautes', label: '🆕 Nouveautés', desc: 'Derniers ajouts' },
                    { href: '/glossaire', label: '📖 Glossaire IA', desc: 'Termes expliqués' },
                    { href: '/faq', label: '❓ FAQ', desc: 'Questions fréquentes' },
                    { href: '/equipe', label: '👤 L\'équipe', desc: 'Qui sommes-nous' },
                  ].map(item => (
                    <Link key={item.href} href={item.href}
                      style={{ display: 'flex', flexDirection: 'column', padding: '10px 14px', borderRadius: '8px', transition: 'background .1s', textDecoration: 'none' }}
                      className="dropdown-item"
                      onClick={() => setRessourcesOpen(false)}
                    >
                      <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ink)' }}>{item.label}</span>
                      <span style={{ fontSize: '11px', color: 'var(--ink-muted)' }}>{item.desc}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/contact" className={`nav-link ${isActive('/contact') ? 'active' : ''}`}>Contact</Link>
          </div>

          <div className="nav-actions">
            <Link href="/soumettre" className="btn btn-ghost btn-sm">Soumettre un outil</Link>
            <Link href="/newsletter" className="btn btn-primary btn-sm">Newsletter</Link>
          </div>

          <button type="button" className="hamburger" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {mobileOpen ? <path d="M6 18L18 6M6 6l12 12"/> : <path d="M4 6h16M4 12h16M4 18h16"/>}
            </svg>
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        <Link href="/" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>Accueil</Link>
        <Link href="/outils" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>Outils IA</Link>
        <Link href="/blog" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>Blog</Link>
        <Link href="/selections" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>🎯 Sélections</Link>
        <Link href="/nouveautes" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>🆕 Nouveautés</Link>
        <Link href="/glossaire" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>📖 Glossaire</Link>
        <Link href="/faq" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>❓ FAQ</Link>
        <Link href="/contact" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>Contact</Link>
        <div style={{ marginTop: '16px' }}>
          <Link href="/soumettre" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setMobileOpen(false)}>
            Soumettre un outil
          </Link>
        </div>
      </div>
    </>
  );
}
