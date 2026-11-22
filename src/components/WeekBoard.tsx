import { catKeyOf, fmtTime, shortCat, week, type CatKey } from '@/lib/schedule';

/** Tableau des entraînements de la semaine. `highlight` atténue les autres catégories. */
const WeekBoard = ({ highlight }: { highlight?: CatKey | 'all' }) => (
  <div className="board">
    {week().map((d) => (
      <div className="board-day" key={d.day}>
        <h3>{d.day}</h3>
        <ul>
          {d.items.map((s) => {
            const key = catKeyOf(s.category);
            const dim = highlight && highlight !== 'all' && highlight !== key;
            return (
              <li key={s.category + s.time} data-cat={key} className={dim ? 'dim' : undefined}>
                <b>{shortCat(s.category)}</b>
                <span>{fmtTime(s.time)}</span>
              </li>
            );
          })}
        </ul>
      </div>
    ))}
  </div>
);

export default WeekBoard;
