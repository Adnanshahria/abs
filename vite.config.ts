import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 1000, // Increase warning limit to 1000kb
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['lucide-react', 'framer-motion'],
          markdown: ['react-markdown', 'remark-gfm']
        }
      }
    }
  },
  server: {
    host: true,
    proxy: {
      '/api/hf': {
        target: 'https://adnanshahria2019-gemma.hf.space',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/hf/, ''),
        secure: true,
      },
      '/api/brave': {
        target: 'https://api.search.brave.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/brave/, ''),
        secure: true,
      },
    },
  },
})
