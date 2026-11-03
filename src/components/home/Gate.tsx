import { useLayoutEffect, useRef } from 'react'
import { gsap, LIVE, motion, SCENE } from '../../motion/core'

type Props = { from: string; to: string; ink: string; act: string; word: string; line: string; light?: boolean }

/** GATE: the word is on screen from the first frame; the arch fills the room, the word leaves last (home.js GATES). */
export function Gate({ from, to, ink, act, word, line, light }: Props) {
  const ref = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    const g = ref.current!
    const mm = gsap.matchMedia()
    const ctx = gsap.context(() => {
      mm.add(LIVE, () => {
        if (!motion) return
        const arch = g.querySelector('.gate__arch'), label = g.querySelector<HTMLElement>('.gate__label')!, side = g.querySelector('.gate__side')
        const tl = gsap.timeline({ scrollTrigger: { trigger: g, start: 'top top', end: '+=85%', pin: true, scrub: .5, anticipatePin: 1 } })
        const to = getComputedStyle(g).getPropertyValue('--g-to').trim(), from = getComputedStyle(g).getPropertyValue('--g-from').trim()
        tl.fromTo(arch, { scale: .12 }, { scale: 7, ease: 'power2.in', duration: .78 }, 0)
          .fromTo(g, { backgroundColor: from }, { backgroundColor: to, duration: .01, immediateRender: false }, .76)   // no seam once the arch has filled the room
          .fromTo(label.firstElementChild, { scale: 1 }, { scale: 1.08, ease: 'none', duration: 1 }, 0)
          .to(label, { autoAlpha: 0, duration: .18, ease: 'power2.in' }, .8)
          .to(side, { autoAlpha: 0, duration: .2 }, .78)
      })
      // PHONES: the stage sticks (mobile.css) while the doorway grows from the floor and fills the screen
      // with the next act's colour; the word holds, then leaves. A shorter walk than the desktop pin.
      mm.add(SCENE, () => {
        if (!motion) return
        const arch = g.querySelector('.gate__arch'), label = g.querySelector<HTMLElement>('.gate__label')!, side = g.querySelector('.gate__side')
        const to = getComputedStyle(g).getPropertyValue('--g-to').trim(), from = getComputedStyle(g).getPropertyValue('--g-from').trim()
        const tl = gsap.timeline({ scrollTrigger: { trigger: g, start: 'top top', end: 'bottom bottom', scrub: .4 } })
        tl.fromTo(arch, { scale: .12 }, { scale: 9, ease: 'power1.in', duration: .8 }, 0)
          .fromTo(g, { backgroundColor: from }, { backgroundColor: to, duration: .01, immediateRender: false }, .78)
          .fromTo(label.firstElementChild, { scale: .94 }, { scale: 1.06, ease: 'none', duration: 1 }, 0)
          .to(side, { autoAlpha: 0, duration: .2 }, .76)
        // the word stays (now in the new colour) and leaves with the stage: no empty screen between two acts
      })
    }, g)
    return () => { mm.revert(); ctx.revert() }
  }, [])
  return (
    <section className={'gate' + (light ? ' gate--light' : '')} style={{ '--g-from': from, '--g-to': to, '--g-ink': ink }} data-gate aria-hidden="true" ref={ref}>
      {/* gate__stage: the sticky stage on phones (mobile.css); static and empty of styles on desktop */}
      <div className="gate__stage">
        <div className="gate__arch"></div>
        <div className="gate__side"></div>
        <div className="gate__label"><div><span>{act}</span><b>{word}</b><small>{line}</small></div></div>
      </div>
    </section>
  )
}
