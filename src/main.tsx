import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { initMotion } from './motion/core'
import { captureAttribution } from './nd/attribution'
import './styles/index.css'

if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
captureAttribution()
initMotion()

// The prerendered HTML is hydrated, not replaced: the hero photo and the lines already revealed stay
// the same nodes (a replaced DOM re-paints the LCP and re-hides what the early reveal showed).
// Anything that reads the clock waits for the first layout effect (motion/time.ts useNow).
const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
if (root.firstElementChild) hydrateRoot(root, app)
else createRoot(root).render(app)
