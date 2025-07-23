"use client"

import { useEffect, type ReactNode } from "react"
import AOS from "aos"
import "aos/dist/aos.css"

interface AnimateOnScrollProps {
  children: ReactNode
  animation?: string
  duration?: number
  delay?: number
  once?: boolean
  className?: string
}

export default function AnimateOnScroll({
  children,
  animation = "fade-up",
  duration = 800,
  delay = 0,
  once = true,
  className = "",
}: AnimateOnScrollProps) {
  useEffect(() => {
    AOS.init({
      once: once,
    })
  }, [once])

  return (
    <div data-aos={animation} data-aos-duration={duration} data-aos-delay={delay} className={className}>
      {children}
    </div>
  )
}
