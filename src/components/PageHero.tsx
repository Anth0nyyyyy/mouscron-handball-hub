import type { ReactNode } from 'react';

interface PageHeroProps {
  title: string;
  intro?: ReactNode;
  children?: ReactNode;
}

/** En-tête vert des pages intérieures. */
const PageHero = ({ title, intro, children }: PageHeroProps) => (
  <header className="page-hero">
    <div className="page-hero-in">
      <h1>{title}</h1>
      {intro && <p>{intro}</p>}
      {children}
    </div>
  </header>
);

export default PageHero;
