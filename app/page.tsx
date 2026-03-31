import type { Metadata } from 'next';
import { client } from '@/tina/__generated__/client';
import { getAllOutils, getAllArticles, getAllSecteurs } from '@/lib/content';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: 'Lumina AI — Découvrez, comparez et choisissez les meilleurs outils IA',
  description: "Lumina AI est l'annuaire des outils IA pour particuliers, indépendants, coachs et micro-entrepreneurs.",
  alternates: { canonical: 'https://lumina-ai.fr/' },
};

export default async function HomePage() {
  const res = await client.queries.homepage({ relativePath: 'home.json' });
  const outils = getAllOutils();
  const articles = getAllArticles();
  const secteurs = getAllSecteurs();
  const featured = outils.filter((t: any) => t.tested && t.score >= 4.7).slice(0, 4);
  const displayOutils = featured.length > 0 ? featured : outils.slice(0, 4);

  return (
    <HomeClient
      data={res.data}
      query={res.query}
      variables={res.variables}
      outils={outils}
      articles={articles}
      secteurs={secteurs}
      displayOutils={displayOutils}
    />
  );
}
