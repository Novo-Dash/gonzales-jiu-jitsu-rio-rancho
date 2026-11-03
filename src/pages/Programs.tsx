import { hero } from '../content/programs'
import { site } from '../data/site'
import { Page } from '../components/layout/Page'
import { Ages } from '../components/programs/Ages'
import { Call, Go } from '../components/shared/Cta'
import { PageHero } from '../components/shared/PageHero'

/** /programs — three chapters beside the growth chart. */
export default function Programs() {
  return (
    <Page page="programs">
      <PageHero id="pg-t" crumb={hero.crumb} kick={hero.kick} h1={hero.h1} lead={hero.lead} micro={hero.micro} img={{ name: hero.img, alt: hero.alt, pos: hero.pos }}
        cta={<><a className="cta" href="/contact" data-book>{hero.cta}<Go /></a><Call tel={site.tel}>{site.phone}</Call></>} />
      <Ages />
    </Page>
  )
}
