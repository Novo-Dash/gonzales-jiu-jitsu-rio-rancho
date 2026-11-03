import { useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import { menu } from '../../content/shared'
import { site } from '../../data/site'
import { lenis, listeners } from '../../motion/core'
import { Go, Ic } from '../shared/Cta'
import { ui } from './ui'

/** The mobile menu: a white sheet that opens from the Menu pill (core.js). */
export function MobileMenu({ page }: { page: string }) {
  useLayoutEffect(() => {
    const el = document.getElementById('menu')!, btn = document.getElementById('menuBtn')!
    const l = listeners()
    let t = 0
    const inertRest = (on: boolean) => document.querySelectorAll('#root > :not(#menu):not(#pnav)').forEach(n => { if (on) n.setAttribute('inert', ''); else n.removeAttribute('inert') })
    const close = () => {
      if (!el.classList.contains('open')) return
      el.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); lenis?.start(); document.body.style.overflow = ''; inertRest(false)
      t = window.setTimeout(() => { if (!el.classList.contains('open')) el.hidden = true }, 600)
    }
    ui.closeMenu = close
    l.on(btn, 'click', () => {
      if (el.classList.contains('open')) return close()
      el.hidden = false; requestAnimationFrame(() => el.classList.add('open')); btn.setAttribute('aria-expanded', 'true'); lenis?.stop(); document.body.style.overflow = 'hidden'; inertRest(true)
      requestAnimationFrame(() => (el.querySelector('a') as HTMLElement | null)?.focus({ preventScroll: true }))
    })
    l.on(document.getElementById('menuX')!, 'click', close)
    return () => { l.clear(); clearTimeout(t); if (el.classList.contains('open')) { lenis?.start(); document.body.style.overflow = ''; inertRest(false) } ui.closeMenu = () => {} }
  }, [])
  return (
    <div className="menu" id="menu" hidden>
      <button className="menu__x" id="menuX" type="button" aria-label={menu.close}><Ic id="i-x" /></button>
      <nav className="menu__links" aria-label={menu.label}>
        {menu.links.map(m => (
          <Link key={m.page} to={m.to} data-page={m.page} aria-current={page === m.page ? 'page' : undefined}><i>{m.n}</i>{m.label}</Link>
        ))}
      </nav>
      <div className="menu__foot">
        <a className="cta" href="/contact" data-book>{menu.cta}<Go /></a>
        <a className="call" href={site.tel}><Ic id="i-phone" /><u>{site.phone}</u></a>
        <p>{menu.address}</p>
      </div>
    </div>
  )
}
