import { createElement, Fragment, type ReactNode } from 'react'

// Copy lives in src/content as plain strings; the few inline tags the prototype uses inside a
// line (<em>, <b>, <u>, <br class="dbr">) are written in the string and rendered here as the
// same elements.
const TAGS = /<br(?: class="([^"]+)")?>|<(em|b|u)>(.*?)<\/\2>/g

export function rich(s: string): ReactNode {
  const out: ReactNode[] = []
  let i = 0, k = 0
  for (const m of s.matchAll(TAGS)) {
    if (m.index > i) out.push(s.slice(i, m.index))
    out.push(m[0].startsWith('<br') ? <br key={k++} className={m[1]} /> : createElement(m[2], { key: k++ }, m[3]))
    i = m.index + m[0].length
  }
  if (i < s.length) out.push(s.slice(i))
  return out.length === 1 ? out[0] : createElement(Fragment, null, ...out)
}

/** The masked lines of a revealed heading: <span class="ln"><span>…</span></span> per line. */
export const Lines = ({ lines }: { lines: string[] }) => (
  <>{lines.map((l, i) => <span className="ln" key={i}><span>{rich(l)}</span></span>)}</>
)
