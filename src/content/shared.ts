// The copy every page shares: nav, menu, footer, mobile bar, FAQ.
export const nav = {
  home: 'Gonzales Jiu-Jitsu, home',
  pills: [
    { to: '/about', page: 'about', label: 'About' },
    { to: '/instructors', page: 'instructors', label: 'Instructors' },
    { to: '/programs', page: 'programs', label: 'Programs' },
    { to: '/schedule', page: 'schedule', label: 'Schedule' },
    { to: '/contact', page: 'contact', label: 'Contact' },
  ],
  callLabel: 'Call 505-414-8083',
  menu: 'Menu',
}

export const menu = {
  close: 'Close menu',
  label: 'Pages',
  links: [
    { to: '/', page: 'home', n: '01', label: 'Home' },
    { to: '/about', page: 'about', n: '02', label: 'About' },
    { to: '/instructors', page: 'instructors', n: '03', label: 'Instructors' },
    { to: '/programs', page: 'programs', n: '04', label: 'Programs' },
    { to: '/schedule', page: 'schedule', n: '05', label: 'Schedule' },
    { to: '/contact', page: 'contact', n: '06', label: 'Contact' },
  ],
  cta: 'Book your free class',
  address: '1630 Rio Rancho Blvd SE, Ste D · Rio Rancho, NM',
}

export const footer = {
  area: 'Rio Rancho · Albuquerque · Corrales',
  title: ['Your first class', 'is <em>on the house.</em>'],
  cta: 'Book your free class',
  logoAlt: 'Gonzales Jiu-Jitsu',
  about: 'Brazilian Jiu-Jitsu in Rio Rancho, NM, for toddlers, kids and adults, run by the Gonzales family since 2024.',
  social: { instagram: 'Instagram', website: 'Website', email: 'Email' },
  academy: {
    title: 'The academy',
    links: [
      { to: '/', label: 'Home' },
      { to: '/about', label: 'About' },
      { to: '/instructors', label: 'Instructors' },
      { to: '/programs', label: 'Programs' },
      { to: '/schedule', label: 'Schedule' },
      { to: '/contact', label: 'Contact' },
    ],
    book: 'Free class',
    students: 'Student login',
  },
  programs: {
    title: 'Programs',
    items: [
      { prog: 'toddlers', label: 'Toddlers ', note: '4–5' },
      { prog: 'kids', label: 'Kids ', note: '6–13' },
      { prog: 'kids', label: 'Kids Comp / Advanced' },
      { prog: 'adults', label: 'Adult Fundamentals' },
      { prog: 'adults', label: 'Adult All Levels ', note: 'Gi & No-Gi' },
      { prog: 'adults', label: 'Open Mat ', note: 'Sat' },
    ],
  },
  visit: {
    title: 'Visit',
    address: ['1630 Rio Rancho Blvd SE, Ste D', 'Rio Rancho, NM 87124'],
    hours: ['Mon – Fri 4:30 – 8:30 PM', 'Sat 9:00 – 11:00 AM · Sun closed'],
    directions: 'Get directions ',
  },
  base: { copy: ' Gonzales Jiu-Jitsu · 1630 Rio Rancho Blvd SE, Rio Rancho, NM', madeBy: 'Made by ', novo: 'Novo Dash' },
}

export const bar = { call: 'Call', cta: 'Book your free class' }

export const faq = {
  title: ['Before you <em>step on the mat.</em>'],
  foot: 'Anything else, call or text. A person answers. ',
}

export const crumbs = { label: 'Breadcrumb', home: 'Home' }

export const notFound = {
  crumb: 'Not found',
  kick: 'Error 404',
  h1: ['This page', '<em>is off the mat.</em>'],
  lead: 'The link may be old. Everything else is one tap away: the programs, the week, and your free class.',
  cta: 'Book your free class',
  micro: ['1630 Rio Rancho Blvd SE, Ste D', '505-414-8083'],
}
