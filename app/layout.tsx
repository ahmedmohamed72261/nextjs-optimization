import type React from "react"
import { Cairo } from "next/font/google"
import "./globals.css"
import type { Metadata } from "next"
import WhatsAppButton from "@/components/whatsapp-button"
import CustomCursor from "@/components/custom-cursor"
import GoogleAnalytics from "@/components/google-analytics"
import ReduxProvider from "@/components/providers/redux-provider"
import { ThemeProvider } from "@/components/theme-provider"

const cairo = Cairo({
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-cairo",
})

export const metadata: Metadata = {
  title: {
    template: "%s | ويز فريلانس",
    default: "ويز فريلانس - أول منصة سعودية للخدمات الرقمية",
  },
  description: "منصة ويز فريلانس تقدم خدمات تصميم وتطوير المواقع والتطبيقات وإدارة المتاجر الإلكترونية والتسويق الرقمي",
  metadataBase: new URL("https://www.wizfreelance.com"),
  openGraph: {
    title: "ويز فريلانس - أول منصة سعودية للخدمات الرقمية",
    description:
      "منصة ويز فريلانس تقدم خدمات تصميم وتطوير المواقع والتطبيقات وإدارة المتاجر الإلكترونية والتسويق الرقمي",
    url: "https://www.wizfreelance.com",
    siteName: "ويز فريلانس",
    locale: "ar_SA",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "ويز فريلانس",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/logo2.png",
    shortcut: "/logo2.png",
    apple: "/logo.png",
  },
  alternates: {
    canonical: "https://www.wizfreelance.com",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable}`}>
      <head>
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className={cairo.className}>
        <ReduxProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            {children}
            <WhatsAppButton />
            <CustomCursor />
            <GoogleAnalytics trackingId="GTM-PH5TQ45R" />
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}
