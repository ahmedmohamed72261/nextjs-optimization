"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

export default function BrandCarousel() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let animationId: number
    let position = 0

    const animate = () => {
      position -= 1
      if (position <= -1200) position = 0
      if (container) container.style.transform = `translateX(${position}px)`
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <div className="relative overflow-hidden">
      <div ref={containerRef} className="flex items-center gap-8 py-4" style={{ width: "2400px" }}>
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="flex-shrink-0 w-48 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
            <Image
              src={`/placeholder.svg?height=80&width=160&text=Brand${index + 1}`}
              alt={`Brand ${index + 1}`}
              width={160}
              height={80}
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
