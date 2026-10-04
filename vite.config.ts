import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "/mouscron-handball-hub/",

  server: {
    host: "::",
    port: 8080,
  },

  plugins: [
    react(),
    mode === "development" && componentTagger(),
    // Ce bloc corrige automatiquement les liens de vos images pour GitHub Pages :
    {
      name: "fix-github-pages-assets",
      transform(code: string, id: string) {
        if (!id.includes("/src/")) return;
        return {
          code: code
              .replaceAll('"/lovable-uploads/', '"/mouscron-handball-hub/lovable-uploads/')
              .replaceAll("'/lovable-uploads/", "'/mouscron-handball-hub/lovable-uploads/")
              .replaceAll('"/image.png"', '"/mouscron-handball-hub/image.png"')
              .replaceAll("'/image.png'", "'/mouscron-handball-hub/image.png'")
              .replaceAll('"/Seniors.png"', '"/mouscron-handball-hub/Seniors.png"')
              .replaceAll('"/placeholder.svg"', '"/mouscron-handball-hub/placeholder.svg"')
              .replaceAll('"/HCM Logo 2025 fond transparent.png"', '"/mouscron-handball-hub/HCM Logo 2025 fond transparent.png"')
              .replaceAll('"/HCM_Logo_2025_fond_transparent.png"', '"/mouscron-handball-hub/HCM_Logo_2025_fond_transparent.png"'),
          map: null,
        };
      },
    },
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));