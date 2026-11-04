import { faqHead, hero } from '../content/contact'
import { Ticket } from '../components/contact/Ticket'
import { Visit } from '../components/contact/Visit'
import { Page } from '../components/layout/Page'
import { Faq } from '../components/shared/Faq'
import { Call, Go } from '../components/shared/Cta'
import { PageHero } from '../components/shared/PageHero'
import { site } from '../data/site'

/** /contact: the booking form, the visit, the questions. */
export default function Contact() {
  return (
    <Page page="contact">
      <PageHero id="ct-t" crumb={hero.crumb} kick={hero.kick} h1={hero.h1} lead={hero.lead} micro={hero.micro} img={{ name: hero.img, alt: hero.alt, pos: hero.pos }}
        cta={<><a className="cta" href="#book" data-book>{hero.cta}<Go /></a><Call tel={site.tel}>{site.phone}</Call></>} />
      <Ticket />
      <Visit />
      <Faq act={faqHead.act} />
    </Page>
  )
}
