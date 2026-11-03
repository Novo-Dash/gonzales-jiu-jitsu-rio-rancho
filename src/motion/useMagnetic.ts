import { fine, gsap, listeners, motion } from './core'

/** Magnetic buttons (core.js): the pill leans toward the cursor, the arrow circle leans more. */
export function magnetic(els: Iterable<Element>) {
  const l = listeners()
  if (fine && motion) for (const b of els) {
    const go = b.querySelector('.cta__go, span')
    l.on(b, 'pointermove', (e: PointerEvent) => { const r = b.getBoundingClientRect(); const dx = (e.clientX - r.left - r.width / 2) / r.width, dy = (e.clientY - r.top - r.height / 2) / r.height; gsap.to(b, { x: dx * 10, y: dy * 8, duration: .5, ease: 'power3.out' }); if (go) gsap.to(go, { x: dx * 10, y: dy * 8, duration: .5, ease: 'power3.out' }) })
    l.on(b, 'pointerleave', () => { gsap.to(b, { x: 0, y: 0, duration: .8, ease: 'elastic.out(1,.5)' }); if (go) gsap.to(go, { x: 0, y: 0, duration: .8, ease: 'elastic.out(1,.5)' }) })
  }
  return l.clear
}
