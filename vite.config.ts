import fs from 'fs';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  const rootDir = import.meta.dirname;
  return {
    plugins: [
      {
        name: 'serve-raw-static-assets',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.url) {
              const cleanUrl = req.url.split('?')[0];
              // If requesting CSS directly from <link rel="stylesheet">
              if (cleanUrl.endsWith('.css')) {
                const relativePath = cleanUrl.startsWith('/') ? cleanUrl.slice(1) : cleanUrl;
                const filePath = path.resolve(rootDir, relativePath);
                if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
                  res.setHeader('Content-Type', 'text/css; charset=utf-8');
                  res.end(fs.readFileSync(filePath, 'utf8'));
                  return;
                }
              }
            }
            next();
          });
        },
      },
    ],
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(rootDir, 'index.html'),
          about: path.resolve(rootDir, 'about.html'),
          academics: path.resolve(rootDir, 'academics.html'),
          schoolLife: path.resolve(rootDir, 'school-life.html'),
          news: path.resolve(rootDir, 'news.html'),
          events: path.resolve(rootDir, 'events.html'),
          gallery: path.resolve(rootDir, 'gallery.html'),
          resources: path.resolve(rootDir, 'resources.html'),
          contact: path.resolve(rootDir, 'contact.html'),
          history: path.resolve(rootDir, 'pages/history.html'),
          principalMessage: path.resolve(rootDir, 'pages/principal-message.html'),
          schoolProfile: path.resolve(rootDir, 'pages/school-profile.html'),
          pastPrincipals: path.resolve(rootDir, 'pages/past-principals.html'),
          founder: path.resolve(rootDir, 'pages/founder.html'),
        },
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
