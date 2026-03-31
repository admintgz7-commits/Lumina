'use client';
import { useState } from 'react';

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) return (
    <div style={{ textAlign: 'center', padding: '48px 0' }}>
      <div style={{ fontSize: '3rem', marginBottom: '16px' }}>✅</div>
      <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.3rem', marginBottom: '8px' }}>Message envoyé !</h3>
      <p style={{ color: 'var(--ink-muted)' }}>On vous répond sous 48h ouvrées.</p>
    </div>
  );

  return (
    <form
      className="contact-form"
      name="contact"
      method="POST"
      data-netlify="true"
      onSubmit={(e) => { e.preventDefault(); setSent(true); }}
    >
      <input type="hidden" name="form-name" value="contact" />
      <div className="grid-2" style={{ gap: '18px' }}>
        <div className="form-group">
          <label className="form-label">Prénom & Nom *</label>
          <input className="form-input" name="name" type="text" placeholder="Marie Dupont" required />
        </div>
        <div className="form-group">
          <label className="form-label">Email *</label>
          <input className="form-input" name="email" type="email" placeholder="marie@exemple.com" required />
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Sujet</label>
        <select className="form-select" name="subject">
          <option value="">Choisir un sujet</option>
          <option>Question sur un outil</option>
          <option>Soumettre un outil</option>
          <option>Partenariat / B2B</option>
          <option>Proposer un article</option>
          <option>Autre</option>
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">Message *</label>
        <textarea className="form-textarea" name="message" placeholder="Décrivez votre demande..." required />
      </div>
      <button type="submit" className="btn btn-primary btn-lg">Envoyer le message →</button>
    </form>
  );
}
