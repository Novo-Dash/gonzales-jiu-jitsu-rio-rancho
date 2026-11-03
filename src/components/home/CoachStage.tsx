import { useLayoutEffect, useRef } from 'react'
import { coachStage as c } from '../../content/home'
import { site } from '../../data/site'
import { gsap, motion } from '../../motion/core'
import { Act } from '../shared/Act'
import { Go, Ic } from '../shared/Cta'
import { Img } from '../shared/Img'
import { Lines, rich } from '../shared/Rich'

/**
 * ACT II · ON THE MAT (03/11): the Go Rin coach section, for Abie. His name and rank on the left, a short
 * summary and the booking on the right; below, Abie stands in the middle in front of his name, set in giant
 * type that drifts with the scroll.
 */
export function CoachStage() {
  const ref = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    const root = ref.current!, stage = root.querySelector<HTMLElement>('.cst__stage')!
    const ctx = gsap.context(() => {
      if (!motion) return
      gsap.fromTo('.cst__giant', { x: '3vw' }, { x: '-3vw', ease: 'none', scrollTrigger: { trigger: stage, start: 'top bottom', end: 'bottom top', scrub: true } })
      gsap.fromTo('.cst__cut', { y: 90, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.6, ease: 'expo.out', scrollTrigger: { trigger: stage, start: 'top 72%', once: true } })
    }, root)
    return () => ctx.revert()
  }, [])
  return (
    <section className="cst" id="on-the-mat" aria-labelledby="cst-t" ref={ref}>
      <div className="shell cst__head">
        <div>
          <Act a={c.act} />
          <h2 className="t t-2 d cst__t" id="cst-t"><Lines lines={c.title} /></h2>
          <p className="cst__rank rv" data-delay="1">{c.rank}</p>
        </div>
        <div className="cst__side">
          <p className="cst__body rv" data-delay="1">{rich(c.bio)}</p>
          <div className="cst__acts rv" data-delay="2">
            <a className="cta cta--sm" href="#book" data-book>{c.cta}<Go /></a>
            <a className="call" href={site.instagram} target="_blank" rel="noopener"><Ic id="i-ig" /><u>{site.instagramHandle}</u></a>
          </div>
        </div>
      </div>
      <div className="cst__stage">
        <span className="cst__ring cst__ring--l" aria-hidden="true"></span><span className="cst__ring cst__ring--r" aria-hidden="true"></span>
        <p className="cst__giant" aria-hidden="true">{c.first}<em>{c.last}</em></p>
        <Img name="abie-cut" alt={c.cutAlt} className="cst__cut" sizes="(min-width:1024px) 600px, 340px" />
      </div>
    </section>
  )
}
