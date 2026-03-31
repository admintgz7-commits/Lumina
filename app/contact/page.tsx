import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllSecteurs } from '@/lib/content';
import Footer from '@/components/Footer';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact — Partenariat, suggestion d\'outil, questions | Lumina AI',
  description: 'Contactez Lumina AI pour toute question, suggestion d\'outil IA, demande de partenariat ou proposition d\'article.',
  alternates: { canonical: 'https://lumina-ai.fr/contact/' },
};

export default function ContactPage() {
  const secteurs = getAllSecteurs();
  return (
    <>
      <div className="static-page">
        <div className="container">
          <div style={{ maxWidth: '680px', margin: '0 auto' }}>
            <Link href="/" className="btn btn-ghost btn-sm" style={{ marginBottom: '32px' }}>← Accueil</Link>
            <h1 className="display-lg" style={{ marginBottom: '8px' }}>Contactez-nous</h1>
            <p className="text-muted" style={{ marginBottom: '48px' }}>Une question, un partenariat, un outil à signaler ? On vous répond sous 48h.</p>
            <ContactForm />
          </div>
        </div>
      </div>
      <Footer secteurs={secteurs} />
    </>
  );
}
