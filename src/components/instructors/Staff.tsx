import { useLayoutEffect, useRef } from 'react'
import { staff as c } from '../../content/instructors'
import { gsap, motion, ScrollTrigger } from '../../motion/core'
import { Act } from '../shared/Act'
import { Img } from '../shared/Img'
import { Lines } from '../shared/Rich'

/**
 * INSTRUCTORS · THE STAFF (03/11, the Fight Sports /instructors pattern): every coach on ink, two to a row,
 * the portrait beside the name and the role, no bio (Adryan, 03/11), mirrored column to column. Each one arrives as the
 * passport's photo does: the portrait unveils from the bottom, then the copy rises line by line.
 */
export function Staff() {
  const ref = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    const root = ref.current!
    if (!motion) return
    const ctx = gsap.context(() => {
      root.querySelectorAll<HTMLElement>('.inst').forEach(item => {
        const tl = gsap.timeline({ paused: true })
        tl.fromTo(item.querySelector('.inst__photo img'), { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'expo.inOut' }, 0)
        tl.fromTo(item.querySelectorAll('.inst__body > *'), { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'expo.out', stagger: .08 }, .35)
        ScrollTrigger.create({ trigger: item, start: 'top 85%', once: true, onEnter: () => tl.play() })
      })
    }, root)
    return () => ctx.revert()
  }, [])
  return (
    <section className="insts sec" id="staff" aria-labelledby="staff-t" ref={ref}>
      <div className="shell">
        <div className="head head--c">
          <div style={{ display: 'grid', justifyItems: 'center' }}>
            <Act a={c.act} />
            <h2 className="t t-2 d insts__t" id="staff-t"><Lines lines={c.title} /></h2>
          </div>
        </div>
        <ul className="insts__grid">
          {c.people.map(p => (
            <li className="inst" key={p.id}>
              <div className="inst__photo"><Img name={p.photo} alt={p.alt} loading="lazy" sizes="(max-width:1023px) 76vw, 22vw" style={{ objectPosition: p.pos }} /></div>
              <div className="inst__body">
                <h3>{p.name}</h3>
                <span className="inst__role">{p.role}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
