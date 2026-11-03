import type { CSSProperties, ReactNode } from 'react'

// The red pill and its double arrow circle (02-buttons.css). `icon` is the sprite id.
export const Go = ({ icon = 'i-arrow' }: { icon?: string }) => (
  <span className="cta__go"><svg className="ic"><use href={`#${icon}`} /></svg><svg className="ic"><use href={`#${icon}`} /></svg></span>
)

export const Ic = ({ id, style }: { id: string; style?: CSSProperties }) => <svg className="ic" style={style}><use href={`#${id}`} /></svg>

/** The phone link with the underlined number (03-micro-call.css). */
export const Call = ({ tel, children, lead }: { tel: string; children: ReactNode; lead?: string }) => (
  <a className="call" href={tel}><Ic id="i-phone" />{lead}<u>{children}</u></a>
)
