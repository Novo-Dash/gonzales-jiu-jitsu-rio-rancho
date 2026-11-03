import { useLayoutEffect, useRef, useState, type FormEvent } from 'react'
import { modal as c } from '../../content/shared'
import type { Prog } from '../../data/schedule'
import { lenis } from '../../motion/core'
import { Go, Ic } from '../shared/Cta'
import { lead, mayBeHuman, validName, validPhone } from '../shared/lead'
import { rich } from '../shared/Rich'
import { ui } from './ui'

/** The booking modal (modal.html): program, name, phone. Opened by any [data-book] outside a form. */
export function BookingModal() {
  const [open, setOpen] = useState(false)
  const [prog, setProg] = useState('')
  const [sent, setSent] = useState(false)
  const box = useRef<HTMLDivElement>(null)
  const back = useRef<Element | null>(null)
  const isOpen = useRef(false)

  useLayoutEffect(() => {
    const inertRest = (on: boolean) => document.querySelectorAll('#root > :not(#modal)').forEach(n => { if (on) n.setAttribute('inert', ''); else n.removeAttribute('inert') })
    ui.openModal = p => {
      back.current = document.activeElement; isOpen.current = true
      setOpen(true); if (p) setProg(p); lenis?.stop(); document.body.style.overflow = 'hidden'; inertRest(true)
      requestAnimationFrame(() => box.current?.querySelector<HTMLElement>('select')?.focus({ preventScroll: true }))
    }
    ui.closeModal = () => {
      setOpen(false); lenis?.start(); document.body.style.overflow = ''
      if (!isOpen.current) return
      isOpen.current = false; inertRest(false); (back.current as HTMLElement | null)?.focus?.({ preventScroll: true })
    }
    return () => { ui.openModal = () => {}; ui.closeModal = () => {}; inertRest(false) }
  }, [])

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (sent) return
    const f = e.currentTarget, name = f.elements.namedItem('name') as HTMLInputElement, phone = f.elements.namedItem('phone') as HTMLInputElement
    name.setCustomValidity(validName(name.value) ? '' : 'Please enter your name.')
    phone.setCustomValidity(validPhone(phone.value) ? '' : 'Please enter a 10-digit U.S. phone number.')
    if (!f.reportValidity()) return
    if (mayBeHuman((f.elements.namedItem('website') as HTMLInputElement).value)) lead('modal', prog as Prog, name.value, phone.value)
    setSent(true)
  }

  return (
    <div className={'modal' + (open ? ' open' : '')} id="modal" role="dialog" aria-modal="true" aria-labelledby="m-t" onClick={e => { if (e.target === e.currentTarget) ui.closeModal() }}>
      <div className="modal__box" ref={box}>
        <button className="modal__x" id="modalX" aria-label={c.close} onClick={() => ui.closeModal()}><Ic id="i-x" /></button>
        <h3 id="m-t">{rich(c.title)}</h3>
        <p>{c.text}</p>
        <form onSubmit={submit} onInput={e => (e.target as HTMLInputElement).setCustomValidity?.('')}>
          <select id="mProg" name="program" required value={prog} onChange={e => setProg(e.target.value)}><option value="">{c.program}</option>{c.options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}</select>
          <input type="text" name="name" placeholder={c.name} autoComplete="name" required /><input type="tel" name="phone" placeholder={c.phone} autoComplete="tel" inputMode="tel" required />
          <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-10000px', width: '1px', height: '1px', opacity: 0 }} />
          <button className="cta" type="submit">{sent ? c.sent : <>{c.send}<Go /></>}</button>
          <small>{c.note}</small>
        </form>
      </div>
    </div>
  )
}
