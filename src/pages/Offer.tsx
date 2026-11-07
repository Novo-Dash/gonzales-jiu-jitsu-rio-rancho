import { hero, offer as c } from '../content/offer'
import { site } from '../data/site'
import { Page } from '../components/layout/Page'
import { Act } from '../components/shared/Act'
import { Call, Go, Ic } from '../components/shared/Cta'
import { Img } from '../components/shared/Img'
import { PageHero } from '../components/shared/PageHero'
import { Lines } from '../components/shared/Rich'

/** /offer: the sign-up special, one card and the booking button. */
export default function Offer() {
  return (
    <Page page="offer">
      <PageHero id="of-t" crumb={hero.crumb} kick={hero.kick} h1={hero.h1} lead={hero.lead} micro={hero.micro} img={{ name: hero.img, alt: hero.alt, pos: hero.pos }}
        cta={<><a className="cta" href="#book" data-book>{hero.cta}<Go /></a><Call tel={site.tel}>{site.phone}</Call></>} />
      <section className="offer sec" id="offer" aria-labelledby="ofc-t">
        <div className="shell">
          <article className="offer__card rv">
            <div className="offer__photo"><Img name="adults" alt={c.alt} sizes="(max-width:1023px) 100vw, 40vw" loading="lazy" /></div>
            <div className="offer__body">
              <Act a={c.act} />
              <p className="offer__tag">{c.tag}</p>
              <h2 className="t t-2 d" id="ofc-t"><Lines lines={c.title} /></h2>
              <p className="sub">{c.sub}</p>
              <ul className="incl">{c.incl.map(x => <li key={x}><Ic id="i-check" />{x}</li>)}</ul>
              <div className="offer__cta"><a className="cta" href="#book" data-book>{c.cta}<Go /></a><Call tel={site.tel}>{site.phone}</Call></div>
            </div>
          </article>
        </div>
      </section>
    </Page>
  )
}
