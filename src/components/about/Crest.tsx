import { useLayoutEffect, useRef } from 'react'
import { crest as c } from '../../content/about'
import { gsap, lateTrigger, listeners, motion, PHONE, ScrollTrigger } from '../../motion/core'
import { Act } from '../shared/Act'
import { Img } from '../shared/Img'
import { Lines } from '../shared/Rich'
import { CrestSeal } from './CrestSeal'

/** ABOUT · THE CREST: the ring turns with the scroll; the word under the red marker is the one lit (pages.js CREST). */
export function Crest() {
  const ref = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    const root = ref.current!, ring = root.querySelector<SVGGElement>('#crestRing')!, items = [...root.querySelectorAll('#crestWords li')]
    const l = listeners()
    let cur = 0
    const light = (i: number) => { if (i === cur) return; cur = i; items.forEach((li, k) => li.classList.toggle('on', k === i)) }
    const mm = gsap.matchMedia()
    const ctx = gsap.context(() => {
      const turn = (p: number) => { const rot = -60 - p * 240; ring.style.transform = `rotate(${rot}deg)`; light(Math.min(2, Math.max(0, Math.round(p * 2)))) }
      if (motion) mm.add('(min-width:1024px)', () => { ScrollTrigger.create({ trigger: root, start: 'top 70%', end: 'bottom 30%', scrub: .8, onUpdate: s => turn(s.progress) }) })
      // PHONES: the seal sits between the title and the three words (mobile.css); the ring turns from the moment the
      // seal comes up until the last word is read, and the word under the marker lights as you reach it
      if (motion) mm.add(PHONE, () => { lateTrigger({ trigger: root.querySelector('.crest__seal'), start: 'top 85%', endTrigger: root.querySelector('#crestWords'), end: 'bottom 55%', onUpdate: s => turn(s.progress) }) })
      items.forEach((li, i) => l.on(li, 'mouseenter', () => { if (!motion) light(i) }))
    }, root)
    return () => { l.clear(); mm.revert(); ctx.revert(); ring.style.transform = '' }
  }, [])
  return (
    <section className="crest sec screen" id="crest" aria-labelledby="cr-t" ref={ref}>
      <div className="shell crest__grid">
        <div className="crest__copy">
          <Act a={c.act} />
          <h2 className="t t-2 d" id="cr-t"><Lines lines={c.title} /></h2>
          <ol className="crest__words" id="crestWords">
            {c.words.map((w, i) => <li className={i === 0 ? 'on' : undefined} key={w.n}><span className="crest__n">{w.n}</span><div><b>{w.b}</b><p>{w.p}</p></div></li>)}
          </ol>
          <p className="crest__q rv">{c.quote}<span>{c.cite}</span></p>
        </div>
        <div className="crest__seal rv" aria-hidden="true">
          <CrestSeal />
          <Img className="crest__logo" name="logo-ink" alt="" sizes="(max-width:1023px) 40vw, 240px" />
        </div>
      </div>
    </section>
  )
}
