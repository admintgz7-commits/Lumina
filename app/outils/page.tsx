import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getAllOutils, getAllSecteurs } from '@/lib/content';
import OutilsClient from './OutilsClient';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Tous les outils IA pour indépendants et coachs | Lumina AI',
  description: 'Annuaire complet des meilleurs outils IA : créer un site, rédaction SEO, réseaux sociaux, vidéo, image, marketing. Filtrez et comparez.',
  alternates: { canonical: 'https://lumina-ai.fr/outils/' },
};

export default function OutilsPage() {
  const outils = getAllOutils();
  const secteurs = getAllSecteurs();

  return (
    <>
      <Suspense fallback={<div style={{ paddingTop: 'var(--nav-h)', minHeight: '400px' }} />}>
        <OutilsClient outils={outils} secteurs={secteurs} />
      </Suspense>
      <Footer secteurs={secteurs} />
    </>
  );
}
