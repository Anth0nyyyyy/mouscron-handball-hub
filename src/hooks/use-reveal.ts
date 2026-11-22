import { useEffect } from 'react';

/**
 * Fait apparaître les éléments [data-reveal] quand ils entrent à l'écran.
 * - Le contenu reste visible si IntersectionObserver manque (la classe .js-reveal n'est posée qu'ici).
 * - Les éléments ajoutés plus tard (changement de page, filtres) sont détectés automatiquement.
 */
export const useReveal = () => {
  useEffect(() => {
    if (!('IntersectionObserver' in window) || !('MutationObserver' in window)) return;
    document.documentElement.classList.add('js-reveal');

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        // Visible, ou déjà dépassé (saut vers une ancre, défilement très rapide) : on l'affiche
        if (e.isIntersecting || e.boundingClientRect.bottom < 0) { e.target.classList.add('in'); io.unobserve(e.target); }
      }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );
    const scan = () => document.querySelectorAll('[data-reveal]:not(.in)').forEach((el) => io.observe(el));
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => { io.disconnect(); mo.disconnect(); };
  }, []);
};
