import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import SiennaLoader from "@/components/sienna-loader"
import "./globals.css"

// Keep font subsets to supported values to avoid type errors (Next font types are limited).
const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "אולמי לבן",
  description: "אולמי לבן",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/lavan-logo.svg",
        type: "image/svg+xml",
      },
    ],
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
        {/* Sienna accessibility loader (client-side). The visual widget is hidden by default
            via CSS in `styles/globals.css`. Use `document.body.setAttribute('data-sienna','visible')`
            to reveal it. */}
        <SiennaLoader />
        <Analytics />
      </body>
    </html>
  )
}
