import type { CSSProperties } from 'react'
import { rich } from './Rich'

/** The act marker over each title: "<b>I</b>Family · Programs" (01-tokens-type.css .act). */
export const Act = ({ a, delay, style }: { a: string[]; delay?: string; style?: CSSProperties }) => (
  <p className="act rv" data-delay={delay} style={style}><b>{a[0]}</b>{rich(a[1])}</p>
)
