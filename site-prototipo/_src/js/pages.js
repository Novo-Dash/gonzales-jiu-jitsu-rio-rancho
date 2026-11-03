
/* ============ SITE HELPERS ============ */
const TZ = 'America/Denver';
const toMin = t => { const [hm, ap] = t.split(' '); let [h, m] = hm.split(':').map(Number); if (ap === 'PM' && h !== 12) h += 12; if (ap === 'AM' && h === 12) h = 0; return h * 60 + m };
const nowDenver = () => {
  const p = Object.fromEntries(new Intl.DateTimeFormat('en-US', { timeZone: TZ, weekday: 'short', hour: 'numeric', minute: 'numeric', hourCycle: 'h23' }).formatToParts(new Date()).map(x => [x.type, x.value]));
  return { d: DAYS.indexOf(p.weekday), m: (+p.hour % 24) * 60 + (+p.minute) };
};
const FULL = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const progOf = k => k === 'a' ? 'adults' : k === 'k' ? 'kids' : 'toddlers';
const kOf = p => p === 'adults' ? 'a' : p === 'kids' ? 'k' : 't';
const shortName = s => s.k === 'a' ? s.n.replace('Adult ', '') : s.n.includes('Comp') ? 'Comp · Gi' : s.s.split(' · ')[0];
const slotsOf = k => SLOTS.filter(s => s.k === k).sort((a, b) => a.d - b.d || toMin(a.t) - toMin(b.t));

/* ============ PAGE HERO: the doorway widens to the edges as you walk past it ============ */
gsap.matchMedia().add(LIVE, () => {
  if (!motion) return;
  document.querySelectorAll('.phero').forEach(h => {
    const arch = h.querySelector('[data-arch]'); if (!arch) return;
    const w0 = () => Math.min(1240, innerWidth - 32), r0 = () => arch.offsetHeight + 'px';
    const tl = gsap.timeline({ scrollTrigger: { trigger: h, start: 'top top', end: 'bottom top', scrub: .6, invalidateOnRefresh: true } });
    tl.fromTo(arch, { width: w0, borderTopLeftRadius: r0, borderTopRightRadius: r0 }, { width: () => innerWidth, borderTopLeftRadius: '0px', borderTopRightRadius: '0px', ease: 'power2.out', duration: .6 }, 0)
      .fromTo(arch.querySelector('img'), { scale: 1.1 }, { scale: 1, ease: 'none', duration: 1 }, 0)
      .to(h.querySelector('.phero__copy'), { y: -60, autoAlpha: 0, ease: 'power1.in', duration: .55 }, 0);
  });
});

/* ============ ABOUT · THE CREST: the ring turns with the scroll; the word under the red marker is the one lit ============ */
{
  const ring = document.getElementById('crestRing'), items = [...document.querySelectorAll('#crestWords li')];
  if (ring) {
    let cur = 0; const light = i => { if (i === cur) return; cur = i; items.forEach((li, k) => li.classList.toggle('on', k === i)) };
    if (motion) ScrollTrigger.create({ trigger: '#crest', start: 'top 70%', end: 'bottom 30%', scrub: .8,
      onUpdate: s => { const rot = -60 - s.progress * 240; ring.style.transform = `rotate(${rot}deg)`; light(Math.min(2, Math.max(0, Math.round(s.progress * 2)))) } });
    items.forEach((li, i) => li.addEventListener('mouseenter', () => { if (!motion) light(i) }));
  }
}

/* ============ ABOUT · THE FOUNDERS: the name tape is laid down, then sewn on ============ */
document.querySelectorAll('.tape').forEach((t, i) => {
  const st = t.querySelector('svg');
  gsap.set(st, { clipPath: 'inset(0 100% 0 0)' });
  ScrollTrigger.create({ trigger: t.closest('.fcard'), start: 'top 78%', once: true, onEnter: () => {
    gsap.timeline({ delay: i * .25 })
      .to(t, { clipPath: 'inset(0 0% 0 0)', duration: .8, ease: 'power3.inOut' })
      .to(st, { clipPath: 'inset(0 0% 0 0)', duration: 1.1, ease: 'none' }, '-=.1');
  } });
});

/* ============ ABOUT · THE ROOM: two strips of film slide against each other with the scroll ============ */
document.querySelectorAll('.film__strip').forEach(strip => {
  const row = strip.querySelector('.film__row');
  row.innerHTML += row.innerHTML;                                   // doubled, so the strip never runs out
  row.querySelectorAll('img').forEach((im, i) => { if (i >= row.children.length / 2) im.alt = '' });
  const dir = +strip.dataset.dir;
  if (motion) gsap.fromTo(row, { xPercent: dir < 0 ? 0 : -22 }, { xPercent: dir < 0 ? -22 : 0, ease: 'none', scrollTrigger: { trigger: '#room', start: 'top bottom', end: 'bottom top', scrub: .6 } });
});

/* ============ PROGRAMS · THE WEEK OF EACH PROGRAM: the board, cut down to one program ============ */
document.querySelectorAll('.mweek').forEach(w => {
  const k = w.dataset.k, today = nowDenver().d;
  w.innerHTML = [1, 2, 3, 4, 5, 6].map(d => {
    const ss = slotsOf(k).filter(s => s.d === d);
    return `<div class="mweek__d${d === today ? ' today' : ''}"><b>${DAYS[d]}</b>${ss.length ? ss.map(s => `<button type="button" class="mweek__s" data-book data-prog="${progOf(k)}"><span>${s.t}</span><small>${shortName(s)}</small></button>`).join('') : '<span class="mweek__none">—</span>'}</div>`;
  }).join('');
});

/* ============ PROGRAMS · THE GROWTH CHART: the band climbs to the age of the chapter you're reading ============ */
{
  const ruler = document.getElementById('ruler');
  if (ruler) {
    const y = a => (1 - (a - 3) / 11) * 75 + 25;                  // ages 3–14 fill the lower three quarters; adults sit above a break
    document.getElementById('rulerTicks').innerHTML = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(a => `<li class="${[4, 6, 13].includes(a) ? 'l' : ''}" style="top:${y(a)}%">${[4, 6, 13].includes(a) ? `<span>${a}</span>` : ''}</li>`).join('')
      + `<li class="l" style="top:9%"><span>Adults</span></li>`;
    const band = document.getElementById('rulerBand'), age = document.getElementById('rulerAge'), name = document.getElementById('rulerName');
    const set = c => {
      const from = +c.dataset.from, to = +c.dataset.to;
      const top = from >= 14 ? 0 : y(to + 1), bot = from >= 14 ? 18 : y(from);
      band.style.top = top + '%'; band.style.height = (bot - top) + '%';
      if (age.textContent !== c.dataset.age) { age.textContent = c.dataset.age; name.textContent = c.dataset.name; gsap.fromTo([age, name], { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: .5, stagger: .05, ease: 'power3.out' }) }
    };
    const chaps = [...document.querySelectorAll('.chap')]; set(chaps[0]);
    chaps.forEach(c => ScrollTrigger.create({ trigger: c, start: 'top 55%', end: 'bottom 55%', onToggle: s => { if (s.isActive) set(c) } }));
  }
  if (motion) gsap.matchMedia().add(LIVE, () => document.querySelectorAll('.chap__photo img').forEach(im => gsap.fromTo(im, { yPercent: -10 }, { yPercent: 0, ease: 'none', scrollTrigger: { trigger: im.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } })));
}

/* ============ SCHEDULE · TODAY: the next class, a countdown, and the day as a line with a red "now" ============ */
{
  const clock = document.getElementById('clock');
  if (clock) {
    const $ = id => document.getElementById(id);
    const fmtNow = m => { const h = Math.floor(m / 60), mm = String(m % 60).padStart(2, '0'); return `${(h % 12) || 12}:${mm} ${h < 12 ? 'AM' : 'PM'}` };
    const draw = () => {
      const now = nowDenver();
      $('tNow').textContent = `${FULL[now.d]} · ${fmtNow(now.m)}`;
      let next = null, off = 0;
      for (off = 0; off < 8 && !next; off++) {
        const d = (now.d + off) % 7;
        next = SLOTS.filter(s => s.d === d && (off > 0 || toMin(s.t) > now.m)).sort((a, b) => toMin(a.t) - toMin(b.t))[0] || null;
      }
      off--;
      const when = off === 0 ? 'Today' : off === 1 ? 'Tomorrow' : FULL[next.d];
      $('tWhen').textContent = `Next on the mat · ${when}`;
      $('tTime').textContent = next.t;
      $('tName').textContent = `${next.n} · ${next.s}`;
      const diff = off * 1440 + toMin(next.t) - now.m, h = Math.floor(diff / 60), mm = diff % 60;
      $('tIn').textContent = diff < 60 ? `in ${mm} min` : diff < 1440 ? `in ${h} h ${String(mm).padStart(2, '0')} min` : `${FULL[next.d]}`;
      $('tBook').dataset.prog = progOf(next.k);
      // the line: that day's classes from 8 AM to 8 PM
      const day = SLOTS.filter(s => s.d === next.d).sort((a, b) => toMin(a.t) - toMin(b.t));
      // the line spans that day's classes, with room on both sides; "now" is pinned to the left edge if it's earlier
      const lo = toMin(day[0].t) - 60, hi = toMin(day[day.length - 1].t) + 90, X = m => Math.max(0, Math.min(100, ((m - lo) / (hi - lo)) * 100));
      $('tLine').innerHTML = '<i class="clock__rail"></i>' + day.map(s => `<i class="clock__dot${s === next ? ' next' : off === 0 && toMin(s.t) <= now.m ? ' past' : ''}" style="left:${X(toMin(s.t))}%"><span>${s.t}</span></i>`).join('')
        + (off === 0 && now.m <= hi ? `<i class="clock__nowm${now.m < lo ? ' early' : ''}" style="left:${X(now.m)}%"></i>` : '');
    };
    draw(); setInterval(draw, 30000);
  }
}

/* ============ CONTACT · THE PASS: pick a program, the days appear; the stub fills in; sent, it's stamped ============ */
{
  const tk = document.getElementById('ticket');
  if (tk) {
    const days = document.getElementById('tkDays'), $ = id => document.getElementById(id);
    const setStub = (id, v) => { const el = $(id); if (el.textContent !== v) { el.textContent = v; gsap.fromTo(el, { y: 8, opacity: 0 }, { y: 0, opacity: 1, duration: .4, ease: 'power3.out' }) } };
    const pickProg = p => {
      const k = kOf(p), list = slotsOf(k);
      setStub('stProg', { toddlers: 'Toddlers', kids: 'Kids', adults: 'Adults' }[p]); setStub('stDay', '—'); setStub('stTime', '—');
      days.innerHTML = list.map((s, i) => `<label><input type="radio" name="slot" value="${i}" required><span>${DAYS[s.d]}<small>${s.t}</small></span></label>`).join('');
      days.querySelectorAll('input').forEach(inp => inp.addEventListener('change', () => { const s = list[+inp.value]; setStub('stDay', FULL[s.d]); setStub('stTime', s.t) }));
      gsap.from(days.children, { y: 10, opacity: 0, duration: .4, stagger: .03, ease: 'power3.out' });
    };
    tk.querySelectorAll('input[name="prog"]').forEach(r => r.addEventListener('change', () => pickProg(r.value)));
    // anywhere on this page, "book" means this ticket
    document.addEventListener('click', e => {
      const a = e.target.closest('[data-book]'); if (!a || a.closest('#ticket')) return;
      e.stopImmediatePropagation(); e.preventDefault(); closeMenu();
      scrollToEl(document.getElementById('start'));
      const r = a.dataset.prog && tk.querySelector(`input[name="prog"][value="${a.dataset.prog}"]`); if (r) { r.checked = true; pickProg(r.value) }
    }, true);
    tk.addEventListener('submit', e => {
      e.preventDefault();
      let ok = true;
      tk.querySelectorAll('.tk__f').forEach(f => { const bad = !f.querySelector('input').value.trim(); f.classList.toggle('bad', bad); if (bad) ok = false });
      if (!tk.querySelector('input[name="prog"]:checked') || !tk.querySelector('input[name="slot"]:checked')) { ok = false; $('tkMsg').textContent = 'Pick a program and a day.' }
      if (!ok) { gsap.fromTo(tk, { x: -6 }, { x: 0, duration: .5, ease: 'elastic.out(1,.3)' }); return }
      $('tkMsg').textContent = "Sent. We'll call you to confirm.";
      tk.querySelector('button[type="submit"]').firstChild.textContent = 'Sent';
      gsap.fromTo('#stStamp', { opacity: 0, scale: 1.8, rotate: -24 }, { opacity: 1, scale: 1, rotate: -14, duration: .35, ease: 'power4.in' });
      gsap.fromTo(tk, { y: 0 }, { y: 4, duration: .08, yoyo: true, repeat: 1, delay: .3 });
    });
  }
}

/* ============ CONTACT · VISIT: class start times per day, copy buttons ============ */
{
  const dl = document.getElementById('vHours');
  if (dl) {
    const today = nowDenver().d;
    dl.innerHTML = [1, 2, 3, 4, 5, 6, 0].map(d => {
      const ss = SLOTS.filter(s => s.d === d).sort((a, b) => toMin(a.t) - toMin(b.t));
      const am = ss.filter(s => s.t.endsWith('AM')).map(s => s.t.replace(' AM', '')), pm = ss.filter(s => s.t.endsWith('PM')).map(s => s.t.replace(' PM', ''));
      const txt = !ss.length ? 'Closed' : [am.length ? am.join(', ') + ' AM' : '', pm.length ? pm.join(', ') + ' PM' : ''].filter(Boolean).join(' · ');
      const t = d === today ? ' class="today"' : '';
      return `<dt${t}>${DAYS[d]}</dt><dd${t}>${txt}</dd>`;
    }).join('');
  }
  document.querySelectorAll('[data-copy]').forEach(b => b.addEventListener('click', () => {
    navigator.clipboard?.writeText(b.dataset.copy).then(() => { b.textContent = 'Copied'; b.classList.add('done'); setTimeout(() => { b.textContent = 'Copy'; b.classList.remove('done') }, 1500) }).catch(() => {});
  }));
}
