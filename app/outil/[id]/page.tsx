import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { client } from '@/tina/__generated__/client';
import { getAllOutils, getAllSecteurs, getAllArticles } from '@/lib/content';
import OutilClient from './OutilClient';

export async function generateStaticParams() {
  const outils = getAllOutils();
  return outils.map((t: any) => ({ id: t.identifiant || t.id }));
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  try {
    const res = await client.queries.outils({
      relativePath: `${params.id}.json`,
    });
    const tool = res.data.outils;
    return {
      title: `${tool.name} — Avis, tarifs et cas d'usage | Lumina AI`,
      description: `${tool.tagline} Fonctionnalités, tarifs et cas d'usage de ${tool.name} sur Lumina AI.`,
      alternates: { canonical: `https://lumina-ai.fr/outil/${params.id}/` },
      openGraph: { images: tool.logo ? [tool.logo] : [] },
    };
  } catch {
    return {};
  }
}

export default async function OutilPage({
  params,
}: {
  params: { id: string };
}) {
  let res;
  try {
    res = await client.queries.outils({
      relativePath: `${params.id}.json`,
    });
  } catch {
    notFound();
  }

  const tool = res!.data.outils;
  const allOutils = getAllOutils();
  const secteurs = getAllSecteurs();
  const articles = getAllArticles();

  const relatedTools = allOutils
    .filter(
      (t: any) =>
        t.id !== params.id &&
        t.sector.some((s: string) => (tool.sector ?? []).includes(s))
    )
    .slice(0, 3);

  const relatedArticles = articles
    .filter((a: any) => (tool.sector ?? []).includes(a.sector))
    .slice(0, 2);

  return (
    <OutilClient
      data={res!.data}
      query={res!.query}
      variables={res!.variables}
      relatedTools={relatedTools}
      relatedArticles={relatedArticles}
      secteurs={secteurs}
    />
  );
}
