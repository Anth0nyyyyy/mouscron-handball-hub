import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, Check, Copy, Download, Minus, Plus } from 'lucide-react';
import { asset } from '@/lib/asset';
import { CLUB_CALENDAR, DOCUMENTS, IBAN, PAYMENT_DEADLINE, SEASON, calendars, tarifs } from '@/data/club';
import { CONTACT } from '@/data/contact';
import { catDetail, shortCat, type CatKey } from '@/lib/schedule';
import PageHero from '@/components/PageHero';
import WeekBoard from '@/components/WeekBoard';
import Steps from '@/components/Steps';
import './Info.css';

const SECTIONS = [
  { id: 'salle', label: 'La salle' },
  { id: 'horaires', label: 'Horaires' },
  { id: 'agendas', label: 'Agendas' },
  { id: 'tarifs', label: 'Tarifs' },
  { id: 'inscription', label: 'Inscription' },
  { id: 'documents', label: 'Documents' },
];

const FILTERS: { id: CatKey | 'all'; label: string }[] = [
  { id: 'all', label: 'Toutes' },
  { id: 'mini', label: 'Mini-handball' },
  { id: 'u16', label: 'U16' },
  { id: 'u18', label: 'U18' },
  { id: 'seniors', label: 'Seniors' },
  { id: 'loisir', label: 'Loisir' },
];

// ---------- Simulateur fratrie : la cotisation la plus élevée est due, les suivantes ont 10 % de remise ----------
const feeOf = (start: string) => parseInt(tarifs.find((t) => t.label.startsWith(start))?.price ?? '0', 10);
const FEES = { senior: feeOf('Séniors'), junior: feeOf('Juniors'), mini: feeOf('Mini'), loisir: feeOf('Joueurs Loisir') };
type FeeKey = keyof typeof FEES;
const FEE_LABEL: Record<FeeKey, string> = { senior: 'Senior', junior: 'Junior', mini: 'Mini-handball', loisir: 'Loisir' };
const eur = (n: number) => `${(Math.round(n * 100) / 100).toLocaleString('fr-BE', { minimumFractionDigits: Number.isInteger(n) ? 0 : 2 })} €`;

const FamilySimulator = () => {
  const [counts, setCounts] = useState<Record<FeeKey, number>>({ senior: 0, junior: 0, mini: 0, loisir: 0 });
  const bump = (k: FeeKey, d: number) => setCounts((c) => ({ ...c, [k]: Math.max(0, Math.min(6, c[k] + d)) }));
  const fees = (Object.keys(FEES) as FeeKey[]).flatMap((k) => Array<number>(counts[k]).fill(FEES[k])).sort((a, b) => b - a);
  const paid = fees.map((f, i) => (i === 0 ? f : f * 0.9));
  const total = paid.reduce((a, b) => a + b, 0);
  const saving = fees.reduce((a, b) => a + b, 0) - total;

  return (
    <div className="simulator">
      <h3 className="h3">Calcule le total pour ta famille</h3>
      <p className="sim-intro">La cotisation la plus élevée est due en entier, les suivantes ont 10 % de remise.</p>
      <ul>
        {(Object.keys(FEES) as FeeKey[]).map((k) => (
          <li key={k}>
            <span>{FEE_LABEL[k]} <em>{eur(FEES[k])}</em></span>
            <div className="stepper">
              <button type="button" onClick={() => bump(k, -1)} aria-label={`Retirer un membre ${FEE_LABEL[k]}`} disabled={!counts[k]}><Minus size={16} /></button>
              <b aria-live="polite">{counts[k]}</b>
              <button type="button" onClick={() => bump(k, 1)} aria-label={`Ajouter un membre ${FEE_LABEL[k]}`}><Plus size={16} /></button>
            </div>
          </li>
        ))}
      </ul>
      <div className="sim-total" aria-live="polite">
        {fees.length === 0 ? (
          <p>Ajoute les membres de ta famille pour voir le total.</p>
        ) : (
          <>
            <p className="sim-detail">{paid.map((p, i) => eur(p) + (i ? ' (−10 %)' : '')).join(' + ')}</p>
            <p className="sim-sum">{eur(total)}</p>
            {saving > 0 && <p className="sim-save">Soit {eur(saving)} d'économie</p>}
          </>
        )}
      </div>
    </div>
  );
};

const Info = () => {
  const [filter, setFilter] = useState<CatKey | 'all'>('all');
  const [copied, setCopied] = useState(false);
  const { hash } = useLocation();

  // Arrivée depuis un lien du type /infos#tarifs
  useEffect(() => {
    if (!hash) return;
    const t = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ block: 'start' }), 100);
    return () => clearTimeout(t);
  }, [hash]);

  const copyIban = async () => {
    try {
      await navigator.clipboard.writeText(IBAN.replace(/\s/g, ''));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* presse-papiers indisponible */ }
  };

  return (
    <>
      <PageHero title="Infos pratiques" intro="La salle, les horaires, les tarifs et tout ce qu'il faut pour s'inscrire au club." />

      <nav className="subnav" aria-label="Sections de la page">
        <div className="subnav-in">
          {SECTIONS.map((s) => <a key={s.id} href={`#${s.id}`}>{s.label}</a>)}
        </div>
      </nav>

      <section className="section" id="salle" aria-labelledby="salle-title">
        <div className="wrap venue" data-reveal>
          <div>
            <h2 id="salle-title" className="h2">Le Hall Max Lessines</h2>
            <p className="lead">Tous les entraînements ont lieu dans la salle omnisports de Mouscron.</p>
            <dl className="venue-facts">
              <div><dt>Adresse</dt><dd>{CONTACT.street}, {CONTACT.city}</dd></div>
              <div><dt>Parking</dt><dd>Gratuit, sur place</dd></div>
              <div><dt>Vestiaires</dt><dd>Avec douches</dd></div>
              <div><dt>Cafétéria</dt><dd>Avec wifi, ouverte les soirs d'entraînement</dd></div>
            </dl>
            <div className="actions"><a className="btn primary" href={CONTACT.maps} target="_blank" rel="noopener noreferrer">Itinéraire</a></div>
          </div>
          <figure className="venue-img">
            <img src={asset('/uploads/club/hall-max-lessines.webp')} alt="Le Hall Max Lessines, salle omnisports de Mouscron" loading="lazy" />
          </figure>
        </div>
      </section>

      <section className="section" id="horaires" aria-labelledby="horaires-title">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <h2 id="horaires-title" className="h2">Horaires d'entraînement</h2>
            <p className="lead">{SEASON}. Choisis une catégorie pour faire ressortir ses créneaux.</p>
          </div>
          <div className="chips" role="group" aria-label="Catégorie">
            {FILTERS.map((f) => (
              <button key={f.id} type="button" aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>{f.label}</button>
            ))}
          </div>
          <div data-reveal><WeekBoard highlight={filter} /></div>
          <p className="note">Mini-handball : né(e)s en 2015 et après. U16 : 2011 et 2012. U18 : 2008 à 2010.</p>
        </div>
      </section>

      <section className="section" id="agendas" aria-labelledby="agendas-title">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <h2 id="agendas-title" className="h2">Agendas des matchs</h2>
            <p className="lead">Les calendriers Google de chaque équipe, à ajouter à ton téléphone.</p>
          </div>
          <ul className="link-list">
            {calendars.map((c) => (
              <li key={c.label}><a href={c.url} target="_blank" rel="noopener noreferrer"><span>{c.label}</span><ArrowUpRight size={22} aria-hidden="true" /></a></li>
            ))}
            <li><a href={CLUB_CALENDAR} target="_blank" rel="noopener noreferrer"><span>Calendrier complet du club (Handball Belgium)</span><ArrowUpRight size={22} aria-hidden="true" /></a></li>
          </ul>
        </div>
      </section>

      <section className="section" id="tarifs" aria-labelledby="tarifs-title">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <h2 id="tarifs-title" className="h2">Tarifs</h2>
            <p className="lead">Cotisation annuelle, {SEASON.toLowerCase()}.</p>
          </div>

          <div className="fees" data-reveal>
            <table className="price-table">
              <tbody>
                {tarifs.map((t) => (
                  <tr key={t.label}>
                    <th scope="row">{shortCat(t.label)}{catDetail(t.label) && <span>{catDetail(t.label)}</span>}</th>
                    <td>{t.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <FamilySimulator />
          </div>

          <h3 className="h3 sub-title">Aides et facilités</h3>
          <ul className="aids" data-reveal>
            <li><b>Paiement en 3 fois</b><span>Sur simple demande auprès du comité, pour planifier les virements.</span></li>
            <li><b>Chèque Sport</b><span>Aide de la Ville de Mouscron, soumise à conditions. <a className="link" href="https://www.mouscron.be/" target="_blank" rel="noopener noreferrer">Site de la Ville</a></span></li>
            <li><b>Mutualités et employeurs</b><span>Pense aux avantages sportifs proposés par ta mutualité ou ton employeur.</span></li>
            <li><b>Arrivée en cours de saison</b><span>Le comité peut revoir le montant à la baisse.</span></li>
          </ul>

          <div className="payment" data-reveal>
            <h3 className="h3">Payer la cotisation</h3>
            <p>Par virement, avant le <strong>{PAYMENT_DEADLINE}</strong>, avec le nom et le prénom du joueur en communication.</p>
            <button type="button" className={`iban${copied ? ' copied' : ''}`} onClick={copyIban} aria-label={`Copier l'IBAN ${IBAN}`}>
              <code>{IBAN}</code>
              <span>{copied ? <><Check size={16} /> Copié</> : <><Copy size={16} /> Copier</>}</span>
            </button>
          </div>

          <details className="transfer">
            <summary>Transfert international (plus de 16 ans)</summary>
            <p>La procédure s'applique au joueur de plus de 16 ans affilié, au cours des deux années précédentes, à un club d'une fédération étrangère, et qui ne réside pas en Belgique comme élève ou étudiant.</p>
            <p>Vu les frais de cette procédure pour le club, un chèque de caution de 150 € est demandé en plus de la cotisation de 220 €. Il est rendu en entier à la fin de la saison.</p>
          </details>
        </div>
      </section>

      <section className="section" id="inscription" aria-labelledby="inscription-title">
        <div className="wrap">
          <div className="section-head" data-reveal><h2 id="inscription-title" className="h2">S'inscrire</h2></div>
          <Steps />
        </div>
      </section>

      <section className="section" id="documents" aria-labelledby="documents-title">
        <div className="wrap">
          <div className="section-head" data-reveal><h2 id="documents-title" className="h2">Documents</h2></div>
          <ul className="link-list">
            {DOCUMENTS.map((d) => (
              <li key={d.label}><a href={d.url} target="_blank" rel="noopener noreferrer"><span>{d.label} (PDF)</span><Download size={22} aria-hidden="true" /></a></li>
            ))}
          </ul>
          <div className="actions">
            <Link to="/contact" className="btn primary">Poser une question</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Info;
