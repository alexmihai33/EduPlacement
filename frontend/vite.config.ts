import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',  // Add this line
  build: {
    outDir: 'dist',  // Specify output directory
    rollupOptions: {
      input: 'index.html',  // Specify the entry file
    },
  },
})
