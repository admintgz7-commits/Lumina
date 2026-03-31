import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllSecteurs } from '@/lib/content';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: "Conditions Générales d'Utilisation | Lumina AI",
  description: "Conditions d'utilisation du site Lumina AI — annuaire indépendant d'outils IA pour indépendants et coachs.",
};

export default function CGVPage() {
  const secteurs = getAllSecteurs();
  return (
    <>
      <div className="static-page">
        <div className="container">
          <div className="prose">
            <Link href="/" className="btn btn-ghost btn-sm" style={{ marginBottom: '32px' }}>← Accueil</Link>
            <h1 className="display-lg" style={{ marginBottom: '32px' }}>Conditions Générales d'Utilisation</h1>
            <h2>1. Objet et acceptation</h2>
            <p>Les présentes Conditions Générales d'Utilisation (CGU) régissent l'accès et l'utilisation du site Lumina AI. En naviguant sur ce site, vous acceptez sans réserve les présentes conditions dans leur intégralité.</p>
            <h2>2. Nature du contenu et responsabilité éditoriale</h2>
            <p>Lumina AI est un site de curation et d'information sur les outils d'intelligence artificielle. Les fiches outils, articles et contenus publiés le sont à titre informatif et éducatif. Lumina AI s'efforce de maintenir des informations à jour, mais ne peut garantir l'exactitude permanente des tarifs, fonctionnalités et disponibilités des outils référencés.</p>
            <h2>3. Liens affiliés et politique commerciale</h2>
            <p>Certains liens présents sur Lumina AI sont des liens affiliés. Lorsque vous cliquez sur un lien affilié et procédez à un achat ou à une inscription, Lumina AI peut percevoir une commission de la part de l'éditeur concerné. Cette commission est sans incidence sur le prix que vous payez.</p>
            <h2>4. Propriété intellectuelle</h2>
            <p>L'ensemble des contenus éditoriaux originaux publiés sur Lumina AI (textes d'articles, descriptions, structure et organisation des fiches) sont protégés par le droit d'auteur. Toute reproduction, même partielle, sans autorisation écrite préalable est interdite.</p>
            <h2>5. Limitation de responsabilité</h2>
            <p>Lumina AI est un site d'information et non un prestataire des outils qu'il référence. Nous ne fournissons aucun support technique pour les outils tiers.</p>
            <h2>6. Modifications des CGU</h2>
            <p>Lumina AI se réserve le droit de modifier les présentes CGU à tout moment. Les modifications entrent en vigueur dès leur publication sur le site.</p>
            <h2>7. Contact</h2>
            <p>Pour toute question relative aux présentes CGU : <Link href="/contact" className="btn btn-ghost btn-sm">contactez-nous</Link></p>
          </div>
        </div>
      </div>
      <Footer secteurs={secteurs} />
    </>
  );
}
