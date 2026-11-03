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
 * summary and the booking on the right; below, Abie (a cut-out) stands on the section's bottom edge in front
 * of the academy's crest, which rises with the scroll; the photo has no entrance (03/11).
 */
export function CoachStage() {
  const ref = useRef<HTMLElement>(null)
  // the crest rises behind him with the scroll (the photo has no entrance: it is just there)
  useLayoutEffect(() => {
    const root = ref.current!
    if (!motion) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.cst__logo', { y: 140, scale: .92 }, { y: -110, scale: 1.04, ease: 'none', scrollTrigger: { trigger: root.querySelector('.cst__stage'), start: 'top bottom', end: 'bottom top', scrub: true } })
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
        {/* the academy's crest behind him (03/11, in place of the name in giant type); he stands on the bottom edge */}
        <Img name="logo-ink" alt="" aria-hidden="true" className="cst__logo" sizes="(min-width:1024px) 900px, 90vw" loading="lazy" decoding="async" />
        <i className="cst__floor" aria-hidden="true"></i>
        <img src="/img/competition/coach.webp" width="741" height="1351" alt={c.cutAlt} className="cst__cut" loading="lazy" decoding="async" />
      </div>
    </section>
  )
}
