import { useLayoutEffect, useRef } from 'react'
import { ages as c } from '../../content/programs'
import type { Kind } from '../../data/schedule'
import { gsap, LIVE, motion, PHONE, ScrollTrigger } from '../../motion/core'
import { Act } from '../shared/Act'
import { Go } from '../shared/Cta'
import { Img } from '../shared/Img'
import { Lines } from '../shared/Rich'
import { MiniWeek } from './MiniWeek'

// ages 3–14 fill the lower three quarters of the chart; adults sit above a break
const y = (a: number) => (1 - (a - 3) / 11) * 75 + 25
const LIT = [4, 6, 13]

/** PROGRAMS · THE GROWTH CHART: three chapters beside a band that climbs to the age of the chapter you're reading (pages.js). */
export function Ages() {
  const ref = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    const root = ref.current!
    const mm = gsap.matchMedia()
    const ctx = gsap.context(() => {
      const band = root.querySelector<HTMLElement>('#rulerBand')!, age = root.querySelector<HTMLElement>('#rulerAge')!, name = root.querySelector<HTMLElement>('#rulerName')!
      const set = (ch: HTMLElement) => {
        const from = +ch.dataset.from!, to = +ch.dataset.to!
        const top = from >= 14 ? 0 : y(to + 1), bot = from >= 14 ? 18 : y(from)
        band.style.top = top + '%'; band.style.height = (bot - top) + '%'
        if (age.textContent !== ch.dataset.age) { age.textContent = ch.dataset.age!; name.textContent = ch.dataset.name!; gsap.fromTo([age, name], { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: .5, stagger: .05, ease: 'power3.out' }) }
      }
      const chaps = [...root.querySelectorAll<HTMLElement>('.chap')]; set(chaps[0])
      chaps.forEach(ch => ScrollTrigger.create({ trigger: ch, start: 'top 55%', end: 'bottom 55%', onToggle: s => { if (s.isActive) set(ch) } }))
      // PHONES: the growth chart rides under the nav as a horizontal ruler (mobile.css); each chapter's photo settles as it passes
      if (motion) mm.add(PHONE, () => root.querySelectorAll('.chap__photo img').forEach(im => gsap.timeline({ scrollTrigger: { trigger: im.parentElement, start: 'top bottom', end: 'bottom 30%', scrub: .5 } }).fromTo(im, { scale: 1.16 }, { scale: 1, ease: 'none' })))
      if (motion) mm.add(LIVE, () => root.querySelectorAll('.chap__photo img').forEach(im => gsap.fromTo(im, { yPercent: -10 }, { yPercent: 0, ease: 'none', scrollTrigger: { trigger: im.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } })))
    }, root)
    return () => { mm.revert(); ctx.revert() }
  }, [])
  return (
    <section className="ages" id="programs" aria-label={c.label} ref={ref}>
      <aside className="ruler" id="ruler" aria-hidden="true">
        <div className="ruler__in">
          <div className="ruler__read"><b id="rulerAge">{c.ruler.age}</b><span id="rulerName">{c.ruler.name}</span></div>
          <div className="ruler__bar">
            <i className="ruler__band" id="rulerBand"></i>
            <ol className="ruler__ticks" id="rulerTicks">
              {[3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(a => <li className={LIT.includes(a) ? 'l' : ''} style={{ top: `${y(a)}%` }} key={a}>{LIT.includes(a) ? <span>{a}</span> : null}</li>)}
              <li className="l" style={{ top: '9%' }}><span>{c.ruler.adults}</span></li>
            </ol>
          </div>
        </div>
      </aside>
      <div className="chaps">
        {c.chapters.map(ch => (
          <article className="chap" id={ch.id} data-k={ch.k} data-from={ch.from} data-to={ch.to} data-age={ch.age} data-name={ch.name} aria-labelledby={ch.labelledby} key={ch.id}>
            <figure className="chap__photo rv"><Img name={ch.photo} alt={ch.alt} loading="lazy" sizes="(max-width:1023px) 92vw, 50vw" style={{ objectPosition: ch.pos }} /></figure>
            <div className="chap__body">
              <Act a={ch.act} />
              <h2 className="t t-2 d" id={ch.labelledby}><Lines lines={ch.title} /></h2>
              <p className="chap__txt rv" data-delay="1">{ch.txt}</p>
              {ch.chips && <ul className="chips rv" data-delay="1">{ch.chips.map(x => <li key={x}>{x}</li>)}</ul>}
              <MiniWeek k={ch.k as Kind} />
              {ch.quote && <blockquote className="chap__q rv" data-delay="2">{ch.quote}<cite>{ch.cite}</cite></blockquote>}
              <div className="chap__cta rv" data-delay="3"><a className="cta cta--sm" href="/contact" data-book data-prog={ch.prog}>{ch.cta}<Go /></a></div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
