import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import Script from 'next/script'
import "./globals.css"

// Keep font subsets to supported values to avoid type errors (Next font types are limited).
const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "סטודיו דוראל אזולאי — מאמן כושר",
  description: "אימון אישי וקבוצות — תוצאות שמרגישים",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="he" dir="rtl">
      {/* Apply site background to the <body> so inner absolutely-positioned elements
          can't accidentally cover or override it. */}
      <body className={`font-sans antialiased site-bg`}>
        {children}
        {/* Sienna accessibility script (loaded after hydration). The visual widget is hidden by default
            via CSS in `styles/globals.css` so the site's appearance doesn't change. To reveal the
            widget set `document.body.setAttribute('data-sienna','visible')` from the console. */}
        <Script
          src="https://cdn.jsdelivr.net/npm/sienna-accessibility@latest/dist/sienna-accessibility.umd.js"
          strategy="afterInteractive"
          onLoad={() => {
            try {
              // mark the document that the script loaded — widget remains hidden until explicit opt-in
              if (typeof document !== 'undefined') {
                document.body.setAttribute('data-sienna', 'ready')
              }

              // Attempt to call common init entry points if available without assuming API shape.
              const w = window as any
              const maybeInit = w.siennaAccessibility?.init || w.SiennaAccessibility?.init || w.sienna?.init
              if (typeof maybeInit === 'function') {
                try {
                  // Call without UI options to avoid changing appearance; libraries may ignore empty config.
                  maybeInit({})
                } catch (e) {
                  // ignore init errors — library may not expose init this way
                  // eslint-disable-next-line no-console
                  console.warn('sienna init failed', e)
                }
              }
            } catch (e) {
              // swallow any errors to avoid breaking the page
              // eslint-disable-next-line no-console
              console.warn('sienna load handler error', e)
            }
          }}
        />
        <Analytics />
      </body>
    </html>
  )
}
