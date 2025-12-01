import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://kr.api.riotgames.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/asia': {
        target: 'https://asia.api.riotgames.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/asia/, ''),
      },
    },
  },
});
