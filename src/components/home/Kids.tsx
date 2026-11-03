import { useLayoutEffect, useRef } from 'react'
import { parents as c } from '../../content/home'
import { site } from '../../data/site'
import { gsap, listeners, ScrollTrigger } from '../../motion/core'
import { tilt } from '../../motion/useTilt'
import { Act } from '../shared/Act'
import { Lines } from '../shared/Rich'
import { ArtCalm, ArtConfidence, ArtEscape, ArtPosition } from './KidsArt'

const ART = { calm: ArtCalm, position: ArtPosition, escape: ArtEscape, confidence: ArtConfidence }

// The four gestures (home.js · WHAT THEY COME HOME WITH): each plays on enter and replays on hover.
const art: Record<string, (root: Element) => gsap.core.Timeline> = {
  calm: root => { const rings = root.querySelectorAll('.ring'), kid = root.querySelector('.kid')
    const tl = gsap.timeline({ repeat: -1, repeatDelay: .2 })
    rings.forEach((r, i) => tl.fromTo(r, { scale: .7, opacity: .45, transformOrigin: '50% 50%' }, { scale: 1.8, opacity: 0, duration: 3, ease: 'sine.out' }, i * 1))
    tl.fromTo(kid, { scaleY: 1, scaleX: 1, transformOrigin: '50% 100%' }, { scaleY: 1.025, scaleX: 1.01, duration: 1.5, yoyo: true, repeat: 1, ease: 'sine.inOut' }, 0); return tl },
  position: root => { const board = root.querySelector('.board'), kid = root.querySelector('.kid')
    const tl = gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: 'sine.inOut', duration: 1.7 } })
    // The kid rides the board: both turn on the wedge (one absolute pivot, the same angle), so the feet never
    // leave it; the kid only slides a little along it. The prototype turned them on different origins with
    // opposite angles, and through the loop the kid floated off the board.
    tl.fromTo(board, { rotate: -6, svgOrigin: '100 122' }, { rotate: 6 }, 0).fromTo(kid, { x: -6, rotate: -6, svgOrigin: '100 122' }, { x: 6, rotate: 6 }, 0); return tl },
  escape: root => { const w = root.querySelector('.weight'), down = root.querySelector('.down'), up = root.querySelector('.up'), bub = root.querySelector('.bubble')
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.8 })
    tl.set(down, { opacity: 1, x: 0 }).set(up, { opacity: 0, y: 12 }).set(bub, { opacity: 0, scale: .6 }).set(w, { y: -6, rotate: 0 })
      .to(w, { y: 0, duration: .5, ease: 'power2.in' })                                   // the weight settles on the kid
      .to(down, { x: -26, duration: .4, ease: 'power2.inOut' }, '+=.25')                  // the kid shrimps out
      .to(down, { x: -40, opacity: 0, duration: .3, ease: 'power2.in' })
      .to(w, { y: 14, rotate: -2, transformOrigin: '50% 100%', duration: .5, ease: 'bounce.out' }, '-=.25')  // the weight drops to the mat
      .to(up, { opacity: 1, y: 0, duration: .5, ease: 'back.out(2)' }, '-=.15')           // stands up
      .to(bub, { opacity: 1, scale: 1, duration: .4, ease: 'back.out(3)' }, '+=.1')       // tells an adult
    return tl },
  confidence: root => { const st = root.querySelectorAll('.stripe'), kid = root.querySelector('.kid'), sp = root.querySelector('.spark')
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 })
    tl.set(st, { opacity: 0, scale: 2.2 }).set(kid, { y: 0, transformOrigin: '50% 100%' }).set(sp, { opacity: 0, scale: .6, transformOrigin: '100px 40px' })
    st.forEach((s, i) => tl.to(s, { opacity: 1, scale: 1, duration: .3, ease: 'back.out(3)' }, .4 + i * .45).to(kid, { y: -1.5 * (i + 1), duration: .3, ease: 'power2.out' }, '<'))
    tl.to(kid, { y: -7, scaleY: 1.02, duration: .7, ease: 'elastic.out(1,.45)' }).to(sp, { opacity: 1, scale: 1, duration: .4, ease: 'back.out(2)' }, '<').to(sp, { opacity: 0, duration: .6 }, '+=1'); return tl },
}

/** ACT I · WHAT THEY COME HOME WITH: four drawings, each with its own gesture. */
export function Kids() {
  const ref = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    const root = ref.current!
    const offTilt = tilt(root.querySelectorAll('[data-tilt]'))
    const l = listeners()
    const ctx = gsap.context(() => {
      root.querySelectorAll<HTMLElement>('.kc').forEach(card => {
        const make = art[card.dataset.art!]; if (!make) return
        const tl = make(card); tl.pause()
        ScrollTrigger.create({ trigger: card, start: 'top 85%', onEnter: () => tl.play(), onLeave: () => tl.pause(), onEnterBack: () => tl.play(), onLeaveBack: () => tl.pause() })
        l.on(card, 'pointerenter', () => tl.restart())
      })
    }, root)
    return () => { offTilt(); l.clear(); ctx.revert() }
  }, [])
  return (
    <section className="kids sec screen" id="parents" aria-labelledby="par-t" ref={ref}>
      <div className="shell">
        <div className="head head--c">
          <div style={{ display: 'grid', justifyItems: 'center' }}>
            <Act a={c.act} />
            <h2 className="t t-2 d" id="par-t"><Lines lines={c.title} /></h2>
            <p className="sub rv" data-delay="1" style={{ textAlign: 'center', marginInline: 'auto' }}>{c.sub}</p>
          </div>
        </div>
        <div className="kgrid" id="kgrid">
          {c.cards.map((k, i) => {
            const Art = ART[k.art as keyof typeof ART]
            return (
              <article className="kc rv" data-art={k.art} data-delay={i ? String(i) : undefined} data-tilt key={k.art}>
                <div className="kc__art"><Art /></div>
                <span className="kc__n">{k.n}</span><h3>{k.h}</h3><p>{k.p}</p>
              </article>
            )
          })}
        </div>
        <p className="kquote rv" data-delay="2">{c.quote}<span>{c.cite}<a href={site.krqe} target="_blank" rel="noopener">{c.source}</a></span></p>
      </div>
    </section>
  )
}
