import { hero, staffLink } from '../content/instructors'
import { site } from '../data/site'
import { Champion } from '../components/home/Champion'
import { Staff } from '../components/instructors/Staff'
import { Page } from '../components/layout/Page'
import { Call, Go } from '../components/shared/Cta'
import { PageHero } from '../components/shared/PageHero'

/** /instructors (03/11): the hero, the head instructor's passport, then every coach on ink. */
export default function Instructors() {
  return (
    <Page page="instructors">
      <PageHero id="in-t" crumb={hero.crumb} kick={hero.kick} h1={hero.h1} lead={hero.lead} micro={hero.micro} img={{ name: hero.img, alt: hero.alt, pos: hero.pos }}
        cta={<><a className="cta" href="/contact" data-book>{hero.cta}<Go /></a><Call tel={site.tel}>{site.phone}</Call></>} />
      <Champion more={{ label: staffLink, href: '#staff' }} />
      <Staff />
    </Page>
  )
}
