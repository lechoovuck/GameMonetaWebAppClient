import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from '@svgr/rollup';
import { fileURLToPath } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],

  server: {
    host: true,
  },

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "src/app/styles/helpers/_index.scss" as *;',
        devSourcemap: true,
      },
    },
  },

  build: {
    minify: false,
    target: 'es2015',

    rollupOptions: {
      output: {
        manualChunks: undefined
      },
    },
    chunkSizeWarningLimit: 700,
  },
});