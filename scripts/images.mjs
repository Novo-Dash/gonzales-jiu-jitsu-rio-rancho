// Smaller copies of the prototype's photos for srcset (same crop, same look; the browser picks by
// rendered width). Run after a photo changes: node scripts/images.mjs → public/img/w/<name>-<w>.webp
import fs from 'node:fs'
import sharp from 'sharp'
const dir = new URL('../public/img/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')
const out = dir + 'w/'
fs.mkdirSync(out, { recursive: true })
export const WIDTHS = [480, 800, 1200]
const LOGO = [160, 320]
const made = {}
for (const f of fs.readdirSync(dir).filter(f => /\.(webp|png)$/.test(f) && !f.startsWith('g-') && !f.startsWith('face-') && f !== 'footer-poster.webp')) {
  const name = f.replace(/\.(webp|png)$/, ''), { width } = await sharp(dir + f).metadata()
  const ws = (name.startsWith('logo') ? LOGO : WIDTHS).filter(w => w < width * 0.9)
  for (const w of ws) await sharp(dir + f).resize(w).webp({ quality: name.startsWith('logo') ? 90 : 78, alphaQuality: 100 }).toFile(`${out}${name}-${w}.webp`)
  if (ws.length) made[name] = ws
}
console.log(JSON.stringify(made))
