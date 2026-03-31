import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllSecteurs } from '@/lib/content';
import Footer from '@/components/Footer';
import SoumettreForm from './SoumettreForm';

export const metadata: Metadata = {
  title: 'Soumettre un outil IA | Lumina AI',
  description: 'Proposez un outil IA à notre équipe de curation. Si il passe nos critères, il sera référencé sur Lumina AI.',
};

export default function SoumettrePageWrapper() {
  const secteurs = getAllSecteurs();
  return (
    <>
      <div className="static-page">
        <div className="container">
          <div style={{ maxWidth: '680px', margin: '0 auto' }}>
            <Link href="/" className="btn btn-ghost btn-sm" style={{ marginBottom: '32px' }}>← Accueil</Link>
            <div className="hero-eyebrow" style={{ marginBottom: '20px' }}>Contribution</div>
            <h1 className="display-lg" style={{ marginBottom: '8px' }}>Soumettre un outil</h1>
            <p className="text-muted" style={{ marginBottom: '40px' }}>Vous connaissez un outil IA qui mérite d'être référencé ? Notre équipe l'évalue et le publie si il passe nos critères.</p>
            <div style={{ background: 'var(--surface-2)', borderRadius: 'var(--radius-lg)', padding: '24px', marginBottom: '36px' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, marginBottom: '12px' }}>Nos critères de sélection</h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {["✓ L'outil doit être utilisable par un professionnel (pas grand public)", "✓ Prix transparent et accessible", "✓ Actif et maintenu (dernière update < 12 mois)", "✓ Au moins un cas d'usage B2B démontrable"].map((c, i) => (
                  <li key={i} style={{ fontSize: '14px', color: 'var(--ink-muted)' }}>{c}</li>
                ))}
              </ul>
            </div>
            <SoumettreForm secteurs={secteurs} />
          </div>
        </div>
      </div>
      <Footer secteurs={secteurs} />
    </>
  );
}
