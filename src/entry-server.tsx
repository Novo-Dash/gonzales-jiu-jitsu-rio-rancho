/**
 * Server entry for the prerender (scripts/prerender.mjs), built with `vite build --ssr`.
 * Renders every route to static HTML, for the crawlers, AI bots and link previews that never run
 * JavaScript. The browser entry replaces this HTML with the same DOM on first render; the `.js`
 * class set in the <head> keeps the animated elements in their initial state until then.
 */
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from './App'
import { srcSetOf } from './components/shared/Img'
import { IS_PREVIEW, jsonLd, llms, MODIFIED, ROUTES, SITE, url } from './data/seo'

export { IS_PREVIEW, jsonLd, llms, MODIFIED, ROUTES, SITE, srcSetOf, url }

export const render = (path: string) => renderToString(
  <StrictMode>
    <StaticRouter location={path}>
      <App />
    </StaticRouter>
  </StrictMode>,
)
