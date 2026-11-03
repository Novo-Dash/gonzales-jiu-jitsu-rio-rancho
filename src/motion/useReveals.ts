// The prototype's reveal observer (core.js): .d, .rv and .scard get .in once they are 18% in view.
export function startReveals(root: ParentNode = document) {
  // the prerendered page starts the same observer inline, before the bundle (scripts/prerender.mjs)
  ;(window as { __ndReveal?: IntersectionObserver }).__ndReveal?.disconnect()
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }), { threshold: 0.18, rootMargin: '0px 0px -8% 0px' })
  root.querySelectorAll('.d:not(.in),.rv:not(.in),.scard:not(.in)').forEach(el => io.observe(el))
  return () => io.disconnect()
}
