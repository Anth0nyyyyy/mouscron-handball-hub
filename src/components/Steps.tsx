import { registrationSteps } from '@/data/club';

/** Les 4 étapes d'inscription : une vraie séquence, d'où la numérotation. */
const Steps = () => (
  <ol className="steps">
    {registrationSteps.map((s) => (
      <li key={s.step}>
        <span className="n" aria-hidden="true">{s.step}</span>
        <h3>{s.title}</h3>
        <p>{s.description}</p>
      </li>
    ))}
  </ol>
);

export default Steps;
