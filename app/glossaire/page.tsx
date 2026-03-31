import type { Metadata } from 'next';
import { client } from '@/tina/__generated__/client';
import { getAllSecteurs } from '@/lib/content';
import GlossaireClient from './GlossaireClient';

export const metadata: Metadata = {
  title: 'Glossaire IA — Tous les termes expliqués simplement | Lumina AI',
  description: "Comprendre le vocabulaire de l'intelligence artificielle sans jargon. LLM, prompt, RAG, TTS… Tous les termes IA expliqués pour les non-développeurs.",
  alternates: { canonical: 'https://lumina-ai.fr/glossaire/' },
};

export default async function GlossairePage() {
  const res = await client.queries.glossaire({ relativePath: 'glossaire.json' });
  const secteurs = getAllSecteurs();

  return <GlossaireClient data={res.data} query={res.query} variables={res.variables} secteurs={secteurs} />;
}
