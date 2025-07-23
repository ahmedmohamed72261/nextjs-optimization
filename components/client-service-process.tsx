"use client"

import { useState } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, UserCheck, MessageSquare, CheckCircle, Clock, Star, Shield, Zap, Award, Play } from "lucide-react"
import AnimateOnScroll from "@/components/animate-on-scroll"

const processSteps = [
  {
    id: 1,
    title: "اطلب خدمتك",
    description: "أخبرنا عن مشروعك ومتطلباتك بالتفصيل",
    icon: MessageSquare,
    color: "bg-blue-500",
    details: "صف مشروعك، حدد الميزانية والمدة الزمنية المطلوبة",
  },
  {
    id: 2,
    title: "نبحث عن أفضل فريلانسر",
    description: "نختار لك أفضل المواهب المناسبة لمشروعك",
    icon: Search,
    color: "bg-green-500",
    details: "نحلل المهارات والخبرات ونختار الأنسب لمتطلباتك",
  },
  {
    id: 3,
    title: "نعين الفريلانسر المناسب",
    description: "نربطك مع الفريلانسر الأمثل لتنفيذ مشروعك",
    icon: UserCheck,
    color: "bg-purple-500",
    details: "نقدم لك اقتراحات مخصصة مع ملفات شخصية مفصلة",
  },
  {
    id: 4,
    title: "تابع تقدم العمل",
    description: "راقب سير العمل واحصل على تحديثات مستمرة",
    icon: CheckCircle,
    color: "bg-orange-500",
    details: "نظام متابعة شامل مع تقارير دورية وضمان الجودة",
  },
]

const benefits = [
  {
    icon: Shield,
    title: "ضمان الجودة",
    description: "نضمن لك جودة العمل أو نعيد أموالك",
  },
  {
    icon: Clock,
    title: "توفير الوقت",
    description: "نوفر عليك وقت البحث والمقارنة",
  },
  {
    icon: Award,
    title: "خبراء متخصصون",
    description: "نختار لك فقط الفريلانسرز المحترفين",
  },
  {
    icon: Zap,
    title: "تنفيذ سريع",
    description: "نبدأ العمل على مشروعك فوراً",
  },
]

const testimonials = [
  {
    id: 1,
    name: "أحمد محمد",
    company: "شركة التقنية المتقدمة",
    text: "خدمة ممتازة! وجدوا لي أفضل مطور في وقت قياسي وكانت النتيجة فوق التوقعات",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60&text=AM",
    project: "تطوير تطبيق جوال",
  },
  {
    id: 2,
    name: "فاطمة أحمد",
    company: "متجر الأزياء العصرية",
    text: "الفريلانسر الذي اختاروه لي كان محترف جداً وسلم العمل في الوقت المحدد",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60&text=FA",
    project: "تصميم هوية بصرية",
  },
  {
    id: 3,
    name: "خالد سعد",
    company: "مطعم الذواقة",
    text: "أفضل قرار اتخذته! وفروا علي الكثير من الوقت والجهد في البحث",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60&text=KS",
    project: "حملة تسويقية",
  },
]

export default function ClientServiceProcess() {
  const [activeStep, setActiveStep] = useState(1)

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white" dir="rtl">
      <div className="container mx-auto px-4">
        {/* Header */}
        <AnimateOnScroll animation="fade-up">
          <div className="text-center mb-16">
            <Badge className="bg-[#0C3C8B]/10 text-[#0C3C8B] px-4 py-2 rounded-full mb-4">خدمة مخصصة للعملاء</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0C3C8B] mb-6">
              اطلب خدمتك ودعنا نجد لك
              <br />
              <span className="text-orange-500">أفضل فريلانسر</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              لا تضيع وقتك في البحث والمقارنة. فقط أخبرنا عن مشروعك وسنختار لك أفضل المواهب المتخصصة لتنفيذه بأعلى جودة
              وفي الوقت المحدد
            </p>
          </div>
        </AnimateOnScroll>

        {/* Process Steps */}
        <div className="mb-20">
          <AnimateOnScroll animation="fade-up">
            <h3 className="text-3xl font-bold text-center text-[#0C3C8B] mb-12">كيف نعمل معك؟</h3>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {processSteps.map((step, index) => (
              <AnimateOnScroll key={step.id} animation="fade-up" delay={index * 100}>
                <Card
                  className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-xl ${
                    activeStep === step.id ? "ring-2 ring-[#0C3C8B] bg-[#0C3C8B]/5" : ""
                  }`}
                  onClick={() => setActiveStep(step.id)}
                >
                  <div className="text-center">
                    <div
                      className={`${step.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}
                    >
                      <step.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="bg-gray-100 w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold text-gray-600">
                      {step.id}
                    </div>
                    <h4 className="text-lg font-bold text-[#0C3C8B] mb-2">{step.title}</h4>
                    <p className="text-gray-600 text-sm mb-4">{step.description}</p>
                    <p className="text-xs text-gray-500">{step.details}</p>
                  </div>
                </Card>
              </AnimateOnScroll>
            ))}
          </div>

          {/* Process Visualization */}
          <AnimateOnScroll animation="fade-up">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h4 className="text-2xl font-bold text-[#0C3C8B] mb-4">{processSteps[activeStep - 1]?.title}</h4>
                  <p className="text-gray-600 text-lg mb-6">{processSteps[activeStep - 1]?.details}</p>
                  <div className="flex items-center gap-4">
                    <Button className="bg-[#0C3C8B] hover:bg-[#0C3C8B]/90 text-white">ابدأ مشروعك الآن</Button>
                    <Button variant="outline" className="border-[#0C3C8B] text-[#0C3C8B] bg-transparent">
                      <Play className="h-4 w-4 ml-2" />
                      شاهد الفيديو
                    </Button>
                  </div>
                </div>
                <div className="relative">
                  <Image
                    src="/images/freelancer/team-collaboration.jpg"
                    alt="عملية العمل"
                    width={500}
                    height={300}
                    className="rounded-xl shadow-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>

        {/* Benefits Section */}
        <div className="mb-20">
          <AnimateOnScroll animation="fade-up">
            <h3 className="text-3xl font-bold text-center text-[#0C3C8B] mb-12">لماذا تختار خدمتنا المخصصة؟</h3>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <AnimateOnScroll key={benefit.title} animation="fade-up" delay={index * 100}>
                <Card className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
                  <div className="bg-[#0C3C8B]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="h-8 w-8 text-[#0C3C8B]" />
                  </div>
                  <h4 className="text-lg font-bold text-[#0C3C8B] mb-2">{benefit.title}</h4>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </Card>
              </AnimateOnScroll>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <AnimateOnScroll animation="fade-up">
          <div className="bg-[#0C3C8B] rounded-2xl p-8 text-white mb-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">98%</div>
                <div className="text-blue-200">معدل رضا العملاء</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">24</div>
                <div className="text-blue-200">ساعة متوسط الاستجابة</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">+500</div>
                <div className="text-blue-200">مشروع مكتمل</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">+200</div>
                <div className="text-blue-200">عميل راضي</div>
              </div>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Testimonials */}
        <div className="mb-20">
          <AnimateOnScroll animation="fade-up">
            <h3 className="text-3xl font-bold text-center text-[#0C3C8B] mb-12">ماذا يقول عملاؤنا؟</h3>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <AnimateOnScroll key={testimonial.id} animation="fade-up" delay={index * 100}>
                <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                    <div>
                      <h4 className="font-bold text-[#0C3C8B]">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.company}</p>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">"{testimonial.text}"</p>
                  <Badge variant="secondary" className="text-xs">
                    {testimonial.project}
                  </Badge>
                </Card>
              </AnimateOnScroll>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <AnimateOnScroll animation="fade-up">
          <div className="bg-gradient-to-l from-[#0C3C8B] to-[#143F85] rounded-2xl p-12 text-center text-white">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">جاهز لبدء مشروعك؟</h3>
            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
              أخبرنا عن مشروعك الآن ودعنا نجد لك أفضل فريلانسر لتنفيذه بأعلى جودة
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-[#0C3C8B] hover:bg-gray-100 px-8 py-4 text-lg font-bold">
                اطلب خدمتك الآن
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[#0C3C8B] px-8 py-4 text-lg bg-transparent"
              >
                تحدث مع مستشار
              </Button>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
