"use client"

import { useEffect } from "react"
import Image from "next/image"
import AOS from "aos"
import "aos/dist/aos.css"

interface FeaturesProps {
  animation: string[]
  cls: string
  headTitle?: string
  headDesc?: string
  img: (string | undefined)[]
  title: (string | undefined)[]
  desc: (string | undefined)[]
  imgsAlt: (string | undefined)[]
}

export default function Features({ animation, cls, headTitle, headDesc, img, title, desc, imgsAlt }: FeaturesProps) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    })
  }, [])

  return (
    <div className={cls}>
      <div className="container">
        <div className="head">
          <h3>{headTitle || "مميزاتنا"}</h3>
          <p>{headDesc || "نقدم لك مجموعة من المميزات التي تساعدك على تحقيق أهدافك"}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div data-aos={animation[0]} className="bg-white/10 p-6 rounded-xl">
            <div className="flex justify-center mb-4">
              <Image
                src={img[0] || "/placeholder.svg?height=80&width=80"}
                alt={imgsAlt[0] || "ميزة 1"}
                width={80}
                height={80}
                className="w-20 h-20"
              />
            </div>
            <h3 className="text-xl font-bold text-center mb-4">{title[0] || "ميزة 1"}</h3>
            <p className="text-center">{desc[0] || "وصف الميزة الأولى"}</p>
          </div>

          <div data-aos={animation[1]} className="bg-white/10 p-6 rounded-xl">
            <div className="flex justify-center mb-4">
              <Image
                src={img[1] || "/placeholder.svg?height=80&width=80"}
                alt={imgsAlt[1] || "ميزة 2"}
                width={80}
                height={80}
                className="w-20 h-20"
              />
            </div>
            <h3 className="text-xl font-bold text-center mb-4">{title[1] || "ميزة 2"}</h3>
            <p className="text-center">{desc[1] || "وصف الميزة الثانية"}</p>
          </div>

          <div data-aos={animation[2]} className="bg-white/10 p-6 rounded-xl">
            <div className="flex justify-center mb-4">
              <Image
                src={img[2] || "/placeholder.svg?height=80&width=80"}
                alt={imgsAlt[2] || "ميزة 3"}
                width={80}
                height={80}
                className="w-20 h-20"
              />
            </div>
            <h3 className="text-xl font-bold text-center mb-4">{title[2] || "ميزة 3"}</h3>
            <p className="text-center">{desc[2] || "وصف الميزة الثالثة"}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
