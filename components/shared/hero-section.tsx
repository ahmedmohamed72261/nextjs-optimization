"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import AOS from "aos"
import "aos/dist/aos.css"

interface HeroSectionProps {
  btnText?: string
  title?: string
  descrption?: string
  image?: string
  ImgAlt?: string
  titleClass?: string
  animationText?: string
  animationDesc?: string
}

export default function HeroSection({
  btnText,
  title,
  descrption,
  image,
  ImgAlt,
  titleClass,
  animationText,
  animationDesc,
}: HeroSectionProps) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    })
  }, [])

  return (
    <section className="container py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="order-2 md:order-1">
          <h2 data-aos={animationText} className={`text-3xl font-bold mb-4 ${titleClass}`}>
            {title || "عنوان القسم"}
          </h2>
          <p data-aos={animationDesc} className="text-lg mb-6">
            {descrption || "وصف القسم"}
          </p>
          {btnText && (
            <Link href="https://api.whatsapp.com/send/?phone=%2B966566599744" className="showAll">
              {btnText}
            </Link>
          )}
        </div>
        <div className="order-1 md:order-2">
          <Image
            src={image || "/placeholder.svg?height=400&width=500"}
            alt={ImgAlt || "صورة توضيحية"}
            width={500}
            height={400}
            className="rounded-xl mx-auto"
          />
        </div>
      </div>
    </section>
  )
}
