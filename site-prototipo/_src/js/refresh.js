/* pins were created out of document order (matchMedia blocks); sort before measuring */
{
  const all = ScrollTrigger.getAll(); const order = [...document.querySelectorAll('*')];
  all.forEach(st => { st.vars.refreshPriority = -order.indexOf(st.trigger) });
  ScrollTrigger.sort(); ScrollTrigger.refresh();
}
addEventListener("load", () => ScrollTrigger.refresh());
