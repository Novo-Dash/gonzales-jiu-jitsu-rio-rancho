import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { footer } from '../../content/shared'
import { site } from '../../data/site'
import { gsap, listeners, motion, ScrollTrigger } from '../../motion/core'
import { Go, Ic } from '../shared/Cta'
import { Img } from '../shared/Img'
import { Lines } from '../shared/Rich'

/** CLOSE + FOOTER: the mat, on video. The video eases in, the card floats up, the type lands in order (core.js FOOTER). */
export function Footer() {
  const ref = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    const foot = ref.current!, card = foot.querySelector<HTMLElement>('#footCard')!, vid = foot.querySelector<HTMLVideoElement>('#footVideo')!
    const l = listeners()
    const ctx = gsap.context(() => {
      // the file (480 KB) and its poster load when the footer is near, not with the hero (PRD 15)
      const load = () => { if (vid.dataset.src) { vid.poster = vid.dataset.poster!; vid.src = vid.dataset.src; delete vid.dataset.src } }
      const near = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) { load(); near.disconnect() } }, { rootMargin: '1200px 0px' })
      near.observe(foot); l.add(() => near.disconnect())
      vid.muted = true
      const play = () => { if (vid.src && vid.paused) vid.play().catch(() => {}) }
      play(); l.on(vid, 'loadedmetadata', play); l.on(vid, 'canplay', play)
      ;['pointerdown', 'touchstart', 'keydown', 'wheel', 'scroll'].forEach(ev => l.on(window, ev, play, { passive: true }))
      ScrollTrigger.create({ trigger: foot, start: 'top bottom', end: 'bottom top', onEnter: play, onEnterBack: play })
      if (motion) {
        gsap.set(card, { y: 90, opacity: 0 })
        gsap.set(card.querySelectorAll('.fc'), { y: 28, opacity: 0 })
        ScrollTrigger.create({ trigger: card, start: 'top 92%', once: true, onEnter: () => {
          const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
          tl.to(card, { y: 0, opacity: 1, duration: 1.4 }, 0)
            .to(card.querySelectorAll('.fc'), { y: 0, opacity: 1, duration: 1.1, stagger: 0.09 }, 0.25)
            .add(() => { gsap.to(card, { y: -7, duration: 3.2, ease: 'sine.inOut', yoyo: true, repeat: -1 }) })
        } })
        // the video itself drifts slowly; a slow camera push on top makes the floor breathe even on a still frame
        gsap.fromTo(vid, { scale: 1 }, { scale: 1.07, duration: 16, ease: 'sine.inOut', yoyo: true, repeat: -1 })
      }
    }, foot)
    return () => { l.clear(); ctx.revert() }
  }, [])
  return (
    <footer className="foot" id="contact" ref={ref}>
      <div className="shell foot__close" id="book-cta">
        <p className="label rv" style={{ margin: '0' }}>{footer.area}</p>
        <h2 className="t t-2 d" id="cl-t"><Lines lines={footer.title} /></h2>
        <div className="foot__row rv" data-delay="1">
          <a className="cta cta--pulse" href="#book" data-book>{footer.cta}<Go /></a>
          <a className="call" href={site.tel}><Ic id="i-phone" /><u>{site.phone}</u></a>
        </div>
      </div>
      <div className="shell foot__wrap">
        <div className="foot__card" id="footCard">
          <div className="foot__grid">
            <div className="foot__brand fc">
              <Img name="logo-white" alt={footer.logoAlt} loading="lazy" sizes="140px" />
              <p className="foot__about">{footer.about}</p>
              <div className="foot__social">
                <a href={site.instagram} target="_blank" rel="noopener" aria-label={footer.social.instagram}><Ic id="i-ig" style={{ strokeWidth: '1.8' }} /></a>
                <a href={site.website} target="_blank" rel="noopener" aria-label={footer.social.website}><Ic id="i-out" style={{ strokeWidth: '1.8' }} /></a>
                <a href={`mailto:${site.email}`} aria-label={footer.social.email}><Ic id="i-mail" style={{ strokeWidth: '1.8' }} /></a>
              </div>
            </div>
            <nav className="foot__col fc" aria-label={footer.academy.title}><p className="foot__h">{footer.academy.title}</p><ul className="foot__links">
              {footer.academy.links.map(a => <li key={a.to}><Link to={a.to}>{a.label}</Link></li>)}
              <li><a href="#book" data-book>{footer.academy.book}</a></li>
              <li><a href={site.students} target="_blank" rel="noopener">{footer.academy.students}</a></li>
            </ul></nav>
            <div className="foot__col fc"><p className="foot__h">{footer.programs.title}</p><ul className="foot__links">
              {footer.programs.items.map(p => <li key={p.label}><button type="button" data-book data-prog={p.prog}>{p.label}{p.note && <span>{p.note}</span>}</button></li>)}
            </ul></div>
            <div className="foot__col fc" id="visit"><p className="foot__h">{footer.visit.title}</p><ul className="foot__visit">
              <li><Ic id="i-pin" /><span>{footer.visit.address[0]}<br />{footer.visit.address[1]}</span></li>
              <li><Ic id="i-phone" /><a href={site.tel}>{site.phone}</a></li>
              <li><Ic id="i-clock" /><span>{footer.visit.hours[0]}<br />{footer.visit.hours[1]}</span></li>
              <li><a className="foot__dir" href={site.directions} target="_blank" rel="noopener">{footer.visit.directions}<Ic id="i-arrow" /></a></li>
            </ul></div>
          </div>
          <div className="foot__base fc"><p>© <span id="yr" suppressHydrationWarning>{new Date().getFullYear()}</span>{footer.base.copy}</p><p>{footer.base.madeBy}<a href={site.novodash} target="_blank" rel="noopener">{footer.base.novo}</a></p></div>
        </div>
      </div>
      <div className="foot__band" aria-hidden="true">
        <video className="foot__video" id="footVideo" muted loop playsInline preload="metadata" data-poster="/img/footer-poster.webp" data-src="/img/footer.mp4"></video>
        <div className="foot__fade"></div>
      </div>
    </footer>
  )
}
