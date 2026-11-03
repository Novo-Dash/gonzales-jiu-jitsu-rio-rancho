// COPY CHECK · every visible word of the build must equal the prototype's, page by page.
//   node site-prototipo/_tools/textdiff.mjs --proto http://localhost:4100 --build http://localhost:4173
// Compares document.body.innerText (after scrolling the page once, so JS-rendered text exists),
// line by line, at 1440 and at 390. Prints the first lines that differ. Exit 1 on any difference.
import { chromium } from 'playwright';
const arg = (k, d) => { const i = process.argv.indexOf('--' + k); return i > -1 ? process.argv[i + 1] : d };
const PROTO = arg('proto', 'http://localhost:4100'), BUILD = arg('build', 'http://localhost:4173');
const PAGES = { home: ['/index.html', '/'], about: ['/about.html', '/about'], programs: ['/programs.html', '/programs'], schedule: ['/schedule.html', '/schedule'], contact: ['/contact.html', '/contact'] };
const browser = await chromium.launch();
async function text(url, width) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 } }); const p = await ctx.newPage();
  await p.clock.setFixedTime(new Date('2026-11-02T13:30:00-07:00'));
  await p.goto(url, { waitUntil: 'networkidle' }); await p.waitForTimeout(800);
  const H = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < H; y += 500) { await p.evaluate(y => scrollTo(0, y), y); await p.waitForTimeout(30) }
  const t = await p.evaluate(() => document.body.innerText); await ctx.close();
  return t.split('\n').map(s => s.replace(/\s+/g, ' ').trim()).filter(Boolean);
}
let bad = 0;
for (const w of [1440, 390]) for (const [name, [a, b]] of Object.entries(PAGES)) {
  const A = await text(PROTO + a, w), B = await text(BUILD + b, w);
  const n = Math.max(A.length, B.length); const diffs = [];
  for (let i = 0; i < n && diffs.length < 8; i++) if (A[i] !== B[i]) diffs.push(`  line ${i + 1}\n    prototype: ${A[i] ?? '∅'}\n    build:     ${B[i] ?? '∅'}`);
  console.log(`${diffs.length ? ' ✗✗' : '  ok'} ${name} @${w}  (${A.length} lines)`); if (diffs.length) { bad++; console.log(diffs.join('\n')) }
}
await browser.close();
console.log(bad ? `\n${bad} page(s) with different text.` : '\nCOPY OK: identical text on every page.'); process.exit(bad ? 1 : 0);
