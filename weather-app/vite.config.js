import { defineConfig } from 'vite';

export default defineConfig({
  // In dev mode, proxy /api requests to the local API server
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
  // In production (Vercel), static files from 'dist' are served
  // and /api/* routes go to the serverless function
});