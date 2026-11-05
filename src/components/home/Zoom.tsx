import { useLayoutEffect, useRef } from 'react'
import { zoom as c } from '../../content/home'
import { gsap, lateTrigger, LIVE, motion, SCENE } from '../../motion/core'
import { Img } from '../shared/Img'
import { rich } from '../shared/Rich'

/** ACT I · ZOOM: seven photos, seven speeds (the 21st.dev zoom parallax, in GSAP; home.js ZOOM). */
export function Zoom() {
  const ref = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    const root = ref.current!
    const mm = gsap.matchMedia()
    // smooth AND sharp: while the scroll moves, the photos are compositor layers (will-change, no repaint per
    // frame); 140 ms after it stops the layers drop, and the browser redraws them crisp at the scale they reached
    const stick = root.querySelector<HTMLElement>('#zoomStick')!
    let idle = 0
    const moving = () => { stick.classList.add('is-moving'); clearTimeout(idle); idle = window.setTimeout(() => stick.classList.remove('is-moving'), 140) }
    const ctx = gsap.context(() => {
      mm.add(LIVE, () => {
        if (!motion) return
        const items = gsap.utils.toArray<HTMLElement>(root.querySelectorAll('.zoom__item')), rates = [4, 5, 6, 5, 6, 8, 9]
        const tl = gsap.timeline({ scrollTrigger: { trigger: root.querySelector('#zoomStick'), start: 'top top', end: '+=170%', pin: true, scrub: true, anticipatePin: 1, onUpdate: moving } })
        items.forEach((it, i) => tl.fromTo(it, { scale: .55 }, { scale: rates[i % rates.length], ease: 'none', duration: 1, force3D: false }, 0))
        // the cluster starts a little low, under the headline, and settles back to centre as it grows
        tl.fromTo(items, { yPercent: 11 }, { yPercent: 0, ease: 'power1.out', duration: .35, force3D: false }, 0)
        tl.to('#zoomCtx', { autoAlpha: 0, y: -50, duration: .09, ease: 'power1.in' }, .01)   // the line is gone before the photos reach it
      })
      // PHONES (05/11, Adryan): not driven by the scroll. The section is one screen tall; when it arrives the seven
      // photos come in on their own, slowly, and grow until they take the whole screen (an entrance, played once)
      mm.add(SCENE, () => {
        if (!motion) return
        const items = gsap.utils.toArray<HTMLElement>(root.querySelectorAll('.zoom__item')), rates = [4.4, 5, 6, 5, 6, 8, 9]
        const tl = gsap.timeline({ paused: true })
        tl.fromTo(items, { autoAlpha: 0, yPercent: 16 }, { autoAlpha: 1, yPercent: 12, duration: .9, ease: 'power2.out', stagger: .08, force3D: false }, 0)
        items.forEach((it, i) => tl.fromTo(it, { scale: .55 }, { scale: rates[i % rates.length], ease: 'power2.inOut', duration: 3.6, force3D: false }, 1.5))
        tl.to(items, { yPercent: 0, ease: 'power1.out', duration: 1.3, force3D: false }, 1.5)
        tl.fromTo('#zoomCtx', { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: -40, duration: .6, ease: 'power1.in' }, 1.9)
        const st = lateTrigger({ trigger: root, start: 'top 55%', once: true, onEnter: () => tl.play() })
        return () => { st.kill(); tl.kill() }
      })
    }, root)
    return () => { clearTimeout(idle); stick.classList.remove('is-moving'); mm.revert(); ctx.revert() }
  }, [])
  return (
    <section className="zoom" id="act1" aria-label={c.label} ref={ref}>
      <div className="zoom__stick" id="zoomStick">
        {c.photos.map(([p, alt]) => <div className="zoom__item" key={p}><div><Img name={p} alt={alt} loading="lazy" decoding="async" fetchPriority="low" /></div></div>)}
        <div className="zoom__ctx" id="zoomCtx"><p className="label">{c.eyebrow}</p><b>{rich(c.line)}</b><span>{c.sub}</span></div>
      </div>
    </section>
  )
}
