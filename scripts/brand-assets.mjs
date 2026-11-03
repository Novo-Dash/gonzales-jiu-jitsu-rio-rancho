// One-off: favicons from the ink logo, and the link-preview image (1200×630 JPG) from the hero photo,
// in black and white like the site, with the white logo. Run: node scripts/brand-assets.mjs
import sharp from 'sharp'
const pub = (f) => new URL(`../public/${f}`, import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')
const icon = async (size, file, pad) => {
  const inner = Math.round(size * (1 - pad * 2))
  const logo = await sharp(pub('img/logo-ink.png')).resize(inner, inner, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } }).toBuffer()
  await sharp({ create: { width: size, height: size, channels: 4, background: '#ffffff' } }).composite([{ input: logo, gravity: 'center' }]).png().toFile(pub(file))
}
await icon(32, 'favicon-32.png', 0.02)
await icon(192, 'favicon-192.png', 0.08)
await icon(180, 'apple-touch-icon.png', 0.1)
const photo = await sharp(pub('img/hero.webp')).resize(1200, 630, { fit: 'cover', position: 'attention' }).grayscale().modulate({ brightness: 0.32 }).blur(1.2).toBuffer()
const logo = await sharp(pub('img/logo-white.png')).resize(460).toBuffer()
await sharp(photo).composite([{ input: logo, gravity: 'center' }]).jpeg({ quality: 78, mozjpeg: true }).toFile(pub('og.jpg'))
console.log('ok')
