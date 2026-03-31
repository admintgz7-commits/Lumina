import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllSecteurs } from '@/lib/content';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Qui sommes-nous — Approche éditoriale et transparence | Lumina AI',
  description: "Lumina AI est un annuaire indépendant d'outils IA pour particuliers et indépendants. Notre approche éditoriale et notre politique de transparence.",
  alternates: { canonical: 'https://lumina-ai.fr/qui-sommes-nous/' },
};

export default function QuiSommesNousPage() {
  const secteurs = getAllSecteurs();
  return (
    <>
      <div className="static-page">
        <div className="container">
          <div className="prose">
            <Link href="/" className="btn btn-ghost btn-sm" style={{ marginBottom: '32px' }}>← Accueil</Link>
            <h1 className="display-lg" style={{ marginBottom: '32px' }}>Qui sommes-nous ?</h1>
            <h2>Ce qu'on fait (et ce qu'on ne prétend pas être)</h2>
            <p>Lumina AI est un annuaire indépendant d'outils d'intelligence artificielle, conçu pour les particuliers, indépendants, coachs et micro-entrepreneurs qui veulent gagner du temps et développer leur activité grâce à l'IA — sans être développeurs, sans jargon technique, et sans se noyer dans les milliers d'outils disponibles.</p>
            <p>Nous ne sommes pas des ingénieurs IA, des chercheurs en machine learning ou des consultants en transformation digitale de grandes entreprises. Nous sommes des curieux, des utilisateurs quotidiens de ces outils, qui ont décidé de centraliser ce qu'on apprend pour que vous n'ayez pas à le découvrir seuls.</p>
            <h2>Notre approche éditoriale</h2>
            <p>Chaque fiche outil est rédigée après exploration de l'outil : ses fonctionnalités réelles, ses cas d'usage concrets, sa structure tarifaire vérifiée. Nous n'acceptons aucun paiement pour référencer un outil ou le mettre en avant. Notre sélection est guidée par un seul critère : est-ce que cet outil apporte une vraie valeur à quelqu'un qui démarre ou qui développe son activité ?</p>
            <h2>Les liens affiliés : la transparence sur comment on fonctionne</h2>
            <p>Certains liens vers les outils référencés sur Lumina AI sont des liens affiliés. Cela signifie que si vous vous abonnez à un outil via notre lien, nous percevons une commission de la part de l'éditeur — sans que cela ne change le prix que vous payez. Ces commissions nous permettent de maintenir et d'alimenter ce site gratuitement pour vous. Elles n'influencent pas nos recommandations : nous ne mettons pas en avant un outil simplement parce qu'il a un programme d'affiliation.</p>
            <h2>Ce qu'on ne fait pas</h2>
            <p>On ne note pas les outils avec des étoiles ou des scores subjectifs — un outil parfait pour un freelance peut être totalement inadapté à un autre profil. On ne prétend pas avoir testé exhaustivement chaque outil dans tous ses usages. On ne recommande pas un outil sur un autre dans nos articles — on présente les fonctionnalités et les cas d'usage pour que vous puissiez choisir selon votre situation.</p>
            <h2>Nous contacter</h2>
            <p>Pour toute question, signalement d'information obsolète, demande de partenariat ou suggestion d'outil : <Link href="/contact" className="btn btn-ghost btn-sm">page de contact</Link></p>
          </div>
        </div>
      </div>
      <Footer secteurs={secteurs} />
    </>
  );
}
