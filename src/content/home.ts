// Home copy (site-prototipo/_src/html/home.body.html), verbatim.
export const hero = {
  h1: ['Jiu-Jitsu in Rio Rancho,', 'taught by <em>a family.</em>'],
  sub: 'Toddlers from four, kids to thirteen, adults at every level, coached by a two-time World Champion and his family. Your first class is free.',
  cta: 'Book your free class',
  micro: ['No experience needed', 'Gi or No-Gi', 'Hwy 528, north of Intel'],
  imgAlt: 'The Gonzales Jiu-Jitsu team on the mat in Rio Rancho',
  stamps: ['Competition', 'Family', 'Community'],
  stampsLine: 'Three words on the crest. Three reasons people train here.',
}

export const gates = [
  { from: '#111110', to: '#fbfaf7', ink: '#fff', act: 'Act I', word: 'Family', line: 'Built for their own three sons first. Then for yours.' },
  { from: '#111110', to: '#ffffff', ink: '#fff', act: 'Act II', word: 'Competition', line: 'Two world titles on the mat you train on.' },
  { from: '#ffffff', to: '#111110', ink: '#111110', act: 'Act III', word: 'Community', line: 'Veterans, first responders, neighbors. The room that has your back.', light: true },
]

export const zoom = {
  label: 'The mat',
  photos: ['hero', 'kids', 'adults', 'toddlers', 'women', 'roll', 'drill'],
  eyebrow: 'Act I · Family',
  line: 'One mat. <em>Every age.</em>',
  sub: 'Toddlers at 4:30, Kids at 5, Adults at 6. Same floor, same night.',
}

export const wall = {
  act: ['I', 'Family · Programs'],
  title: ['Three mats.', '<em>One family.</em>'],
  sub: 'Every program trains Gi and No-Gi. Start where your <br class="dbr">age puts you, move up when your coach says so.',
  go: 'Book a free class',
  // no description on the home cards (03/11): the /programs page carries it
  doors: [
    { prog: 'toddlers', photo: 'toddlers', alt: 'Two kids drilling on the mat', no: '01', age: 'Ages 4–5', name: 'Toddlers', meta: ['30 min', 'Mon – Wed · 4:30 PM', 'Gi & No-Gi'] },
    { prog: 'kids', photo: 'kids', alt: 'Kids class practicing a takedown', no: '02', age: 'Ages 6–13', name: 'Kids', meta: ['Mon – Fri · 5:00 PM', 'Sat · 9:00 AM', 'Comp on Fridays'] },
    { prog: 'adults', photo: 'adults', alt: 'Adults rolling on the mat', no: '03', age: 'Adults', name: 'Adults', meta: ['Mon – Fri · 6:00 PM', 'Tue & Thu · 11:00 AM', 'Sat · Open Mat'] },
  ],
}

export const parents = {
  act: ['I', 'Family · For parents'],
  title: ['What they', '<em>come home with.</em>'],
  sub: 'Abie and Laura built the kids program first, for their own sons. Classes are taught self-defense style, and every stripe is earned. These four come first.',
  cards: [
    { art: 'calm', n: '01', h: 'Calm', p: "Breathe, keep your head, don't panic under pressure." },
    { art: 'position', n: '02', h: 'Position', p: 'Hold your ground, control the distance, stay on top.' },
    { art: 'escape', n: '03', h: 'Escape', p: 'Get out, get up, get away safe. Then tell an adult.' },
    { art: 'confidence', n: '04', h: 'Confidence', p: 'The quiet kind. Coached by parents, Army veterans, IBJJF certified.' },
  ],
  quote: "“Every night we're here in the gym, we're on the mat together as a family.” ",
  cite: 'Laura Gonzales, co-owner · ',
  source: 'KRQE',
}

export const champion = {
  pass: {
    hd: ['Gonzales Jiu-Jitsu', 'Head instructor'],
    photoAlt: 'Abie Gonzales, black belt, in a white gi on the mat',
    rows: [['Name', 'Abie Gonzales'], ['Rank', 'Black belt'], ['Service', 'U.S. Army · 20 yrs'], ['Academy', 'Est. 2024'], ['Home mat', 'Rio Rancho, NM']],
    mrz: ['P<USAGONZALES<<ABIE<<<<<<<<<<<<<<<<<<<<<<<<<<<<', 'GJJ2024<<RIORANCHO<NM<<BLACKBELT<<IBJJF<<<<<<<<<<'],
    hd2: ['Record', 'Competition · Service'],
    stampsLabel: 'Two-time IBJJF No-Gi World Champion. Twenty years in the U.S. Army, three tours in Iraq, Bronze Star. IBJJF certified black belt.',
  },
  act: ['II', 'Competition · Head instructor'],
  title: ['Two world titles.', '<em>Twenty years</em> of service.'],
  body: [
    'Abie Gonzales is a black belt and two-time IBJJF No-Gi World Champion, with a background in wrestling and MMA. Before the mat came twenty years in the U.S. Army, three tours in Iraq and a Bronze Star.',
    'He opened Gonzales Jiu-Jitsu in 2024 with his wife Laura, a fellow Army veteran he met on deployment in Iraq. All three of their sons grew up competing. Every coach on this mat is IBJJF certified.',
  ],
  cta: 'Train with Abie, free',
}

// ACT II · the head instructor on the mat (03/11): the Go Rin coach section (Renato), for Abie. The photo
// strip runs above; Abie stands in the middle in front of his name. abie-cut is provisional until the
// cut-out arrives (same file name).
export const coachStage = {
  act: ['II', 'Competition · On the mat'],
  title: ['Abie <em>Gonzales.</em>'],
  rank: 'Black belt, two-time IBJJF No-Gi World Champion, twenty years in the U.S. Army.',
  bio: 'Wrestling, MMA and a black belt he earned competing: IBJJF No-Gi world titles at purple and brown, second at the Master Worlds. Three tours in Iraq and a Bronze Star taught him the rest. On the mat he builds confidence first, in kids and adults alike.',
  cta: 'Train with Abie, free',
  first: 'Abie',
  last: ' Gonzales',
  cutAlt: 'Abie Gonzales, black belt, in a white gi',
}

export const served = {
  act: ['III', 'Community · Veterans & first responders'],
  title: ['Served? <em>Train on us.</em>'],
  sub: 'Two ways in for the people who show up for everyone else. The head instructor is one of you.',
  boots: { k: 'We Defy Foundation', h: 'Scholarships for veterans', p: 'Gonzales Jiu-Jitsu is a We Defy participating gym. Current and former service members apply through the foundation, get approved, then call us to start.', link: 'Apply through We Defy' },
  fire: { k: 'One Pass · City Government plan', h: 'Police, fire, city workers', p: 'The only Brazilian Jiu-Jitsu school on the City Government insurance plan. If you work for the city, your One Pass gets you on the mat.', link: 'Book with One Pass' },
}

// ACT III · the mat, in pictures (03/11): the academy's own photos, a row you can swipe or drag
export const gallery = {
  act: ['III', 'Community · The mat'],
  title: ['Six nights a week,', '<em>one family.</em>'],
  sub: 'Kids, parents, veterans and competitors on the same floor in Rio Rancho.',
  prev: 'Previous photos',
  next: 'Next photos',
  label: 'Photos from Gonzales Jiu-Jitsu',
  photos: [
    ['c-01', 'The Gonzales Jiu-Jitsu team, kids and adults, under the crest'], ['c-02', 'A coach with two kids in their gis'], ['c-03', 'A coach talking to the kids class'],
    ['c-04', 'A full class rolling under the flag'], ['c-05', 'Three kids drilling together'], ['c-06', 'A coach watching two students roll'],
    ['c-07', 'Students rolling while the class looks on'], ['c-08', 'A coach and a student in a guard exchange'], ['c-09', 'A student passing guard'],
    ['c-10', 'Two students rolling, gi and no-gi'], ['c-11', 'A sweep from bottom'], ['c-12', 'Two students on the mat after a roll'],
  ],
}

export const reviewsIntro = {
  // the two orbits: [face, starting angle]
  lanes: [[['face-1', '40deg'], ['face-6', '130deg'], ['face-3', '220deg'], ['face-8', '310deg']], [['face-5', '0deg'], ['face-2', '90deg'], ['face-7', '180deg'], ['face-4', '270deg']]],
  act: ['III', 'Community · Reviews'],
  title: ['Trusted by the families', 'of <em>Rio Rancho.</em>'],
  sub: 'Parents, beginners and competitors on the same mat. Read why they stayed.',
  ghost: 'Read the reviews',
}

export const reviews = {
  act: ['III', 'Community · What they say'],
  title: ['Why they <em>train here.</em>'],
  prev: 'Previous review',
  next: 'Next review',
  label: 'Reviews',
  foot: 'Google reviews from Rio Rancho parents and students.',
  cta: 'Book your free class',
}

export const steps = {
  act: ['III', 'Community · Your first class'],
  title: ['Walk in. <em>Four steps.</em>'],
  cards: [
    { no: '01', h: 'Book <em>it.</em>', p: 'Pick Toddlers, Kids or Adults and a day that works. We hold your spot.', icon: 'i-clock', t: '2 minutes' },
    { no: '02', h: 'Show <em>up.</em>', p: 'Ten minutes early, shorts and a t-shirt. Hwy 528, north of Intel. We walk you in.', icon: 'i-pin', t: '1630 Rio Rancho Blvd SE' },
    { no: '03', h: 'Train <em>light.</em>', p: 'Warm-up, technique, drilling with a partner. Nobody gets thrown in with the sharks.', icon: 'i-clock', t: '60–90 minutes' },
    { no: '04', h: 'Decide <em>later.</em>', p: "Liked it? Ask about this month's sign-up special. Didn't? No charge, no pitch.", icon: 'i-check', t: 'Your call' },
  ],
  cta: 'Book your free class',
  call: 'Or call ',
  belt: 'Your first class · Four steps · On the house',
}

export const schedule = {
  act: ['III', 'Community · The week'],
  title: ['Six days. <em>After school, after work.</em>'],
}

export const faqHead = { act: ['?', 'Questions'] }
