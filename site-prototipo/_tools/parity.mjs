// PARITY CHECK · prototype vs build, same states, side by side, pixel diff.
//
//   1. serve the prototype:  npx serve site-prototipo -l 4100
//   2. serve the build:      npm run build && npm run preview -- --port 4173
//   3. run:                  node site-prototipo/_tools/parity.mjs --proto http://localhost:4100 --build http://localhost:4173
//
// Output: parity/<page>-<vp>-<state>.png  (left = prototype, middle = build, right = diff in red)
//         parity/report.json + a summary in the terminal. A state FAILS above --max (default 1.5%).
// Moving things that can never match frame for frame are masked: the orbit tiles, the footer video,
// the live clock card. The date is frozen to Monday 2 Nov 2026, 1:30 PM in Rio Rancho, so "today"
// on the board, the mini weeks and the clock read the same in both.
//
// Needs: npm i -D playwright pixelmatch pngjs   (and `npx playwright install chromium` once)
import { chromium } from 'playwright';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import fs from 'node:fs';

const arg = (k, d) => { const i = process.argv.indexOf('--' + k); return i > -1 ? process.argv[i + 1] : d };
const PROTO = arg('proto', 'http://localhost:4100'), BUILD = arg('build', 'http://localhost:4173');
const OUT = arg('out', 'parity'), MAX = parseFloat(arg('max', '1.5')), ONLY = arg('page', '');
fs.mkdirSync(OUT, { recursive: true });

// page → [prototype path, build route]
const PAGES = { home: ['/index.html', '/'], about: ['/about.html', '/about'], programs: ['/programs.html', '/programs'], schedule: ['/schedule.html', '/schedule'], contact: ['/contact.html', '/contact'] };

// a state is ['name', 'sel', offsetPx] (scroll to the element's top + offset) or ['name', 'pin:sel', progress, index]
// (scroll to that progress of the pin wrapping the n-th match of sel). 'end' = bottom of the page.
const DESK = {
  home: [['top', 'top', 0], ['hero-open', 'pin:#heroPin', 1], ['gate-1', 'pin:.gate', 0.45, 0], ['zoom-start', 'pin:#zoomStick', 0.02], ['zoom-mid', 'pin:#zoomStick', 0.5], ['zoom-end', 'pin:#zoomStick', 1],
         ['wall-start', 'pin:#wallPin', 0], ['wall-mid', 'pin:#wallPin', 0.5], ['parents', '#parents', 0], ['gate-2', 'pin:.gate', 0.45, 1], ['coach', '#act2', -20], ['gate-3', 'pin:.gate', 0.45, 2],
         ['served', '#act3', -20], ['reviews-intro', '#rint', -10], ['reviews', '#reviews', -20], ['first-class', '#day-one', -10], ['schedule', '#schedule', 0], ['faq', '#faq', 0], ['footer', 'end', 0]],
  about: [['top', 'top', 0], ['hero-scrolled', 'top', 450], ['crest', '#crest', 0], ['crest-turned', '#crest', 300], ['founders', '#founders', 0], ['room', '#room', 0], ['footer', 'end', 0]],
  programs: [['top', 'top', 0], ['toddlers', '#toddlers', 0], ['kids', '#kids', 0], ['adults', '#adults', 0], ['footer', 'end', 0]],
  schedule: [['top', 'top', 0], ['board', '#schedule', 0], ['today', '#today', 0], ['footer', 'end', 0]],
  contact: [['top', 'top', 0], ['ticket', '#start', 0], ['visit', '#visit', 0], ['faq', '#faq', 0], ['footer', 'end', 0]],
};
const MOB = Object.fromEntries(Object.entries(DESK).map(([k, v]) => [k, v.filter(s => !String(s[1]).startsWith('pin:')).concat(k === 'home' ? [['zoom', '#act1', 0], ['wall', '#programs', 0]] : [])]));
const VPS = [['1440', { width: 1440, height: 900 }, DESK], ['390', { width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 1 }, MOB]];
const MASK = ['.orbit__seat', '.foot__video', '#clock'];

async function shoot(browser, base, path, vp, states) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, isMobile: !!vp.isMobile, hasTouch: !!vp.hasTouch, deviceScaleFactor: 1, reducedMotion: 'no-preference' });
  const page = await ctx.newPage();
  await page.clock.setFixedTime(new Date('2026-11-02T13:30:00-07:00'));
  const errors = []; page.on('pageerror', e => errors.push(e.message));
  await page.goto(base + path, { waitUntil: 'networkidle' }); await page.waitForTimeout(1200);
  const H = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < H; y += 400) { await page.evaluate(y => scrollTo(0, y), y); await page.waitForTimeout(50) }   // let every "once" reveal fire
  const shots = [];
  for (const [name, sel, a, idx = 0] of states) {
    const y = await page.evaluate(({ sel, a, idx }) => {
      if (sel === 'top') return a;
      if (sel === 'end') return document.documentElement.scrollHeight;
      if (sel.startsWith('pin:')) {
        const el = document.querySelectorAll(sel.slice(4))[idx]; if (!el) return null;
        const sp = el.closest('.pin-spacer') || el; const top = sp.getBoundingClientRect().top + scrollY;
        return top + a * Math.max(0, sp.offsetHeight - innerHeight);
      }
      const el = document.querySelector(sel); return el ? el.getBoundingClientRect().top + scrollY + a : null;
    }, { sel, a, idx });
    if (y === null) { shots.push([name, null]); continue }
    await page.evaluate(y => scrollTo(0, y), y); await page.waitForTimeout(1700);
    const mask = MASK.map(m => page.locator(m));
    shots.push([name, await page.screenshot({ mask, maskColor: '#ff00ff' })]);
  }
  await ctx.close(); return { shots, errors };
}

const browser = await chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required'] });
const report = []; let fails = 0;
for (const [vpName, vp, SET] of VPS) {
  for (const [page, [pPath, bPath]] of Object.entries(PAGES)) {
    if (ONLY && ONLY !== page) continue;
    const A = await shoot(browser, PROTO, pPath, vp, SET[page]), B = await shoot(browser, BUILD, bPath, vp, SET[page]);
    if (B.errors.length) report.push({ page, vp: vpName, consoleErrors: B.errors });
    A.shots.forEach(([name, a], i) => {
      const b = B.shots[i][1];
      if (!a || !b) { report.push({ page, vp: vpName, state: name, result: !a ? 'missing in prototype' : 'MISSING IN BUILD' }); if (!b) fails++; return }
      const pa = PNG.sync.read(a), pb = PNG.sync.read(b), { width: w, height: h } = pa;
      const diff = new PNG({ width: w, height: h });
      const n = pb.width === w && pb.height === h ? pixelmatch(pa.data, pb.data, diff.data, w, h, { threshold: 0.12 }) : w * h;
      const pct = +(100 * n / (w * h)).toFixed(2), ok = pct <= MAX; if (!ok) fails++;
      const side = new PNG({ width: w * 3 + 16, height: h }); side.data.fill(255);
      PNG.bitblt(pa, side, 0, 0, w, h, 0, 0); if (pb.width === w && pb.height === h) { PNG.bitblt(pb, side, 0, 0, w, h, w + 8, 0); PNG.bitblt(diff, side, 0, 0, w, h, 2 * w + 16, 0) }
      fs.writeFileSync(`${OUT}/${page}-${vpName}-${name}.png`, PNG.sync.write(side));
      report.push({ page, vp: vpName, state: name, diffPct: pct, result: ok ? 'ok' : 'FAIL' });
    });
  }
}
await browser.close();
fs.writeFileSync(`${OUT}/report.json`, JSON.stringify(report, null, 2));
for (const r of report) console.log(`${r.result === 'ok' ? '  ok ' : ' ✗✗ '} ${r.page.padEnd(9)} ${String(r.vp).padEnd(5)} ${(r.state || 'console').padEnd(15)} ${r.diffPct ?? ''}${r.diffPct !== undefined ? '%' : ''} ${r.result === 'ok' ? '' : r.result || JSON.stringify(r.consoleErrors)}`);
console.log(fails ? `\n${fails} state(s) over ${MAX}% — fix the build until every state is ok.` : '\nPARITY OK: every state matches the prototype.');
process.exit(fails ? 1 : 0);
