import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// Served from GitHub Pages at /pebo.codes/ (project page). This base applies to
// dev, build and preview alike, so local preview matches production.
// Switch to '/' if you later serve from a custom domain (pebo.codes).
export default defineConfig({
  base: '/pebo.codes/',
  plugins: [react()],
})
