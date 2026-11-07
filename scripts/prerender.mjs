// ─────────────────────────────────────────────────────────────────────────────
// prerender.mjs: runs after `vite build` and the SSR build of src/entry-server.tsx
// (the fight-sports script, with the Gonzales routes).
//
// • dist/index.html, dist/<route>/index.html: every route rendered, with its own <head>
//   (title, description, canonical, OG, JSON-LD) written from src/data/seo.ts.
// • dist/404.html: the empty shell, for any other path (the app shows its not-found page).
// • dist/robots.txt, sitemap.xml, llms.txt.
//
// Crawlers, AI bots and link previews read the H1, the sections, the FAQ and the address without
// running JavaScript, and the hero paints before the bundle arrives. The browser entry still uses
// createRoot, which replaces this HTML with the same DOM on first render.
// While no domain is confirmed (VITE_SITE_URL), the build is a client preview: noindex everywhere.
// ─────────────────────────────────────────────────────────────────────────────
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const must = (cond, what) => { if (!cond) throw new Error(`prerender: ${what}`) }
const read = (f) => fs.readFileSync(path.join(dist, f), 'utf8')
const write = (f, s) => { fs.mkdirSync(path.dirname(path.join(dist, f)), { recursive: true }); fs.writeFileSync(path.join(dist, f), s) }
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
const EMPTY_ROOT = '<div id="root"></div>'

// Module-level code touches a few browser globals (the kit keeps a reference to `window`). Stubs for
// the render only: no effect runs on the server.
process.env.NODE_ENV ??= 'production'
globalThis.window ??= { location: { search: '', hash: '', pathname: '/', href: '' } }
globalThis.matchMedia ??= () => ({ matches: false, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {} })
const ssr = await import(pathToFileURL(path.join(root, 'dist-server', 'entry-server.js')).href)
const { SITE, IS_PREVIEW, ROUTES, url, jsonLd, llms, MODIFIED, srcSetOf } = ssr

// React 19 emits <link rel="preload" as="image"> for images without loading="lazy"; inside #root they
// would compete with the real LCP preload in the head.
const clean = (html) => html.replace(/<link rel="preload" as="image"[^>]*\/?>/g, '')

// The LCP of each route: its hero photo.
const LCP = { home: 'hero', about: 'hero', instructors: 'c-01', programs: 'kids', schedule: 'women', offer: 'drill', contact: 'roll' }

const head = (r) => {
  const u = url(r.path), og = `${SITE}/og.jpg`, t = esc(r.title), d = esc(r.description)
  // the same srcset and sizes as the hero <img>, so the preload and the image are one request
  const lcp = LCP[r.page] ? `\n<link rel="preload" as="image" href="/img/${LCP[r.page]}.webp" imagesrcset="${srcSetOf(LCP[r.page])}" imagesizes="${r.page === 'home' ? '(max-width:1023px) calc(100vw - 32px), 100vw' : '100vw'}" fetchpriority="high">` : ''
  return `<meta name="robots" content="${IS_PREVIEW ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'}">
<link rel="canonical" href="${u}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Gonzales Jiu-Jitsu">
<meta property="og:locale" content="en_US">
<meta property="og:url" content="${u}">
<meta property="og:title" content="${t}">
<meta property="og:description" content="${d}">
<meta property="og:image" content="${og}">
<meta property="og:image:secure_url" content="${og}">
<meta property="og:image:type" content="image/jpeg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="The Gonzales Jiu-Jitsu team on the mat in Rio Rancho, NM. First class free.">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${t}">
<meta name="twitter:description" content="${d}">
<meta name="twitter:image" content="${og}">
<meta name="format-detection" content="telephone=no">${lcp}
<script type="application/ld+json">${JSON.stringify(jsonLd(r)).replace(/</g, '\\u003c')}</script>`
}

// The reveal observer of core.js (src/motion/useReveals.ts), inline: the lines in the first screen start
// their entrance at first paint instead of waiting for the bundle. The app takes over after hydration.
const REVEAL = `<script>(function(){if(!('IntersectionObserver' in window))return;var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.18,rootMargin:'0px 0px -8% 0px'});document.querySelectorAll('.d:not(.in),.rv:not(.in),.scard:not(.in)').forEach(function(el){io.observe(el)});window.__ndReveal=io})()</script>`

// With the HTML already painted, the bundle starts AFTER the hero photo (the LCP) has been presented:
// decode, a frame, then 300 ms, with a 2.5 s ceiling (fight-sports, measured on GB Lindale 19/10/2026).
// A route with no hero photo (/contact) has its LCP in the first screen's fade-in (~1.1 s): the bundle waits it out.
const deferEntry = (html, where) => {
  const entry = html.match(/<script type="module" crossorigin src="([^"]+)"><\/script>/)
  must(entry, `the module entry script in ${where}`)
  const preloads = [...html.matchAll(/<link rel="modulepreload" crossorigin href="([^"]+)">/g)].map((m) => m[1])
  const loader = `<script>(function(){var d=0;function go(){if(d)return;d=1;${JSON.stringify(preloads)}.forEach(function(h){var l=document.createElement('link');l.rel='modulepreload';l.crossOrigin='';l.href=h;document.head.appendChild(l)});var s=document.createElement('script');s.type='module';s.crossOrigin='';s.src=${JSON.stringify(entry[1])};document.head.appendChild(s)}function later(){requestAnimationFrame(function(){setTimeout(go,300)})}var p=[].slice.call(document.querySelectorAll('link[rel=preload][as=image]')).filter(function(x){return !x.media||matchMedia(x.media).matches})[0];if(!p)requestAnimationFrame(function(){setTimeout(go,1300)});else{var i=new Image();if(p.imageSrcset){i.sizes=p.imageSizes||'';i.srcset=p.imageSrcset}else{i.src=p.href}(i.decode?i.decode():Promise.resolve()).then(later,later)}setTimeout(go,2500)})()</script>`
  return html.replace(entry[0], '').replace(/\s*<link rel="modulepreload" crossorigin href="[^"]+">/g, '').replace('</body>', `${REVEAL}\n${loader}\n</body>`)
}

// The stylesheet (19 KB gzip) goes inline: one round trip less before the first paint. Its font and
// image URLs are absolute (/assets/…), so they resolve the same from the <style>.
const cssLink = read('index.html').match(/<link rel="stylesheet" crossorigin href="(\/assets\/[^"]+\.css)">/)
must(cssLink, 'the stylesheet link')
const css = fs.readFileSync(path.join(dist, cssLink[1]), 'utf8')
must(!/url\((?!["']?(\/|data:|#))/.test(css), 'only absolute URLs in the CSS')
const tpl = read('index.html').replace(cssLink[0], `<style>${css}</style>`)
must(tpl.includes(EMPTY_ROOT) && tpl.includes('<!--nd:head-->'), 'the template markers')
write('404.html', tpl.replace('<!--nd:head-->', '<meta name="robots" content="noindex">'))

const done = []
for (const r of ROUTES) {
  const html = clean(ssr.render(r.path))
  must(/<h1[\s>]/.test(html), `an <h1> in ${r.path}`)
  let page = tpl
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(r.title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*/, `$1${esc(r.description)}`)
    .replace('<!--nd:head-->', head(r))
    .replace('<body>', r.page === 'home' ? '<body>' : `<body class="page page--${r.page}">`)
    .replace(EMPTY_ROOT, `<div id="root">${html}</div>`)
  page = deferEntry(page, r.path)
  write(r.path === '/' ? 'index.html' : `${r.path.slice(1)}/index.html`, page)
  done.push(r.path)
}

write('robots.txt', IS_PREVIEW
  ? 'User-agent: *\nDisallow: /\n'
  : `User-agent: *\nAllow: /\n\n${['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'Google-Extended', 'PerplexityBot', 'ClaudeBot', 'Applebot-Extended', 'Bingbot'].map((b) => `User-agent: ${b}\nAllow: /`).join('\n')}\n\nSitemap: ${SITE}/sitemap.xml\n`)
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${ROUTES.map((r) => `  <url><loc>${url(r.path)}</loc><lastmod>${MODIFIED}</lastmod></url>`).join('\n')}\n</urlset>\n`)
write('llms.txt', llms())

delete globalThis.window
fs.rmSync(path.join(root, 'dist-server'), { recursive: true, force: true })
console.log(`prerender: ${done.length} routes · ${done.join(', ')}${IS_PREVIEW ? ' · PREVIEW (noindex) at ' + SITE : ' · ' + SITE}`)
