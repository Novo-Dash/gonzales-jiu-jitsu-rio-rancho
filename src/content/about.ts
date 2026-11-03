// /about copy (about.body.html), verbatim.
export const hero = {
  crumb: 'About',
  kick: 'The family behind the mat',
  h1: ['Built by a family.', '<em>Run like one.</em>'],
  lead: 'Abie and Laura Gonzales built this mat for their three sons first. In 2024 they opened the door to Rio Rancho.',
  cta: 'Book your free class',
  micro: ['Est. 2024', 'Two U.S. Army veterans', 'IBJJF certified coaches'],
  img: 'hero',
  alt: 'The Gonzales Jiu-Jitsu team on the mat in Rio Rancho',
  pos: '50% 40%',
}

export const crest = {
  act: ['I', 'About · The crest'],
  title: ['Three words', '<em>on the crest.</em>'],
  words: [
    { n: '01', b: 'Competition', p: 'A two-time IBJJF No-Gi World Champion runs the room. Fridays belong to the kids who want to compete.' },
    { n: '02', b: 'Family', p: 'The kids program came first, built for their own sons. All three grew up competing.' },
    { n: '03', b: 'Community', p: 'We Defy scholarships for veterans, One Pass for city workers, and an open mat on Saturday.' },
  ],
  quote: '“The logo says it all.”',
  cite: 'Eloisa W. · Google review',
}

// The founders, laid out as the BJJ Boston coach section (03/11): photo beside the copy, the second mirrored.
// The name tape stays the eyebrow; the black belt bar only for Abie (Laura's rank is not published).
export const founders = {
  act: ['II', 'About · The founders'],
  title: ['Same name tape.', '<em>Same mat.</em>'],
  tape: 'GONZALES',
  people: [
    { id: 'abie', photo: 'abie', alt: 'Abie Gonzales, black belt, in a white gi', pos: '50% 14%', name: 'Abie Gonzales', role: 'Black belt · Head instructor', belt: 'Black belt',
      cap: ['Black belt', '2× IBJJF No-Gi World Champion', 'Bronze Star'],
      bio: 'A black belt with a background in wrestling and MMA, Abie won IBJJF No-Gi world titles at purple and brown belt and took second at the IBJJF Master Worlds. Before the mat came twenty years in the U.S. Army and three tours in Iraq.',
      stats: [['20', 'Years in the U.S. Army'], ['2×', 'IBJJF No-Gi world titles'], ['3', 'Tours in Iraq']],
      cta: 'Train with Abie, free', prog: '' },
    { id: 'laura', photo: 'laura', alt: 'Laura Gonzales on the podium with a medal', pos: '50% 26%', name: 'Laura Gonzales', role: 'Co-owner · Kids instructor',
      cap: ['U.S. Army veteran', 'Combatives Level I and II', 'Kids program'],
      bio: 'Laura met Abie on a U.S. Army tour in Iraq, running resupply missions across Maysan Province; they married in 2012. She earned her Army Combatives certificates at Fort Carson, then left the Army to focus on martial arts. Today she coaches the kids program beside him.',
      quote: "“Every night we're here in the gym, we're on the mat together as a family.”", source: 'KRQE',
      stats: [['2012', 'Married, after Iraq'], ['3', 'Sons who compete'], ['2024', 'Opened the academy']],
      cta: 'Book a kids class', prog: 'kids' },
  ],
  foot: 'Their three sons grew up competing. <b>Every coach here is IBJJF certified.</b>',
  teamLink: 'Meet the instructors',
}

export const room = {
  act: ['III', 'About · The room'],
  title: ['The room,', '<em>on any given night.</em>'],
  quote: '“After my daughter faced bullying at school, we enrolled her in jiu-jitsu with Professor Abie, Coach Laura, and Coach Brandon. The transformation has been incredible.”',
  cite: 'Kenneth B. · Parent · Google review',
  filmLabel: 'Photos of classes at Gonzales Jiu-Jitsu',
  strips: [
    // 03/11: the academy's own photos (gonzalesjj.com, full size) instead of the 243px Google ones
    { dir: '-1', photos: [['rm-01', 'A student pinning a partner in side control'], ['rm-02', 'Two students rolling on the open mat'], ['rm-03', 'A rear mount, gi against no-gi'], ['rm-04', 'Two students scrambling on the mat'], ['rm-05', 'A student working from bottom'], ['rm-06', 'Two students in white gis drilling'], ['rm-07', 'A coach in a black gi working with a student']] },
    { dir: '1', photos: [['rm-08', 'Two students in a guard exchange'], ['rm-09', 'Students rolling along the wall'], ['rm-10', 'A coach and a student in a scramble'], ['rm-11', 'Two students on the mat by the wall'], ['rm-12', 'A coach and a kid drilling'], ['rm-13', 'An inverted guard during sparring'], ['rm-14', 'A coach showing a throw to a kid']] },
  ],
  src: 'Photos from the academy.',
}
