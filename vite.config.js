import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const root = (...parts) => fileURLToPath(new URL(...parts, import.meta.url));

// Production serves /luci from Express. In dev, map it to the Luci entry page.
const luciInDev = {
  name: 'luci-in-dev',
  configureServer(server) {
    server.middlewares.use((req, _res, next) => {
      if (req.url === '/luci' || req.url === '/luci/') req.url = '/luci.html';
      next();
    });
  },
};

export default defineConfig({
  plugins: [react(), luciInDev],
  // Files in assets/ are served from the site root: assets/images/x.png -> /images/x.png.
  publicDir: 'assets',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: root('./index.html'),
        luci: root('./luci.html'),
      },
    },
  },
  server: {
    proxy: {
      '/api': 'http://127.0.0.1:3000',
    },
  },
});
