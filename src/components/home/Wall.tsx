import { useLayoutEffect, useRef } from 'react'
import { wall as c } from '../../content/home'
import { gsap, lateTrigger, LIVE, motion, SCENE, ScrollTrigger } from '../../motion/core'
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
      // PHONES: the same sideways walk on a sticky stage (mobile.css sizes the section from the same numbers, so
      // nothing is written to the layout here). The walk is read from untransformed offsets only: no forced
      // layout while you scroll, one finger of scroll moves the row about one finger sideways.
      mm.add(SCENE, () => {
        if (!motion) return
        const track = root.querySelector<HTMLElement>('#wallTrack')!, doors = gsap.utils.toArray<HTMLElement>(root.querySelectorAll('.wdoor'))
        const inns = doors.map(d => d.querySelector<HTMLElement>('.wdoor__in')!)
        let D = 0, centers: number[] = []
        const measure = () => {
          const last = doors[doors.length - 1]
          D = Math.max(0, last.offsetLeft + last.offsetWidth + parseFloat(getComputedStyle(track).paddingRight) - innerWidth, last.offsetLeft + last.offsetWidth / 2 - innerWidth * .55)
          centers = doors.map(d => d.offsetLeft + d.offsetWidth / 2)
        }
        const walk = (progress: number) => {
          // the intro holds for a beat, the walk takes the next 82% of the scroll, the last card holds before the room moves on
          const x = -gsap.utils.clamp(0, 1, (progress - .06) / .82) * D; track.style.transform = `translate3d(${x}px,0,0)`
          doors.forEach((d, i) => {
            const p = gsap.utils.clamp(0, 1, (innerWidth * 1.05 - (centers[i] + x)) / (innerWidth * .5))
            gsap.set(d, { y: (1 - p) * 50, scale: 1 - (1 - p) * .08 })
            inns[i].style.transform = `translateY(${(1 - p) * 30}px)`; inns[i].style.opacity = (.2 + .8 * p).toFixed(2)
          })
        }
        // measured and placed in the page's refresh (the layout is fresh then), walked on every scroll after it
        const st = lateTrigger({
          trigger: root, start: 'top top', end: 'bottom bottom',
          onRefresh: s => { measure(); walk(s.progress) }, onUpdate: s => walk(s.progress),
        })
        return () => { track.style.transform = ''; doors.forEach((d, i) => { gsap.set(d, { clearProps: 'transform' }); inns[i].style.transform = ''; inns[i].style.opacity = '' }); st.kill() }
      })
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
    </section>
  )
}
