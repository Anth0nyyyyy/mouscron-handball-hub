import { CONTACT, SOCIALS } from '@/data/contact';
import { bureau } from '@/data/staff';
import PageHero from '@/components/PageHero';
import ContactForm from '@/components/contact/ContactForm';
import './Contact.css';

// Président, secrétaire et trésorier
const committee = bureau.filter((m) => ['Président', 'Secrétaire', 'Trésorier'].includes(m.role));

const Contact = () => (
  <>
    <PageHero
      title="Contact"
      intro="Une question, une séance d'essai à réserver, un partenariat ? Écris-nous ou passe au Hall Max Lessines un soir d'entraînement."
    />

    <section className="section">
      <div className="wrap contact" data-reveal>
        <div>
          <h2 className="h2 small">Envoyer un message</h2>
          <ContactForm />
        </div>

        <aside className="contact-aside" aria-label="Coordonnées">
          <h2 className="h2 small">Nous joindre</h2>
          <dl className="contact-list">
            <div><dt>Téléphone</dt><dd><a href={CONTACT.phoneHref}>{CONTACT.phone}</a></dd></div>
            <div><dt>E-mail</dt><dd><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></dd></div>
            <div><dt>Salle</dt><dd><a href={CONTACT.maps} target="_blank" rel="noopener noreferrer">{CONTACT.venue}<br />{CONTACT.street}, {CONTACT.city}</a></dd></div>
          </dl>

          <h3 className="h3 contact-sub">Le comité</h3>
          <ul className="committee">
            {committee.map((m) => <li key={m.name}><b>{m.name}</b><span>{m.role}</span></li>)}
          </ul>

          <h3 className="h3 contact-sub">Suivre le club</h3>
          <ul className="contact-socials">
            {SOCIALS.map(({ label, href, Icon }) => (
              <li key={label}><a href={href} target="_blank" rel="noopener noreferrer"><Icon size={20} /> {label}</a></li>
            ))}
          </ul>
        </aside>
      </div>
    </section>

    <section className="section">
      <div className="wrap">
        <h2 className="h2 small contact-map-title">Accès au Hall Max Lessines</h2>
        <div className="contact-map" data-reveal>
          <iframe title="Carte : Hall Max Lessines, Mouscron" src={CONTACT.mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
        <div className="actions"><a className="btn primary" href={CONTACT.maps} target="_blank" rel="noopener noreferrer">Ouvrir l'itinéraire</a></div>
      </div>
    </section>
  </>
);

export default Contact;
