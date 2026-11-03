import { useLayoutEffect, useRef } from 'react'
import { steps as c } from '../../content/home'
import { site } from '../../data/site'
import { gsap, lateTrigger, LIVE, listeners, motion, PHONE, ScrollTrigger, SHORT } from '../../motion/core'
import { tilt } from '../../motion/useTilt'
import { Act } from '../shared/Act'
import { Call, Go, Ic } from '../shared/Cta'
import { Lines, rich } from '../shared/Rich'

/** ACT III · YOUR FIRST CLASS: the four cards stand up in 3D, bowed toward you; the belt slides in and earns its four stripes (home.js FIRST CLASS). */
export function Steps() {
  const ref = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    const root = ref.current!
    const cards = gsap.utils.toArray<HTMLElement>(root.querySelectorAll('.step')), row = root.querySelector('#stepsRow')
    // the shared cursor tilt first, as in the prototype (core.js runs before home.js): the bow below wins on leave
    const offTilt = tilt(cards)
    const l = listeners()
    const bow = (i: number) => ({ rotateY: (i - 1.5) * -5, z: -Math.abs(i - 1.5) * 26 })
    const mm = gsap.matchMedia()
    const ctx = gsap.context(() => {
      mm.add(LIVE, () => {
        gsap.set(cards, { transformPerspective: 1600, rotateX: 24, y: 80, opacity: 0, rotateY: 0 })
        ScrollTrigger.create({ trigger: row, start: 'top 82%', once: true, onEnter: () => cards.forEach((card, i) => gsap.to(card, { rotateX: 0, y: 0, opacity: 1, ...bow(i), duration: 1.3, delay: i * .12, ease: 'expo.out' })) })
        // the cursor tilt (shared handler) resets to flat; give the bow back on leave
        const lb = listeners()
        cards.forEach((card, i) => lb.on(card, 'pointerleave', () => gsap.to(card, { ...bow(i), rotateX: 0, duration: 1, ease: 'elastic.out(1,.5)' })))
        return lb.clear
      })
      mm.add(SHORT, () => { gsap.set(cards, { clearProps: 'all' }) })
      const belt = root.querySelector('#belt'), stripes = gsap.utils.toArray<HTMLElement>(root.querySelectorAll('#belt .belt__bar i'))
      mm.add('(min-width:1024px)', () => {
        if (motion) {
          gsap.set('#belt .belt__in', { xPercent: -100 })
          ScrollTrigger.create({ trigger: belt, start: 'top 96%', once: true, onEnter: () => {
            // the white belt arrives; each stripe it earns turns one card black, in order
            const tl = gsap.timeline().to('#belt .belt__in', { xPercent: 0, duration: 1.6, ease: 'expo.inOut' })
            stripes.forEach((st, i) => tl.to(st, { scaleY: 1, duration: .5, ease: 'back.out(2)' }, 1.25 + i * .22).add(() => cards[i]?.classList.add('on'), 1.25 + i * .22))
          } })
        } else { gsap.set('#belt .belt__bar i', { scaleY: 1 }); cards.forEach(card => card.classList.add('on')) }
      })
      // PHONES: the belt rides at the foot of the screen (sticky, mobile.css) while you read the four steps; each card
      // stands up as it arrives, and turns black as it crosses the middle, earning its stripe on the belt. Scroll back, it gives it back.
      mm.add(PHONE, () => {
        if (!motion) { gsap.set('#belt .belt__bar i', { scaleY: 1 }); cards.forEach(card => card.classList.add('on')); return }
        // every start state first, then the triggers (measured together, in the page's refresh)
        gsap.set('#belt .belt__in', { xPercent: -100 })
        gsap.set(cards, { transformPerspective: 1200, rotateX: 26, y: 64, autoAlpha: 0 })
        lateTrigger({ trigger: row, start: 'top 88%', once: true, onEnter: () => { gsap.to('#belt .belt__in', { xPercent: 0, duration: 1.4, ease: 'expo.inOut' }) } })
        const earn = (i: number, on: boolean) => { cards[i].classList.toggle('on', on); gsap.to(stripes[i], { scaleY: on ? 1 : 0, duration: on ? .5 : .3, ease: on ? 'back.out(2)' : 'power2.in', overwrite: true }) }
        cards.forEach((card, i) => {
          lateTrigger({ trigger: card, start: 'top 94%', once: true, onEnter: () => { gsap.to(card, { rotateX: 0, y: 0, autoAlpha: 1, duration: 1.1, ease: 'expo.out' }) } })
          lateTrigger({ trigger: card, start: 'center 58%', onEnter: () => earn(i, true), onLeaveBack: () => earn(i, false) })
        })
        return () => { cards.forEach(card => card.classList.remove('on')); gsap.set(stripes, { clearProps: 'transform' }) }
      })
      if (motion) gsap.fromTo(belt, { xPercent: 2 }, { xPercent: -3, ease: 'none', scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: .6 } })
    }, root)
    return () => { offTilt(); l.clear(); mm.revert(); ctx.revert(); cards.forEach(card => card.classList.remove('on')) }
  }, [])
  return (
    <section className="steps sec screen" id="day-one" aria-labelledby="day-t" ref={ref}>
      <div className="shell">
        <div className="head head--c">
          <div style={{ display: 'grid', justifyItems: 'center' }}>
            <Act a={c.act} />
            <h2 className="t t-2 d" id="day-t"><Lines lines={c.title} /></h2>
          </div>
        </div>
        <div className="steps__row" id="stepsRow">
          {c.cards.map(s => (
            <article className="step" data-tilt key={s.no}><span className="step__no">{s.no}</span><h3>{rich(s.h)}</h3><p>{s.p}</p><span className="step__t"><Ic id={s.icon} />{s.t}</span></article>
          ))}
        </div>
        <div className="steps__cta rv" data-delay="2">
          <a className="cta cta--pulse" href="#book" data-book>{c.cta}<Go /></a>
          <Call tel={site.tel} lead={c.call}>{site.phone}</Call>
        </div>
      </div>
      <div className="belt" id="belt" aria-hidden="true">
        <div className="belt__in"><span className="belt__txt">{c.belt}</span><span className="belt__bar"><i></i><i></i><i></i><i></i></span></div>
      </div>
    </section>
  )
}
