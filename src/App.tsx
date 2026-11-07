import { useLayoutEffect, useRef } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { lenis } from './motion/core'
import { BookPage } from './nd'
import About from './pages/About'
import Contact from './pages/Contact'
import Home from './pages/Home'
import Instructors from './pages/Instructors'
import NotFound from './pages/NotFound'
import Offer from './pages/Offer'
import Programs from './pages/Programs'
import Schedule from './pages/Schedule'

/** Every route starts at the top, before the new page measures its triggers; client navigations count as page views. */
function RouteEffects() {
  const { pathname } = useLocation()
  const first = useRef(true)
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
    lenis?.scrollTo(0, { immediate: true, force: true })
    if (first.current) { first.current = false; return }
    const w = window as unknown as { fbq?: (...a: unknown[]) => void; gtag?: (...a: unknown[]) => void }
    try { w.fbq?.('track', 'PageView'); w.gtag?.('event', 'page_view', { page_path: pathname, page_location: location.href }) } catch { /* never break navigation */ }
  }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <RouteEffects />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/instructors" element={<Instructors />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/offer" element={<Offer />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/book" element={<BookPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
