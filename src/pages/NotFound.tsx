import { notFound } from '../content/shared'
import { Page } from '../components/layout/Page'
import { Go } from '../components/shared/Cta'
import { PageHero } from '../components/shared/PageHero'

/** Any other path: the short page hero, back to the mat. */
export default function NotFound() {
  return (
    <Page page="404">
      <PageHero id="nf-t" crumb={notFound.crumb} kick={notFound.kick} h1={notFound.h1} lead={notFound.lead} micro={notFound.micro} img={{ name: 'coaches-mat', alt: '', pos: '50% 55%' }}
        cta={<a className="cta" href="#book" data-book>{notFound.cta}<Go /></a>} />
    </Page>
  )
}
