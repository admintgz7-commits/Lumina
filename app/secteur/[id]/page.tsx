import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { client } from '@/tina/__generated__/client';
import { getAllOutils, getAllArticles, getAllSecteurs } from '@/lib/content';
import SecteurClient from './SecteurClient';

export async function generateStaticParams() {
  const secteurs = getAllSecteurs();
  return secteurs.map((s: any) => ({ id: s.identifiant || s.id }));
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  try {
    const res = await client.queries.secteurs({
      relativePath: `${params.id}.json`,
    });
    const secteur = res.data.secteurs;
    return {
      title: `${secteur.headline || secteur.label} — Outils IA | Lumina AI`,
      description:
        secteur.sub ||
        `Les meilleurs outils IA pour ${secteur.label}. Sélection testée et commentée par Lumina AI.`,
      alternates: { canonical: `https://lumina-ai.fr/secteur/${params.id}/` },
      openGraph: { images: secteur.photo ? [secteur.photo] : [] },
    };
  } catch {
    return {};
  }
}

export default async function SecteurPage({
  params,
}: {
  params: { id: string };
}) {
  let res;
  try {
    res = await client.queries.secteurs({
      relativePath: `${params.id}.json`,
    });
  } catch {
    notFound();
  }

  const allOutils = getAllOutils();
  const allArticles = getAllArticles();
  const secteurs = getAllSecteurs();

  const outils = allOutils.filter((t: any) =>
    (t.sector ?? []).includes(params.id)
  );
  const articles = allArticles.filter((a: any) => a.sector === params.id);
  const categories = Array.from(
    new Set(outils.map((t: any) => t.category).filter(Boolean))
  ) as string[];

  return (
    <SecteurClient
      data={res!.data}
      query={res!.query}
      variables={res!.variables}
      outils={outils}
      articles={articles}
      secteurs={secteurs}
      id={params.id}
      categories={categories}
    />
  );
}
