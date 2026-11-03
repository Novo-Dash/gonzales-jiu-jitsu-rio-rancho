// /schedule copy (schedule.body.html) and the board's labels, shared with the home (sched.js), verbatim.
export const board = {
  filters: [['all', 'All classes'], ['t', 'Toddlers'], ['k', 'Kids'], ['a', 'Adults']],
  time: 'Time',
  today: 'Today',
  closed: 'Closed',
  foot: ['Mountain Time · 17 classes a week · Sunday closed', 'Every class is a button: tap one to book it.'],
}

export const hero = {
  crumb: 'Schedule',
  kick: 'Six days a week',
  h1: ['The week,', '<em>class by class.</em>'],
  lead: 'Seventeen classes, Monday to Saturday, after school and after work. Every class on the board books in two minutes.',
  cta: 'See the board',
  micro: ['17 classes a week', 'Gi & No-Gi', 'Sunday closed'],
  img: 'women',
  alt: 'Students drilling on the mat',
  pos: '50% 52%',
}

export const boardHead = { act: ['01', 'The board · Mountain Time'], title: ['Tap a class <em>to book it.</em>'] }

export const today = {
  k: 'Today in Rio Rancho',
  when: 'Next on the mat',
  whenPrefix: 'Next on the mat · ',
  todayWord: 'Today',
  tomorrow: 'Tomorrow',
  book: 'Book this class',
}

export const know = {
  act: ['02', 'Before you come'],
  title: ['Good <em>to know.</em>'],
  items: [
    { icon: 'i-check', text: '<b>First night?</b> Adult Fundamentals, Monday and Wednesday at 6:00 PM. No experience needed.' },
    { icon: 'i-clock', text: '<b>Toddlers</b> is thirty minutes, Monday to Wednesday at 4:30 PM.' },
    { icon: 'i-arrow', text: '<b>Competing?</b> Kids Comp is Friday at 5:00 PM. Adult Advanced is Thursday at 6:00 PM.' },
    { icon: 'i-plus', text: '<b>What to bring:</b> shorts and a t-shirt for your free class. We take it from there.' },
  ],
}
