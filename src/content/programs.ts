// /programs copy (programs.body.html), verbatim.
export const hero = {
  crumb: 'Programs',
  kick: 'Toddlers · Kids · Adults',
  h1: ['Start where', '<em>your age puts you.</em>'],
  lead: 'Toddlers from four, kids six to thirteen, adults from their first night to the competition room. Every program trains Gi and No-Gi.',
  cta: 'Book your free class',
  micro: ['17 classes a week', 'Gi & No-Gi', 'First class free'],
  img: 'kids',
  alt: 'Kids class practicing a takedown',
  pos: '50% 46%',
}

export const ages = {
  label: 'The three programs',
  ruler: { age: '4–5', name: 'Toddlers', adults: 'Adults' },
  none: '—',
  chapters: [
    { id: 'toddlers', k: 't', from: '4', to: '5', age: '4–5', name: 'Toddlers', labelledby: 'ch-t', photo: 'toddlers', alt: 'Two young kids drilling on the mat', pos: '50% 50%',
      act: ['01', 'Ages 4–5 · 30 minutes'], title: ['Toddlers.', '<em>The first belt.</em>'],
      txt: 'Thirty minutes on the mat, three afternoons a week. Gi on Monday and Tuesday, No-Gi on Wednesday.',
      cta: 'Book a toddler class', prog: 'toddlers' },
    { id: 'kids', k: 'k', from: '6', to: '13', age: '6–13', name: 'Kids', labelledby: 'ch-k', photo: 'coaches-mat', alt: 'Two coaches in their gis on the mat', pos: '50% 60%',
      act: ['02', 'Ages 6–13 · Gi & No-Gi'], title: ['Kids.', '<em>Self-defense first.</em>'],
      txt: 'Every weekday at five and Saturday morning. Taught by parents and Army veterans; Friday is the class for the kids who want to compete.',
      chips: ['Calm', 'Position', 'Escape', 'Confidence'],
      quote: '“Taught him so much more than self-defense.”', cite: 'Sonja C. · Parent',
      cta: 'Book a kids class', prog: 'kids' },
    { id: 'adults', k: 'a', from: '14', to: '19', age: 'Adults', name: 'All levels', labelledby: 'ch-a', photo: 'adults', alt: 'Adults rolling on the mat', pos: '50% 40%',
      act: ['03', 'Adults · Day one to advanced'], title: ['Adults.', '<em>From your first night.</em>'],
      txt: "Fundamentals if you've never stepped on a mat. All Levels and Advanced when you're ready. Gi at eleven twice a week, Open Mat on Saturday.",
      quote: '“Walked in not knowing what anything was. Good thing coaching and people are awesome.”', cite: 'Marcus B. · Student',
      cta: 'Book an adult class', prog: 'adults' },
  ],
}
