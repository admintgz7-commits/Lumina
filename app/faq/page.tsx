import type { Metadata } from 'next';
import { client } from '@/tina/__generated__/client';
import { getAllSecteurs } from '@/lib/content';
import FaqClient from './FaqClient';

export const metadata: Metadata = {
  title: 'FAQ — Questions fréquentes sur Lumina AI | Lumina AI',
  description: 'Réponses aux questions fréquentes sur Lumina AI : fonctionnement, liens affiliés, outils testés, soumission, RGPD.',
  alternates: { canonical: 'https://lumina-ai.fr/faq/' },
};

export default async function FaqPage() {
  const res = await client.queries.faq({ relativePath: 'faq.json' });
  const secteurs = getAllSecteurs();

  const faqs = (res.data.faq.faqs ?? []).map((f: any) => ({ question: f?.question ?? '', answer: f?.answer ?? '' }));
  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: faqs.map((f: any) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <FaqClient data={res.data} query={res.query} variables={res.variables} secteurs={secteurs} />
    </>
  );
}
