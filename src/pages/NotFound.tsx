import { Link } from 'react-router-dom';
import PageHero from '@/components/PageHero';

const NotFound = () => (
  <PageHero title="Hors du terrain" intro="Cette page n'existe pas ou a été déplacée.">
    <div className="actions">
      <Link to="/" className="btn primary">Retour à l'accueil</Link>
      <Link to="/contact" className="btn on-dark">Nous contacter</Link>
    </div>
  </PageHero>
);

export default NotFound;
