"use client"

import { useEffect } from "react"
import ReactGA from "react-ga4"

interface GoogleAnalyticsProps {
  trackingId: string
}

export default function GoogleAnalytics({ trackingId }: GoogleAnalyticsProps) {
  useEffect(() => {
    if (trackingId && typeof window !== "undefined") {
      ReactGA.initialize(trackingId)
      ReactGA.send({ hitType: "pageview", page: window.location.pathname })
    }
  }, [trackingId])

  return null
}
