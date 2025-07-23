"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import AOS from "aos"
import "aos/dist/aos.css"
import { FallingLines } from "react-loader-spinner"

import { fetchAbout } from "@/lib/redux/slices/about-slice"
import Accordion from "@/components/about/accordion"
import Features from "@/components/shared/features"
import HeroSection from "@/components/shared/hero-section"
import Bannar from "@/components/shared/bannar"
import "@/styles/about.css"

export default function AboutContent() {
  const dispatch = useAppDispatch()
  const about = useAppSelector((state) => state.about.about)
  const aboutStatus = useAppSelector((state) => state.about.status)

  useEffect(() => {
    if (aboutStatus === "idle") {
      dispatch(fetchAbout())
    }
  }, [dispatch, aboutStatus])

  useEffect(() => {
    AOS.init({
      duration: 1500,
      offset: 200,
    })
  }, [])

  if (aboutStatus === "loading") {
    return (
      <div className="h-screen flex justify-center pl-10 items-center">
        <FallingLines color="#0065D2" width="500" visible={true} />
      </div>
    )
  }

  return (
    <>
      <section className="enhanced-section about-hero container">
        <Image
          src={about?.HeroSection?.heroImage || "/placeholder.svg?height=400&width=500"}
          alt={about?.HeroSection?.heroImageAlt || "ويز فريلانس"}
          width={500}
          height={400}
        />
        <div className="about">
          <h1>{about?.HeroSection?.heroTitle || "نحن هنا لنمكن رواد الأعمال علي تحقيق النجاح"}</h1>
          <p>{about?.HeroSection?.heroDescription || "نقدم حلول تسويقية شاملة تساعدك على النمو"}</p>
          <div className="mt-5">
            <Link href="https://api.whatsapp.com/send/?phone=%2B966566599744" className="showAll">
              اطلب استشارتك الأن
            </Link>
          </div>
        </div>
      </section>

      <Features
        animation={["fade-up", "fade-left", "fade-right"]}
        cls={"bg-[--main-color] text-[#fff]"}
        headTitle={about?.OurBenefitsSection?.ourBenefitsTitle}
        headDesc={about?.OurBenefitsSection?.ourBenefitsDescription}
        img={[
          about?.OurBenefitsSection?.ourBenefitsFirstImage,
          about?.OurBenefitsSection?.ourBenefitsSecondImage,
          about?.OurBenefitsSection?.ourBenefitsThirdImage,
        ]}
        title={[
          about?.OurBenefitsSection?.ourBenefitsFirstTitle,
          about?.OurBenefitsSection?.ourBenefitsSecondTitle,
          about?.OurBenefitsSection?.ourBenefitsThirdTitle,
        ]}
        desc={[
          about?.OurBenefitsSection?.ourBenefitsFirstDescription,
          about?.OurBenefitsSection?.ourBenefitsSecondDescription,
          about?.OurBenefitsSection?.ourBenefitsThirdDescription,
        ]}
        imgsAlt={[
          about?.OurBenefitsSection?.ourBenefitsFirstAlt,
          about?.OurBenefitsSection?.ourBenefitsSecondAlt,
          about?.OurBenefitsSection?.ourBenefitsThirdAlt,
        ]}
      />

      {/* Timeline Section */}
      <section className="timeline-section education container" id="education">
        <h3 className="heading">
          {about?.timeLine?.timeLineTitle ||
            "أدركنا حاجة رواد الأعمال إلى حلول تسويقية شاملة تُساعدهم على تحقيق النجاح، فأنشأنا ويزفري��انس لتلبية هذه الاحتياجات"}
        </h3>
        <div className="timeline-items">
          <div data-aos="fade-up" className="timeline-item">
            <div className="timeline-dot"> 1</div>
            <div className="timeline-content">
              <h3>{about?.timeLine?.title_1 || "تحديد الأهداف"}</h3>
              <p>{about?.timeLine?.desc_1 || "نبدأ بفهم أهدافك التجارية وتحديد الاستراتيجيات المناسبة لتحقيقها."}</p>
            </div>
          </div>
          <div data-aos="fade-up" className="timeline-item">
            <div className="timeline-dot"> 2</div>
            <div className="timeline-content">
              <h3>{about?.timeLine?.title_2 || "تحليل السوق"}</h3>
              <p>{about?.timeLine?.desc_2 || "ندرس السوق والمنافسين لتحديد الفرص والتحديات التي تواجه عملك."}</p>
            </div>
          </div>
          <div data-aos="fade-up" className="timeline-item">
            <div className="timeline-dot"> 3</div>
            <div className="timeline-content">
              <h3>{about?.timeLine?.title_3 || "تطوير الاستراتيجية"}</h3>
              <p>{about?.timeLine?.desc_3 || "نضع خطة تسويقية متكام��ة تناسب احتياجات عملك وتستهدف جمهورك بدقة."}</p>
            </div>
          </div>
          <div data-aos="fade-up" className="timeline-item">
            <div className="timeline-dot"> 4</div>
            <div className="timeline-content">
              <h3>{about?.timeLine?.title_4 || "التنفيذ والمتابعة"}</h3>
              <p>{about?.timeLine?.desc_4 || "ننفذ الخطة بدقة ونتابع النتائج باستمرار لضمان تحقيق الأهداف المرجوة."}</p>
            </div>
          </div>
          <div data-aos="fade-up" className="timeline-item">
            <div className="timeline-dot"> 5</div>
            <div className="timeline-content">
              <h3>{about?.timeLine?.title_5 || "التطوير المستمر"}</h3>
              <p>
                {about?.timeLine?.desc_5 ||
                  "نعمل على تحسين الاستراتيجيات باستمرار بناءً على النتائج والتغيرات في السوق."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Logos Section */}
      <div className="bg-[#F5F5F5F5] overflow-y-hidden">
        <div className="trust container overflow-y-hidden">
          <h3 data-aos="fade-up" className="md:text-[45px] text-[32px] max-w-[600px] text-[#0065d2] font-bold">
            {about?.campTitle?.campTitle || "شركاؤنا في النجاح"}
          </h3>
          <div className="comp grid md:grid-cols-7 md:gap-x-6 gap-5 mt-6 grid-cols-3 aboutComp">
            {Array.from({ length: 32 }).map((_, index) => (
              <Image
                key={index}
                data-aos="fade-up"
                src={`/placeholder.svg?height=80&width=120&text=شركة${index + 1}`}
                alt={`شركة ${index + 1}`}
                width={120}
                height={80}
                className="object-contain"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Map Section */}
      <HeroSection
        btnText={"اطلب استشارتك الآن"}
        title={about?.HeroSection_2?.heroTitle_2}
        descrption={about?.HeroSection_2?.heroDescription_2}
        image={about?.HeroSection_2?.heroImage_2 || "/placeholder.svg?height=400&width=500"}
        ImgAlt={about?.HeroSection_2?.heroImageAlt_2 || "خريطة"}
        titleClass={"text-[#0065D2]"}
        animationText={"fade-left"}
        animationDesc={"fade-up"}
      />

      {/* Benefits Section */}
      <div className="container">
        <h3 className="heading text-right mr-0">{about?.OurBenefitsSection_2?.ourBenefitsTitle_2 || "مميزاتنا"}</h3>
        <div className="futures mt-5">
          <div data-aos={"fade-up"} className="fut">
            <Image
              src={about?.OurBenefitsSection_2?.ourBenefitsFirstImage_2 || "/placeholder.svg?height=48&width=48"}
              alt={about?.OurBenefitsSection_2?.ourBenefitsFirstAlt_2 || "ميزة 1"}
              width={48}
              height={48}
              className="w-12"
            />
            <h3>{about?.OurBenefitsSection_2?.ourBenefitsFirstTitle_2 || "خبرة متميزة"}</h3>
            <p>
              {about?.OurBenefitsSection_2?.ourBenefitsFirstDescription_2 ||
                "فريق من الخبراء المتخصصين في مجال التسويق الرقمي"}
            </p>
          </div>
          <div data-aos={"fade-up"} className="fut">
            <Image
              src={about?.OurBenefitsSection_2?.ourBenefitsSecondImage_2 || "/placeholder.svg?height=48&width=48"}
              alt={about?.OurBenefitsSection_2?.ourBenefitsSecondAlt_2 || "ميزة 2"}
              width={48}
              height={48}
              className="w-12"
            />
            <h3>{about?.OurBenefitsSection_2?.ourBenefitsSecondTitle_2 || "حلول مبتكرة"}</h3>
            <p>
              {about?.OurBenefitsSection_2?.ourBenefitsSecondDescription_2 ||
                "نقدم حلولاً إبداعية تناسب احتياجات عملك الفريدة"}
            </p>
          </div>
          <div data-aos={"fade-up"} className="fut">
            <Image
              src={about?.OurBenefitsSection_2?.ourBenefitsThirdImage_2 || "/placeholder.svg?height=48&width=48"}
              alt={about?.OurBenefitsSection_2?.ourBenefitsThirdAlt_2 || "ميزة 3"}
              width={48}
              height={48}
              className="w-12"
            />
            <h3>{about?.OurBenefitsSection_2?.ourBenefitsThirdTitle_2 || "نتائج ملموسة"}</h3>
            <p>
              {about?.OurBenefitsSection_2?.ourBenefitsThirdDescription_2 ||
                "نركز على تحقيق نتائج قابلة للقياس تساهم في نمو أعمالك"}
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <Accordion animation={["fade-left"]} />

      {/* Banner Section */}
      <Bannar
        title={about?.bannar?.title}
        desc={about?.bannar?.desc}
        img={about?.bannar?.img}
        imgAlt={about?.bannar?.imgAlt}
      />
    </>
  )
}