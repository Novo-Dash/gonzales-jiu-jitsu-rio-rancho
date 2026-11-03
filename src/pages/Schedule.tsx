import { boardHead, hero } from '../content/schedule'
import { site } from '../data/site'
import { Page } from '../components/layout/Page'
import { Today } from '../components/schedule/Today'
import { Board } from '../components/shared/Board'
import { Call, Go } from '../components/shared/Cta'
import { PageHero } from '../components/shared/PageHero'

/** /schedule — the board, then today's clock and the four things to know. */
export default function Schedule() {
  return (
    <Page page="schedule">
      <PageHero id="sp-t" crumb={hero.crumb} kick={hero.kick} h1={hero.h1} lead={hero.lead} micro={hero.micro} img={{ name: hero.img, alt: hero.alt, pos: hero.pos }}
        cta={<><a className="cta" href="#schedule">{hero.cta}<Go icon="i-down" /></a><Call tel={site.tel}>{site.phone}</Call></>} />
      <Board act={boardHead.act} title={boardHead.title} />
      <Today />
    </Page>
  )
}
