import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllSecteurs } from '@/lib/content';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Newsletter — Les meilleurs outils IA chaque lundi | Lumina AI',
  description: 'Abonnez-vous à la newsletter Lumina AI. Chaque lundi, les meilleurs outils IA testés et expliqués pour les indépendants et coachs.',
};

export default function NewsletterPage() {
  const secteurs = getAllSecteurs();
  return (
    <>
      <div className="newsletter" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: 'var(--nav-h)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '540px', margin: '0 auto' }}>
          <div className="hero-eyebrow" style={{ background: 'rgba(255,255,255,.1)', color: 'white', marginBottom: '24px' }}>Newsletter</div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '2.2rem', color: 'white', marginBottom: '12px' }}>
            Chaque lundi, les meilleurs outils IA.
          </h2>
          <p style={{ color: '#9898b0', marginBottom: '32px' }}>
            Testés, classés, expliqués. Pas de bruit, juste ce qui marche dans votre contexte professionnel.
          </p>
          <div className="newsletter-form">
            <input type="email" placeholder="votre@email.com" />
            <button className="btn btn-primary">S'abonner</button>
          </div>
          <p style={{ fontSize: '12px', color: '#6b6b88', marginTop: '12px' }}>Gratuit · Désinscription en un clic</p>
          <Link href="/" className="btn btn-ghost" style={{ marginTop: '24px', color: '#9898b0', borderColor: '#333' }}>← Retour</Link>
        </div>
      </div>
      <Footer secteurs={secteurs} />
    </>
  );
}
