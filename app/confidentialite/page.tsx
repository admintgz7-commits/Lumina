import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllSecteurs } from '@/lib/content';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Politique de confidentialité et RGPD | Lumina AI',
  description: 'Politique de confidentialité et gestion des données personnelles de Lumina AI, conforme au RGPD.',
};

export default function ConfidentialitePage() {
  const secteurs = getAllSecteurs();
  return (
    <>
      <div className="static-page">
        <div className="container">
          <div className="prose">
            <Link href="/" className="btn btn-ghost btn-sm" style={{ marginBottom: '32px' }}>← Accueil</Link>
            <h1 className="display-lg" style={{ marginBottom: '32px' }}>Politique de confidentialité</h1>
            <h2>Données collectées</h2>
            <p>Lumina AI collecte uniquement les données que vous nous transmettez volontairement via nos formulaires (contact, newsletter, soumission d'outil). Aucune donnée de navigation n'est revendue à des tiers.</p>
            <h2>Cookies</h2>
            <p>Ce site utilise uniquement des cookies techniques nécessaires à son fonctionnement. Aucun cookie publicitaire ou de tracking tiers n'est utilisé.</p>
            <h2>Vos droits (RGPD)</h2>
            <p>Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour exercer ces droits : <Link href="/contact" className="btn btn-ghost btn-sm">contactez-nous</Link></p>
            <h2>Hébergement</h2>
            <p>Ce site est hébergé sur Cloudflare Pages qui dispose d'infrastructures conformes au RGPD.</p>
          </div>
        </div>
      </div>
      <Footer secteurs={secteurs} />
    </>
  );
}
