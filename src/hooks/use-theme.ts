import { useCallback, useEffect, useState } from 'react';

export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'hbc-theme';

const readInitialTheme = (): Theme => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
  } catch {
    /* stockage indisponible (navigation privée…) */
  }
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

/** Thème jour/nuit du site, appliqué sur <html data-theme> et mémorisé dans le navigateur. */
export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(readInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggle = useCallback(
    () =>
      setTheme((current) => {
        const next: Theme = current === 'dark' ? 'light' : 'dark';
        try {
          localStorage.setItem(STORAGE_KEY, next);
        } catch {
          /* ignore */
        }
        return next;
      }),
    [],
  );

  return { theme, toggle };
};
