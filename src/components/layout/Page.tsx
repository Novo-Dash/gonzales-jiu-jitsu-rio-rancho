import { useLayoutEffect, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { gaTrack, fbTrack } from '../../nd/tracking'
import { listeners, ScrollTrigger, scrollToEl } from '../../motion/core'
import { magnetic } from '../../motion/useMagnetic'
import { refreshInOrder } from '../../motion/refresh'
import { startReveals } from '../../motion/useReveals'
import { BookingModal } from './BookingModal'
import { Footer } from './Footer'
import { IconSprite } from './IconSprite'
import { MobileBar } from './MobileBar'
import { MobileMenu } from './MobileMenu'
import { Nav } from './Nav'
import { ui } from './ui'

type Props = { page: string; children: ReactNode; bar?: { href?: string; book?: boolean } }

/**
 * One page of the site, as the prototype's documents are: sprite, nav, menu, the page, footer,
 * mobile bar, modal. Its layout effect runs after every section's, so it does what the end of
 * the prototype's script does: the page-wide listeners, the reveals, the magnetic buttons and
 * the ordered ScrollTrigger refresh.
 */
export function Page({ page, children, bar }: Props) {
  const { pathname } = useLocation()
  useLayoutEffect(() => {
    document.body.className = page === 'home' ? '' : `page page--${page}`
    // triggers left behind by the previous page, if any
    ScrollTrigger.getAll().forEach(t => { const el = t.trigger as Element | undefined; if (el && !el.isConnected) t.kill() })
    const l = listeners()
    // "book" anywhere opens the modal; /contact catches it first (capture) and scrolls to the ticket
    l.on(document, 'click', (e: MouseEvent) => {
      const a = (e.target as Element).closest<HTMLElement>('[data-book]'); if (!a || a.closest('form')) return
      e.preventDefault(); gaTrack('cta_click', { location: a.closest('section,header,footer,nav,.bar')?.id || a.closest('[class]')?.className || page }); ui.closeMenu(); ui.openModal(a.dataset.prog || '')
    })
    l.on(document, 'click', (e: MouseEvent) => {
      const a = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]:not([data-book])'); if (!a) return
      const el = document.querySelector(a.getAttribute('href')!); if (el) { e.preventDefault(); scrollToEl(el) }
    })
    l.on(document, 'click', (e: MouseEvent) => { if ((e.target as Element).closest('a[href^="tel:"]')) gaTrack('click_to_call', { page }) })
    l.on(window, 'keydown', (e: KeyboardEvent) => { if (e.key === 'Escape') { ui.closeModal(); ui.closeMenu() } })
    l.add(magnetic(document.querySelectorAll('#root .cta, #root .ghost, #root .rnd')))
    l.add(startReveals())
    // scroll depth, once per mark per page
    const marks = [25, 50, 75, 100], hit = new Set<number>()
    l.on(window, 'scroll', () => {
      const max = document.documentElement.scrollHeight - innerHeight; if (max <= 0) return
      const pct = (scrollY / max) * 100
      marks.forEach(m => { if (pct >= m - 0.5 && !hit.has(m)) { hit.add(m); gaTrack('scroll_depth', { percent: m, page }) } })
    }, { passive: true })
    fbTrack('ViewContent', { content_name: pathname })
    refreshInOrder()
    const refresh = () => ScrollTrigger.refresh()
    if (document.readyState !== 'complete') l.on(window, 'load', refresh)
    document.fonts?.ready.then(() => { if (document.body.isConnected) refresh() })
    return l.clear
  }, [page, pathname])
  return (
    <>
      <a className="skip" href="#main" aria-label="Skip to content"><span>Skip to content</span></a>
      <IconSprite />
      <Nav page={page} />
      <MobileMenu page={page} />
      <main id="main">{children}</main>
      <Footer />
      <MobileBar {...bar} />
      <BookingModal />
    </>
  )
}
