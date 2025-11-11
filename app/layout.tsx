import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin", "Hebrew"] })
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
        <Analytics />
        <script>(function(w,d,s,u,o){w._cyA11yConfig={"iconId":"default","position":{"mobile":"bottom-right","desktop":"bottom-right"},"language":{"default":"he","selected":[]}};var js=d.createElement(s),fjs=d.getElementsByTagName(s)[0];js.src=u;js.async=true;fjs.parentNode.insertBefore(js,fjs);})(window,document,"script","https://cdn-cookieyes.com/widgets/accessibility.js?id=c68b58ed-6e98-4890-9e44-066eb7fd6be1");</script>


      </body>
    </html>
  )
}
