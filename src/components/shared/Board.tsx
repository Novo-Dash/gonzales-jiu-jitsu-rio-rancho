import { useLayoutEffect, useRef, useState } from 'react'
import { useNow } from '../../motion/time'
import { board as c } from '../../content/schedule'
import { DAYS, SLOTS, TIMES, type Kind, type Slot } from '../../data/schedule'
import { listeners } from '../../motion/core'
import { progOf } from '../../motion/time'
import { ui } from '../layout/ui'
import { Act } from './Act'
import { Lines } from './Rich'

const tz = 'America/Denver'
const open = (d: number) => SLOTS.some(s => s.d === d)

const SlotBtn = ({ s, dim }: { s: Slot; dim: boolean }) => (
  <button type="button" className={`slot slot--${s.k}${dim ? ' dim' : ''}`} data-k={s.k} data-prog={progOf(s.k)} onClick={() => ui.openModal(progOf(s.k))}><b>{s.n}</b><span>{s.s}</span></button>
)

/** SCHEDULE: the wall chart (sched.js). Every class is a button that books it; on phones, one day at a time. */
export function Board({ act, title }: { act: string[]; title: string[] }) {
  const ref = useRef<HTMLElement>(null)
  // today and the dates come from the visitor's clock, once hydrated (useNow); the prerender has neither
  const now = useNow()
  const today = now ? DAYS.indexOf(new Intl.DateTimeFormat('en-US', { weekday: 'short', timeZone: tz }).format(now)) : -1
  const fmt = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', timeZone: tz })
  const dateOf = (d: number) => (now ? fmt.format(new Date(now.getTime() + ((d - today + 7) % 7) * 86400000)) : '')
  const [filter, setFilter] = useState<'all' | Kind>('all')
  const [pick, setMday] = useState<number | null>(null)
  const mday = pick ?? (open(today) ? today : 1)
  const dim = (s: Slot) => filter !== 'all' && s.k !== filter

  useLayoutEffect(() => {
    const board = ref.current!.querySelector<HTMLElement>('#board')!
    const l = listeners()
    board.querySelectorAll<HTMLTableCellElement>('td:not(.cl)').forEach(td => {
      l.on(td, 'mouseenter', () => { if (!td.querySelector('.slot')) return; td.parentElement!.classList.add('hl'); const i = td.cellIndex; board.querySelectorAll('tbody tr').forEach(tr => tr.children[i]?.classList.add('hl')) })
      l.on(td, 'mouseleave', () => board.querySelectorAll('.hl').forEach(e => e.classList.remove('hl')))
    })
    return l.clear
  }, [])

  return (
    <section className="sched sec screen" id="schedule" aria-labelledby="sc-t" style={{ background: '#fff' }} ref={ref}>
      <div className="shell">
        <div className="head">
          <div>
            <Act a={act} />
            <h2 className="t t-2 d" id="sc-t"><Lines lines={title} /></h2>
          </div>
          <div className="sched__filters rv" data-delay="1" id="filters">
            {c.filters.map(([f, label]) => <button key={f} className={'fbtn' + (filter === f ? ' on' : '')} data-f={f} aria-pressed={filter === f} onClick={() => setFilter(f as 'all' | Kind)}>{label}</button>)}
          </div>
        </div>
        <div className="board rv" id="board">
          <table>
            <thead><tr><th scope="col" className="corner"><span>{c.time}</span></th>
              {DAYS.map((d, i) => <th scope="col" key={d} className={`${i === today ? 'today ' : ''}${open(i) ? '' : 'closed'}`}><span className="dname">{d}</span><span className="ddate">{i === today ? c.today : dateOf(i)}</span></th>)}
            </tr></thead>
            <tbody>
              {TIMES.map((t, ti) => (
                <tr key={t}><th scope="row" className="time">{t}</th>
                  {DAYS.map((_, d) => {
                    if (!open(d)) return ti === 0 ? <td rowSpan={TIMES.length} className="cl" key={d}><span>{c.closed}</span></td> : null
                    return <td className={d === today ? 'today' : ''} key={d}>{SLOTS.filter(s => s.d === d && s.t === t).map(s => <SlotBtn s={s} dim={dim(s)} key={s.n} />)}</td>
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="sched__tabs" id="stabs">
          {DAYS.map((d, i) => open(i) ? <button className={i === mday ? 'on' : ''} data-d={i} key={d} onClick={() => setMday(i)}>{d}</button> : null)}
        </div>
        <ul className="sched__m" id="smob">
          {SLOTS.filter(s => s.d === mday).map(s => <li key={`${mday}-${s.t}`}><span className="time">{s.t}</span><SlotBtn s={s} dim={dim(s)} /></li>)}
        </ul>
        <div className="sched__foot rv"><span>{c.foot[0]}</span><span>{c.foot[1]}</span></div>
      </div>
    </section>
  )
}
