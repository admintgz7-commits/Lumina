import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllArticles, getAllSecteurs } from '@/lib/content';
import BlogCard from '@/components/BlogCard';
import Footer from '@/components/Footer';
import BlogClient from './BlogClient';

export const metadata: Metadata = {
  title: 'Blog IA — Guides pratiques et analyses pour indépendants | Lumina AI',
  description: "Guides, comparatifs et stratégies pour utiliser l'IA en tant qu'indépendant, coach ou micro-entrepreneur. Publiés chaque semaine par Lumina AI.",
  alternates: { canonical: 'https://lumina-ai.fr/blog/' },
};

export default function BlogPage() {
  const articles = getAllArticles();
  const secteurs = getAllSecteurs();

  return (
    <>
      <BlogClient articles={articles} secteurs={secteurs} />
      <Footer secteurs={secteurs} />
    </>
  );
}
