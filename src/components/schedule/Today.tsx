import { know, today as c } from '../../content/schedule'
import { SLOTS, type Slot } from '../../data/schedule'
import { FULL, nowDenver, progOf, toMin, useNow } from '../../motion/time'
import { Act } from '../shared/Act'
import { Go, Ic } from '../shared/Cta'
import { Lines, rich } from '../shared/Rich'

const fmtNow = (m: number) => { const h = Math.floor(m / 60), mm = String(m % 60).padStart(2, '0'); return `${(h % 12) || 12}:${mm} ${h < 12 ? 'AM' : 'PM'}` }

/** What the clock card shows at a given moment (pages.js SCHEDULE · TODAY · draw). */
function read(now: { d: number; m: number }) {
  let next: Slot | null = null, off = 0
  for (off = 0; off < 8 && !next; off++) {
    const d = (now.d + off) % 7
    next = SLOTS.filter(s => s.d === d && (off > 0 || toMin(s.t) > now.m)).sort((a, b) => toMin(a.t) - toMin(b.t))[0] || null
  }
  off--
  const n = next!
  const when = off === 0 ? c.todayWord : off === 1 ? c.tomorrow : FULL[n.d]
  const diff = off * 1440 + toMin(n.t) - now.m, h = Math.floor(diff / 60), mm = diff % 60
  const inTxt = diff < 60 ? `in ${mm} min` : diff < 1440 ? `in ${h} h ${String(mm).padStart(2, '0')} min` : `${FULL[n.d]}`
  // the line spans that day's classes, with room on both sides; "now" is pinned to the left edge if it's earlier
  const day = SLOTS.filter(s => s.d === n.d).sort((a, b) => toMin(a.t) - toMin(b.t))
  const lo = toMin(day[0].t) - 60, hi = toMin(day[day.length - 1].t) + 90, X = (m: number) => Math.max(0, Math.min(100, ((m - lo) / (hi - lo)) * 100))
  // starts close together (4:30, 5:00, 6:00) would print over each other: a label too near the one before
  // it goes above the line, alternating (03/11)
  const up: boolean[] = []
  day.forEach((s, i) => { up[i] = i > 0 && !up[i - 1] && X(toMin(s.t)) - X(toMin(day[i - 1].t)) < 16 })
  return { now: `${FULL[now.d]} · ${fmtNow(now.m)}`, when: c.whenPrefix + when, next: n, off, inTxt, day, X, hi, lo, up }
}

/** SCHEDULE · TODAY: the clock on the wall by the door; the next class, a countdown, the day as a line with a red "now". */
export function Today() {
  // the prerender writes the prototype's empty card; the browser fills it and redraws every 30 s
  const at = useNow(30000), now = at && nowDenver(at)
  const r = now && read(now)
  return (
    <section className="todaysec sec screen" id="today" aria-labelledby="td-t">
      <div className="shell today__grid">
        <article className="clock rv" id="clock" aria-live="polite">
          <div className="clock__top"><p className="clock__k">{c.k}</p><p className="clock__now" id="tNow">{r ? r.now : '—'}</p></div>
          <div className="clock__next">
            <small id="tWhen">{r ? r.when : c.when}</small>
            <b id="tTime">{r ? r.next.t : '—'}</b>
            <span id="tName">{r ? `${r.next.n} · ${r.next.s}` : '—'}</span>
            <em id="tIn">{r ? r.inTxt : ''}</em>
          </div>
          <div className="clock__line" id="tLine"><i className="clock__rail"></i>
            {r && r.day.map((s, i) => <i className={'clock__dot' + (s === r.next ? ' next' : r.off === 0 && toMin(s.t) <= now!.m ? ' past' : '') + (r.up[i] ? ' up' : '')} style={{ left: `${r.X(toMin(s.t))}%` }} key={s.t}><span>{s.t}</span></i>)}
            {r && r.off === 0 && now!.m <= r.hi && <i className={'clock__nowm' + (now!.m < r.lo ? ' early' : '')} style={{ left: `${r.X(now!.m)}%` }}></i>}
          </div>
          <div className="clock__cta"><button className="cta cta--sm" type="button" id="tBook" data-book data-prog={r ? progOf(r.next.k) : undefined}>{c.book}<Go /></button></div>
        </article>
        <div className="know">
          <Act a={know.act} />
          <h2 className="t t-2 d" id="td-t"><Lines lines={know.title} /></h2>
          <ul className="know__list">
            {know.items.map((k, i) => <li className="rv" data-delay={i ? String(i) : undefined} key={k.icon}><span className="know__ic"><Ic id={k.icon} /></span><p>{rich(k.text)}</p></li>)}
          </ul>
        </div>
      </div>
    </section>
  )
}
