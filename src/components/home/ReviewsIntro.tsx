import { useLayoutEffect, useRef } from 'react'
import { reviewsIntro as c } from '../../content/home'
import { fine, gsap, listeners, motion, ScrollTrigger } from '../../motion/core'
import { Act } from '../shared/Act'
import { Ic } from '../shared/Cta'
import { Img } from '../shared/Img'
import { Lines } from '../shared/Rich'

/** ACT III · REVIEWS INTRO: two elliptical orbits (wide, never taller than the room); the people take their seats and keep turning. */
export function ReviewsIntro() {
  const ref = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    const rint = ref.current!, orbit = rint.querySelector<HTMLElement>('#orbit')!
    const cl = gsap.utils.clamp
    const l = listeners()
    // the two ellipses: wide across the room, never taller than it (so no tile is ever cut)
    // phones (< 1024): a tall pair of ellipses that runs along the edges of the screen, around the copy (mobile.css shows the orbit)
    const ph = () => innerWidth < 1024
    const lanes = [{ el: orbit.querySelector('.orbit__lane--1')!, rx: () => ph() ? innerWidth * .45 : cl(300, 470, innerWidth * .32), ry: () => ph() ? innerHeight * .35 : cl(220, 300, innerHeight * .32), speed: 360 / 80 },
                   { el: orbit.querySelector('.orbit__lane--2')!, rx: () => ph() ? innerWidth * .52 : cl(420, 640, innerWidth * .44), ry: () => ph() ? innerHeight * .43 : cl(290, 370, innerHeight * .40), speed: -360 / 120 }]
    let on = false
    // phones: the ellipse has to cross the band of the copy, so a face dims while it passes behind the words
    const copy = rint.querySelector<HTMLElement>('.rint__copy')!
    let band = { w: 0, h: 0 }
    // read when the room comes into view (and on resize), not at mount: no forced layout while the page boots
    const measure = () => { band = ph() ? { w: copy.offsetWidth / 2, h: copy.offsetHeight / 2 } : { w: 0, h: 0 } }
    l.on(window, 'resize', measure)
    const place = (t: number) => {
      lanes.forEach(lane => {
        const rx = lane.rx(), ry = lane.ry()
        lane.el.querySelectorAll<HTMLElement>('.orbit__seat').forEach(s => {
          const a = (parseFloat(s.style.getPropertyValue('--a')) + lane.speed * t) * Math.PI / 180
          const x = rx * Math.cos(a), y = ry * Math.sin(a)
          s.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0)`
          if (band.h) { const k = Math.max(cl(0, 1, (Math.abs(x) - band.w + 10) / 36), cl(0, 1, (Math.abs(y) - band.h + 10) / 36)); s.style.opacity = (.1 + .9 * k).toFixed(2) }
          else if (s.style.opacity) s.style.opacity = ''
        })
      })
    }
    const tick = (time: number) => { if (on) place(time) }
    const ctx = gsap.context(() => {
      place(0)
      ScrollTrigger.create({ trigger: rint, start: 'top 55%', once: true, onEnter: () => orbit.classList.add('in') })
      if (motion) { ScrollTrigger.create({ trigger: rint, start: 'top bottom', end: 'bottom top', onToggle: s => { on = s.isActive; if (on) measure() } }); gsap.ticker.add(tick) }
      if (fine && motion) l.on(rint, 'pointermove', (e: PointerEvent) => { const dx = e.clientX / innerWidth - .5, dy = e.clientY / innerHeight - .5; gsap.to(orbit, { x: dx * 40, y: dy * 24, duration: 1.4, ease: 'power3.out' }) })
    }, rint)
    return () => { gsap.ticker.remove(tick); l.clear(); ctx.revert() }
  }, [])
  return (
    <section className="rint" id="rint" aria-labelledby="ri-t" ref={ref}>
      <div className="rint__stage">
        <div className="orbit" id="orbit" aria-hidden="true">
          <i className="orbit__ring orbit__ring--4"></i><i className="orbit__ring orbit__ring--3"></i><i className="orbit__ring orbit__ring--2"></i><i className="orbit__ring orbit__ring--1"></i>
          {c.lanes.map((lane, i) => (
            <div className={`orbit__lane orbit__lane--${i + 1}`} key={i}>
              {lane.map(([face, a]) => <span className="orbit__seat" style={{ '--a': a }} key={face}><Img name={face} alt="" loading="lazy" /></span>)}
            </div>
          ))}
        </div>
        <div className="rint__copy">
          <Act a={c.act} style={{ justifyContent: 'center' }} />
          <h2 className="t t-2 d" id="ri-t"><Lines lines={c.title} /></h2>
          <p className="sub rv" data-delay="1" style={{ marginInline: 'auto', textAlign: 'center' }}>{c.sub}</p>
          <a className="ghost rv" data-delay="2" href="#reviews" style={{ marginTop: '22px' }}>{c.ghost}<span><Ic id="i-down" /></span></a>
        </div>
      </div>
    </section>
  )
}
