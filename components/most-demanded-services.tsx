"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Clock, TrendingUp, FlameIcon as Fire, Users, ArrowLeft, Heart, Bookmark } from "lucide-react"
import AnimateOnScroll from "@/components/animate-on-scroll"

const mostDemandedServices = [
  {
    id: 1,
    title: "تصميم لوجو احترافي مع هوية بصرية كاملة",
    description: "تصميم شعار مميز مع دليل الهوية البصرية وجميع الملفات المطلوبة",
    price: 45,
    originalPrice: 80,
    rating: 4.9,
    reviews: 342,
    orders: 1250,
    freelancer: {
      name: "أحمد محمد",
      avatar: "/placeholder.svg?height=40&width=40&text=AM",
      level: "بائع محترف",
      isOnline: true,
    },
    thumbnail: "/images/freelancer/design-work.jpg",
    deliveryTime: "3 أيام",
    category: "تصميم جرافيك",
    trending: true,
    discount: 44,
    features: ["3 مفاهيم تصميم", "مراجعات غير محدودة", "ملفات عالية الجودة", "دليل الاستخدام"],
  },
  {
    id: 2,
    title: "تطوير موقع ويب متجاوب مع لوحة إدارة",
    description: "موقع ويب احترافي متجاوب مع جميع الأجهزة ولوحة إدارة متكاملة",
    price: 280,
    originalPrice: 400,
    rating: 4.8,
    reviews: 189,
    orders: 890,
    freelancer: {
      name: "سارة أحمد",
      avatar: "/placeholder.svg?height=40&width=40&text=SA",
      level: "بائع مميز",
      isOnline: true,
    },
    thumbnail: "/images/freelancer/coding.jpg",
    deliveryTime: "10 أيام",
    category: "برمجة وتطوير",
    trending: true,
    discount: 30,
    features: ["تصميم متجاوب", "لوحة إدارة", "تحسين SEO", "استضافة مجانية"],
  },
  {
    id: 3,
    title: "إدارة حسابات التواصل الاجتماعي شهرياً",
    description: "إدارة شاملة لحساباتك مع تصميم المحتوى وتحليل الأداء",
    price: 120,
    originalPrice: 180,
    rating: 4.7,
    reviews: 267,
    orders: 1100,
    freelancer: {
      name: "فاطمة خالد",
      avatar: "/placeholder.svg?height=40&width=40&text=FK",
      level: "بائع محترف",
      isOnline: false,
    },
    thumbnail: "/images/freelancer/marketing.jpg",
    deliveryTime: "شهرياً",
    category: "تسويق رقمي",
    trending: true,
    discount: 33,
    features: ["30 منشور شهرياً", "تصميم المحتوى", "تحليل الأداء", "رد على التعليقات"],
  },
  {
    id: 4,
    title: "كتابة محتوى تسويقي مع تحسين SEO",
    description: "محتوى إبداعي وجذاب محسن لمحركات البحث مع بحث الكلمات المفتاحية",
    price: 65,
    originalPrice: 100,
    rating: 4.6,
    reviews: 156,
    orders: 780,
    freelancer: {
      name: "محمد علي",
      avatar: "/placeholder.svg?height=40&width=40&text=MA",
      level: "بائع محترف",
      isOnline: true,
    },
    thumbnail: "/images/freelancer/writing.jpg",
    deliveryTime: "5 أيام",
    category: "كتابة وترجمة",
    trending: false,
    discount: 35,
    features: ["10 صفحات محتوى", "تحسين SEO", "بحث الكلمات المفتاحية", "مراجعة مجانية"],
  },
  {
    id: 5,
    title: "تصوير منتجات احترافي مع تعديل",
    description: "تصوير منتجاتك بجودة عالية مع تعديل احترافي وخلفيات متنوعة",
    price: 85,
    originalPrice: 130,
    rating: 4.8,
    reviews: 98,
    orders: 450,
    freelancer: {
      name: "عبدالله سعد",
      avatar: "/placeholder.svg?height=40&width=40&text=AS",
      level: "بائع مميز",
      isOnline: true,
    },
    thumbnail: "/placeholder.svg?height=200&width=300&text=Product+Photography",
    deliveryTime: "3 أيام",
    category: "تصوير",
    trending: false,
    discount: 35,
    features: ["20 صورة عالية الجودة", "تعديل احترافي", "خلفيات متنوعة", "تسليم سريع"],
  },
  {
    id: 6,
    title: "حملة إعلانية متكاملة على جوجل وفيسبوك",
    description: "حملة إعلانية شاملة مع تحليل مفصل للنتائج وتحسين مستمر",
    price: 200,
    originalPrice: 300,
    rating: 4.9,
    reviews: 134,
    orders: 620,
    freelancer: {
      name: "نورا حسن",
      avatar: "/placeholder.svg?height=40&width=40&text=NH",
      level: "بائع محترف",
      isOnline: true,
    },
    thumbnail: "/placeholder.svg?height=200&width=300&text=Ad+Campaign",
    deliveryTime: "7 أيام",
    category: "تسويق رقمي",
    trending: true,
    discount: 33,
    features: ["إعلانات جوجل", "إعلانات فيسبوك", "تحليل مفصل", "تحسين مستمر"],
  },
]

export default function MostDemandedServices() {
  const [likedServices, setLikedServices] = useState<number[]>([])
  const [savedServices, setSavedServices] = useState<number[]>([])

  const toggleLike = (serviceId: number) => {
    setLikedServices((prev) =>
      prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId],
    )
  }

  const toggleSave = (serviceId: number) => {
    setSavedServices((prev) =>
      prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId],
    )
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden" dir="rtl">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1200&text=Pattern')] opacity-5"></div>
      <div className="absolute top-20 right-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <AnimateOnScroll animation="fade-up">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Fire className="h-8 w-8 text-orange-500" />
              <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full text-lg font-bold animate-pulse">
                🔥 الأكثر طلباً
              </Badge>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-[#0C3C8B] mb-6">
              اكتشف الخدمات
              <br />
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                الأكثر طلباً
              </span>
            </h2>

            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              الخدمات التي يطلبها العملاء أكثر من غيرها مع أفضل الفريلانسرز وأعلى التقييمات
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#0C3C8B] mb-1">+5000</div>
                <div className="text-gray-600 text-sm">طلب هذا الشهر</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">98%</div>
                <div className="text-gray-600 text-sm">معدل الرضا</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-1">24</div>
                <div className="text-gray-600 text-sm">ساعة متوسط التسليم</div>
              </div>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {mostDemandedServices.map((service, index) => (
            <AnimateOnScroll key={service.id} animation="fade-up" delay={index * 100}>
              <Card className="group relative overflow-hidden bg-white hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-0 shadow-lg">
                {/* Image Section */}
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src={service.thumbnail || "/placeholder.svg"}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Badges */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    {service.trending && (
                      <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg animate-pulse">
                        <Fire className="h-3 w-3 ml-1" />
                        ترند
                      </Badge>
                    )}
                    <Badge className="bg-green-500 text-white shadow-lg">خصم {service.discount}%</Badge>
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => toggleLike(service.id)}
                      className="bg-white/90 hover:bg-white rounded-full p-2 transition-colors shadow-lg"
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          likedServices.includes(service.id) ? "text-red-500 fill-current" : "text-gray-600"
                        }`}
                      />
                    </button>
                    <button
                      onClick={() => toggleSave(service.id)}
                      className="bg-white/90 hover:bg-white rounded-full p-2 transition-colors shadow-lg"
                    >
                      <Bookmark
                        className={`h-4 w-4 ${
                          savedServices.includes(service.id) ? "text-blue-500 fill-current" : "text-gray-600"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Price Badge */}
                  <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-[#0C3C8B]">${service.price}</span>
                      <span className="text-sm text-gray-500 line-through">${service.originalPrice}</span>
                    </div>
                    <div className="text-xs text-green-600 font-semibold">
                      وفر ${service.originalPrice - service.price}
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute bottom-4 right-4">
                    <Badge className="bg-[#0C3C8B]/90 text-white backdrop-blur-sm">{service.category}</Badge>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  {/* Freelancer Info */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative">
                      <Image
                        src={service.freelancer.avatar || "/placeholder.svg"}
                        alt={service.freelancer.name}
                        width={40}
                        height={40}
                        className="rounded-full border-2 border-gray-200"
                      />
                      {service.freelancer.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 text-sm">{service.freelancer.name}</p>
                      <p className="text-xs text-gray-500">{service.freelancer.level}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="font-bold text-sm">{service.rating}</span>
                      </div>
                      <p className="text-xs text-gray-500">({service.reviews})</p>
                    </div>
                  </div>

                  {/* Service Title */}
                  <Link href={`/service/${service.id}`}>
                    <h3 className="font-bold text-gray-800 mb-3 text-lg line-clamp-2 hover:text-[#0C3C8B] transition-colors group-hover:text-[#0C3C8B]">
                      {service.title}
                    </h3>
                  </Link>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.description}</p>

                  {/* Features */}
                  <div className="space-y-2 mb-4">
                    {service.features.slice(0, 2).map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                    {service.features.length > 2 && (
                      <div className="text-xs text-gray-500">+{service.features.length - 2} مميزات أخرى</div>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between mb-4 text-sm">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>{service.deliveryTime}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <Users className="h-4 w-4" />
                        <span>{service.orders} طلب</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button className="w-full bg-gradient-to-r from-[#0C3C8B] to-[#143F85] hover:from-[#143F85] hover:to-[#0C3C8B] text-white rounded-xl py-3 font-bold transform hover:scale-105 transition-all duration-300 shadow-lg">
                    <ArrowLeft className="h-5 w-5 ml-2" />
                    اطلب الخدمة الآن
                  </Button>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#0C3C8B]/20 rounded-2xl transition-colors duration-300"></div>
              </Card>
            </AnimateOnScroll>
          ))}
        </div>

        {/* Bottom CTA */}
        <AnimateOnScroll animation="fade-up">
          <div className="text-center">
            <div className="bg-gradient-to-r from-[#0C3C8B] to-[#143F85] rounded-2xl p-8 text-white mb-8">
              <h3 className="text-2xl font-bold mb-4">لم تجد ما تبحث عنه؟</h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                أخبرنا عن مشروعك وسنجد لك أفضل فريلانسر مناسب لاحتياجاتك في أقل من 24 ساعة
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-white text-[#0C3C8B] hover:bg-gray-100 px-8 py-3 font-bold rounded-full">
                  اطلب خدمة مخصصة
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-[#0C3C8B] px-8 py-3 font-bold rounded-full bg-transparent"
                >
                  تصفح جميع الخدمات
                </Button>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { icon: "🔒", text: "دفع آمن 100%", color: "text-green-600" },
                { icon: "⚡", text: "استجابة سريعة", color: "text-blue-600" },
                { icon: "🏆", text: "جودة مضمونة", color: "text-purple-600" },
                { icon: "🌟", text: "دعم متواصل", color: "text-orange-600" },
              ].map((item, index) => (
                <div key={index} className="text-center p-4 bg-white rounded-xl shadow-sm">
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <div className={`font-semibold ${item.color}`}>{item.text}</div>
                </div>
              ))}
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
