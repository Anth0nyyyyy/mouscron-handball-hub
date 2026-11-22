import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Content-Security-Policy injectée uniquement au build (le serveur de dev Vite a besoin de scripts inline).
// GitHub Pages ne permet pas d'envoyer des en-têtes HTTP, d'où la balise <meta>.
const CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: blob:",
  "connect-src 'self' https://api.emailjs.com",
  "frame-src https://www.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join("; ");

// Dossier dans lequel le site est servi :
//   - "/" par défaut (dev local, OVH à la racine du domaine)
//   - "/mouscron-handball-hub/" pour GitHub Pages (défini dans .github/workflows/deploy.yml)
const base = process.env.BASE_PATH || "/";

export default defineConfig({
  base,

  server: {
    host: "::",
    port: 8080,
  },

  plugins: [
    react(),
    {
      name: "inject-security-meta",
      apply: "build",
      transformIndexHtml: () => [
        { tag: "meta", attrs: { "http-equiv": "Content-Security-Policy", content: CSP }, injectTo: "head-prepend" },
        { tag: "meta", attrs: { name: "referrer", content: "strict-origin-when-cross-origin" }, injectTo: "head-prepend" },
      ],
    },
  ],

  resolve: {
    alias: {
      // Chemin relatif à la racine du projet : évite les doublons de modules (et donc
      // deux copies de React) quand Windows écrit la lettre de lecteur "c:" ou "C:".
      "@": "/src",
    },
  },
});
