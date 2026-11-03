import { bar } from '../../content/shared'
import { site } from '../../data/site'
import { Ic } from '../shared/Cta'

/** The phone-only bar at the bottom (07-mobile-bar.css). On /contact the button scrolls to the ticket. */
export function MobileBar({ href = '/contact', book = true }: { href?: string; book?: boolean }) {
  return (
    <div className="bar"><a className="bar__tel" href={site.tel} aria-label={bar.call}><Ic id="i-phone" /></a><a className="bar__cta" href={href} data-book={book ? '' : undefined}>{bar.cta}</a></div>
  )
}
