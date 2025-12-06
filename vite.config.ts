import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Proxy is no longer needed here because we use Vercel Serverless Functions.
    // Run 'vercel dev' to serve both Frontend and Backend (api/).
  },
});
