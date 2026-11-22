/**
 * Lignes d'un terrain de handball vues du dessus, devant un but (échelle : 20 px = 1 m).
 * Zone des 6 m en trait plein, ligne des 9 m en pointillés, marque des 7 m, limite du gardien à 4 m, but.
 */
const Court = ({ className = '' }: { className?: string }) => (
  <svg className={`court ${className}`} viewBox="0 0 400 200" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
    <path className="l6" d="M50 200 A120 120 0 0 1 170 80 L230 80 A120 120 0 0 1 350 200" />
    <path className="l9" d="M-10 200 A180 180 0 0 1 170 20 L230 20 A180 180 0 0 1 410 200" />
    <path className="l7" d="M190 60 L210 60" />
    <path className="l4" d="M197 120 L203 120" />
    <path className="goal" d="M170 200 L170 192 L230 192 L230 200" />
  </svg>
);

export default Court;
