import { useEffect, useRef, useState } from 'react';

/** Nombre qui défile jusqu'à sa valeur quand il apparaît à l'écran, comme un tableau de score. */
const CountUp = ({ to, duration = 1400 }: { to: number; duration?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(to);

  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setValue(0);
    let raf = 0;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const k = Math.min(1, (now - start) / duration);
        setValue(Math.round(to * (1 - Math.pow(1 - k, 4))));
        if (k < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to, duration]);

  return (
    <span ref={ref} aria-label={to.toLocaleString('fr-BE')}>
      <span aria-hidden="true">{value.toLocaleString('fr-BE')}</span>
    </span>
  );
};

export default CountUp;
