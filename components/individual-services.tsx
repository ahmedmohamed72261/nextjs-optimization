"use client"

import { useState } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Plus, Minus, ShoppingCart, Star, Clock, Users } from "lucide-react"

interface Service {
  id: number
  title: string
  description: string
  price: number
  originalPrice?: number
  duration: string
  features: string[]
  imageUrl: string
  category: string
  rating: number
  completedProjects: number
  isPopular?: boolean
  discount?: number
}

const services: Service[] = [
  {
    id: 1,
    title: "تصميم لوجو احترافي",
    description: "تصميم شعار مميز يعكس هوية علامتك التجارية مع 3 مفاهيم مختلفة",
    price: 450,
    originalPrice: 600,
    duration: "3-5 أيام",
    features: ["3 مفاهيم تصميم", "مراجعات غير محدودة", "ملفات عالية الجودة", "دليل الاستخدام"],
    imageUrl: "/images/freelancer/design-work.jpg",
    category: "تصميم",
    rating: 4.9,
    completedProjects: 150,
    isPopular: true,
    discount: 25,
  },
  {
    id: 2,
    title: "تطوير موقع ويب متكامل",
    description: "موقع ويب متجاوب وسريع باستخدام أحدث التقنيات مع لوحة إدارة",
    price: 2200,
    originalPrice: 2800,
    duration: "7-14 يوم",
    features: ["تصميم متجاوب", "تحسين محركات البحث", "لوحة إدارة", "استضافة مجانية لسنة"],
    imageUrl: "/images/freelancer/coding.jpg",
    category: "برمجة",
    rating: 4.8,
    completedProjects: 89,
    discount: 21,
  },
  {
    id: 3,
    title: "إدارة حسابات التواصل الاجتماعي",
    description: "إدارة شاملة لحساباتك على وسائل التواصل مع تصميم المحتوى",
    price: 1000,
    originalPrice: 1300,
    duration: "شهرياً",
    features: ["30 منشور شهرياً", "تصميم المحتوى", "تحليل الأداء", "رد على التعليقات"],
    imageUrl: "/images/freelancer/marketing.jpg",
    category: "تسويق",
    rating: 4.7,
    completedProjects: 200,
    discount: 23,
  },
  {
    id: 4,
    title: "كتابة محتوى تسويقي إبداعي",
    description: "محتوى إبداعي وجذاب لموقعك أو متجرك مع تحسين SEO",
    price: 650,
    originalPrice: 850,
    duration: "5-7 أيام",
    features: ["10 صفحات محتوى", "تحسين SEO", "بحث الكلمات المفتاحية", "مراجعة مجانية"],
    imageUrl: "/images/freelancer/writing.jpg",
    category: "كتابة",
    rating: 4.6,
    completedProjects: 120,
    discount: 24,
  },
  {
    id: 5,
    title: "تصوير منتجات احترافي",
    description: "تصوير منتجاتك بجودة عالية مع تعديل احترافي وخلفيات متنوعة",
    price: 500,
    originalPrice: 700,
    duration: "2-3 أيام",
    features: ["20 صورة عالية الجودة", "تعديل احترافي", "خلفيات متنوعة", "تسليم سريع"],
    imageUrl: "/placeholder.svg?height=200&width=300&text=Product+Photography",
    category: "تصوير",
    rating: 4.8,
    completedProjects: 95,
    discount: 29,
  },
  {
    id: 6,
    title: "استشارة تسويقية شاملة",
    description: "جلسة استشارية مع خبير تسويق لتطوير استراتيجية مخصصة لعملك",
    price: 300,
    originalPrice: 450,
    duration: "ساعة واحدة",
    features: ["تحليل السوق", "استراتيجية مخصصة", "خطة عمل", "متابعة لمدة أسبوع"],
    imageUrl: "/placeholder.svg?height=200&width=300&text=Marketing+Consultation",
    category: "استشارات",
    rating: 4.9,
    completedProjects: 75,
    discount: 33,
  },
  {
    id: 7,
    title: "تطوير تطبيق جوال",
    description: "تطبيق جوال متكامل لنظامي iOS و Android مع واجهة مستخدم حديثة",
    price: 4500,
    originalPrice: 6000,
    duration: "21-30 يوم",
    features: ["تطبيق iOS و Android", "واجهة حديثة", "ربط مع قواعد البيانات", "دعم فني 3 شهور"],
    imageUrl: "/placeholder.svg?height=200&width=300&text=Mobile+App",
    category: "برمجة",
    rating: 4.7,
    completedProjects: 45,
    discount: 25,
  },
  {
    id: 8,
    title: "حملة إعلانية متكاملة",
    description: "حملة إعلانية شاملة على جوجل وفيسبوك مع تحليل مفصل للنتائج",
    price: 1800,
    originalPrice: 2400,
    duration: "شهرياً",
    features: ["إعلانات جوجل", "إعلانات فيسبوك", "تحليل مفصل", "تحسين مستمر"],
    imageUrl: "/placeholder.svg?height=200&width=300&text=Ad+Campaign",
    category: "تسويق",
    rating: 4.8,
    completedProjects: 110,
    isPopular: true,
    discount: 25,
  },
]

export default function IndividualServices() {
  const [selectedServices, setSelectedServices] = useState<number[]>([])
  const [activeCategory, setActiveCategory] = useState<string>("الكل")
  const [showCart, setShowCart] = useState(false)

  const categories = ["الكل", "تصميم", "برمجة", "تسويق", "كتابة", "تصوير", "استشارات"]

  const filteredServices =
    activeCategory === "الكل" ? services : services.filter((service) => service.category === activeCategory)

  const toggleService = (serviceId: number) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId],
    )
  }

  const getTotalPrice = () => {
    return selectedServices.reduce((total, serviceId) => {
      const service = services.find((s) => s.id === serviceId)
      return total + (service?.price || 0)
    }, 0)
  }

  const getTotalOriginalPrice = () => {
    return selectedServices.reduce((total, serviceId) => {
      const service = services.find((s) => s.id === serviceId)
      return total + (service?.originalPrice || service?.price || 0)
    }, 0)
  }

  const getSelectedServicesDetails = () => {
    return services.filter((service) => selectedServices.includes(service.id))
  }

  const getTotalSavings = () => {
    return getTotalOriginalPrice() - getTotalPrice()
  }

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#0C3C8B] mb-4">اختر الخدمات التي تحتاجها</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            صمم باقتك الخاصة من خدماتنا المتنوعة واحصل على حلول مخصصة لاحتياجاتك مع خصومات حصرية
          </p>
          <div className="flex justify-center items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" fill="currentColor" />
              <span className="font-semibold">تقييم 4.8/5</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-[#0C3C8B]" />
              <span className="font-semibold">+1000 عميل راضي</span>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-6 py-3 transition-all duration-300 ${
                activeCategory === category
                  ? "bg-[#0C3C8B] text-white shadow-lg scale-105"
                  : "border-[#0C3C8B] text-[#0C3C8B] hover:bg-[#0C3C8B] hover:text-white hover:scale-105"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {filteredServices.map((service) => (
            <Card
              key={service.id}
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${
                selectedServices.includes(service.id) ? "ring-2 ring-[#0C3C8B] bg-[#0C3C8B]/5 scale-105" : ""
              }`}
            >
              {service.isPopular && (
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="bg-gradient-to-r from-orange-400 to-red-500 text-white animate-pulse">
                    الأكثر طلباً
                  </Badge>
                </div>
              )}

              {service.discount && (
                <div className="absolute top-4 left-4 z-10">
                  <Badge className="bg-green-500 text-white">خصم {service.discount}%</Badge>
                </div>
              )}

              <div className="aspect-video relative overflow-hidden">
                <Image src={service.imageUrl || "/placeholder.svg"} alt={service.title} fill className="object-cover" />
                <div className="absolute bottom-2 right-2">
                  <Badge className="bg-[#0C3C8B]/80 text-white backdrop-blur-sm">{service.category}</Badge>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-bold text-[#0C3C8B] text-lg mb-2 line-clamp-2">{service.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.description}</p>

                {/* Rating and Projects */}
                <div className="flex justify-between items-center mb-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500" fill="currentColor" />
                    <span className="font-semibold">{service.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <Clock className="h-3 w-3" />
                    <span>{service.duration}</span>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  {service.features.slice(0, 3).map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="line-clamp-1">{feature}</span>
                    </div>
                  ))}
                  {service.features.length > 3 && (
                    <div className="text-xs text-gray-500">+{service.features.length - 3} مميزات أخرى</div>
                  )}
                </div>

                <div className="flex justify-between items-center mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-[#0C3C8B]">{service.price} ر.س</span>
                      {service.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">{service.originalPrice} ر.س</span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500">{service.completedProjects} مشروع مكتمل</div>
                  </div>
                </div>

                <Button
                  onClick={() => toggleService(service.id)}
                  className={`w-full transition-all duration-300 ${
                    selectedServices.includes(service.id)
                      ? "bg-red-500 hover:bg-red-600 text-white"
                      : "bg-[#0C3C8B] hover:bg-[#0C3C8B]/90 text-white hover:scale-105"
                  }`}
                >
                  {selectedServices.includes(service.id) ? (
                    <>
                      <Minus className="h-4 w-4 ml-2" />
                      إزالة من السلة
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 ml-2" />
                      أضف إلى السلة
                    </>
                  )}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Floating Cart Button */}
        {selectedServices.length > 0 && (
          <div className="fixed bottom-6 left-6 z-50">
            <Button
              onClick={() => setShowCart(!showCart)}
              className="bg-[#0C3C8B] hover:bg-[#0C3C8B]/90 text-white rounded-full p-4 shadow-2xl animate-bounce"
            >
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                {selectedServices.length}
              </span>
            </Button>
          </div>
        )}

        {/* Selected Services Summary */}
        {selectedServices.length > 0 && (showCart || selectedServices.length > 0) && (
          <div className="bg-white rounded-2xl shadow-2xl p-6 border-2 border-[#0C3C8B]/20 sticky bottom-4 z-40">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-[#0C3C8B]">سلة الخدمات ({selectedServices.length})</h3>
              <Button
                variant="ghost"
                onClick={() => setShowCart(!showCart)}
                className="text-gray-500 hover:text-gray-700"
              >
                {showCart ? "إخفاء" : "عرض"}
              </Button>
            </div>

            {showCart && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 max-h-60 overflow-y-auto">
                  {getSelectedServicesDetails().map((service) => (
                    <div key={service.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm mb-1">{service.title}</h4>
                        <p className="text-xs text-gray-500 mb-1">{service.duration}</p>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-500" fill="currentColor" />
                          <span className="text-xs">{service.rating}</span>
                        </div>
                      </div>
                      <div className="text-left flex items-center gap-2">
                        <div>
                          <span className="font-bold text-[#0C3C8B] block">{service.price} ر.س</span>
                          {service.originalPrice && (
                            <span className="text-xs text-gray-500 line-through">{service.originalPrice} ر.س</span>
                          )}
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => toggleService(service.id)}
                          className="text-red-500 hover:text-red-700 p-1 h-auto"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">السعر الأصلي:</span>
                    <span className="text-gray-500 line-through">{getTotalOriginalPrice()} ر.س</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-green-600 font-semibold">إجمالي التوفير:</span>
                    <span className="text-green-600 font-bold">{getTotalSavings()} ر.س</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xl font-bold">إجمالي التكلفة:</span>
                    <span className="text-3xl font-bold text-[#0C3C8B]">{getTotalPrice()} ر.س</span>
                  </div>
                </div>
              </>
            )}

            <div className="flex flex-col md:flex-row gap-3">
              <Button
                variant="outline"
                onClick={() => setSelectedServices([])}
                className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white flex-1"
              >
                مسح الكل
              </Button>
              <Button className="bg-gradient-to-r from-[#0C3C8B] to-[#143F85] hover:from-[#143F85] hover:to-[#0C3C8B] text-white px-8 flex-2 text-lg font-bold">
                طلب الخدمات الآن
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
