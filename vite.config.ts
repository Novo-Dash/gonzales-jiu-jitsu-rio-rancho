import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

// The domain: VITE_SITE_URL once the client confirms it (memory/briefing.md); until then the Vercel
// production URL, and the build is a client preview (noindex, see scripts/prerender.mjs).
const confirmed = process.env.VITE_SITE_URL?.replace(/\/$/, '')
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:4173'
const SITE = confirmed || vercelUrl

// `vite preview` answers /about with the home document; Vercel serves dist/about/index.html (vercel.json
// rewrites). Same rewrite here, so local checks (parity, Lighthouse) see what production sends.
const routes = (): Plugin => ({
  name: 'prerendered-routes',
  configurePreviewServer(server) {
    server.middlewares.use((req, _res, next) => {
      const m = req.url?.match(/^\/(about|instructors|programs|schedule|contact)(\?.*)?$/)
      if (m) req.url = `/${m[1]}/index.html${m[2] ?? ''}`
      next()
    })
  },
})

export default defineConfig({
  plugins: [react(), routes()],
  define: { __SITE__: JSON.stringify(SITE), __PREVIEW__: JSON.stringify(!confirmed) },
  server: { port: 5260, fs: { deny: ['memory/**', 'site-prototipo/**', 'lp-prototipo/**', '.env', '.env.*'] } },
  preview: { port: 4173 },
})
