import { useLayoutEffect, useState } from 'react'
import { DAYS, SLOTS, type Kind, type Prog, type Slot } from '../data/schedule'

// pages.js SITE HELPERS: the academy's clock is Rio Rancho's.
export const TZ = 'America/Denver'
export const toMin = (t: string) => { const [hm, ap] = t.split(' '); let [h, m] = hm.split(':').map(Number); if (ap === 'PM' && h !== 12) h += 12; if (ap === 'AM' && h === 12) h = 0; return h * 60 + m }
export const nowDenver = (at = new Date()) => {
  const p = Object.fromEntries(new Intl.DateTimeFormat('en-US', { timeZone: TZ, weekday: 'short', hour: 'numeric', minute: 'numeric', hourCycle: 'h23' }).formatToParts(at).map(x => [x.type, x.value]))
  return { d: DAYS.indexOf(p.weekday), m: (+p.hour % 24) * 60 + (+p.minute) }
}
export const FULL = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
export const progOf = (k: Kind): Prog => k === 'a' ? 'adults' : k === 'k' ? 'kids' : 'toddlers'
export const kOf = (p: Prog): Kind => p === 'adults' ? 'a' : p === 'kids' ? 'k' : 't'
export const shortName = (s: Slot) => s.k === 'a' ? s.n.replace('Adult ', '') : s.n.includes('Comp') ? 'Comp · Gi' : s.s.split(' · ')[0]
export const slotsOf = (k: Kind) => SLOTS.filter(s => s.k === k).sort((a, b) => a.d - b.d || toMin(a.t) - toMin(b.t))

/**
 * The visitor's clock, from the first layout effect on (null in the prerender and in the hydrating
 * render, so both write the same HTML). The update lands before the first paint. `every` redraws (ms).
 */
export function useNow(every = 0) {
  const [now, setNow] = useState<Date | null>(null)
  useLayoutEffect(() => {
    setNow(new Date())
    if (!every) return
    const t = setInterval(() => setNow(new Date()), every)
    return () => clearInterval(t)
  }, [every])
  return now
}
