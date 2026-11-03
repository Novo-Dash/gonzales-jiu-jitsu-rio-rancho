import { useEffect, useRef, useState } from 'react'
import { visit as c } from '../../content/contact'
import { DAYS, SLOTS } from '../../data/schedule'
import { site } from '../../data/site'
import { nowDenver, toMin, useNow } from '../../motion/time'
import { Act } from '../shared/Act'
import { Ic } from '../shared/Cta'
import { Img } from '../shared/Img'
import { Lines } from '../shared/Rich'

// The map: the embed Google now serves (the prototype's ?q=…&output=embed form answers 301 + X-Frame-Options,
// and the frame stays blank). Same place, same zoom, same language.
const MAP = 'https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1s1630+Rio+Rancho+Blvd+SE+Ste+D,+Rio+Rancho,+NM+87124!6i15!3m1!1sen!5m1!1sen'

/** Class start times per day, the board in one line each (pages.js CONTACT · VISIT). */
const hours = (d: number) => {
  const ss = SLOTS.filter(s => s.d === d).sort((a, b) => toMin(a.t) - toMin(b.t))
  const am = ss.filter(s => s.t.endsWith('AM')).map(s => s.t.replace(' AM', '')), pm = ss.filter(s => s.t.endsWith('PM')).map(s => s.t.replace(' PM', ''))
  return !ss.length ? c.closed : [am.length ? am.join(', ') + ' AM' : '', pm.length ? pm.join(', ') + ' PM' : ''].filter(Boolean).join(' · ')
}

function Copy({ value }: { value: string }) {
  const [done, setDone] = useState(false)
  const copy = () => navigator.clipboard?.writeText(value).then(() => { setDone(true); setTimeout(() => setDone(false), 1500) }).catch(() => {})
  return <button type="button" className={'reach__copy' + (done ? ' done' : '')} data-copy={value} onClick={copy}>{done ? c.reach.copied : c.reach.copy}</button>
}

/** CONTACT · VISIT: where the mat is, how to reach a person. */
export function Visit() {
  const now = useNow(), today = now ? nowDenver(now).d : -1
  // the map (Google's frame, a few hundred KB) gets its address when the section is near, not with the page
  const map = useRef<HTMLIFrameElement>(null)
  useEffect(() => {
    const f = map.current!
    const io = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) { f.src = MAP; io.disconnect() } }, { rootMargin: '600px 0px' })
    io.observe(f)
    return () => io.disconnect()
  }, [])
  return (
    <section className="visit sec screen" id="visit" aria-labelledby="vi-t">
      <div className="shell visit__grid">
        <div className="vmap rv">
          <Img className="vmap__bg" name="g-14" alt="" aria-hidden="true" />
          <iframe title={c.mapTitle} ref={map} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          <a className="vmap__dir" href={site.directions} target="_blank" rel="noopener">{c.directions}<span><Ic id="i-out" /></span></a>
        </div>
        {/* 03/11: head, contacts and hours are grid areas beside the map (additions.css), not one column wrapper */}
        <div className="vinfo">
          <Act a={c.act} />
          <h2 className="t t-2 d" id="vi-t"><Lines lines={c.title} /></h2>
          <address className="vaddr rv">{site.street}<br />{site.city}</address>
        </div>
        <ul className="reach rv" data-delay="1">
          <li><a href={site.tel}><span className="know__ic"><Ic id="i-phone" /></span><span><small>{c.reach.call}</small>{site.phone}</span></a><Copy value={site.phone} /></li>
          <li><a href={`mailto:${site.email}`}><span className="know__ic"><Ic id="i-mail" /></span><span><small>{c.reach.email}</small>{site.email}</span></a><Copy value={site.email} /></li>
          <li><a href={site.instagram} target="_blank" rel="noopener"><span className="know__ic"><Ic id="i-ig" /></span><span><small>{c.reach.instagram}</small>{site.instagramHandle}</span></a></li>
        </ul>
        <div className="vhours rv" data-delay="2"><p className="vhours__k">{c.hoursK}</p><dl id="vHours">
          {[1, 2, 3, 4, 5, 6, 0].map(d => {
            const cls = d === today ? 'today' : undefined
            return [<dt className={cls} key={`t${d}`}>{DAYS[d]}</dt>, <dd className={cls} key={`d${d}`}>{hours(d)}</dd>]
          })}
        </dl></div>
      </div>
    </section>
  )
}
