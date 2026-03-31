import Link from 'next/link';

interface Secteur { id: string; label: string; }

export default function Footer({ secteurs }: { secteurs: Secteur[] }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-logo">Lumina <em>AI</em></div>
            <div className="footer-tagline">Intelligence Gallery — Trouvez l'outil IA fait pour votre métier. Testé, classé, expliqué.</div>
          </div>
          <div>
            <div className="footer-col-title">Secteurs</div>
            {secteurs.map(s => (
              <Link key={s.id} href={`/secteur/${s.id}`} className="footer-link">{s.label}</Link>
            ))}
          </div>
          <div>
            <div className="footer-col-title">Ressources</div>
            <Link href="/blog" className="footer-link">Blog</Link>
            <Link href="/selections" className="footer-link">Sélections thématiques</Link>
            <Link href="/nouveautes" className="footer-link">Nouveautés</Link>
            <Link href="/glossaire" className="footer-link">Glossaire IA</Link>
            <Link href="/faq" className="footer-link">FAQ</Link>
            <Link href="/newsletter" className="footer-link">Newsletter</Link>
          </div>
          <div>
            <div className="footer-col-title">Lumina AI</div>
            <Link href="/equipe" className="footer-link">L'équipe</Link>
            <Link href="/qui-sommes-nous" className="footer-link">Qui sommes-nous ?</Link>
            <Link href="/soumettre" className="footer-link">Soumettre un outil</Link>
            <Link href="/contact" className="footer-link">Contact</Link>
            <Link href="/confidentialite" className="footer-link">Confidentialité</Link>
            <Link href="/cgv" className="footer-link">CGU</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Lumina AI. Tous droits réservés.</span>
          <span>Intelligence for professionals.</span>
        </div>
      </div>
    </footer>
  );
}
