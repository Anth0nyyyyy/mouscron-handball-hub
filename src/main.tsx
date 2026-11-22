import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Applique le thème mémorisé avant le premier affichage (évite un flash clair en mode nuit)
try {
  const saved = localStorage.getItem('hbc-theme');
  const dark = saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
} catch {
  /* stockage indisponible */
}

createRoot(document.getElementById('root')!).render(<App />);
