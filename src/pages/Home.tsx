import { faqHead, gates, schedule } from '../content/home'
import { Champion } from '../components/home/Champion'
import { CoachStage } from '../components/home/CoachStage'
import { Gallery } from '../components/home/Gallery'
import { Gate } from '../components/home/Gate'
import { Hero } from '../components/home/Hero'
import { Kids } from '../components/home/Kids'
import { Reviews } from '../components/home/Reviews'
import { ReviewsIntro } from '../components/home/ReviewsIntro'
import { Served } from '../components/home/Served'
import { Steps } from '../components/home/Steps'
import { Wall } from '../components/home/Wall'
import { Zoom } from '../components/home/Zoom'
import { Page } from '../components/layout/Page'
import { Board } from '../components/shared/Board'
import { Faq } from '../components/shared/Faq'

/** / — the story in three acts (PRD 6): Family, Competition, Community. */
export default function Home() {
  return (
    <Page page="home" bar={{ href: '#book' }}>
      <Hero />
      <Gate {...gates[0]} />
      <Zoom />
      <Wall />
      <Kids />
      <Gate {...gates[1]} />
      <Champion />
      <CoachStage />
      <Gate {...gates[2]} />
      <Served />
      <Gallery />
      <ReviewsIntro />
      <Reviews />
      <Steps />
      <Board act={schedule.act} title={schedule.title} />
      <Faq act={faqHead.act} />
    </Page>
  )
}
