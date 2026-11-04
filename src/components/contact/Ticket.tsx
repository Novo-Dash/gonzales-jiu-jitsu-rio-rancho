import { useEffect, useState } from 'react'
import { ticket as c } from '../../content/contact'
import { BookingForm } from '../../nd'
import { Act } from '../shared/Act'
import { Ic } from '../shared/Cta'
import { Lines } from '../shared/Rich'

/** CONTACT · the booking: the pass's copy beside the Novo Dash kit's form (live classes from the academy's calendars). */
export function Ticket() {
  // the kit reads the URL when the form starts: rendered after hydration, never in the prerender
  const [ready, setReady] = useState(false)
  useEffect(() => setReady(true), [])
  return (
    <section className="book sec screen" id="start" aria-labelledby="bk-t">
      <div className="shell book__grid">
        <div className="book__copy">
          <Act a={c.act} />
          <h2 className="t t-2 d" id="bk-t"><Lines lines={c.title} /></h2>
          <p className="sub rv" data-delay="1">{c.sub}</p>
          <ul className="incl rv" data-delay="2">{c.incl.map(x => <li key={x}><Ic id="i-check" />{x}</li>)}</ul>
        </div>
        <div className="nd book__form">{ready ? <BookingForm /> : null}</div>
      </div>
    </section>
  )
}
