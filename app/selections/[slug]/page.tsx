import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { client } from '@/tina/__generated__/client';
import { getOutilById, getAllSecteurs } from '@/lib/content';
import SelectionClient from './SelectionClient';

export const dynamicParams = false;

export async function generateStaticParams() {
  try {
    const res = await client.queries.selectionsConnection();
    return (res.data.selectionsConnection.edges ?? []).map((e) => ({
      slug: e!.node!.slug,
    }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const res = await client.queries.selections({ relativePath: `${params.slug}.json` });
    const sel = res.data.selections;
    return {
      title: `${sel.title} | Lumina AI`,
      description: sel.metaDescription || sel.description || '',
      alternates: { canonical: `https://lumina-ai.fr/selections/${params.slug}/` },
      openGraph: { images: sel.coverPhoto ? [sel.coverPhoto] : [] },
    };
  } catch { return {}; }
}

export default async function SelectionPage({ params }: { params: { slug: string } }) {
  let res;
  try {
    res = await client.queries.selections({ relativePath: `${params.slug}.json` });
  } catch { notFound(); }

  const secteurs = getAllSecteurs();
  const sel = res!.data.selections;
  const outils = (sel.outils ?? []).map((id: string) => getOutilById(id)).filter(Boolean);

  return (
    <SelectionClient
      data={res!.data}
      query={res!.query}
      variables={res!.variables}
      outils={outils}
      secteurs={secteurs}
    />
  );
}
