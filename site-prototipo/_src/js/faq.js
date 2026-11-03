/* ============ FAQ ============ */
if (document.getElementById('faqList')) {
  const list = document.getElementById('faqList');
  list.innerHTML = FAQ.map((f, i) => `<div class="qa rv" data-delay="${Math.min(i, 4)}"><button class="qa__btn" aria-expanded="false"><span class="qa__n">0${i + 1}</span><span class="qa__q">${f[0]}</span><span class="qa__i"><svg class="ic" style="stroke-width:2.6"><use href="#i-plus"/></svg></span></button><div class="qa__a"><div><p>${f[1]}</p></div></div></div>`).join('');
  list.addEventListener('click', e => {
    const b = e.target.closest('.qa__btn'); if (!b) return; const qa = b.parentElement; const open = qa.classList.contains('open');
    list.querySelectorAll('.qa.open').forEach(q => { q.classList.remove('open'); q.querySelector('.qa__btn').setAttribute('aria-expanded', 'false') });
    if (!open) { qa.classList.add('open'); b.setAttribute('aria-expanded', 'true') }
  });
  list.querySelector('.qa__btn').click();
  onView();
}
