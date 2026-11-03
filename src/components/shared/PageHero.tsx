import { useLayoutEffect, useRef, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { crumbs } from '../../content/shared'
import { gsap, motion } from '../../motion/core'
import { Img } from './Img'
import { Lines } from './Rich'

type Props = { id: string; crumb: string; kick: string; h1: string[]; lead: string; cta?: ReactNode; micro: string[]; img: { name: string; alt: string; pos: string } }

const Chevron = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9 6 6 6-6 6" /></svg>

/**
 * PAGE HERO (03/11): the Fight Sports /site2 inner-page opening, in this site's black and white. The photo
 * in a rounded ink card inside the paper, the copy on the dark side of a long gradient: breadcrumb pill,
 * eyebrow, title, lead, the booking button with the phone, one quiet line of facts. The lines reveal as the
 * rest of the site does (.d / .rv). On scroll the card opens to the edges, the photo pushes in and darkens,
 * the copy recedes; clip-path and transforms only, so it costs the same on a phone.
 */
export function PageHero({ id, crumb, kick, h1, lead, cta, micro, img }: Props) {
  const ref = useRef<HTMLElement>(null)
  // the title keeps its lines unbroken on desktop: the font shrinks just enough for the longest line to fit the
  // copy column (03/11: "Coaches who are" ran past it and was cut by the line mask)
  useLayoutEffect(() => {
    const h1 = ref.current!.querySelector<HTMLElement>('.pghero__h1')!
    const fit = () => {
      h1.style.removeProperty('font-size')
      if (!matchMedia('(min-width:1024px)').matches) return
      const avail = h1.clientWidth
      const widest = Math.max(...[...h1.querySelectorAll<HTMLElement>('.ln > span')].map(s => s.scrollWidth))
      if (widest > avail) h1.style.fontSize = `${(parseFloat(getComputedStyle(h1).fontSize) * avail) / widest - 1}px`
    }
    fit(); document.fonts?.ready.then(fit)
    addEventListener('resize', fit)
    return () => removeEventListener('resize', fit)
  }, [h1])
  useLayoutEffect(() => {
    const h = ref.current!
    if (!motion) return
    const ctx = gsap.context(() => {
      const card = h.querySelector<HTMLElement>('.pghero__card')!
      const tl = gsap.timeline({ scrollTrigger: { trigger: h, start: 'top top', end: 'bottom top', scrub: .5, invalidateOnRefresh: true } })
      tl.fromTo(card, { '--open': 0 }, { '--open': 1, ease: 'power2.out', duration: .6 }, 0)
        .fromTo(h.querySelector('.pghero__bg img'), { scale: 1.06 }, { scale: 1.18, ease: 'none', duration: 1 }, 0)
        .fromTo(h.querySelector('.pghero__dim'), { opacity: 0 }, { opacity: .45, ease: 'none', duration: 1 }, 0)
        .to(h.querySelector('.pghero__in'), { y: -70, autoAlpha: 0, ease: 'power1.in', duration: .5 }, 0)
    }, h)
    return () => ctx.revert()
  }, [])
  return (
    <header className="pghero" id="top" aria-labelledby={id} ref={ref}>
      <div className="pghero__card">
        <div className="pghero__bg" aria-hidden="true"><Img name={img.name} alt="" fetchPriority="high" sizes="100vw" style={{ objectPosition: img.pos, transformOrigin: img.pos }} /><i className="pghero__dim"></i></div>
        <div className="shell pghero__copy">
          <div className="pghero__in">
            <nav className="pghero__crumbs rv" aria-label={crumbs.label}><Link to="/">{crumbs.home}</Link><Chevron /><span aria-current="page">{crumb}</span></nav>
            <p className="pghero__kick rv">{kick}</p>
            <h1 className="t t-1 d pghero__h1" id={id}><Lines lines={h1} /></h1>
            <p className="pghero__lead rv" data-delay="1">{lead}</p>
            {cta && <div className="pghero__cta rv" data-delay="2">{cta}</div>}
            <ul className="pghero__facts rv" data-delay={cta ? '3' : '2'}>{micro.map(m => <li key={m}>{m}</li>)}</ul>
          </div>
        </div>
      </div>
    </header>
  )
}
