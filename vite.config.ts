import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://odin-book-api-empty-waterfall-5146.fly.dev',
        changeOrigin: true,
      },
      '/events': {
        target: 'https://odin-book-api-empty-waterfall-5146.fly.dev',
        changeOrigin: true,
      },
    },
  },
});