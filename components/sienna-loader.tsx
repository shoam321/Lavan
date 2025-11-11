"use client"

import Script from "next/script"

export default function SiennaLoader() {
  return (
    <Script
      src="https://cdn.jsdelivr.net/npm/sienna-accessibility@latest/dist/sienna-accessibility.umd.js"
      strategy="afterInteractive"
      onLoad={() => {
        try {
          if (typeof document !== "undefined") {
            document.body.setAttribute("data-sienna", "ready")
          }

          // Try safe init if the library exposes one
          const w = window as any
          const maybeInit =
            w.siennaAccessibility?.init || w.SiennaAccessibility?.init || w.sienna?.init
          if (typeof maybeInit === "function") {
            try {
              maybeInit({})
            } catch (e) {
              // ignore init errors
              // eslint-disable-next-line no-console
              console.warn("sienna init failed", e)
            }
          }
        } catch (e) {
          // swallow to avoid breaking the page
          // eslint-disable-next-line no-console
          console.warn("sienna load handler error", e)
        }
      }}
    />
  )
}
