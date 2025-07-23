"use client"
import Image from "next/image"
import { X, Star, Clock, Users, Check, Shield, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ServiceDetailsModalProps {
  service: {
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
  isOpen: boolean
  onClose: () => void
  onAddToCart: (serviceId: number) => void
  isInCart: boolean
}

export default function ServiceDetailsModal({
  service,
  isOpen,
  onClose,
  onAddToCart,
  isInCart,
}: ServiceDetailsModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 left-4 z-10 bg-white/80 hover:bg-white"
          >
            <X className="h-5 w-5" />
          </Button>

          <div className="aspect-video relative overflow-hidden rounded-t-2xl">
            <Image src={service.imageUrl || "/placeholder.svg"} alt={service.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-4 right-4 flex gap-2">
              <Badge className="bg-[#0C3C8B] text-white">{service.category}</Badge>
              {service.isPopular && (
                <Badge className="bg-gradient-to-r from-orange-400 to-red-500 text-white">الأكثر طلباً</Badge>
              )}
              {service.discount && <Badge className="bg-green-500 text-white">خصم {service.discount}%</Badge>}
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-bold text-[#0C3C8B] mb-4">{service.title}</h2>
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">{service.description}</p>

                <div className="flex items-center gap-6 mb-8">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500" fill="currentColor" />
                    <span className="font-bold text-lg">{service.rating}</span>
                    <span className="text-gray-500">تقييم</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-[#0C3C8B]" />
                    <span className="font-bold">{service.completedProjects}</span>
                    <span className="text-gray-500">مشروع مكتمل</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-gray-500" />
                    <span className="font-bold">{service.duration}</span>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold text-[#0C3C8B] mb-4">ما ستحصل عليه:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 mb-8">
                  <h3 className="text-lg font-bold text-[#0C3C8B] mb-4">ضمانات الخدمة:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-green-500" />
                      <span className="text-sm">ضمان الجودة</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Award className="h-5 w-5 text-blue-500" />
                      <span className="text-sm">خبرة معتمدة</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-orange-500" />
                      <span className="text-sm">تسليم في الوقت</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-2xl p-6 sticky top-4">
                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-4xl font-bold text-[#0C3C8B]">{service.price} ر.س</span>
                      {service.originalPrice && (
                        <span className="text-xl text-gray-500 line-through">{service.originalPrice} ر.س</span>
                      )}
                    </div>
                    {service.discount && (
                      <div className="text-green-600 font-semibold">
                        وفر {service.originalPrice! - service.price} ر.س ({service.discount}% خصم)
                      </div>
                    )}
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">مدة التسليم:</span>
                      <span className="font-semibold">{service.duration}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">التقييم:</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" fill="currentColor" />
                        <span className="font-semibold">{service.rating}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">المشاريع المكتملة:</span>
                      <span className="font-semibold">{service.completedProjects}</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => onAddToCart(service.id)}
                    className={`w-full py-4 text-lg font-bold rounded-xl transition-all duration-300 ${
                      isInCart
                        ? "bg-green-500 hover:bg-green-600 text-white"
                        : "bg-[#0C3C8B] hover:bg-[#0C3C8B]/90 text-white hover:scale-105"
                    }`}
                  >
                    {isInCart ? "تمت الإضافة ✓" : "أضف إلى السلة"}
                  </Button>

                  <div className="mt-4 text-center text-sm text-gray-500">
                    <Shield className="h-4 w-4 inline ml-1" />
                    دفع آمن ومضمون
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
