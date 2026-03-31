import type { Metadata } from 'next';
import '../styles/globals.css';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Lumina AI — Découvrez, comparez et choisissez les meilleurs outils IA',
  description: "Lumina AI est l'annuaire de référence des outils IA pour particuliers, indépendants, coachs et micro-entrepreneurs. Fiches détaillées, comparatifs et guides pratiques.",
  metadataBase: new URL('https://lumina-ai.fr'),
  openGraph: {
    siteName: 'Lumina AI',
    locale: 'fr_FR',
    type: 'website',
    images: ['/assets/og-default.jpg'],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300..900;1,300..900&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
