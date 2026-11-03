import type { ImgHTMLAttributes } from 'react'
import { DIMS, VARIANTS } from '../../data/images'

const ext = (name: string) => (name.startsWith('logo') ? 'png' : 'webp')
export const srcOf = (name: string) => `/img/${name}.${ext(name)}`
/** "…-480.webp 480w, …, original 1920w": the variants, then the original at its natural width. */
export const srcSetOf = (name: string) => VARIANTS[name] && [...VARIANTS[name].map(w => `/img/w/${name}-${w}.webp ${w}w`), `${srcOf(name)} ${DIMS[name][0]}w`].join(', ')

/**
 * <img> from public/img by name, with its natural width and height. With `sizes` (the rendered width)
 * and smaller copies available, it also gets a srcset; the rendered box never changes.
 */
export function Img({ name, sizes, ...rest }: { name: string } & Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'>) {
  const [w, h] = DIMS[name]
  const set = sizes ? srcSetOf(name) : undefined
  return <img src={srcOf(name)} srcSet={set} sizes={set ? sizes : undefined} width={w} height={h} {...rest} />
}
