/// <reference types="vite/client" />
import 'react'

declare module 'react' {
  // The prototype's inline custom properties (--a, --w, --r, --g-from…), typed.
  interface CSSProperties { [key: `--${string}`]: string | number | undefined }
}

declare global {
  const __SITE__: string
  const __PREVIEW__: boolean
}
