import { ScrollTrigger } from './core'

// The prototype's refresh.js: pins were created out of document order (matchMedia blocks),
// so every trigger gets a priority from its place in the DOM, then one sort and one refresh.
export function refreshInOrder() {
  const all = ScrollTrigger.getAll()
  const order = [...document.querySelectorAll('*')]
  all.forEach(st => { st.vars.refreshPriority = -order.indexOf(st.trigger as Element) })
  ScrollTrigger.sort()
  ScrollTrigger.refresh()
}
