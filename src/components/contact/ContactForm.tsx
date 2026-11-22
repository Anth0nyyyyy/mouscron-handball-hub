import React, { useRef, useState } from 'react';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

// Identifiants EmailJS : publics par nature (ils sont visibles dans le JS du site).
// La protection se fait côté dashboard EmailJS : domaines autorisés + reCAPTCHA + quota.
const SERVICE_ID = 'service_98qdq9a';
const TEMPLATE_ID = 'template_gsj2r52';
const PUBLIC_KEY = '3OR_HbG-VLDs6r3oV';

// Limites de taille des champs
const LIMITS = { name: 100, email: 254, subject: 150, message: 5000 } as const;
// Délai minimum entre deux envois depuis le même navigateur
const THROTTLE_MS = 60_000;
// Un humain met plus de 3 s à remplir le formulaire
const MIN_FILL_MS = 3_000;

const EMAIL_RE = /^[^\s@<>"']+@[^\s@<>"']+\.[^\s@<>"']{2,}$/;

type Field = keyof typeof LIMITS;
type Status = { kind: 'ok' | 'error'; text: string } | null;
const EMPTY: Record<Field, string> = { name: '', email: '', subject: '', message: '' };
const SENT = 'Message envoyé. Le secrétariat te répond par e-mail dès que possible.';

// Supprime les caractères de contrôle (sauf retours à la ligne / tabulations dans le message)
const clean = (value: string, multiline = false) =>
  value
    // eslint-disable-next-line no-control-regex -- on retire volontairement les caractères de contrôle
    .replace(multiline ? /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g : /[\u0000-\u001F\u007F]/g, '')
    .trim();

const ContactForm = () => {
  const [formData, setFormData] = useState(EMPTY);
  const [honeypot, setHoneypot] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<Status>(null);
  const mountedAt = useRef(Date.now());

  const fail = (text: string) => setStatus({ kind: 'error', text });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setStatus(null);

    // Anti-robot : champ caché rempli ou formulaire soumis trop vite → on fait semblant de réussir
    if (honeypot || Date.now() - mountedAt.current < MIN_FILL_MS) {
      setFormData(EMPTY);
      setStatus({ kind: 'ok', text: SENT });
      return;
    }

    const data = {
      name: clean(formData.name),
      email: clean(formData.email),
      subject: clean(formData.subject),
      message: clean(formData.message, true),
    };

    if (!data.name || !data.subject || !data.message) return fail('Remplis les quatre champs pour envoyer le message.');
    if (!EMAIL_RE.test(data.email)) return fail('Cette adresse e-mail ne semble pas valide. Vérifie-la pour qu’on puisse te répondre.');
    if ((Object.keys(LIMITS) as Field[]).some((k) => data[k].length > LIMITS[k])) {
      return fail('Un des champs est trop long. Raccourcis le message ou écris-nous directement par e-mail.');
    }

    setLoading(true);
    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, data, {
        publicKey: PUBLIC_KEY,
        blockHeadless: true, // bloque les navigateurs automatisés (Puppeteer, etc.)
        limitRate: { id: 'hcm-contact-form', throttle: THROTTLE_MS },
      });
      setStatus({ kind: 'ok', text: SENT });
      setFormData(EMPTY);
    } catch (error) {
      if (error instanceof EmailJSResponseStatus && error.status === 429) {
        fail('Un message vient déjà de partir depuis cet appareil. Réessaie dans une minute.');
      } else {
        fail('Le message n’est pas parti. Réessaie, ou écris directement à secretariat.handballmouscron@gmail.com.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name as Field;
    if (!(name in LIMITS)) return;
    setFormData((prev) => ({ ...prev, [name]: e.target.value.slice(0, LIMITS[name]) }));
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      {/* Piège à robots : invisible pour les humains, ignoré par les lecteurs d'écran */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, overflow: 'hidden' }}>
        <label htmlFor="website">Ne pas remplir</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
      </div>

      <div className="field">
        <label htmlFor="name">Nom et prénom</label>
        <input id="name" name="name" type="text" required maxLength={LIMITS.name} autoComplete="name" value={formData.name} onChange={handleChange} disabled={loading} />
      </div>
      <div className="field">
        <label htmlFor="email">E-mail</label>
        <input id="email" name="email" type="email" required maxLength={LIMITS.email} autoComplete="email" value={formData.email} onChange={handleChange} disabled={loading} />
      </div>
      <div className="field">
        <label htmlFor="subject">Sujet</label>
        <input id="subject" name="subject" type="text" required maxLength={LIMITS.subject} placeholder="Ex. séance d'essai pour mon fils (U16)" value={formData.subject} onChange={handleChange} disabled={loading} />
      </div>
      <div className="field">
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" required maxLength={LIMITS.message} rows={6} value={formData.message} onChange={handleChange} disabled={loading} />
      </div>

      {status && <p className={`form-status ${status.kind}`} role={status.kind === 'error' ? 'alert' : 'status'}>{status.text}</p>}

      <button type="submit" className="btn primary" disabled={loading}>
        {loading ? 'Envoi en cours…' : 'Envoyer le message'}
      </button>
    </form>
  );
};

export default ContactForm;
