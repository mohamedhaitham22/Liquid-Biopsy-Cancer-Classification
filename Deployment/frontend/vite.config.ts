import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@emotion/react', '@emotion/styled'],
  },
  server: {
    host: true,
    port: 5173,
    allowedHosts: ['https://ai-cancer-biomarkers.site'],
    proxy: {
      '/api': {
        target: 'https://api.datacenter-eg.site',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  }
});