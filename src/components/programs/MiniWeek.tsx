import { ages } from '../../content/programs'
import { DAYS, type Kind } from '../../data/schedule'
import { nowDenver, progOf, shortName, slotsOf, useNow } from '../../motion/time'

/** PROGRAMS · THE WEEK OF EACH PROGRAM: the board, cut down to one program (pages.js). */
export function MiniWeek({ k }: { k: Kind }) {
  const now = useNow(), today = now ? nowDenver(now).d : -1
  return (
    <div className="mweek rv" data-delay="2" data-k={k}>
      {[1, 2, 3, 4, 5, 6].map(d => {
        const ss = slotsOf(k).filter(s => s.d === d)
        return (
          <div className={'mweek__d' + (d === today ? ' today' : '')} key={d}><b>{DAYS[d]}</b>
            {ss.length ? ss.map(s => <button type="button" className="mweek__s" data-book data-prog={progOf(k)} key={s.t}><span>{s.t.split(' ')[0]}<i> {s.t.split(' ')[1]}</i></span><small>{shortName(s)}</small></button>) : <span className="mweek__none">{ages.none}</span>}
          </div>
        )
      })}
    </div>
  )
}
