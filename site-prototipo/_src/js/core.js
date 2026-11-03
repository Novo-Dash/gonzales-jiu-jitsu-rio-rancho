
/* ============ SETUP ============ */
const motion = !matchMedia('(prefers-reduced-motion: reduce)').matches;
gsap.registerPlugin(ScrollTrigger);
let lenis = null;
if (motion && typeof Lenis !== 'undefined' && matchMedia('(pointer: fine)').matches) {
  lenis = new Lenis({ lerp: 0.085, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(t => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}
const LIVE = '(min-width:1024px) and (min-height:620px)';
const fine = matchMedia('(pointer: fine)').matches;
document.getElementById('yr').textContent = new Date().getFullYear();
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }), { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });
const onView = () => document.querySelectorAll('.d:not(.in),.rv:not(.in),.scard:not(.in)').forEach(el => io.observe(el));
onView();
let lastY = 0; const pnav = document.getElementById('pnav');
ScrollTrigger.create({ onUpdate: s => { const y = s.scroll(); pnav.classList.toggle('is-hidden', y > lastY && y > 400 && !document.getElementById('modal').classList.contains('open')); lastY = y } });
const scrollToEl = el => { if (lenis) lenis.scrollTo(el, { offset: -20, duration: 1.4 }); else el.scrollIntoView({ behavior: 'smooth' }) };
document.querySelectorAll('a[href^="#"]:not([data-book])').forEach(a => a.addEventListener('click', e => { const el = document.querySelector(a.getAttribute('href')); if (el) { e.preventDefault(); scrollToEl(el) } }));
const modal = document.getElementById('modal');
const openModal = prog => { modal.classList.add('open'); if (prog) document.getElementById('mProg').value = prog; lenis?.stop(); document.body.style.overflow = 'hidden' };
const closeModal = () => { modal.classList.remove('open'); lenis?.start(); document.body.style.overflow = '' };
document.addEventListener('click', e => { const a = e.target.closest('[data-book]'); if (!a || a.closest('form')) return; e.preventDefault(); closeMenu?.(); openModal(a.dataset.prog || '') });
document.getElementById('modalX').addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal() });
addEventListener('keydown', e => { if (e.key === 'Escape') { closeModal(); closeMenu() } });

/* the mobile menu: a white sheet that opens from the Menu pill */
const menu = document.getElementById('menu'), menuBtn = document.getElementById('menuBtn');
function closeMenu() { if (!menu || !menu.classList.contains('open')) return; menu.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); lenis?.start(); document.body.style.overflow = ''; setTimeout(() => { if (!menu.classList.contains('open')) menu.hidden = true }, 600) }
if (menu) {
  menuBtn.addEventListener('click', () => { if (menu.classList.contains('open')) return closeMenu(); menu.hidden = false; requestAnimationFrame(() => menu.classList.add('open')); menuBtn.setAttribute('aria-expanded', 'true'); lenis?.stop(); document.body.style.overflow = 'hidden' });
  document.getElementById('menuX').addEventListener('click', closeMenu);
}

/* magnetic buttons: the pill leans toward the cursor, the arrow circle leans more */
if (fine && motion) document.querySelectorAll('.cta, .ghost, .rnd').forEach(b => {
  const go = b.querySelector('.cta__go, span');
  b.addEventListener('pointermove', e => { const r = b.getBoundingClientRect(); const dx = (e.clientX - r.left - r.width / 2) / r.width, dy = (e.clientY - r.top - r.height / 2) / r.height; gsap.to(b, { x: dx * 10, y: dy * 8, duration: .5, ease: 'power3.out' }); if (go) gsap.to(go, { x: dx * 10, y: dy * 8, duration: .5, ease: 'power3.out' }) });
  b.addEventListener('pointerleave', () => { gsap.to(b, { x: 0, y: 0, duration: .8, ease: 'elastic.out(1,.5)' }); if (go) gsap.to(go, { x: 0, y: 0, duration: .8, ease: 'elastic.out(1,.5)' }) });
});
/* cards tilt with the cursor */
if (fine && motion) document.querySelectorAll('[data-tilt], .rcard, .wdoor').forEach(c => {
  c.addEventListener('pointermove', e => { const r = c.getBoundingClientRect(); const dx = (e.clientX - r.left) / r.width - .5, dy = (e.clientY - r.top) / r.height - .5; gsap.to(c, { rotateY: dx * 7, rotateX: -dy * 7, transformPerspective: 900, duration: .6, ease: 'power3.out' }) });
  c.addEventListener('pointerleave', () => gsap.to(c, { rotateY: 0, rotateX: 0, duration: 1, ease: 'elastic.out(1,.5)' }));
});


/* ============ FOOTER: the floor on video. The video eases in from the fade, the card floats up, the type lands in order ============ */
{
  const foot = document.querySelector('.foot'), card = document.getElementById('footCard'), vid = document.getElementById('footVideo');
  if (vid) {
    const play = () => { if (vid.paused) vid.play().catch(() => {}) };
    play(); vid.addEventListener('loadedmetadata', play); vid.addEventListener('canplay', play);
    ['pointerdown', 'touchstart', 'keydown', 'wheel', 'scroll'].forEach(ev => addEventListener(ev, play, { passive: true, once: false }));
    ScrollTrigger.create({ trigger: foot, start: 'top bottom', end: 'bottom top', onEnter: play, onEnterBack: play });
  }
  if (motion && card) {
    gsap.set(card, { y: 90, opacity: 0 });
    gsap.set(card.querySelectorAll('.fc'), { y: 28, opacity: 0 });
    ScrollTrigger.create({ trigger: card, start: 'top 92%', once: true, onEnter: () => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
      tl.to(card, { y: 0, opacity: 1, duration: 1.4 }, 0)
        .to(card.querySelectorAll('.fc'), { y: 0, opacity: 1, duration: 1.1, stagger: 0.09 }, 0.25)
        .add(() => { gsap.to(card, { y: -7, duration: 3.2, ease: 'sine.inOut', yoyo: true, repeat: -1 }) });
    } });
    /* the video itself drifts slowly; a slow camera push on top makes the floor breathe even on a still frame */
    gsap.fromTo(vid, { scale: 1 }, { scale: 1.07, duration: 16, ease: 'sine.inOut', yoyo: true, repeat: -1 });
  }
}

