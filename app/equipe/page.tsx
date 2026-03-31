import type { Metadata } from 'next';
import { client } from '@/tina/__generated__/client';
import { getAllSecteurs } from '@/lib/content';
import EquipeClient from './EquipeClient';

export const metadata: Metadata = {
  title: "L'équipe Lumina AI — Qui écrit et teste les outils IA | Lumina AI",
  description: "Découvrez l'équipe derrière Lumina AI : approche éditoriale, valeurs et engagement pour la transparence.",
  alternates: { canonical: 'https://lumina-ai.fr/equipe/' },
};

export default async function EquipePage() {
  const res = await client.queries.equipe({ relativePath: 'equipe.json' });
  const secteurs = getAllSecteurs();

  const orgSchema = {
    '@context': 'https://schema.org', '@type': 'Organization',
    name: 'Lumina AI', url: 'https://lumina-ai.fr',
    description: res.data.equipe.intro || '',
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <EquipeClient data={res.data} query={res.query} variables={res.variables} secteurs={secteurs} />
    </>
  );
}
