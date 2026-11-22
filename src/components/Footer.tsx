import { Link } from 'react-router-dom';
import { CONTACT, NAV, SOCIALS } from '@/data/contact';

const Footer = () => (
  <footer className="site-footer">
    <div className="grid">
      <div>
        <h2>HC Mouscron</h2>
        <p>Club de handball à Mouscron depuis 2015. Filles et garçons, du mini-handball aux seniors, entraînés au Hall Max Lessines.</p>
        <div className="socials">
          {SOCIALS.map(({ label, href, Icon }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}><Icon size={20} /></a>
          ))}
        </div>
      </div>

      <nav aria-label="Pages du site">
        <h2>Le site</h2>
        <ul>
          {NAV.map((n) => <li key={n.href}><Link to={n.href}>{n.name}</Link></li>)}
        </ul>
      </nav>

      <div>
        <h2>Nous trouver</h2>
        <ul>
          <li><a href={CONTACT.maps} target="_blank" rel="noopener noreferrer">{CONTACT.venue}<br />{CONTACT.street}, {CONTACT.city}</a></li>
          <li><a href={CONTACT.phoneHref}>{CONTACT.phone}</a></li>
          <li><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></li>
        </ul>
      </div>
    </div>
    <div className="bottom">© {new Date().getFullYear()} HC Mouscron, ASBL.</div>
  </footer>
);

export default Footer;
