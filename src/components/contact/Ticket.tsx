import { useLayoutEffect, useRef, useState, type FormEvent } from 'react'
import { ticket as c } from '../../content/contact'
import { DAYS, type Prog, type Slot } from '../../data/schedule'
import { gsap, listeners, scrollToEl } from '../../motion/core'
import { FULL, kOf, slotsOf } from '../../motion/time'
import { ui } from '../layout/ui'
import { Act } from '../shared/Act'
import { Go, Ic } from '../shared/Cta'
import { lead, mayBeHuman, validName, validPhone } from '../shared/lead'
import { Lines } from '../shared/Rich'

/** CONTACT · THE PASS: pick a program, the days appear; the stub fills in; sent, it's stamped (pages.js CONTACT · THE PASS). */
export function Ticket() {
  const ref = useRef<HTMLFormElement>(null)
  const [prog, setProg] = useState<Prog | null>(null)
  const [slot, setSlot] = useState<Slot | null>(null)
  const [msg, setMsg] = useState(c.msg)
  const [sent, setSent] = useState(false)
  const list = prog ? slotsOf(kOf(prog)) : []

  // the stub's three lines change on the DOM with a small drop, as in the prototype
  const setStub = (id: string, v: string) => { const el = ref.current!.querySelector<HTMLElement>('#' + id)!; if (el.textContent !== v) { el.textContent = v; gsap.fromTo(el, { y: 8, opacity: 0 }, { y: 0, opacity: 1, duration: .4, ease: 'power3.out' }) } }
  const pickProg = (p: Prog) => { setStub('stProg', c.stubProg[p]); setStub('stDay', c.stub.empty); setStub('stTime', c.stub.empty); setProg(p); setSlot(null) }
  const pickRef = useRef(pickProg); pickRef.current = pickProg

  // a new program: its days arrive in a short stagger
  useLayoutEffect(() => {
    if (!prog) return
    const days = ref.current!.querySelector('#tkDays')!
    const tw = gsap.fromTo(days.children, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: .4, stagger: .03, ease: 'power3.out' })
    return () => { tw.kill(); gsap.set(days.children, { clearProps: 'all' }) }
  }, [prog])

  // anywhere on this page, "book" means this ticket
  useLayoutEffect(() => {
    const tk = ref.current!, l = listeners()
    l.on(document, 'click', (e: MouseEvent) => {
      const a = (e.target as Element).closest<HTMLElement>('[data-book]'); if (!a || a.closest('#ticket')) return
      e.stopImmediatePropagation(); e.preventDefault(); ui.closeMenu()
      scrollToEl(document.getElementById('start')!)
      const r = a.dataset.prog && tk.querySelector<HTMLInputElement>(`input[name="prog"][value="${a.dataset.prog}"]`); if (r) { r.checked = true; pickRef.current(r.value as Prog) }
    }, true)
    return l.clear
  }, [])

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (sent) return
    const tk = e.currentTarget
    let ok = true
    tk.querySelectorAll('.tk__f').forEach(f => {
      const input = f.querySelector('input')!, v = input.value
      const bad = !v.trim() || (input.name === 'name' ? !validName(v) : !validPhone(v))
      f.classList.toggle('bad', bad); if (bad) ok = false
    })
    if (!prog || !slot) { ok = false; setMsg(c.pick) }
    if (!ok) { gsap.fromTo(tk, { x: -6 }, { x: 0, duration: .5, ease: 'elastic.out(1,.3)' }); return }
    const name = (tk.elements.namedItem('name') as HTMLInputElement).value, phone = (tk.elements.namedItem('phone') as HTMLInputElement).value
    if (mayBeHuman((tk.elements.namedItem('website') as HTMLInputElement).value)) lead('ticket', prog!, name, phone, { day: slot!.d, time: slot!.t })
    setMsg(c.done); setSent(true)
    gsap.fromTo('#stStamp', { opacity: 0, scale: 1.8, rotate: -24 }, { opacity: 1, scale: 1, rotate: -14, duration: .35, ease: 'power4.in' })
    gsap.fromTo(tk, { y: 0 }, { y: 4, duration: .08, yoyo: true, repeat: 1, delay: .3 })
  }

  return (
    <section className="book sec screen" id="start" aria-labelledby="bk-t">
      <div className="shell book__grid">
        <div className="book__copy">
          <Act a={c.act} />
          <h2 className="t t-2 d" id="bk-t"><Lines lines={c.title} /></h2>
          <p className="sub rv" data-delay="1">{c.sub}</p>
          <ul className="incl rv" data-delay="2">{c.incl.map(x => <li key={x}><Ic id="i-check" />{x}</li>)}</ul>
        </div>
        <form className="ticket rv" id="ticket" data-delay="1" noValidate onSubmit={submit} ref={ref}>
          <div className="ticket__main">
            <p className="ticket__k">{c.k}</p>
            <fieldset className="tk__set"><legend>{c.program}</legend>
              <div className="tk__opts" id="tkProg">
                {c.progs.map(([v, label, small], i) => <label key={v}><input type="radio" name="prog" value={v} required={i === 0} onChange={() => pickProg(v as Prog)} /><span>{label}<small>{small}</small></span></label>)}
              </div>
            </fieldset>
            <fieldset className="tk__set"><legend>{c.day}</legend><div className="tk__days" id="tkDays">
              {prog ? list.map((s, i) => (
                <label key={`${prog}-${i}`}><input type="radio" name="slot" value={i} required onChange={() => { setSlot(s); setStub('stDay', FULL[s.d]); setStub('stTime', s.t) }} /><span>{DAYS[s.d]}<small>{s.t}</small></span></label>
              )) : <p className="tk__hint">{c.hint}</p>}
            </div></fieldset>
            <div className="tk__fields">
              <label className="tk__f"><span>{c.name}</span><input type="text" name="name" autoComplete="name" required /></label>
              <label className="tk__f"><span>{c.phone}</span><input type="tel" name="phone" autoComplete="tel" inputMode="tel" required /></label>
            </div>
            <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-10000px', width: '1px', height: '1px', opacity: 0 }} />
            <div className="tk__send"><button className="cta" type="submit">{sent ? c.sent : c.send}<Go /></button><small id="tkMsg" aria-live="polite">{msg}</small></div>
          </div>
          <div className="ticket__stub" aria-hidden="true">
            <span className="stub__k">{c.stub.k}</span>
            <div className="stub__rows">
              <div><small>{c.stub.prog}</small><b id="stProg">{c.stub.empty}</b></div>
              <div><small>{c.stub.day}</small><b id="stDay">{c.stub.empty}</b></div>
              <div><small>{c.stub.time}</small><b id="stTime">{c.stub.empty}</b></div>
            </div>
            <i className="stub__code"></i>
            <span className="stub__stamp" id="stStamp">{c.stub.stamp}</span>
          </div>
        </form>
      </div>
    </section>
  )
}
