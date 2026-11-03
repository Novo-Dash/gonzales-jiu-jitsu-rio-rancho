import { useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import { nav } from '../../content/shared'
import { site } from '../../data/site'
import { ScrollTrigger } from '../../motion/core'
import { Ic } from '../shared/Cta'
import { Img } from '../shared/Img'

/** The floating pill nav; it slides away while you scroll down past 400px (core.js). */
export function Nav({ page }: { page: string }) {
  useLayoutEffect(() => {
    const pnav = document.getElementById('pnav')!, modal = () => document.getElementById('modal')
    let lastY = 0
    const st = ScrollTrigger.create({ onUpdate: s => { const y = s.scroll(); pnav.classList.toggle('is-hidden', y > lastY && y > 400 && !modal()?.classList.contains('open')); lastY = y } })
    return () => { st.kill(); pnav.classList.remove('is-hidden') }
  }, [])
  return (
    <nav className="pnav" id="pnav" aria-label="Main">
      <Link className="pnav__logo" to="/" aria-label={nav.home}><Img name="logo-ink" alt="" sizes="44px" /></Link>
      <div className="pnav__bar">
        {nav.pills.map(p => (
          <Link key={p.page} className="pill" to={p.to} data-page={p.page} aria-current={page === p.page ? 'page' : undefined}><i className="pill__fill"></i><span>{p.label}</span></Link>
        ))}
        <a className="pill pill--tel" href={site.tel} aria-label={nav.callLabel}><i className="pill__fill"></i><Ic id="i-phone" /><span>{site.phone}</span></a>
        <button className="pill pill--menu" id="menuBtn" type="button" aria-expanded="false" aria-controls="menu"><i className="pill__fill"></i><span>{nav.menu}</span></button>
      </div>
    </nav>
  )
}
