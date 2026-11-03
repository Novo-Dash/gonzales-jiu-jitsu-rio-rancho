/* ============ SCHEDULE: the wall chart (the North Lakeland board) ============ */
if (document.getElementById('board')) {
  const board = document.getElementById('board'), smob = document.getElementById('smob'), stabs = document.getElementById('stabs');
  const tz = 'America/Denver', now = new Date();
  const today = DAYS.indexOf(new Intl.DateTimeFormat('en-US', { weekday: 'short', timeZone: tz }).format(now));
  const fmt = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', timeZone: tz });
  const dateOf = d => fmt.format(new Date(now.getTime() + ((d - today + 7) % 7) * 86400000));
  const prog = k => k === 'a' ? 'adults' : k === 'k' ? 'kids' : 'toddlers';
  const slot = s => `<button type="button" class="slot slot--${s.k}" data-k="${s.k}" data-prog="${prog(s.k)}"><b>${s.n}</b><span>${s.s}</span></button>`;
  const open = d => SLOTS.some(s => s.d === d);
  let h = '<table><thead><tr><th scope="col" class="corner"><span>Time</span></th>' + DAYS.map((d, i) => `<th scope="col" class="${i === today ? 'today ' : ''}${open(i) ? '' : 'closed'}"><span class="dname">${d}</span><span class="ddate">${i === today ? 'Today' : dateOf(i)}</span></th>`).join('') + '</tr></thead><tbody>';
  TIMES.forEach((t, ti) => {
    h += `<tr><th scope="row" class="time">${t}</th>` + DAYS.map((_, d) => {
      if (!open(d)) return ti === 0 ? `<td rowspan="${TIMES.length}" class="cl"><span>Closed</span></td>` : '';
      return `<td class="${d === today ? 'today' : ''}">${SLOTS.filter(s => s.d === d && s.t === t).map(slot).join('')}</td>`;
    }).join('') + '</tr>';
  });
  board.innerHTML = h + '</tbody></table>';
  board.querySelectorAll('td:not(.cl)').forEach(td => {
    td.addEventListener('mouseenter', () => { if (!td.querySelector('.slot')) return; td.parentElement.classList.add('hl'); const i = td.cellIndex; board.querySelectorAll('tbody tr').forEach(tr => tr.children[i]?.classList.add('hl')) });
    td.addEventListener('mouseleave', () => board.querySelectorAll('.hl').forEach(e => e.classList.remove('hl')));
  });
  document.getElementById('filters').addEventListener('click', e => {
    const b = e.target.closest('.fbtn'); if (!b) return;
    document.querySelectorAll('.fbtn').forEach(x => x.classList.toggle('on', x === b));
    const f = b.dataset.f; document.querySelectorAll('.slot').forEach(s => s.classList.toggle('dim', f !== 'all' && s.dataset.k !== f));
  });
  let mday = open(today) ? today : 1;
  const wire = root => root.querySelectorAll('.slot').forEach(b => b.addEventListener('click', () => openModal(b.dataset.prog)));
  const drawM = () => {
    stabs.innerHTML = DAYS.map((d, i) => open(i) ? `<button class="${i === mday ? 'on' : ''}" data-d="${i}">${d}</button>` : '').join('');
    smob.innerHTML = SLOTS.filter(s => s.d === mday).map(s => `<li><span class="time">${s.t}</span>${slot(s)}</li>`).join('');
    wire(smob);
  };
  stabs.addEventListener('click', e => { const b = e.target.closest('button'); if (b) { mday = +b.dataset.d; drawM() } });
  drawM(); wire(board);
}

