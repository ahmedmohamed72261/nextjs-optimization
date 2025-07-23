"use client"

import Marquee from "react-fast-marquee"
import type { ReactNode } from "react"

interface MarqueeProps {
  children: ReactNode
  direction?: "left" | "right" | "up" | "down"
  speed?: number
  pauseOnHover?: boolean
  gradient?: boolean
  gradientColor?: string
  className?: string
}

export default function MarqueeComponent({
  children,
  direction = "left",
  speed = 50,
  pauseOnHover = true,
  gradient = true,
  gradientColor = "#ffffff",
  className = "",
}: MarqueeProps) {
  return (
    <div className={className}>
      <Marquee
        direction={direction}
        speed={speed}
        pauseOnHover={pauseOnHover}
        gradient={gradient}
        gradientColor={gradientColor}
      >
        {children}
      </Marquee>
    </div>
  )
}
