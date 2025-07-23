"use client"

import { useEffect, useRef } from "react"

export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const cursorOutlineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const posx = e.clientX
      const posy = e.clientY

      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = `${posx}px`
        cursorDotRef.current.style.top = `${posy}px`
      }

      if (cursorOutlineRef.current) {
        cursorOutlineRef.current.animate(
          {
            left: `${posx}px`,
            top: `${posy}px`,
          },
          { duration: 500, fill: "forwards" },
        )
      }
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <>
      <div
        ref={cursorDotRef}
        data-cursor-dot
        className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2"
      ></div>
      <div
        ref={cursorOutlineRef}
        data-cursor-outline
        className="fixed top-0 left-0 w-8 h-8 border border-primary rounded-full pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2"
      ></div>
    </>
  )
}
