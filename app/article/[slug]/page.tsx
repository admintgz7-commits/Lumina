import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { client } from '@/tina/__generated__/client';
import { getAllSecteurs, getAllArticles } from '@/lib/content';
import ArticleClient from './ArticleClient';

export async function generateStaticParams() {
  try {
    const res = await client.queries.articlesConnection();
    return (res.data.articlesConnection.edges ?? []).map((e) => ({
      slug: e!.node!.slug,
    }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const res = await client.queries.articles({ relativePath: `${params.slug}.json` });
    const article = res.data.articles;
    return {
      title: `${article.title} | Lumina AI`,
      description: article.metaDescription || article.intro?.substring(0, 155) || '',
      alternates: { canonical: `https://lumina-ai.fr/article/${params.slug}/` },
      openGraph: { images: article.coverPhoto ? [article.coverPhoto] : [] },
    };
  } catch { return {}; }
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  let res;
  try {
    res = await client.queries.articles({ relativePath: `${params.slug}.json` });
  } catch { notFound(); }

  const allArticles = getAllArticles();
  const secteurs = getAllSecteurs();
  const related = allArticles
    .filter((a: any) => a.slug !== params.slug && a.sector === res!.data.articles.sector)
    .slice(0, 2);

  return (
    <ArticleClient
      data={res!.data}
      query={res!.query}
      variables={res!.variables}
      related={related}
      secteurs={secteurs}
    />
  );
}
