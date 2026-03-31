import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 'var(--nav-h) 24px 0' }}>
      <div>
        <div style={{ fontSize: '4rem', marginBottom: '16px' }}>404</div>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1.8rem', marginBottom: '8px' }}>Page introuvable</h2>
        <p style={{ color: 'var(--ink-muted)', marginBottom: '24px' }}>Cette page n'existe pas ou a été déplacée.</p>
        <Link href="/" className="btn btn-primary btn-lg">Retour à l'accueil</Link>
      </div>
    </div>
  );
}
