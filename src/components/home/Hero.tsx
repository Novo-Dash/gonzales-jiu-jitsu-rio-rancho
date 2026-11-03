import { useLayoutEffect, useRef } from 'react'
import { hero as c } from '../../content/home'
import { gsap, LIVE, motion, SCENE, SHORT } from '../../motion/core'
import { Go } from '../shared/Cta'
import { Img } from '../shared/Img'
import { Lines } from '../shared/Rich'

/** HERO: the doorway opens into the whole screen, then the three words of the crest (home.js HERO). */
export function Hero() {
  const ref = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    const hero = ref.current!
    const mm = gsap.matchMedia()
    // the video (03/11): loaded the first time the scroll gets near it, playing only while it is on screen
    const box = hero.querySelector<HTMLElement>('#heroVideo')!, vid = box.querySelector('video')!
    const snd = box.querySelector<HTMLButtonElement>('.hero__sound')!
    const video = (shown: boolean) => {
      if (shown && !vid.src) { vid.src = vid.dataset.src!; vid.load() }
      if (shown && vid.paused) vid.play().catch(() => {})
      if (!shown && !vid.paused) vid.pause()
    }
    const toggleSound = () => { vid.muted = !vid.muted; snd.setAttribute('aria-pressed', String(!vid.muted)); snd.querySelector('span')!.textContent = vid.muted ? snd.dataset.on! : snd.dataset.off!; if (!vid.muted) vid.play().catch(() => {}) }
    snd.addEventListener('click', toggleSound)
    const ctx = gsap.context(() => {
      mm.add(LIVE, () => {
        if (!motion) return
        hero.classList.add('is-live')
        const bg = hero.querySelector<HTMLElement>('#heroBg')!, stage = hero.querySelector<HTMLElement>('.hero__stage')!
        const stamps = gsap.utils.toArray<HTMLElement>(hero.querySelectorAll('#stamps .stamp'))
        const aw = () => Math.min(1240, innerWidth - 32) + 'px'
        bg.style.setProperty('--aw', aw())
        const tl = gsap.timeline({ scrollTrigger: { trigger: hero.querySelector('#heroPin'), start: 'top top', end: () => '+=' + innerHeight * 2.7, pin: true, scrub: 0.6, anticipatePin: 1, invalidateOnRefresh: true, onUpdate: st => { bg.classList.toggle('is-full', st.progress > .35); video(st.progress > .6) } } })
        tl.fromTo(bg, { '--ay': '60svh', '--aw': aw, '--ah': '46svh', '--ar': '999px 999px 0px 0px' }, { '--ay': '0svh', '--aw': () => stage.clientWidth + 'px', '--ah': '100svh', '--ar': '0px 0px 0px 0px', ease: 'power2.inOut', duration: .55, immediateRender: true }, 0)
          .to('#heroBg img', { scale: 1.12, ease: 'none', duration: 1 }, 0)
          .fromTo('#heroDim', { opacity: 0 }, { opacity: .68, ease: 'power1.in', duration: .45 }, 0)   // dark before the crest words land (they start at .42); no photo repaint
          .to('#heroCopy', { autoAlpha: 0, y: -30, ease: 'power2.in', duration: .25 }, 0)
          .to('#heroVeil', { opacity: 0, duration: .3 }, .1)
          .to('#heroFade', { opacity: 1, duration: .35, ease: 'power1.in' }, .3)
        stamps.forEach((s, i) => tl.to(s, { opacity: 1, y: 0, ease: 'power3.out', duration: .16 }, .42 + i * .16))
        tl.to('.stamps__line', { opacity: 1, duration: .15 }, .9)
        // then the words leave and Abie's video comes in (03/11)
        tl.to('#stamps', { autoAlpha: 0, y: -40, duration: .16, ease: 'power2.in' }, 1.15)
          .fromTo('#heroVideo', { autoAlpha: 0, scale: .92 }, { autoAlpha: 1, scale: 1, duration: .22, ease: 'power2.out' }, 1.25)
          .to({}, { duration: .2 }, 1.47)
        return () => { hero.classList.remove('is-live'); video(false) }
      })
      // PHONES: the same story on a sticky stage (mobile.css): the doorway under the copy rises and opens
      // to the whole screen, the photo darkens, then the three words of the crest are stamped in
      mm.add(SCENE, () => {
        if (!motion) { gsap.set('#stamps', { display: 'none' }); return }
        const bg = hero.querySelector<HTMLElement>('#heroBg')!, stage = hero.querySelector<HTMLElement>('.hero__stage')!, copy = hero.querySelector<HTMLElement>('#heroCopy')!
        const stamps = gsap.utils.toArray<HTMLElement>(hero.querySelectorAll('#stamps .stamp'))
        // the doorway's place in the stacked layout (right under the copy), from layout values, never from its own inline size
        const w0 = () => stage.clientWidth - 2 * parseFloat(getComputedStyle(copy).paddingLeft)
        const tl = gsap.timeline({ scrollTrigger: { trigger: hero.querySelector('#heroPin'), start: 'top top', end: 'bottom bottom', scrub: .5, invalidateOnRefresh: true, onUpdate: st => video(st.progress > .62) } })
        tl.fromTo(bg, { y: 0, width: w0, height: () => w0() * .75, borderRadius: () => `${w0() / 2}px ${w0() / 2}px 0px 0px` },
          { y: () => -bg.offsetTop, width: () => stage.clientWidth, height: () => stage.clientHeight, borderRadius: '0px 0px 0px 0px', ease: 'power2.inOut', duration: .5, immediateRender: true }, 0)
          .fromTo(copy, { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: -40, ease: 'power2.in', duration: .24 }, 0)
          .fromTo('#heroBg img', { scale: 1.04, opacity: 1 }, { scale: 1.14, opacity: .5, ease: 'none', duration: 1 }, 0)
          .to('#heroVeil', { opacity: 0, duration: .3 }, .1)
          .to('#heroFade', { opacity: 1, duration: .3, ease: 'power1.in' }, .3)
        stamps.forEach((s, i) => tl.fromTo(s, { opacity: 0, y: 24 }, { opacity: 1, y: 0, ease: 'power3.out', duration: .12 }, .5 + i * .12))
        tl.fromTo('.stamps__line', { opacity: 0 }, { opacity: 1, duration: .1 }, .86)
        tl.to('#stamps', { autoAlpha: 0, y: -30, duration: .12, ease: 'power2.in' }, 1.04)
          .fromTo('#heroVideo', { autoAlpha: 0 }, { autoAlpha: 1, duration: .16, ease: 'power2.out' }, 1.12)
          .to({}, { duration: .2 }, 1.28)
        return () => video(false)
      })
      // phones on their side and wide-but-short windows: the still hero, as before
      mm.add(`(max-width:1023px) and (max-height:539px), ${SHORT}`, () => { gsap.set('#stamps', { display: 'none' }) })
    }, hero)
    return () => { snd.removeEventListener('click', toggleSound); mm.revert(); ctx.revert(); vid.pause() }
  }, [])
  return (
    <header className="hero" id="top" ref={ref}>
      <div className="hero__pin" id="heroPin">
        <div className="hero__stage">
          <div className="shell hero__copy" id="heroCopy">
            <h1 className="t t-1 hero__h1 d" id="h1"><Lines lines={c.h1} /></h1>
            <p className="hero__sub rv" data-delay="2">{c.sub}</p>
            <div className="hero__cta rv" data-delay="3">
              <a className="cta cta--pulse" href="#book" data-book>{c.cta}<Go /></a>
            </div>
            <ul className="micro rv" data-delay="4">{c.micro.map(m => <li key={m}>{m}</li>)}</ul>
          </div>
          <div className="hero__bg" id="heroBg"><Img name="hero" alt={c.imgAlt} fetchPriority="high" sizes="(max-width:1023px) calc(100vw - 32px), 100vw" /><div className="hero__dim" id="heroDim"></div><div className="hero__veil" id="heroVeil"></div><div className="hero__fade" id="heroFade"></div></div>
          <div className="hero__video" id="heroVideo">
            <video muted loop playsInline preload="none" poster="/video/come-on-in-poster.webp" data-src="/video/come-on-in.mp4" aria-label={c.videoLabel}></video>
            <button type="button" className="hero__sound" aria-pressed="false" data-on={c.soundOn} data-off={c.soundOff}><span>{c.soundOn}</span></button>
          </div>
          <div className="stamps" id="stamps" aria-hidden="true">
            <div className="stamps__box">
              <div className="stamp">{c.stamps[0]}</div>
              <div className="stamp i">{c.stamps[1]}</div>
              <div className="stamp">{c.stamps[2]}</div>
              <div className="stamps__line">{c.stampsLine}</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
