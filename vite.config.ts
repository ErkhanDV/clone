import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import mkcert from 'vite-plugin-mkcert';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  server: {
    https: true,
    port: 5173,
  },
  plugins: [react(), svgr(), mkcert(), eslint()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
