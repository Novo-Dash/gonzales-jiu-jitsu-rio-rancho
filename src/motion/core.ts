import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

// The prototype's core.js SETUP block, once per visit: one Lenis (pointer: fine and no
// reduced-motion only), driven by the GSAP ticker so ScrollTrigger and the smooth scroll
// read the same frame.
gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }
export const LIVE = '(min-width:1024px) and (min-height:620px)'
// Phones and tablets: the stacked layout of the prototype's (max-width:1023px) CSS, with its own motion
// (src/styles/mobile.css holds the scene CSS, under the same query + no reduced motion + html.js).
export const PHONE = '(max-width:1023px)'
// The sticky scroll scenes on phones (hero, gates, zoom, wall) need a screen at least this tall; a phone on
// its side keeps the stacked, still layout.
export const SCENE = '(max-width:1023px) and (min-height:540px)'
// Wide but short windows: the desktop layout without the scroll scenes (as before).
export const SHORT = '(min-width:1024px) and (max-height:619px)'
export let motion = false
export let fine = false
export let lenis: Lenis | null = null

export function initMotion() {
  motion = !matchMedia('(prefers-reduced-motion: reduce)').matches
  fine = matchMedia('(pointer: fine)').matches
  // phones: the address bar showing/hiding is not a resize (the scenes are sized in svh)
  ScrollTrigger.config({ ignoreMobileResize: true })
  if (motion && fine) {
    // a longer, softer glide than the prototype's 0.085 (03/11, Adryan: "quero scroll suave")
    const l = new Lenis({ lerp: 0.065, smoothWheel: true, wheelMultiplier: 0.95, touchMultiplier: 1.4 })
    lenis = l
    l.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(t => l.raf(t * 1000))
    gsap.ticker.lagSmoothing(0)
  }
}

/**
 * A ScrollTrigger that waits for the page's one ordered refresh (refresh.ts) instead of measuring itself on
 * creation. A plain create() measures at once, and after the tweens set up just before it that is a full
 * layout per trigger while the page boots (phones: ~150 ms of blocking time). Holding an empty timeline is
 * what makes GSAP defer it (as it does for every timeline-driven trigger). Used by the phone scenes.
 */
export const lateTrigger = (vars: ScrollTrigger.Vars) => ScrollTrigger.create({ ...vars, animation: gsap.timeline({ paused: true }) })

export const scrollToEl = (el: Element) => {
  if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -20, duration: 1.4 })
  else el.scrollIntoView({ behavior: 'smooth' })
}

/** Listeners that an effect adds and its cleanup removes, in one place. */
export function listeners() {
  const off: Array<() => void> = []
  const on = <K extends string>(target: EventTarget, type: K, fn: (e: never) => void, opts?: AddEventListenerOptions | boolean) => {
    target.addEventListener(type, fn as EventListener, opts)
    off.push(() => target.removeEventListener(type, fn as EventListener, opts))
  }
  return { on, add: (f: () => void) => off.push(f), clear: () => off.splice(0).forEach(f => f()) }
}
