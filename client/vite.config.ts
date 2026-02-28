import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    // Visualizer
    ...(process.env.ANALYZE === 'true' ? [
      visualizer({
        filename: 'build/stats.html',
        open: true,
        gzipSize: true,
        brotliSize: true,
      })
    ] : []),
  ],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'build',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          forms: ['react-hook-form'],
          ui: ['classnames', 'qrcode.react'],
          highlight: ['highlight.js'],
        },
      },
    },
  },
  preview: {
    port: 3000,
  },
});