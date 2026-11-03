import { useLayoutEffect, useRef } from 'react'
import { reviews as c } from '../../content/home'
import { REVIEWS } from '../../data/reviews'
import { gsap, listeners, motion } from '../../motion/core'
import { Act } from '../shared/Act'
import { Go, Ic } from '../shared/Cta'
import { Lines } from '../shared/Rich'

const Star = () => <svg viewBox="0 0 24 24"><path d="m12 2 3.1 6.6 7.2.9-5.3 5 1.4 7.2L12 18.2 5.6 21.7 7 14.5 1.7 9.5l7.2-.9z" /></svg>
const G = () => (
  <svg viewBox="0 0 24 24"><path d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.9h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.4z" fill="#4285F4" /><path d="M12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3.1v2.6A10 10 0 0 0 12 22z" fill="#34A853" /><path d="M6.4 14a6 6 0 0 1 0-3.8V7.5H3.1a10 10 0 0 0 0 9z" fill="#FBBC05" /><path d="M12 6c1.5 0 2.8.5 3.8 1.5l2.8-2.8A10 10 0 0 0 3.1 7.5l3.3 2.6C7.2 7.8 9.4 6 12 6z" fill="#EA4335" /></svg>
)
const initials = (n: string) => n.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()

/** ACT III · REVIEWS: the row, curved in 3D, one lit; autoplay every 6 s, drag with the mouse (home.js REVIEWS). */
export function Reviews() {
  const ref = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    const root = ref.current!, track = root.querySelector<HTMLElement>('#revTrack')!, dots = root.querySelector<HTMLElement>('#revDots')!
    const cards = [...track.children] as HTMLElement[], n = cards.length
    const l = listeners()
    let cur = 2, timer = 0, t2 = 0, raf = 0, paused = false
    const light = () => {
      cards.forEach((card, i) => { const on = i === cur; card.classList.toggle('on', on); card.toggleAttribute('inert', !on); card.setAttribute('aria-hidden', on ? 'false' : 'true') });
      [...dots.children].forEach((d, i) => d.classList.toggle('on', i === cur))
    }
    // the 3D curve: every card turns away from the middle of the row
    const curve = () => { const mid = track.scrollLeft + track.clientWidth / 2; cards.forEach(card => { const d = (card.offsetLeft + card.offsetWidth / 2 - mid) / track.clientWidth; gsap.set(card, { rotateY: gsap.utils.clamp(-28, 28, -d * 42), z: -Math.abs(d) * 260, y: Math.abs(d) * 18, transformPerspective: 1400 }) }) }
    const centre = (i: number) => { const card = cards[i]; track.scrollTo({ left: card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2, behavior: 'smooth' }) }
    // autoplay stops with reduced motion and while the carousel has focus (PRD 12)
    const restart = () => { clearTimeout(timer); if (motion && !paused) timer = window.setTimeout(() => go(1), 6000) }
    const go = (k: number) => { cur = (cur + k + n) % n; light(); centre(cur); restart() }
    l.on(root.querySelector('#revNext')!, 'click', () => go(1)); l.on(root.querySelector('#revPrev')!, 'click', () => go(-1))
    l.on(root, 'focusin', () => { paused = true; clearTimeout(timer) })
    l.on(root, 'focusout', (e: FocusEvent) => { if (!root.contains(e.relatedTarget as Node)) { paused = false; restart() } })
    l.on(track, 'scroll', () => { curve(); clearTimeout(t2); t2 = window.setTimeout(() => { const mid = track.scrollLeft + track.clientWidth / 2; let best = 0, bd = 1e9; cards.forEach((card, i) => { const d = Math.abs(card.offsetLeft + card.offsetWidth / 2 - mid); if (d < bd) { bd = d; best = i } }); if (best !== cur) { cur = best; light(); restart() } }, 80) }, { passive: true })
    let down = false, sx = 0, sl = 0, moved = 0
    l.on(track, 'pointerdown', (e: PointerEvent) => { if (e.pointerType !== 'mouse') return; down = true; sx = e.clientX; sl = track.scrollLeft; moved = 0 })
    l.on(track, 'pointermove', (e: PointerEvent) => { if (!down) return; const dx = e.clientX - sx; moved += Math.abs(dx); if (moved > 6) track.classList.add('is-drag'); track.scrollLeft = sl - dx })
    const up = () => { down = false; requestAnimationFrame(() => track.classList.remove('is-drag')) }
    ;['pointerup', 'pointercancel', 'pointerleave'].forEach(ev => l.on(track, ev, up))
    light(); restart()
    raf = requestAnimationFrame(() => { const card = cards[cur]; track.scrollLeft = card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2; curve() })
    l.on(window, 'resize', curve)
    return () => { clearTimeout(timer); clearTimeout(t2); cancelAnimationFrame(raf); l.clear(); cards.forEach(card => gsap.set(card, { clearProps: 'transform' })) }
  }, [])
  return (
    <section className="rev sec screen" id="reviews" aria-labelledby="rv-t" ref={ref}>
      <div className="shell">
        <div className="head">
          <div>
            <Act a={c.act} />
            <h2 className="t t-2 d" id="rv-t"><Lines lines={c.title} /></h2>
          </div>
          <div className="rv" data-delay="2" style={{ display: 'flex', gap: '10px' }}>
            <button type="button" className="rnd" id="revPrev" aria-label={c.prev}><Ic id="i-left" /></button>
            <button type="button" className="rnd" id="revNext" aria-label={c.next}><Ic id="i-arrow" /></button>
          </div>
        </div>
        <div className="rev__track" id="revTrack" aria-roledescription="carousel" aria-label={c.label}>
          {REVIEWS.map(r => (
            <article className={'rcard' + (r.ph ? ' is-ph' : '')} key={r.n}>
              <div className="rcard__top"><span className="rcard__stars"><Star /><Star /><Star /><Star /><Star /></span><span className="rcard__g"><G /></span></div>
              <div className="rcard__qm">“</div><q>{r.q}</q>
              <footer><span className="rcard__av">{initials(r.n)}</span><div><b>{r.n}</b><small>{r.w}</small></div></footer>
            </article>
          ))}
        </div>
        <div className="rev__dots" id="revDots">{REVIEWS.map(r => <i key={r.n}></i>)}</div>
        <div className="rev__foot rv">
          <p>{c.foot}</p>
          <a className="cta" href="#book" data-book>{c.cta}<Go /></a>
        </div>
      </div>
    </section>
  )
}
