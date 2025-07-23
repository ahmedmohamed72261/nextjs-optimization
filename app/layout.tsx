import type React from "react"
import { Cairo } from "next/font/google"
import "./globals.css"
import type { Metadata, Viewport } from "next"
import WhatsAppButton from "@/components/whatsapp-button"
import CustomCursor from "@/components/custom-cursor"
import GoogleAnalytics from "@/components/google-analytics"
import ReduxProvider from "@/components/providers/redux-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { A11yProvider } from "@/components/accessibility/a11y-provider"
import { PerformanceMonitor } from "@/components/performance/performance-monitor"
import { Suspense } from "react"

// Optimized font loading
const cairo = Cairo({
  subsets: ["arabic", "latin"],
  display: "swap",
  variable: "--font-cairo",
  preload: true,
  fallback: ["system-ui", "arial"],
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0C3C8B' },
    { media: '(prefers-color-scheme: dark)', color: '#143F85' }
  ],
}

export const metadata: Metadata = {
  title: {
    template: "%s | ويز فريلانس",
    default: "ويز فريلانس - أول منصة سعودية للخدمات الرقمية",
  },
  description: "منصة ويز فريلانس تقدم خدمات تصميم وتطوير المواقع والتطبيقات وإدارة المتاجر الإلكترونية والتسويق الرقمي",
  keywords: ["ويز فريلانس", "خدمات رقمية", "تصميم مواقع", "تطوير تطبيقات", "التسويق الرقمي", "السعودية"],
  authors: [{ name: "ويز فريلانس" }],
  creator: "ويز فريلانس",
  publisher: "ويز فريلانس",
  metadataBase: new URL("https://www.wizfreelance.com"),
  openGraph: {
    title: "ويز فريلانس - أول منصة سعودية للخدمات الرقمية",
    description: "منصة ويز فريلانس تقدم خدمات تصميم وتطوير المواقع والتطبيقات وإدارة المتاجر الإلكترونية والتسويق الرقمي",
    url: "https://www.wizfreelance.com",
    siteName: "ويز فريلانس",
    locale: "ar_SA",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "ويز فريلانس - منصة الخدمات الرقمية",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ويز فريلانس - أول منصة سعودية للخدمات الرقمية",
    description: "منصة ويز فريلانس تقدم خدمات تصميم وتطوير المواقع والتطبيقات وإدارة المتاجر الإلكترونية والتسويق الرقمي",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/logo2.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: "https://www.wizfreelance.com",
    languages: {
      'ar-SA': 'https://www.wizfreelance.com',
      'en-US': 'https://www.wizfreelance.com/en',
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
  category: "technology",
  classification: "business",
  generator: "Next.js",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="ar" 
      dir="rtl" 
      className={`${cairo.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        
        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />
        <link rel="dns-prefetch" href="https://api.whatsapp.com" />
        
        {/* Sitemap and robots */}
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        
        {/* Font Awesome CSS */}
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
        />
        
        {/* Critical CSS for above-the-fold content */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical CSS */
            .reduce-motion * {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
            
            .high-contrast {
              filter: contrast(150%);
            }
            
            .font-small { font-size: 0.875rem; }
            .font-medium { font-size: 1rem; }
            .font-large { font-size: 1.125rem; }
            
            /* Skip link */
            .skip-link {
              position: absolute;
              top: -40px;
              left: 6px;
              background: #0C3C8B;
              color: white;
              padding: 8px;
              text-decoration: none;
              border-radius: 4px;
              z-index: 1000;
            }
            .skip-link:focus {
              top: 6px;
            }
            
            /* Screen reader only */
            .sr-only {
              position: absolute;
              width: 1px;
              height: 1px;
              padding: 0;
              margin: -1px;
              overflow: hidden;
              clip: rect(0, 0, 0, 0);
              white-space: nowrap;
              border: 0;
            }
          `
        }} />
      </head>
      <body className={`${cairo.className} antialiased`}>
        {/* Skip to main content link for accessibility */}
        <a 
          href="#main-content" 
          className="skip-link"
          tabIndex={1}
        >
          تخطي إلى المحتوى الرئيسي
        </a>
        
        {/* Screen reader announcement for page changes */}
        <div 
          id="page-announcement" 
          aria-live="polite" 
          aria-atomic="true" 
          className="sr-only"
        />
        
        <ReduxProvider>
          <ThemeProvider 
            attribute="class" 
            defaultTheme="light" 
            enableSystem
            disableTransitionOnChange={false}
          >
            <A11yProvider>
              <main id="main-content" tabIndex={-1}>
                <Suspense fallback={
                  <div className="min-h-screen flex items-center justify-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#0C3C8B]" />
                  </div>
                }>
                  {children}
                </Suspense>
              </main>
              
              {/* Lazy load non-critical components */}
              <Suspense fallback={null}>
                <WhatsAppButton />
              </Suspense>
              
              <Suspense fallback={null}>
                <CustomCursor />
              </Suspense>
              
              <GoogleAnalytics trackingId="GTM-PH5TQ45R" />
              
              {/* Performance monitoring in development */}
              {process.env.NODE_ENV === 'development' && (
                <PerformanceMonitor />
              )}
            </A11yProvider>
          </ThemeProvider>
        </ReduxProvider>
        
        {/* Service Worker registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}