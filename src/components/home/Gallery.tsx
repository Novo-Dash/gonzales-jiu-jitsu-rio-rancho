import { useLayoutEffect, useRef } from 'react'
import { gallery as c } from '../../content/home'
import { gsap, listeners, motion, ScrollTrigger } from '../../motion/core'
import { Act } from '../shared/Act'
import { Ic } from '../shared/Cta'
import { Img } from '../shared/Img'
import { Lines } from '../shared/Rich'

/**
 * ACT III · THE MAT (03/11): the academy in pictures, dealt like a hand of cards laid straight across the full
 * width. The photo in play sits in front; the others step out behind it, smaller, and fade at the edges. The deck deals itself every
 * few seconds (not with reduced motion, not under the cursor, not off screen); drag, tap a card behind or use
 * the arrows to deal by hand.
 */
export function Gallery() {
  const ref = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    const root = ref.current!, stage = root.querySelector<HTMLElement>('.deck')!
    const cards = [...stage.querySelectorAll<HTMLElement>('.deck__card')], n = cards.length
    const l = listeners()
    let cur = 0, timer = 0, hover = false, inView = false
    const ctx = gsap.context(() => {
      const lay = (instant = false) => {
        const w = cards[0].offsetWidth, phone = innerWidth < 768
        cards.forEach((card, i) => {
          let off = (i - cur + n) % n; if (off > n / 2) off -= n
          // straight, across the full width (03/11): no turn, no drop; the cards behind step out to the edges
          const a = Math.abs(off), shown = a <= (phone ? 2 : 4)
          const vars = {
            x: off * w * (phone ? .5 : .72) - Math.sign(off) * a * a * w * (phone ? .02 : .015),
            y: 0, rotate: 0, scale: 1 - a * .08,
            autoAlpha: shown ? 1 : 0, zIndex: 20 - a,
          }
          card.classList.toggle('is-on', off === 0); card.setAttribute('aria-hidden', off === 0 ? 'false' : 'true')
          if (instant || !motion) gsap.set(card, vars)
          else gsap.to(card, { ...vars, duration: .9, ease: 'expo.out', overwrite: 'auto' })
        })
      }
      const go = (k: number) => { cur = (cur + k + n) % n; lay(); restart() }
      const restart = () => { clearTimeout(timer); if (motion && !hover && inView) timer = window.setTimeout(() => go(1), 3200) }
      lay(true)
      ScrollTrigger.create({ trigger: root, start: 'top 80%', end: 'bottom 20%', onToggle: s => { inView = s.isActive; restart() } })
      l.on(root.querySelector('.gal__prev')!, 'click', () => go(-1))
      l.on(root.querySelector('.gal__next')!, 'click', () => go(1))
      cards.forEach((card, i) => l.on(card, 'click', () => { if (i !== cur) { let off = (i - cur + n) % n; if (off > n / 2) off -= n; go(off) } }))
      l.on(stage, 'pointerenter', (e: PointerEvent) => { if (e.pointerType === 'mouse') { hover = true; clearTimeout(timer) } })
      l.on(stage, 'pointerleave', () => { hover = false; restart() })
      l.on(root, 'focusin', () => { hover = true; clearTimeout(timer) })
      l.on(root, 'focusout', () => { hover = false; restart() })
      l.on(stage, 'keydown', (e: KeyboardEvent) => { if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1) })
      // swipe / drag: a flick of 40px deals one card
      let sx = 0, down = false
      l.on(stage, 'pointerdown', (e: PointerEvent) => { down = true; sx = e.clientX })
      l.on(window, 'pointerup', (e: PointerEvent) => { if (!down) return; down = false; const dx = e.clientX - sx; if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1) })
      l.on(window, 'resize', () => lay(true))
    }, root)
    return () => { clearTimeout(timer); l.clear(); ctx.revert() }
  }, [])
  return (
    <section className="gal sec screen" id="mat" aria-labelledby="gal-t" ref={ref}>
      <div className="shell">
        <div className="head head--c">
          <div style={{ display: 'grid', justifyItems: 'center' }}>
            <Act a={c.act} />
            <h2 className="t t-2 d" id="gal-t"><Lines lines={c.title} /></h2>
            <p className="sub rv" data-delay="1" style={{ textAlign: 'center', marginInline: 'auto' }}>{c.sub}</p>
          </div>
        </div>
      </div>
      <div className="deck rv" data-delay="1" role="group" aria-roledescription="carousel" aria-label={c.label} tabIndex={0}>
        {c.photos.map(([p, alt]) => (
          <figure className="deck__card" key={p}><Img name={p} alt={alt} loading="lazy" sizes="(max-width:767px) 64vw, 30vw" draggable={false} /></figure>
        ))}
      </div>
      <div className="gal__ctrl rv" data-delay="2">
        <button type="button" className="rnd gal__prev" aria-label={c.prev}><Ic id="i-left" /></button>
        <button type="button" className="rnd gal__next" aria-label={c.next}><Ic id="i-arrow" /></button>
      </div>
    </section>
  )
}
