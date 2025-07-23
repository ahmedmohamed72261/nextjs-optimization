"use client"

import { Typewriter } from "react-simple-typewriter"

interface TypeWriterProps {
  words: string[]
  loop?: boolean
  typeSpeed?: number
  deleteSpeed?: number
  delaySpeed?: number
  className?: string
}

export default function TypeWriter({
  words,
  loop = true,
  typeSpeed = 80,
  deleteSpeed = 50,
  delaySpeed = 1500,
  className = "",
}: TypeWriterProps) {
  return (
    <span className={className}>
      <Typewriter
        words={words}
        loop={loop}
        cursor
        cursorStyle="|"
        typeSpeed={typeSpeed}
        deleteSpeed={deleteSpeed}
        delaySpeed={delaySpeed}
      />
    </span>
  )
}
