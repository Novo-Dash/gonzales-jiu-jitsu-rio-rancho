import { useLayoutEffect, useRef } from 'react'
import { faq as c } from '../../content/shared'
import { FAQ } from '../../data/faq'
import { site } from '../../data/site'
import { listeners } from '../../motion/core'
import { Act } from './Act'
import { Call, Ic } from './Cta'
import { Lines } from './Rich'

/** FAQ (faq.js): one answer open at a time, the first open on arrival. */
export function Faq({ act }: { act: string[] }) {
  const ref = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    // toggled on the DOM, as in the prototype: the items also carry the reveal's .in, which a re-render would drop
    const list = ref.current!, l = listeners()
    const set = (qa: Element, on: boolean) => { qa.classList.toggle('open', on); qa.querySelector('.qa__btn')!.setAttribute('aria-expanded', String(on)); qa.querySelector('.qa__a')!.toggleAttribute('inert', !on) }
    l.on(list, 'click', (e: MouseEvent) => {
      const b = (e.target as Element).closest('.qa__btn'); if (!b) return
      const qa = b.parentElement!, wasOpen = qa.classList.contains('open')
      list.querySelectorAll('.qa.open').forEach(q => set(q, false))
      if (!wasOpen) set(qa, true)
    })
    return l.clear
  }, [])
  return (
    <section className="faq sec screen" id="faq" aria-labelledby="faq-t">
      <div className="shell">
        <div className="head head--c">
          <div style={{ display: 'grid', justifyItems: 'center' }}>
            <Act a={act} />
            <h2 className="t t-2 d" id="faq-t"><Lines lines={c.title} /></h2>
          </div>
        </div>
        <div className="faq__list" id="faqList" ref={ref}>
          {FAQ.map(([q, a], i) => (
            <div className={'qa rv' + (i === 0 ? ' open' : '')} data-delay={String(Math.min(i, 4))} key={q}>
              <button className="qa__btn" aria-expanded={i === 0} aria-controls={`qa-${i}`}><span className="qa__n">0{i + 1}</span><span className="qa__q">{q}</span><span className="qa__i"><Ic id="i-plus" style={{ strokeWidth: '2.6' }} /></span></button>
              <div className="qa__a" id={`qa-${i}`} inert={i !== 0}><div><p>{a}</p></div></div>
            </div>
          ))}
        </div>
        <p className="faq__foot rv">{c.foot}<Call tel={site.tel}>{site.phone}</Call></p>
      </div>
    </section>
  )
}
