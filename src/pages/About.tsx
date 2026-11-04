import { hero, room } from '../content/about'
import { site } from '../data/site'
import { Crest } from '../components/about/Crest'
import { Founders } from '../components/about/Founders'
import { Gallery } from '../components/home/Gallery'
import { Page } from '../components/layout/Page'
import { Call, Go } from '../components/shared/Cta'
import { PageHero } from '../components/shared/PageHero'

/** /about — the crest, the founders, the room. */
export default function About() {
  return (
    <Page page="about">
      <PageHero id="ab-t" crumb={hero.crumb} kick={hero.kick} h1={hero.h1} lead={hero.lead} micro={hero.micro} img={{ name: hero.img, alt: hero.alt, pos: hero.pos }}
        cta={<><a className="cta" href="#book" data-book>{hero.cta}<Go /></a><Call tel={site.tel}>{site.phone}</Call></>} />
      <Crest />
      <Founders />
      <Gallery content={room} id="room" />
    </Page>
  )
}
