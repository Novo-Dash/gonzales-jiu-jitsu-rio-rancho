import { fine, gsap, listeners, motion } from './core'

/** Cards tilt with the cursor (core.js). Called by each section before its own listeners, as in the prototype. */
export function tilt(els: Iterable<Element>) {
  const l = listeners()
  if (fine && motion) for (const c of els) {
    l.on(c, 'pointermove', (e: PointerEvent) => { const r = c.getBoundingClientRect(); const dx = (e.clientX - r.left) / r.width - .5, dy = (e.clientY - r.top) / r.height - .5; gsap.to(c, { rotateY: dx * 7, rotateX: -dy * 7, transformPerspective: 900, duration: .6, ease: 'power3.out' }) })
    l.on(c, 'pointerleave', () => gsap.to(c, { rotateY: 0, rotateX: 0, duration: 1, ease: 'elastic.out(1,.5)' }))
  }
  return l.clear
}
