/* ============ HERO: the doorway opens into the whole screen, the three words of the crest ============ */
gsap.matchMedia().add(LIVE, () => {
  if (!motion) return;
  const hero = document.querySelector('.hero'); hero.classList.add('is-live');
  const bg = document.getElementById('heroBg'), stage = document.querySelector('.hero__stage');
  const stamps = gsap.utils.toArray('#stamps .stamp');
  const aw = () => Math.min(1240, innerWidth - 32) + 'px';
  bg.style.setProperty('--aw', aw());
  const tl = gsap.timeline({ scrollTrigger: { trigger: '#heroPin', start: 'top top', end: () => '+=' + innerHeight * 1.7, pin: true, scrub: 0.6, anticipatePin: 1, invalidateOnRefresh: true, onUpdate: st => bg.classList.toggle('is-full', st.progress > .56) } });
  tl.fromTo(bg, { '--ay': '60svh', '--aw': aw, '--ah': '46svh', '--ar': '999px 999px 0px 0px' }, { '--ay': '0svh', '--aw': () => stage.clientWidth + 'px', '--ah': '100svh', '--ar': '0px 0px 0px 0px', ease: 'power2.inOut', duration: .55, immediateRender: true }, 0)
    .to('#heroBg img', { scale: 1.12, filter: 'grayscale(1) contrast(1.05) brightness(.42)', ease: 'none', duration: 1 }, 0)
    .to('#heroCopy', { autoAlpha: 0, y: -30, ease: 'power2.in', duration: .25 }, 0)
    .to('#heroVeil', { opacity: 0, duration: .3 }, .1)
    .to('#heroFade', { opacity: 1, duration: .35, ease: 'power1.in' }, .3);
  stamps.forEach((s, i) => tl.to(s, { opacity: 1, y: 0, ease: 'power3.out', duration: .16 }, .42 + i * .16));
  tl.to('.stamps__line', { opacity: 1, duration: .15 }, .9);
  return () => hero.classList.remove('is-live');
});
gsap.matchMedia().add(`not all and ${LIVE}`, () => { gsap.set('#stamps', { display: 'none' }) });

/* ============ GATES: the word is on screen from the first frame; the arch fills the room, the word leaves last ============ */
gsap.matchMedia().add(LIVE, () => {
  if (!motion) return;
  document.querySelectorAll('[data-gate]').forEach(g => {
    const arch = g.querySelector('.gate__arch'), label = g.querySelector('.gate__label'), side = g.querySelector('.gate__side');
    const tl = gsap.timeline({ scrollTrigger: { trigger: g, start: 'top top', end: '+=85%', pin: true, scrub: .5, anticipatePin: 1 } });
    const to = getComputedStyle(g).getPropertyValue('--g-to').trim(), from = getComputedStyle(g).getPropertyValue('--g-from').trim();
    tl.fromTo(arch, { scale: .12 }, { scale: 7, ease: 'power2.in', duration: .78 }, 0)
      .fromTo(g, { backgroundColor: from }, { backgroundColor: to, duration: .01, immediateRender: false }, .76)   // no seam once the arch has filled the room
      .fromTo(label.firstElementChild, { scale: 1 }, { scale: 1.08, ease: 'none', duration: 1 }, 0)
      .to(label, { autoAlpha: 0, duration: .18, ease: 'power2.in' }, .8)
      .to(side, { autoAlpha: 0, duration: .2 }, .78);
  });
});

/* ============ ACT I · ZOOM: seven photos, seven speeds (the 21st.dev zoom parallax, in GSAP) ============ */
gsap.matchMedia().add(LIVE, () => {
  if (!motion) return;
  const items = gsap.utils.toArray('.zoom__item'), rates = [4, 5, 6, 5, 6, 8, 9];
  const tl = gsap.timeline({ scrollTrigger: { trigger: '#zoomStick', start: 'top top', end: '+=170%', pin: true, scrub: true, anticipatePin: 1 } });
  items.forEach((it, i) => tl.fromTo(it, { scale: .55 }, { scale: rates[i % rates.length], ease: 'none', duration: 1 }, 0));
  // the cluster starts a little low, under the headline, and settles back to centre as it grows
  tl.fromTo(items, { yPercent: 11 }, { yPercent: 0, ease: 'power1.out', duration: .35 }, 0);
  tl.to('#zoomCtx', { autoAlpha: 0, y: -50, duration: .09, ease: 'power1.in' }, .01);   // the line is gone before the photos reach it
});

/* ============ ACT I · THE WALL: walk sideways; each card rises as it reaches you ============ */
gsap.matchMedia().add(LIVE, () => {
  if (!motion) return;
  const track = document.getElementById('wallTrack'), doors = gsap.utils.toArray('.wdoor');
  // the walk distance is measured once per refresh with the cards untransformed: their scale/rise
  // changes the track's scrollWidth every frame, and measuring live made the walk jump
  let D = 0;
  const measure = () => { const keep = track.style.transform; track.style.transform = ''; gsap.set(doors, { clearProps: 'transform' }); D = track.scrollWidth - innerWidth; track.style.transform = keep };
  measure();
  const st = ScrollTrigger.create({
    trigger: '#wallPin', start: 'top top', end: () => '+=' + (D + innerHeight * .4), pin: true, scrub: .6, anticipatePin: 1, invalidateOnRefresh: true,
    onRefreshInit: measure,
    onUpdate: s => {
      const x = -s.progress * D; track.style.transform = `translate3d(${x}px,0,0)`;
      doors.forEach(d => {
        const r = d.getBoundingClientRect(); const c = r.left + r.width / 2;
        const p = gsap.utils.clamp(0, 1, (innerWidth * 1.05 - c) / (innerWidth * .5));
        gsap.set(d, { y: (1 - p) * 70, scale: 1 - (1 - p) * .06 });
        const inn = d.querySelector('.wdoor__in'); inn.style.transform = `translateY(${(1 - p) * 40}px)`; inn.style.opacity = (.2 + .8 * p).toFixed(2);
      });
    }
  });
  return () => { track.style.transform = ''; st.kill() };
});

/* ============ ACT I · WHAT THEY COME HOME WITH: four drawings, each with its own gesture (plays on enter, replays on hover) ============ */
{
  const art = {
    calm: root => { const rings = root.querySelectorAll('.ring'), kid = root.querySelector('.kid');
      const tl = gsap.timeline({ repeat: -1, repeatDelay: .2 });
      rings.forEach((r, i) => tl.fromTo(r, { scale: .7, opacity: .45, transformOrigin: '50% 50%' }, { scale: 1.8, opacity: 0, duration: 3, ease: 'sine.out' }, i * 1));
      tl.fromTo(kid, { scaleY: 1, scaleX: 1, transformOrigin: '50% 100%' }, { scaleY: 1.025, scaleX: 1.01, duration: 1.5, yoyo: true, repeat: 1, ease: 'sine.inOut' }, 0); return tl },
    position: root => { const board = root.querySelector('.board'), kid = root.querySelector('.kid');
      const tl = gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: 'sine.inOut', duration: 1.7 } });
      tl.fromTo(board, { rotate: -6 }, { rotate: 6 }, 0).fromTo(kid, { x: -6, rotate: 2.5, transformOrigin: '100px 113px' }, { x: 6, rotate: -2.5 }, 0); return tl },
    escape: root => { const w = root.querySelector('.weight'), down = root.querySelector('.down'), up = root.querySelector('.up'), bub = root.querySelector('.bubble');
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.8 });
      tl.set(down, { opacity: 1, x: 0 }).set(up, { opacity: 0, y: 12 }).set(bub, { opacity: 0, scale: .6 }).set(w, { y: -6, rotate: 0 })
        .to(w, { y: 0, duration: .5, ease: 'power2.in' })                                   // the weight settles on the kid
        .to(down, { x: -26, duration: .4, ease: 'power2.inOut' }, '+=.25')                  // the kid shrimps out
        .to(down, { x: -40, opacity: 0, duration: .3, ease: 'power2.in' })
        .to(w, { y: 14, rotate: -2, transformOrigin: '50% 100%', duration: .5, ease: 'bounce.out' }, '-=.25')  // the weight drops to the mat
        .to(up, { opacity: 1, y: 0, duration: .5, ease: 'back.out(2)' }, '-=.15')           // stands up
        .to(bub, { opacity: 1, scale: 1, duration: .4, ease: 'back.out(3)' }, '+=.1');       // tells an adult
      return tl },
    confidence: root => { const st = root.querySelectorAll('.stripe'), kid = root.querySelector('.kid'), sp = root.querySelector('.spark');
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });
      tl.set(st, { opacity: 0, scale: 2.2 }).set(kid, { y: 0, transformOrigin: '50% 100%' }).set(sp, { opacity: 0, scale: .6, transformOrigin: '100px 40px' });
      st.forEach((s, i) => tl.to(s, { opacity: 1, scale: 1, duration: .3, ease: 'back.out(3)' }, .4 + i * .45).to(kid, { y: -1.5 * (i + 1), duration: .3, ease: 'power2.out' }, '<'));
      tl.to(kid, { y: -7, scaleY: 1.02, duration: .7, ease: 'elastic.out(1,.45)' }).to(sp, { opacity: 1, scale: 1, duration: .4, ease: 'back.out(2)' }, '<').to(sp, { opacity: 0, duration: .6 }, '+=1'); return tl },
  };
  document.querySelectorAll('.kc').forEach(c => {
    const make = art[c.dataset.art]; if (!make) return;
    const tl = make(c); tl.pause();
    ScrollTrigger.create({ trigger: c, start: 'top 85%', onEnter: () => tl.play(), onLeave: () => tl.pause(), onEnterBack: () => tl.play(), onLeaveBack: () => tl.pause() });
    c.addEventListener('pointerenter', () => tl.restart());
  });
}

/* ============ ACT II · THE CHAMPION: the passport lands on the table, the photo develops, the stamps are pressed one by one ============ */
{
  const pass = document.getElementById('pass'), stamps = gsap.utils.toArray('#pstamps .pstamp'), photo = document.querySelector('#pass .pass__photo > img:first-child');
  if (!motion) { gsap.set(pass, { autoAlpha: 1 }) }
  else {
    gsap.set(stamps, { autoAlpha: 0, scale: 1.9 });
    ScrollTrigger.create({ trigger: pass, start: 'top 82%', once: true, onEnter: () => {
      const tl = gsap.timeline();
      tl.fromTo(pass, { rotateX: 24, y: 60, rotateZ: -1.5, autoAlpha: 0 }, { rotateX: 8, y: 0, rotateZ: -1.5, autoAlpha: 1, duration: 1.1, ease: 'expo.out', transformPerspective: 1800, transformOrigin: '50% 100%' }, 0)
        .fromTo(photo, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'expo.inOut' }, .2);
      stamps.forEach((st, k) => tl.to(st, { autoAlpha: .86, scale: 1, duration: .2, ease: 'power4.in' }, .9 + k * .3).to(pass, { y: 3, duration: .07, yoyo: true, repeat: 1 }, '<+.18'));
    } });
    gsap.matchMedia().add(LIVE, () => { gsap.fromTo(pass, { rotateX: 10 }, { rotateX: 5, ease: 'none', scrollTrigger: { trigger: '#act2', start: 'top bottom', end: 'bottom top', scrub: 1 } }) });
  }
}

/* ============ ACT III · SERVED: the flag drifts, the cut-outs come up from the card ============ */
{
  if (motion) gsap.to('#serveBg', { yPercent: 12, ease: 'none', scrollTrigger: { trigger: '#act3', start: 'top bottom', end: 'bottom top', scrub: true } });
  document.querySelectorAll('.scard__cut').forEach((c, i) => {
    gsap.set(c, { y: 60, opacity: 0 });
    ScrollTrigger.create({ trigger: c.closest('.scard'), start: 'top 78%', once: true, onEnter: () => gsap.to(c, { y: 0, opacity: 1, duration: 1.4, delay: .15 + i * .15, ease: 'expo.out' }) });
    if (motion) gsap.to(c, { y: i ? -10 : 14, ease: 'none', scrollTrigger: { trigger: '#act3', start: 'top bottom', end: 'bottom top', scrub: 1 } });
  });
}

/* ============ ACT III · REVIEWS INTRO: two elliptical orbits (wide, never taller than the room), the people take their seats and keep turning ============ */
{
  const orbit = document.getElementById('orbit'), rint = document.getElementById('rint');
  const cl = gsap.utils.clamp;
  // the two ellipses: wide across the room, never taller than it (so no tile is ever cut)
  const lanes = [{ el: orbit.querySelector('.orbit__lane--1'), rx: () => cl(300, 470, innerWidth * .32), ry: () => cl(220, 300, innerHeight * .32), speed: 360 / 80 },
                 { el: orbit.querySelector('.orbit__lane--2'), rx: () => cl(420, 640, innerWidth * .44), ry: () => cl(290, 370, innerHeight * .40), speed: -360 / 120 }];
  let on = false;
  const place = (t) => {
    lanes.forEach(l => {
      const rx = l.rx(), ry = l.ry();
      l.el.querySelectorAll('.orbit__seat').forEach(s => {
        const a = (parseFloat(s.style.getPropertyValue('--a')) + l.speed * t) * Math.PI / 180;
        s.style.transform = `translate3d(${(rx * Math.cos(a)).toFixed(1)}px,${(ry * Math.sin(a)).toFixed(1)}px,0)`;
      });
    });
  };
  place(0);
  ScrollTrigger.create({ trigger: '#rint', start: 'top 55%', once: true, onEnter: () => orbit.classList.add('in') });
  if (motion) { ScrollTrigger.create({ trigger: '#rint', start: 'top bottom', end: 'bottom top', onToggle: s => { on = s.isActive } }); gsap.ticker.add((time) => { if (on) place(time) }) }
  if (fine && motion) rint.addEventListener('pointermove', e => { const dx = e.clientX / innerWidth - .5, dy = e.clientY / innerHeight - .5; gsap.to(orbit, { x: dx * 40, y: dy * 24, duration: 1.4, ease: 'power3.out' }) });
}

/* ============ ACT III · REVIEWS: the row, curved in 3D, one lit ============ */
{
  const track = document.getElementById('revTrack'), dots = document.getElementById('revDots');
  const star = '<svg viewBox="0 0 24 24"><path d="m12 2 3.1 6.6 7.2.9-5.3 5 1.4 7.2L12 18.2 5.6 21.7 7 14.5 1.7 9.5l7.2-.9z"/></svg>';
  const g = '<svg viewBox="0 0 24 24"><path d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.9h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.4z" fill="#4285F4"/><path d="M12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3.1v2.6A10 10 0 0 0 12 22z" fill="#34A853"/><path d="M6.4 14a6 6 0 0 1 0-3.8V7.5H3.1a10 10 0 0 0 0 9z" fill="#FBBC05"/><path d="M12 6c1.5 0 2.8.5 3.8 1.5l2.8-2.8A10 10 0 0 0 3.1 7.5l3.3 2.6C7.2 7.8 9.4 6 12 6z" fill="#EA4335"/></svg>';
  REVIEWS.forEach(r => {
    const c = document.createElement('article'); c.className = 'rcard' + (r.ph ? ' is-ph' : '');
    const ini = r.n.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
    c.innerHTML = `<div class="rcard__top"><span class="rcard__stars">${star.repeat(5)}</span><span class="rcard__g">${g}</span></div><div class="rcard__qm">“</div><q>${r.q}</q><footer><span class="rcard__av">${ini}</span><div><b>${r.n}</b><small>${r.w}</small></div></footer>`;
    track.appendChild(c); dots.appendChild(document.createElement('i'));
  });
  const cards = [...track.children], n = cards.length; let cur = 2, timer;
  const light = () => { cards.forEach((c, i) => c.classList.toggle('on', i === cur)); [...dots.children].forEach((d, i) => d.classList.toggle('on', i === cur)) };
  // the 3D curve: every card turns away from the middle of the row
  const curve = () => { const mid = track.scrollLeft + track.clientWidth / 2; cards.forEach(c => { const d = (c.offsetLeft + c.offsetWidth / 2 - mid) / track.clientWidth; gsap.set(c, { rotateY: gsap.utils.clamp(-28, 28, -d * 42), z: -Math.abs(d) * 260, y: Math.abs(d) * 18, transformPerspective: 1400 }) }) };
  const centre = i => { const c = cards[i]; track.scrollTo({ left: c.offsetLeft - (track.clientWidth - c.offsetWidth) / 2, behavior: 'smooth' }) };
  const restart = () => { clearTimeout(timer); timer = setTimeout(() => go(1), 6000) };
  const go = k => { cur = (cur + k + n) % n; light(); centre(cur); restart() };
  document.getElementById('revNext').onclick = () => go(1); document.getElementById('revPrev').onclick = () => go(-1);
  let t2; track.addEventListener('scroll', () => { curve(); clearTimeout(t2); t2 = setTimeout(() => { const mid = track.scrollLeft + track.clientWidth / 2; let best = 0, bd = 1e9; cards.forEach((c, i) => { const d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid); if (d < bd) { bd = d; best = i } }); if (best !== cur) { cur = best; light(); restart() } }, 80) }, { passive: true });
  let down = false, sx = 0, sl = 0, moved = 0;
  track.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse') return; down = true; sx = e.clientX; sl = track.scrollLeft; moved = 0 });
  track.addEventListener('pointermove', e => { if (!down) return; const dx = e.clientX - sx; moved += Math.abs(dx); if (moved > 6) track.classList.add('is-drag'); track.scrollLeft = sl - dx });
  const up = () => { down = false; requestAnimationFrame(() => track.classList.remove('is-drag')) };
  ['pointerup', 'pointercancel', 'pointerleave'].forEach(ev => track.addEventListener(ev, up));
  light(); restart();
  requestAnimationFrame(() => { const c = cards[cur]; track.scrollLeft = c.offsetLeft - (track.clientWidth - c.offsetWidth) / 2; curve() });
  addEventListener('resize', curve);
}

/* ============ ACT III · YOUR FIRST CLASS: the four cards stand up in 3D, bowed toward you; the belt slides in and earns its four stripes ============ */
{
  const cards = gsap.utils.toArray('.step'), row = document.getElementById('stepsRow');
  const bow = i => ({ rotateY: (i - 1.5) * -5, z: -Math.abs(i - 1.5) * 26 });
  gsap.matchMedia().add(LIVE, () => {
    gsap.set(cards, { transformPerspective: 1600, rotateX: 24, y: 80, opacity: 0, rotateY: 0 });
    ScrollTrigger.create({ trigger: row, start: 'top 82%', once: true, onEnter: () => cards.forEach((c, i) => gsap.to(c, { rotateX: 0, y: 0, opacity: 1, ...bow(i), duration: 1.3, delay: i * .12, ease: 'expo.out' })) });
    // the cursor tilt (shared handler) resets to flat; give the bow back on leave
    cards.forEach((c, i) => c.addEventListener('pointerleave', () => gsap.to(c, { ...bow(i), rotateX: 0, duration: 1, ease: 'elastic.out(1,.5)' })));
  });
  gsap.matchMedia().add(`not all and ${LIVE}`, () => { gsap.set(cards, { clearProps: 'all' }) });
  const belt = document.getElementById('belt');
  if (motion) {
    gsap.set('#belt .belt__in', { xPercent: -100 });
    ScrollTrigger.create({ trigger: belt, start: 'top 96%', once: true, onEnter: () => {
      // the white belt arrives; each stripe it earns turns one card black, in order
      const tl = gsap.timeline().to('#belt .belt__in', { xPercent: 0, duration: 1.6, ease: 'expo.inOut' });
      gsap.utils.toArray('#belt .belt__bar i').forEach((st, i) => tl.to(st, { scaleY: 1, duration: .5, ease: 'back.out(2)' }, 1.25 + i * .22).add(() => cards[i]?.classList.add('on'), 1.25 + i * .22));
    } });
    gsap.fromTo(belt, { xPercent: 2 }, { xPercent: -3, ease: 'none', scrollTrigger: { trigger: '#day-one', start: 'top bottom', end: 'bottom top', scrub: .6 } });
  } else { gsap.set('#belt .belt__bar i', { scaleY: 1 }); cards.forEach(c => c.classList.add('on')) }
}

