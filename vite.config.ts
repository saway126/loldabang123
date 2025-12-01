import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const riotToken =
    (env.RIOT_API_KEY || env.VITE_RIOT_API_KEY || process.env.RIOT_API_KEY || '')
      .toString()
      .trim()
      .replace(/^['"]|['"]$/g, '');

  console.log('[Vite Config] Loaded API Key length:', riotToken.length);
  if (riotToken) {
    console.log('[Vite Config] Key preview:', riotToken.substring(0, 5) + '...');
  } else {
    console.error('[Vite Config] ERROR: No RIOT_API_KEY found!');
  }

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: 'https://kr.api.riotgames.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              if (riotToken) {
                proxyReq.setHeader('X-Riot-Token', riotToken);
              }
            });
          },
        },
        '/asia': {
          target: 'https://asia.api.riotgames.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/asia/, ''),
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              if (riotToken) {
                proxyReq.setHeader('X-Riot-Token', riotToken);
              }
            });
          },
        },
      },
    },
  };
});
