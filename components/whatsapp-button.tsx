"use client"

import { useState, useEffect } from "react"
import { MessageCircle } from "lucide-react"

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleClick = () => {
    const audio = new Audio("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/text-typing-Okiu4diduC8LVnj63o6jPCNm3pdiZc.mp3")
    setIsPlaying(true)
    audio.play()

    setTimeout(() => {
      window.open("https://wa.me/966500000000?text=مرحبا،%20أرغب%20في%20الاستفسار%20عن%20خدماتكم", "_blank")
      setIsPlaying(false)
    }, 1000)
  }

  if (!isVisible) return null

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 left-6 z-50 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full p-4 shadow-lg transition-all duration-300 transform hover:scale-110"
      aria-label="تواصل معنا عبر واتساب"
    >
      {isPlaying ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin h-6 w-6 border-2 border-white rounded-full border-t-transparent"></div>
        </div>
      ) : (
        <MessageCircle className="h-6 w-6" />
      )}
    </button>
  )
}
