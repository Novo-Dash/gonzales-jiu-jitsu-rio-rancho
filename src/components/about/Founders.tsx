import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { founders as c } from '../../content/about'
import { site } from '../../data/site'
import { gsap, motion, ScrollTrigger } from '../../motion/core'
import { Act } from '../shared/Act'
import { Go, Ic } from '../shared/Cta'
import { Img } from '../shared/Img'
import { Lines, rich } from '../shared/Rich'

/**
 * ABOUT · THE FOUNDERS (03/11): the BJJ Boston coach section, for the two Gonzales. The photo beside the
 * copy (Laura mirrored on desktop); the name tape is laid down and sewn on, the black belt bar slides in,
 * the photo unveils from the bottom.
 */
export function Founders() {
  const ref = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    const root = ref.current!
    const ctx = gsap.context(() => {
      root.querySelectorAll<HTMLElement>('.fd').forEach((fd, i) => {
        const belt = fd.querySelector('.fd__belt')
        ScrollTrigger.create({ trigger: fd, start: 'top 75%', once: true, onEnter: () => { setTimeout(() => belt?.classList.add('on'), i ? 100 : 0) } })
        if (motion) gsap.fromTo(fd.querySelector('.fd__photo img'), { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 1.4, ease: 'expo.inOut', scrollTrigger: { trigger: fd, start: 'top 75%', once: true } })
      })
    }, root)
    return () => ctx.revert()
  }, [])
  return (
    <section className="founders sec" id="founders" aria-labelledby="fo-t" ref={ref}>
      <div className="shell">
        <div className="head head--c">
          <div style={{ display: 'grid', justifyItems: 'center' }}>
            <Act a={c.act} />
            <h2 className="t t-2 d" id="fo-t"><Lines lines={c.title} /></h2>
          </div>
        </div>
      </div>
      {c.people.map((p, i) => (
        <div className={'shell fd' + (i % 2 ? ' fd--rev' : '')} key={p.id}>
          <figure className="fd__photo">
            <Img name={p.photo} alt={p.alt} loading="lazy" sizes="(max-width:979px) 92vw, 44vw" style={{ objectPosition: p.pos }} />
            <a href="/contact" data-book data-prog={p.prog || undefined} aria-label={p.cta}></a>
          </figure>
          <div className="fd__body">
            <p className="fd__role">{p.role}</p>
            <h3 className="t t-2 d fd__name"><Lines lines={[p.name]} /></h3>
            {p.belt
              ? <div className="fd__belt" role="img" aria-label={p.belt}><span className="fd__bar"></span></div>
              : <div className="fd__rule" aria-hidden="true"></div>}
            <p className="fd__cap">{p.cap.map(x => <span key={x}>{x}</span>)}</p>
            <p className="fd__bio">{p.bio}</p>
            {p.quote && <blockquote className="fd__q">{p.quote}<cite><a href={site.krqe} target="_blank" rel="noopener">{p.source}</a></cite></blockquote>}
            <div className="fd__stats">{p.stats.map(([b, s]) => <div key={s}><b>{b}</b><span>{s}</span></div>)}</div>
            <div className="fd__acts">
              <a className="cta cta--sm" href="/contact" data-book data-prog={p.prog || undefined}>{p.cta}<Go /></a>
              <a className="call" href={site.tel}><Ic id="i-phone" /><u>{site.phone}</u></a>
            </div>
          </div>
        </div>
      ))}
      <div className="shell">
        <p className="founders__foot rv">{rich(c.foot)} <Link className="founders__more" to="/instructors">{c.teamLink}</Link></p>
      </div>
    </section>
  )
}
