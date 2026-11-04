import { bar } from '../../content/shared'
import { site } from '../../data/site'
import { Ic } from '../shared/Cta'

/** The phone-only bar at the bottom (07-mobile-bar.css); its button opens the booking. */
export function MobileBar({ href = '#book', book = true }: { href?: string; book?: boolean }) {
  return (
    <div className="bar"><a className="bar__tel" href={site.tel} aria-label={bar.call}><Ic id="i-phone" /></a><a className="bar__cta" href={href} data-book={book ? '' : undefined}>{bar.cta}</a></div>
  )
}
