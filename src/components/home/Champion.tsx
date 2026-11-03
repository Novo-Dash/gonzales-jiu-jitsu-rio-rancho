import { useLayoutEffect, useRef } from 'react'
import { champion as c } from '../../content/home'
import { site } from '../../data/site'
import { gsap, lateTrigger, LIVE, motion, PHONE, ScrollTrigger } from '../../motion/core'
import { Act } from '../shared/Act'
import { Go, Ic } from '../shared/Cta'
import { Img } from '../shared/Img'
import { Lines, rich } from '../shared/Rich'
import { PassStamps } from './PassStamps'

/** ACT II · THE CHAMPION: the passport lands on the table, the photo develops, the stamps are pressed one by one (home.js CHAMPION). */
// `more`: on /instructors the passport ends with "Meet the full staff", gliding to the staff below (03/11)
export function Champion({ more }: { more?: { label: string; href: string } } = {}) {
  const ref = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    const root = ref.current!
    const mm = gsap.matchMedia()
    const ctx = gsap.context(() => {
      const pass = root.querySelector('#pass')!, stamps = gsap.utils.toArray<HTMLElement>(root.querySelectorAll('#pstamps .pstamp')), photo = root.querySelector('#pass .pass__photo > img:first-child')
      if (!motion) { gsap.set(pass, { autoAlpha: 1 }) }
      else {
        gsap.set(stamps, { autoAlpha: 0, scale: 1.9 })
        mm.add('(min-width:1024px)', () => {
          ScrollTrigger.create({ trigger: pass, start: 'top 82%', once: true, onEnter: () => {
            const tl = gsap.timeline()
            tl.fromTo(pass, { rotateX: 24, y: 60, rotateZ: -1.5, autoAlpha: 0 }, { rotateX: 8, y: 0, rotateZ: -1.5, autoAlpha: 1, duration: 1.1, ease: 'expo.out', transformPerspective: 1800, transformOrigin: '50% 100%' }, 0)
              .fromTo(photo, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'expo.inOut' }, .2)
            stamps.forEach((st, k) => tl.to(st, { autoAlpha: .86, scale: 1, duration: .2, ease: 'power4.in' }, .9 + k * .3).to(pass, { y: 3, duration: .07, yoyo: true, repeat: 1 }, '<+.18'))
          } })
        })
        // PHONES: the passport is taller than the screen, so its two pages play on their own cues: it lands and the
        // photo develops; the stamps page swings open from the fold as it comes up (one column), then the stamps
        // are pressed where you can see them
        mm.add(PHONE, () => {
          const page2 = root.querySelector<HTMLElement>('.pass__page--stamps')!
          gsap.set(pass, { autoAlpha: 0 })
          lateTrigger({ trigger: pass, start: 'top 88%', once: true, onEnter: () => {
            gsap.timeline()
              .fromTo(pass, { rotateX: 24, y: 70, rotateZ: -1.5, autoAlpha: 0 }, { rotateX: 4, y: 0, rotateZ: -1, autoAlpha: 1, duration: 1.1, ease: 'expo.out', transformPerspective: 1600, transformOrigin: '50% 100%' }, 0)
              .fromTo(photo, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'expo.inOut' }, .25)
          } })
          const inner = gsap.matchMedia()
          inner.add('(max-width:620px)', () => {
            gsap.timeline({ scrollTrigger: { trigger: page2, start: 'top 98%', end: 'top 58%', scrub: .5 } })
              .fromTo(page2, { rotateX: -70, transformPerspective: 1100, transformOrigin: '50% 0%' }, { rotateX: 0, ease: 'power2.out' })
          })
          lateTrigger({ trigger: root.querySelector('#pstamps'), start: 'top 62%', once: true, onEnter: () => {
            const tl = gsap.timeline()
            stamps.forEach((st, k) => tl.to(st, { autoAlpha: .86, scale: 1, duration: .2, ease: 'power4.in' }, .1 + k * .3).to(page2, { y: 3, duration: .07, yoyo: true, repeat: 1 }, '<+.18'))
          } })
          return () => inner.revert()
        })
        mm.add(LIVE, () => { gsap.fromTo(pass, { rotateX: 10 }, { rotateX: 5, ease: 'none', scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: 1 } }) })
      }
    }, root)
    return () => { mm.revert(); ctx.revert() }
  }, [])
  const p = c.pass
  return (
    <section className="owner sec screen" id="act2" aria-labelledby="coach-t" ref={ref}>
      <div className="shell owner__in">
        <div className="pass" id="pass">
          <div className="pass__page">
            <div className="pass__hd"><span>{p.hd[0]}</span><span>{p.hd[1]}</span></div>
            <div className="pass__id">
              <div className="pass__photo"><Img name="abie" alt={p.photoAlt} loading="lazy" sizes="(max-width:1023px) 45vw, 240px" /><Img className="pass__crest" name="logo-white" alt="" loading="lazy" sizes="120px" /></div>
              <dl>
                {p.rows.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
              </dl>
            </div>
            <p className="pass__mrz" aria-hidden="true"><span>{p.mrz[0]}</span><span>{p.mrz[1]}</span></p>
          </div>
          <div className="pass__page pass__page--stamps">
            <div className="pass__hd"><span>{p.hd2[0]}</span><span>{p.hd2[1]}</span></div>
            <div className="pstamps" id="pstamps" role="img" aria-label={p.stampsLabel}>
              <PassStamps />
            </div>
          </div>
        </div>
        <div className="owner__copy">
          <Act a={c.act} />
          <h2 className="t t-2 d" id="coach-t"><Lines lines={c.title} /></h2>
          {c.body.map((b, i) => <p className="owner__body rv" data-delay={String(i + 1)} key={i}>{rich(b)}</p>)}
          <div className="owner__acts rv" data-delay="3">
            <a className="cta cta--sm" href="#book" data-book>{c.cta}<Go /></a>
            {more ? <a className="ghost" href={more.href}>{more.label}<span><Ic id="i-down" /></span></a> : <a className="call" href={site.tel}><Ic id="i-phone" /><u>{site.phone}</u></a>}
          </div>
        </div>
      </div>
    </section>
  )
}
