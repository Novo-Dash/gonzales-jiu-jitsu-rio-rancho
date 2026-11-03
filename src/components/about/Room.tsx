import { useLayoutEffect, useRef } from 'react'
import { room as c } from '../../content/about'
import { gsap, motion } from '../../motion/core'
import { Act } from '../shared/Act'
import { Img } from '../shared/Img'
import { Lines } from '../shared/Rich'

/** ABOUT · THE ROOM: two strips of film slide against each other with the scroll (pages.js ROOM). */
export function Room() {
  const ref = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    const root = ref.current!
    const ctx = gsap.context(() => {
      root.querySelectorAll<HTMLElement>('.film__strip').forEach(strip => {
        const row = strip.querySelector('.film__row'), dir = +strip.dataset.dir!
        if (motion) gsap.fromTo(row, { xPercent: dir < 0 ? 0 : -22 }, { xPercent: dir < 0 ? -22 : 0, ease: 'none', scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: .6 } })
      })
    }, root)
    return () => ctx.revert()
  }, [])
  return (
    <section className="room sec screen" id="room" aria-labelledby="ro-t" ref={ref}>
      <div className="shell">
        <div className="head">
          <div>
            <Act a={c.act} />
            <h2 className="t t-2 d" id="ro-t"><Lines lines={c.title} /></h2>
          </div>
          <blockquote className="room__q rv" data-delay="1">{c.quote}<cite>{c.cite}</cite></blockquote>
        </div>
      </div>
      <div className="film" aria-label={c.filmLabel}>
        {c.strips.map(s => (
          // the row is doubled, so the strip never runs out; the copy is decorative (empty alts)
          <div className="film__strip" data-dir={s.dir} key={s.dir}><div className="film__row">
            {s.photos.map(([p, alt]) => <Img name={p} alt={alt} loading="lazy" key={p} />)}
            {s.photos.map(([p]) => <Img name={p} alt="" loading="lazy" key={p + '-2'} />)}
          </div></div>
        ))}
      </div>
      <p className="room__src">{c.src}</p>
    </section>
  )
}
