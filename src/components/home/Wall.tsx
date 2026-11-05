import { useLayoutEffect, useRef } from 'react'
import { wall as c } from '../../content/home'
import { gsap, LIVE, motion, ScrollTrigger } from '../../motion/core'
import { tilt } from '../../motion/useTilt'
import { Act } from '../shared/Act'
import { Ic } from '../shared/Cta'
import { Img } from '../shared/Img'
import { Lines, rich } from '../shared/Rich'

/** ACT I · THE WALL: walk sideways; each card rises as it reaches you (home.js WALL). */
export function Wall() {
  const ref = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    const root = ref.current!
    const offTilt = tilt(root.querySelectorAll('.wdoor'))
    const mm = gsap.matchMedia()
    const ctx = gsap.context(() => {
      mm.add(LIVE, () => {
        if (!motion) return
        const track = root.querySelector<HTMLElement>('#wallTrack')!, doors = gsap.utils.toArray<HTMLElement>(root.querySelectorAll('.wdoor'))
        // the walk distance is measured once per refresh with the cards untransformed: their scale/rise
        // changes the track's scrollWidth every frame, and measuring live made the walk jump
        let D = 0
        const measure = () => { const keep = track.style.transform; track.style.transform = ''; gsap.set(doors, { clearProps: 'transform' }); const last = doors[doors.length - 1]
          // the walk goes on until the last card's centre reaches 55% of the screen, where it is fully lit (03/11:
          // the cards got shorter and the track no longer carried the third one that far)
          D = Math.max(track.scrollWidth - innerWidth, last.offsetLeft + last.offsetWidth / 2 - innerWidth * .55); track.style.transform = keep }
        measure()
        const st = ScrollTrigger.create({
          trigger: root.querySelector('#wallPin'), start: 'top top', end: () => '+=' + (D + innerHeight * .4), pin: true, scrub: .6, anticipatePin: 1, invalidateOnRefresh: true,
          onRefreshInit: measure,
          onUpdate: s => {
            const x = -s.progress * D; track.style.transform = `translate3d(${x}px,0,0)`
            doors.forEach(d => {
              const r = d.getBoundingClientRect(); const cx = r.left + r.width / 2
              const p = gsap.utils.clamp(0, 1, (innerWidth * 1.05 - cx) / (innerWidth * .5))
              gsap.set(d, { y: (1 - p) * 70, scale: 1 - (1 - p) * .06 })
              const inn = d.querySelector<HTMLElement>('.wdoor__in')!; inn.style.transform = `translateY(${(1 - p) * 40}px)`; inn.style.opacity = (.2 + .8 * p).toFixed(2)
            })
          },
        })
        return () => { track.style.transform = ''; st.kill() }
      })
      // PHONES (05/11, Adryan): no scroll scene; the cards are a row you swipe sideways, like the drawings further
      // down (Kids). Native scroll with snap, all in CSS (additions.css · Home · programs on phones)
    }, root)
    return () => { offTilt(); mm.revert(); ctx.revert() }
  }, [])
  return (
    <section className="wall" id="programs" aria-labelledby="pr-t" ref={ref}>
      <div className="wall__pin" id="wallPin">
        <div className="wall__track" id="wallTrack">
          <div className="wall__intro">
            <Act a={c.act} />
            <h2 className="t t-2 d" id="pr-t"><Lines lines={c.title} /></h2>
            <p className="sub rv" data-delay="1" style={{ maxWidth: 'none' }}>{rich(c.sub)}</p>
          </div>
          {/* display:contents on desktop (the cards stay flex items of the walking track); the swipe row on phones */}
          <div className="wall__row">
          {c.doors.map(d => (
            <a className="wdoor" href="#book" data-book data-prog={d.prog} key={d.prog}>
              <div className="wdoor__photo"><Img name={d.photo} alt={d.alt} loading="lazy" sizes="(max-width:1023px) 92vw, 30vw" /></div>
              <div className="wdoor__top"><span className="wdoor__no">{d.no}</span><span className="wdoor__age">{d.age}</span></div>
              <div className="wdoor__in">
                <div className="wdoor__text">
                  <h3 className="wdoor__name">{d.name}</h3>
                  <ul className="wdoor__meta">{d.meta.map(m => <li key={m}>{m}</li>)}</ul>
                </div>
                <span className="wdoor__go" aria-label={c.go}><Ic id="i-arrow" /></span>
              </div>
            </a>
          ))}
          </div>
        </div>
      </div>
    </section>
  )
}
