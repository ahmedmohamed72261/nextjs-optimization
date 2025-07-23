"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import AOS from "aos"
import "aos/dist/aos.css"

interface BannarProps {
  title?: string
  desc?: string
  img?: string
  imgAlt?: string
}

export default function Bannar({ title, desc, img, imgAlt }: BannarProps) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    })
  }, [])

  return (
    <section className="py-16 bg-[#0C3C8B] text-white rounded-2xl mx-4 my-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div data-aos="fade-up">
            <h2 className="text-3xl font-bold mb-6">{title || "ابدأ رحلتك مع ويز فريلانس اليوم"}</h2>
            <p className="text-xl mb-8">{desc || "نحن هنا لمساعدتك على تحقيق أهدافك التسويقية وتنمية أعمالك"}</p>
            <Link
              href="https://api.whatsapp.com/send/?phone=%2B966566599744"
              className="bg-white text-[#0C3C8B] hover:bg-white/90 rounded-full px-8 py-4 text-lg font-bold"
            >
              تواصل معنا الآن
            </Link>
          </div>
          <div data-aos="fade-left" className="flex justify-center">
            <Image
              src={img || "/placeholder.svg?height=300&width=400"}
              alt={imgAlt || "بانر ويز فريلانس"}
              width={400}
              height={300}
              className="rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
