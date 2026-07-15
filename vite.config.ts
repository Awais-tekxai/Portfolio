import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// GitHub project pages: https://<user>.github.io/<repo>/ — set VITE_BASE_PATH=/Portfolio/ in CI
const base = process.env.VITE_BASE_PATH ?? '/'

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    include: ['lottie-react'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three') || id.includes('@react-three')) return 'three'
          if (id.includes('node_modules/framer-motion')) return 'motion'
          if (id.includes('node_modules/gsap')) return 'gsap'
        },
      },
    },
  },
})
