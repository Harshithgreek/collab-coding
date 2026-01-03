import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/collab-coding/',
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'monaco-editor': ['@monaco-editor/react', 'monaco-editor'],
          'socket.io': ['socket.io-client']
        }
      }
    }
  },
  optimizeDeps: {
    include: ['@monaco-editor/react', 'monaco-editor']
  }
});
