import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // The demo is published under a repository subpath on GitHub Pages. Routing
  // is hash-based, so nothing else needs to know about it.
  base: process.env.GITHUB_ACTIONS ? "/all-in-one-crm-test/" : "/",
  server: { port: 5173 },
})
