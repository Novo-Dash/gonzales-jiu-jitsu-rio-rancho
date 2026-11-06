import { FAQ } from './faq'
import { site } from './site'

/** The domain (vite.config): VITE_SITE_URL once confirmed; until then the Vercel URL and a noindex preview. */
export const SITE: string = __SITE__
export const IS_PREVIEW: boolean = __PREVIEW__
export const MODIFIED = '2026-11-02'

export type Route = { path: string; page: string; title: string; description: string; crumb?: string }

// PRD 10.3, verbatim.
export const ROUTES: Route[] = [
  { path: '/', page: 'home', title: 'Gonzales Jiu-Jitsu | Kids & Adult Jiu-Jitsu in Rio Rancho, NM | Free Trial Class', description: 'Toddlers, kids and adult Brazilian Jiu-Jitsu in Rio Rancho, NM, run by two-time IBJJF No-Gi World Champion Abie Gonzales and his family. Your first class is free. Call 505-477-6612.' },
  { path: '/about', page: 'about', crumb: 'About', title: 'About | Gonzales Jiu-Jitsu, Rio Rancho NM', description: 'A family academy in Rio Rancho, NM: founded in 2024 by Abie and Laura Gonzales, two U.S. Army veterans. Competition, Family, Community.' },
  { path: '/instructors', page: 'instructors', crumb: 'Instructors', title: 'Instructors | Gonzales Jiu-Jitsu, Rio Rancho NM', description: 'Meet the coaches at Gonzales Jiu-Jitsu in Rio Rancho, NM: head instructor Abie Gonzales, Laura Gonzales, black belts Tito Valdez and Adriana Rascon, and Brandon Romero. Every coach is IBJJF certified.' },
  { path: '/programs', page: 'programs', crumb: 'Programs', title: 'Programs | Toddlers, Kids & Adult Jiu-Jitsu | Gonzales Jiu-Jitsu', description: 'Toddlers 4–5, Kids 6–13 and Adults from Fundamentals to Advanced. Gi and No-Gi, six days a week in Rio Rancho, NM. First class free.' },
  { path: '/schedule', page: 'schedule', crumb: 'Schedule', title: 'Class Schedule | Gonzales Jiu-Jitsu, Rio Rancho NM', description: 'Weekly Brazilian Jiu-Jitsu schedule: Toddlers, Kids, Adult Fundamentals, All Levels, Advanced and Open Mat, Monday to Saturday.' },
  { path: '/contact', page: 'contact', crumb: 'Contact', title: 'Contact & Free Class | Gonzales Jiu-Jitsu, Rio Rancho NM', description: '1630 Rio Rancho Blvd SE, Ste D, Rio Rancho, NM. Call 505-477-6612 or book your free class online.' },
]

export const url = (path: string) => SITE + (path === '/' ? '/' : path)

const ID = `${SITE}/#academy`

/** The academy as one entity: the same @id on every page, only real, published data. */
function academy() {
  return {
    '@type': ['SportsActivityLocation', 'LocalBusiness'],
    '@id': ID,
    name: site.name,
    url: url('/'),
    logo: `${SITE}/img/logo-ink.png`,
    image: [`${SITE}/og.jpg`, `${SITE}/img/hero.webp`],
    description: 'Brazilian Jiu-Jitsu academy in Rio Rancho, NM, for toddlers (4–5), kids (6–13) and adults, Gi and No-Gi, run by two-time IBJJF No-Gi World Champion Abie Gonzales and his wife Laura, both U.S. Army veterans. First class free.',
    telephone: '+1-505-477-6612',
    email: site.email,
    address: { '@type': 'PostalAddress', streetAddress: '1630 Rio Rancho Blvd SE, Ste D', addressLocality: 'Rio Rancho', addressRegion: 'NM', postalCode: '87124', addressCountry: 'US' },
    // from the Google Maps result for the address (02/11/2026)
    geo: { '@type': 'GeoCoordinates', latitude: 35.2323483, longitude: -106.6575717 },
    areaServed: [{ '@type': 'City', name: 'Rio Rancho' }, { '@type': 'City', name: 'Albuquerque' }, { '@type': 'City', name: 'Corrales' }],
    sameAs: [site.instagram, site.website],
    foundingDate: '2024',
    founder: [{ '@id': `${SITE}/#abie-gonzales` }, { '@id': `${SITE}/#laura-gonzales` }],
    employee: [
      { '@type': 'Person', '@id': `${SITE}/#abie-gonzales`, name: 'Abie Gonzales', jobTitle: 'Head Instructor', description: 'Brazilian Jiu-Jitsu black belt, two-time IBJJF No-Gi World Champion (purple and brown belt), IBJJF Master Worlds runner-up at brown belt, twenty years in the U.S. Army, three tours in Iraq, Bronze Star.', image: `${SITE}/img/abie.webp`, worksFor: { '@id': ID } },
      { '@type': 'Person', '@id': `${SITE}/#laura-gonzales`, name: 'Laura Gonzales', jobTitle: 'Co-owner and Assistant Kids Instructor', description: 'U.S. Army veteran, Level I and II Army Combatives certified.', image: `${SITE}/img/laura.webp`, worksFor: { '@id': ID } },
      { '@type': 'Person', name: 'Tito Valdez', jobTitle: 'Instructor, Brazilian Jiu-Jitsu black belt', worksFor: { '@id': ID } },
      { '@type': 'Person', name: 'Adriana Rascon', jobTitle: 'Instructor, Brazilian Jiu-Jitsu black belt', worksFor: { '@id': ID } },
      { '@type': 'Person', name: 'Brandon Romero', jobTitle: 'Assistant Kids Instructor', description: 'U.S. Army veteran.', worksFor: { '@id': ID } },
    ],
    knowsAbout: ['Brazilian Jiu-Jitsu', 'No-Gi Jiu-Jitsu', 'Kids martial arts', 'Self-defense'],
    makesOffer: [
      ['Toddlers Jiu-Jitsu (ages 4–5)', 'Thirty-minute classes, Monday to Wednesday at 4:30 PM, Gi and No-Gi.'],
      ['Kids Jiu-Jitsu (ages 6–13)', 'Every weekday at 5:00 PM and Saturday at 9:00 AM; Kids Comp on Fridays.'],
      ['Adult Jiu-Jitsu', 'Fundamentals, All Levels and Advanced, evenings at 6:00 PM, Gi at 11:00 AM on Tuesday and Thursday, Open Mat on Saturday.'],
      ['Free trial class', 'Your first class is free.'],
    ].map(([name, description]) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name, description, provider: { '@id': ID } } })),
    // the hours the academy publishes on gonzalesjj.com (03/11)
    openingHoursSpecification: [['Monday', '16:30', '20:00'], ['Tuesday', '16:30', '20:00'], ['Wednesday', '16:30', '20:30'], ['Thursday', '17:00', '20:30'], ['Friday', '17:00', '20:00'], ['Saturday', '09:00', '11:00']]
      .map(([dayOfWeek, opens, closes]) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek, opens, closes })),
    dateModified: MODIFIED,
  }
}

/** The JSON-LD of one route: the academy everywhere, FAQPage on / (the FAQ is visible there), breadcrumbs inside. */
export function jsonLd(r: Route) {
  const graph: unknown[] = [academy(), { '@type': 'WebSite', '@id': `${SITE}/#website`, url: url('/'), name: site.name, publisher: { '@id': ID } }]
  graph.push({ '@type': 'WebPage', '@id': `${url(r.path)}#webpage`, url: url(r.path), name: r.title, description: r.description, isPartOf: { '@id': `${SITE}/#website` }, about: { '@id': ID }, dateModified: MODIFIED, inLanguage: 'en-US' })
  if (r.path === '/') graph.push({ '@type': 'FAQPage', '@id': `${SITE}/#faq`, mainEntity: FAQ.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) })
  if (r.crumb) graph.push({ '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: url('/') }, { '@type': 'ListItem', position: 2, name: r.crumb, item: url(r.path) }] })
  return { '@context': 'https://schema.org', '@graph': graph }
}

/** /llms.txt: what the academy is, from the page's own facts. */
export function llms() {
  return `# ${site.name}

> Brazilian Jiu-Jitsu academy in Rio Rancho, New Mexico, for toddlers (4–5), kids (6–13) and adults, Gi and No-Gi. Run by the Gonzales family since 2024: head instructor Abie Gonzales, black belt and two-time IBJJF No-Gi World Champion, twenty years in the U.S. Army, and his wife Laura Gonzales, a U.S. Army veteran (Army Combatives Level I and II) who coaches the kids program. Your first class is free.

## Contact
- Address: 1630 Rio Rancho Blvd SE, Ste D, Rio Rancho, NM 87124 (Highway 528, just north of Intel)
- Phone (call or text): 505-477-6612
- Email: ${site.email}
- Instagram: ${site.instagram}
- Serves Rio Rancho, Albuquerque and Corrales

## Programs
- Toddlers (ages 4–5): thirty minutes, Monday to Wednesday at 4:30 PM. Gi on Monday and Tuesday, No-Gi on Wednesday.
- Kids (ages 6–13): every weekday at 5:00 PM and Saturday at 9:00 AM. Self-defense first; Kids Comp / Advanced on Friday.
- Adults: Fundamentals (Monday and Wednesday at 6:00 PM), All Levels (Tuesday and Friday at 6:00 PM), Advanced (Thursday at 6:00 PM), Adult Gi (Tuesday and Thursday at 11:00 AM), Open Mat (Saturday at 10:00 AM).
- 17 classes a week, Monday to Saturday, Mountain Time. Sunday closed.

## Getting started
- The first class is free. No experience needed. Bring shorts and a t-shirt; arrive ten minutes early.
- Memberships change with the monthly sign-up special: call or text 505-477-6612 for this month's price.
- Veterans can train through We Defy Foundation scholarships; city workers (police, fire, city employees) through One Pass, the City Government insurance plan.
- Every coach is IBJJF certified. Coaches: Abie Gonzales (black belt, head instructor), Laura Gonzales (assistant kids instructor), Tito Valdez (black belt), Adriana Rascon (black belt), Brandon Romero (assistant kids instructor, Army veteran).
- Front desk hours: Mon and Tue 4:30–8 PM, Wed 4:30–8:30 PM, Thu 5–8:30 PM, Fri 5–8 PM, Sat 9–11 AM, Sun closed.
- Current students: ${site.students}

## Pages
- [Home](${url('/')})
- [About](${url('/about')})
- [Instructors](${url('/instructors')})
- [Programs](${url('/programs')})
- [Schedule](${url('/schedule')})
- [Contact & free class](${url('/contact')})
`
}
