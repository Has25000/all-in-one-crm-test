import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Published under a repository subpath on GitHub Pages, served from root in
  // development. Routing is hash-based, so nothing else needs to know.
  base: process.env.BASE_PATH ?? "/",
  server: { port: 5173 },
})
