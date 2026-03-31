'use client';
import { useState } from 'react';

export default function SoumettreForm({ secteurs }: { secteurs: any[] }) {
  const [sent, setSent] = useState(false);
  if (sent) return (
    <div style={{ textAlign: 'center', padding: '48px 0' }}>
      <div style={{ fontSize: '3rem', marginBottom: '16px' }}>✅</div>
      <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.3rem', marginBottom: '8px' }}>Soumission envoyée !</h3>
      <p style={{ color: 'var(--ink-muted)' }}>Merci ! On évalue votre suggestion sous 5 jours ouvrés.</p>
    </div>
  );
  return (
    <form className="contact-form" name="soumettre" method="POST" data-netlify="true" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
      <input type="hidden" name="form-name" value="soumettre" />
      <div className="form-group">
        <label className="form-label">Nom de l'outil *</label>
        <input className="form-input" name="tool_name" type="text" required placeholder="Ex : Notion AI" />
      </div>
      <div className="form-group">
        <label className="form-label">URL *</label>
        <input className="form-input" name="tool_url" type="url" required placeholder="https://..." />
      </div>
      <div className="form-group">
        <label className="form-label">Secteur principal</label>
        <select className="form-select" name="sector">
          <option value="">Choisir un secteur</option>
          {secteurs.map((s: any) => <option key={s.id} value={s.id}>{s.label}</option>)}
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">Pourquoi cet outil mérite d'être référencé ?</label>
        <textarea className="form-textarea" name="why" placeholder="Cas d'usage, différentiation, retour d'expérience..." />
      </div>
      <div className="form-group">
        <label className="form-label">Votre email (pour suivi)</label>
        <input className="form-input" name="email" type="email" placeholder="vous@exemple.com" />
      </div>
      <button type="submit" className="btn btn-primary btn-lg">Soumettre →</button>
    </form>
  );
}
