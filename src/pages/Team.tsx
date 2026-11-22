import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { GROUPS, ROLE_DESC, allCoaches, bureau, categories, type Member } from '@/data/staff';
import { catKeyOf, dayOf, fmtTime, sessionsOf } from '@/lib/schedule';
import PageHero from '@/components/PageHero';
import './Team.css';

const coachesOf = (match: string[]) => allCoaches.filter((c) => match.some((m) => c.role.includes(m)));
const initials = (n: string) => n.split(' ').map((w) => w[0]).slice(0, 2).join('');

// Photo ronde avec repli sur les initiales si l'image manque
const Avatar = ({ m }: { m: Member }) => {
  const [err, setErr] = useState(!m.image);
  return err ? (
    <span className="avatar fallback" aria-hidden="true">{initials(m.name)}</span>
  ) : (
    <img className="avatar" src={m.image} alt="" loading="lazy" onError={() => setErr(true)} />
  );
};

// Photo d'équipe agrandie, navigation au clavier (← → Échap)
const Lightbox = ({ index, onClose, onMove }: { index: number; onClose: () => void; onMove: (d: number) => void }) => {
  const close = useRef<HTMLButtonElement>(null);
  const c = categories[index];

  useEffect(() => {
    close.current?.focus();
    document.body.style.overflow = 'hidden';
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onMove(1);
      if (e.key === 'ArrowLeft') onMove(-1);
    };
    window.addEventListener('keydown', key);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', key); };
  }, [onClose, onMove]);

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={`Photo de l'équipe ${c.name}`} onClick={onClose}>
      <figure onClick={(e) => e.stopPropagation()}>
        <img src={c.img} alt={`L'équipe ${c.name} du HC Mouscron`} />
        <figcaption>{c.name}</figcaption>
      </figure>
      <button ref={close} className="lb-btn lb-close" onClick={onClose} aria-label="Fermer"><X size={22} /></button>
      <button className="lb-btn lb-prev" onClick={(e) => { e.stopPropagation(); onMove(-1); }} aria-label="Équipe précédente"><ChevronLeft size={26} /></button>
      <button className="lb-btn lb-next" onClick={(e) => { e.stopPropagation(); onMove(1); }} aria-label="Équipe suivante"><ChevronRight size={26} /></button>
    </div>
  );
};

const Team = () => {
  const [open, setOpen] = useState<number | null>(null);
  const n = categories.length;

  return (
    <>
      <PageHero
        title="L'équipe"
        intro={`${n} équipes, ${allCoaches.length} entraîneurs et ${bureau.length} membres au comité. Voici qui fait vivre le HC Mouscron.`}
      />

      <section className="section" aria-labelledby="teams-title">
        <div className="wrap">
          <div className="section-head" data-reveal><h2 id="teams-title" className="h2">Nos équipes</h2></div>
          <div className="teams">
            {categories.map((c, i) => {
              const coaches = coachesOf(c.match);
              const sessions = sessionsOf(catKeyOf(c.name));
              return (
                <article className="team" key={c.name} data-reveal style={{ '--d': i % 3 } as CSSProperties}>
                  <button type="button" className="team-photo" onClick={() => setOpen(i)} aria-label={`Agrandir la photo de l'équipe ${c.name}`}>
                    <img src={c.img} alt="" loading="lazy" />
                    <span className="team-zoom" aria-hidden="true"><Expand size={18} /></span>
                  </button>
                  <h3>{c.name}</h3>
                  <dl>
                    <div>
                      <dt>Entraîneur{coaches.length > 1 ? 's' : ''}</dt>
                      <dd>{coaches.length ? coaches.map((x) => x.name).join(', ') : 'À venir'}</dd>
                    </div>
                    <div>
                      <dt>Entraînements</dt>
                      <dd>
                        {sessions.length
                          ? sessions.map((s) => <span className="slot" key={s.day + s.time}>{dayOf(s.day)} {fmtTime(s.time)}</span>)
                          : 'Horaires à confirmer'}
                      </dd>
                    </div>
                  </dl>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {GROUPS.map((g) => (
        <section className="section" key={g.id} aria-labelledby={`g-${g.id}`}>
          <div className="wrap">
            <div className="section-head" data-reveal>
              <h2 id={`g-${g.id}`} className="h2 small">{g.title}</h2>
              <p className="lead">{g.sub}.</p>
            </div>
            <ul className="people">
              {g.members.map((m, i) => (
                <li key={m.name + m.role} data-reveal style={{ '--d': i % 3 } as CSSProperties}>
                  <Avatar m={m} />
                  <div>
                    <h3>{m.name}</h3>
                    <p className="role">{m.role}</p>
                    {ROLE_DESC[m.role] && <p className="desc">{ROLE_DESC[m.role]}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <section className="section">
        {/* Le trait est sur le bloc intérieur pour rester aligné sur le texte (pas sur la marge du .wrap) */}
        <div className="wrap" data-reveal>
          <div className="team-cta">
            <h2 className="h2 small">Envie de rejoindre une équipe ?</h2>
            <p className="lead">Trois entraînements d'essai sont offerts. Débutant ou confirmé, il y a une place pour toi.</p>
            <div className="actions">
              <Link to="/contact" className="btn primary">Réserver une séance d'essai</Link>
              <Link to="/infos#tarifs" className="btn outline">Voir les tarifs</Link>
            </div>
          </div>
        </div>
      </section>

      {open !== null && (
        <Lightbox index={open} onClose={() => setOpen(null)} onMove={(d) => setOpen((o) => (o === null ? o : (o + d + n) % n))} />
      )}
    </>
  );
};

export default Team;
