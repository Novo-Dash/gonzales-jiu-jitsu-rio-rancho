import { useLayoutEffect, useRef } from 'react'
import { crest as c } from '../../content/about'
import { gsap, listeners, motion, ScrollTrigger } from '../../motion/core'
import { Act } from '../shared/Act'
import { Img } from '../shared/Img'
import { Lines } from '../shared/Rich'
import { CrestSeal } from './CrestSeal'

/**
 * ABOUT · THE CREST (03/11): laid out as the home's "On the mat". The title on the left, the three words on the
 * right; below, the crest ring alone, turning with the scroll (the word under its red marker is the one lit),
 * over the belt-like divider.
 */
export function Crest() {
  const ref = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    const root = ref.current!, items = [...root.querySelectorAll('#crestWords li')], stage = root.querySelector<HTMLElement>('.cst__stage')!
    const ring = root.querySelector<SVGGElement>('#crestRing')
    const l = listeners()
    let cur = 0
    const light = (i: number) => { if (i === cur) return; cur = i; items.forEach((li, k) => li.classList.toggle('on', k === i)) }
    const ctx = gsap.context(() => {
      // the ring turns with the scroll; the word that passes under the red marker is the one lit (pages.js CREST)
      // the words light while you read them (the list); the ring turns the whole time it is on screen (03/11:
      // tied to the section, it had all but finished turning by the time it came into view)
      ScrollTrigger.create({ trigger: root.querySelector('#crestWords'), start: 'top 75%', end: 'bottom 35%', onUpdate: s => light(Math.min(2, Math.max(0, Math.floor(s.progress * 3)))) })
      // a plain CSS rotate, as in the prototype: the stylesheet already turns it about its centre (transform-origin
      // 260 260); a GSAP svgOrigin on top of that offset the ring and threw its words out of the circle
      if (motion && ring) ScrollTrigger.create({ trigger: stage, start: 'top bottom', end: 'bottom top', scrub: .8, onUpdate: s => { ring.style.transform = `rotate(${-60 - s.progress * 360}deg)` } })
      items.forEach((li, i) => l.on(li, 'mouseenter', () => light(i)))
      if (!motion) return
      gsap.fromTo('.cst__seal', { y: 100 }, { y: -80, ease: 'none', scrollTrigger: { trigger: stage, start: 'top bottom', end: 'bottom top', scrub: true } })
    }, root)
    return () => { l.clear(); ctx.revert(); if (ring) ring.style.transform = '' }
  }, [])
  return (
    <section className="cst cst--crest" id="crest" aria-labelledby="cr-t" ref={ref}>
      <div className="shell cst__head">
        <div>
          <Act a={c.act} />
          <h2 className="t t-2 d cst__t" id="cr-t"><Lines lines={c.title} /></h2>
          <p className="cst__rank rv" data-delay="1">{c.quote} <span>{c.cite}</span></p>
        </div>
        <div className="cst__side">
          <ol className="crest__words" id="crestWords">
            {c.words.map((w, i) => <li className={i === 0 ? 'on' : undefined} key={w.n}><span className="crest__n">{w.n}</span><div><b>{w.b}</b><p>{w.p}</p></div></li>)}
          </ol>
        </div>
      </div>
      <div className="cst__stage">
        <span className="cst__ring cst__ring--l" aria-hidden="true"></span><span className="cst__ring cst__ring--r" aria-hidden="true"></span>
        <div className="crest__seal cst__seal" aria-hidden="true">
          <CrestSeal />
          <Img className="crest__logo" name="logo-ink" alt="" sizes="(max-width:1023px) 40vw, 300px" />
        </div>
        <i className="cst__floor" aria-hidden="true"></i>
      </div>
    </section>
  )
}
