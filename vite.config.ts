import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

/** GitHub repo name — used as the base path for GitHub Pages. */
const REPO = '3d-globe';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: `/${REPO}/`,
});
