import { useLayoutEffect, useRef } from 'react'
import { served as c } from '../../content/home'
import { site } from '../../data/site'
import { gsap, motion } from '../../motion/core'
import { tilt } from '../../motion/useTilt'
import { Act } from '../shared/Act'
import { Ic } from '../shared/Cta'
import { Img } from '../shared/Img'
import { Lines } from '../shared/Rich'

/**
 * ACT III · SERVED (03/11): two cards side by side, each a full photograph (folded flags for the veterans,
 * firefighters in the smoke for One Pass) with the copy on a dark gradient at the foot. The flag behind the
 * section drifts; each photo eases back as its card crosses the screen.
 */
export function Served() {
  const ref = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    const root = ref.current!
    const offTilt = tilt(root.querySelectorAll('[data-tilt]'))
    const ctx = gsap.context(() => {
      if (!motion) return
      gsap.to('#serveBg', { yPercent: 12, ease: 'none', scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: true } })
      root.querySelectorAll('.scard').forEach(card => gsap.fromTo(card.querySelector('.scard__photo img'), { scale: 1.18 }, { scale: 1.02, ease: 'none', scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: .6 } }))
    }, root)
    return () => { offTilt(); ctx.revert() }
  }, [])
  const cards = [
    { k: 'boots', d: c.boots, photo: 'serve-vets', alt: 'Service members in white gloves holding folded American flags', pos: '40% 50%', href: site.weDefy, ext: true, icon: 'i-out' },
    { k: 'fire', d: c.fire, photo: 'serve-fire', alt: 'Two firefighters in helmets and breathing masks in the smoke', pos: '50% 40%', href: '#book', ext: false, icon: 'i-arrow' },
  ]
  return (
    <section className="serve sec screen" id="act3" aria-labelledby="sv-t" ref={ref}>
      <div className="serve__bg" id="serveBg" aria-hidden="true"><Img name="flag" alt="" loading="lazy" sizes="100vw" /></div>
      <div className="shell">
        <div className="head head--c">
          <div style={{ display: 'grid', justifyItems: 'center' }}>
            <Act a={c.act} />
            <h2 className="t t-2 d" id="sv-t"><Lines lines={c.title} /></h2>
            <p className="sub rv" data-delay="1" style={{ textAlign: 'center', marginInline: 'auto', maxWidth: '40ch' }}>{c.sub}</p>
          </div>
        </div>
        <div className="serve__grid">
          {cards.map(({ k, d, photo, alt, pos, href, ext, icon }, i) => (
            <article className={`scard scard--${k} rv`} data-delay={i ? '1' : undefined} data-tilt key={k}>
              <div className="scard__photo"><Img name={photo} alt={alt} loading="lazy" sizes="(max-width:899px) 92vw, 46vw" style={{ objectPosition: pos }} /></div>
              <div className="scard__body">
                <span className="scard__k">{d.k}</span>
                <h3>{d.h}</h3><p>{d.p}</p>
                {ext
                  ? <a href={href} target="_blank" rel="noopener"><i><Ic id={icon} /></i>{d.link}</a>
                  : <a href={href} data-book><i><Ic id={icon} /></i>{d.link}</a>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
