"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, Clock, Search, Grid3X3, List, ChevronDown, Bookmark } from "lucide-react"

interface ServiceGig {
  id: number
  title: string
  description: string
  price: number
  deliveryTime: string
  rating: number
  reviewsCount: number
  freelancer: {
    name: string
    avatar: string
    level: string
    isOnline: boolean
  }
  thumbnail: string
  category: string
  subcategory: string
  tags: string[]
  isLiked: boolean
  isFeatured: boolean
  completedOrders: number
}

const serviceGigs: ServiceGig[] = [
  {
    id: 1,
    title: "سأصمم لك لوجو احترافي ومميز لعلامتك التجارية",
    description: "تصميم لوجو احترافي مع 3 مفاهيم مختلفة وملفات عالية الجودة",
    price: 25,
    deliveryTime: "3 أيام",
    rating: 4.9,
    reviewsCount: 127,
    freelancer: {
      name: "أحمد محمد",
      avatar: "/placeholder.svg?height=40&width=40&text=AM",
      level: "بائع محترف",
      isOnline: true,
    },
    thumbnail: "/images/freelancer/design-work.jpg",
    category: "تصميم جرافيك",
    subcategory: "تصميم شعارات",
    tags: ["لوجو", "هوية بصرية", "تصميم"],
    isLiked: false,
    isFeatured: true,
    completedOrders: 89,
  },
  {
    id: 2,
    title: "سأطور لك موقع ويب متجاوب باستخدام React و Next.js",
    description: "تطوير موقع ويب حديث ومتجاوب مع جميع الأجهزة",
    price: 150,
    deliveryTime: "7 أيام",
    rating: 4.8,
    reviewsCount: 64,
    freelancer: {
      name: "سارة أحمد",
      avatar: "/placeholder.svg?height=40&width=40&text=SA",
      level: "بائع مميز",
      isOnline: false,
    },
    thumbnail: "/images/freelancer/coding.jpg",
    category: "برمجة وتطوير",
    subcategory: "تطوير مواقع",
    tags: ["React", "Next.js", "موقع ويب"],
    isLiked: true,
    isFeatured: false,
    completedOrders: 45,
  },
  {
    id: 3,
    title: "سأدير حساباتك على وسائل التواصل الاجتماعي لمدة شهر",
    description: "إدارة شاملة لحساباتك مع تصميم المحتوى والتفاعل",
    price: 75,
    deliveryTime: "30 يوم",
    rating: 4.7,
    reviewsCount: 156,
    freelancer: {
      name: "فاطمة خالد",
      avatar: "/placeholder.svg?height=40&width=40&text=FK",
      level: "بائع جديد",
      isOnline: true,
    },
    thumbnail: "/images/freelancer/marketing.jpg",
    category: "تسويق رقمي",
    subcategory: "إدارة وسائل التواصل",
    tags: ["تسويق", "سوشيال ميديا", "إدارة"],
    isLiked: false,
    isFeatured: true,
    completedOrders: 78,
  },
  {
    id: 4,
    title: "سأكتب لك محتوى تسويقي جذاب ومحسن لمحركات البحث",
    description: "كتابة محتوى إبداعي مع تحسين SEO",
    price: 40,
    deliveryTime: "5 أيام",
    rating: 4.6,
    reviewsCount: 93,
    freelancer: {
      name: "محمد علي",
      avatar: "/placeholder.svg?height=40&width=40&text=MA",
      level: "بائع محترف",
      isOnline: true,
    },
    thumbnail: "/images/freelancer/writing.jpg",
    category: "كتابة وترجمة",
    subcategory: "كتابة محتوى",
    tags: ["كتابة", "SEO", "محتوى"],
    isLiked: true,
    isFeatured: false,
    completedOrders: 112,
  },
  {
    id: 5,
    title: "سأصور منتجاتك بشكل احترافي للمتاجر الإلكترونية",
    description: "تصوير منتجات عالي الجودة مع تعديل احترافي",
    price: 35,
    deliveryTime: "2 أيام",
    rating: 4.8,
    reviewsCount: 71,
    freelancer: {
      name: "عبدالله سعد",
      avatar: "/placeholder.svg?height=40&width=40&text=AS",
      level: "بائع مميز",
      isOnline: false,
    },
    thumbnail: "/placeholder.svg?height=200&width=300&text=Product+Photography",
    category: "تصوير",
    subcategory: "تصوير منتجات",
    tags: ["تصوير", "منتجات", "تجارة إلكترونية"],
    isLiked: false,
    isFeatured: false,
    completedOrders: 56,
  },
  {
    id: 6,
    title: "سأقدم لك استشارة تسويقية شاملة لتطوير عملك",
    description: "جلسة استشارية مع خبير تسويق لوضع استراتيجية مخصصة",
    price: 60,
    deliveryTime: "1 يوم",
    rating: 4.9,
    reviewsCount: 38,
    freelancer: {
      name: "نورا حسن",
      avatar: "/placeholder.svg?height=40&width=40&text=NH",
      level: "بائع محترف",
      isOnline: true,
    },
    thumbnail: "/placeholder.svg?height=200&width=300&text=Marketing+Consultation",
    category: "استشارات",
    subcategory: "استشارات تسويقية",
    tags: ["استشارة", "تسويق", "استراتيجية"],
    isLiked: true,
    isFeatured: true,
    completedOrders: 29,
  },
]

const categories = [
  { name: "تصميم جرافيك", count: 1250, icon: "🎨" },
  { name: "برمجة وتطوير", count: 890, icon: "💻" },
  { name: "تسويق رقمي", count: 670, icon: "📈" },
  { name: "كتابة وترجمة", count: 540, icon: "✍️" },
  { name: "تصوير", count: 320, icon: "📸" },
  { name: "استشارات", count: 180, icon: "💡" },
]

export default function KhamsatStyleServices() {
  const [selectedCategory, setSelectedCategory] = useState("الكل")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("الأحدث")
  const [likedServices, setLikedServices] = useState<number[]>([])

  const toggleLike = (serviceId: number) => {
    setLikedServices((prev) =>
      prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId],
    )
  }

  const filteredGigs =
    selectedCategory === "الكل" ? serviceGigs : serviceGigs.filter((gig) => gig.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header Section */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="ابحث عن الخدمة التي تحتاجها..."
                  className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0C3C8B] focus:border-transparent"
                />
              </div>
            </div>

            {/* Filter Controls */}
            <div className="flex gap-4">
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 focus:outline-none focus:ring-2 focus:ring-[#0C3C8B]"
                >
                  <option value="الأحدث">الأحدث</option>
                  <option value="الأعلى تقييماً">الأعلى تقييماً</option>
                  <option value="الأقل سعراً">الأقل سعراً</option>
                  <option value="الأعلى سعراً">الأعلى سعراً</option>
                </select>
                <ChevronDown className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>

              <div className="flex border border-gray-300 rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-lg rounded-l-none"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-lg rounded-r-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-bold text-[#0C3C8B] mb-4">التصنيفات</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory("الكل")}
                  className={`w-full text-right p-3 rounded-lg transition-colors ${
                    selectedCategory === "الكل" ? "bg-[#0C3C8B] text-white" : "hover:bg-gray-100"
                  }`}
                >
                  جميع الخدمات
                </button>
                {categories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`w-full text-right p-3 rounded-lg transition-colors flex items-center justify-between ${
                      selectedCategory === category.name ? "bg-[#0C3C8B] text-white" : "hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{category.icon}</span>
                      <span>{category.name}</span>
                    </div>
                    <span className="text-sm opacity-70">({category.count})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="bg-white rounded-lg p-6 shadow-sm mt-6">
              <h3 className="text-lg font-bold text-[#0C3C8B] mb-4">السعر</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3">
                  <input type="checkbox" className="rounded" />
                  <span>أقل من 25 دولار</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" className="rounded" />
                  <span>25 - 50 دولار</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" className="rounded" />
                  <span>50 - 100 دولار</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" className="rounded" />
                  <span>أكثر من 100 دولار</span>
                </label>
              </div>
            </div>

            {/* Delivery Time Filter */}
            <div className="bg-white rounded-lg p-6 shadow-sm mt-6">
              <h3 className="text-lg font-bold text-[#0C3C8B] mb-4">مدة التسليم</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3">
                  <input type="checkbox" className="rounded" />
                  <span>24 ساعة</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" className="rounded" />
                  <span>3 أيام</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" className="rounded" />
                  <span>7 أيام</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" className="rounded" />
                  <span>أكثر من أسبوع</span>
                </label>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#0C3C8B]">
                {selectedCategory === "الكل" ? "جميع الخدمات" : selectedCategory}
              </h2>
              <span className="text-gray-600">{filteredGigs.length} خدمة متاحة</span>
            </div>

            {/* Services Grid */}
            <div
              className={`grid gap-6 ${
                viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
              }`}
            >
              {filteredGigs.map((gig) => (
                <Card key={gig.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  {/* Service Image */}
                  <div className="relative aspect-video">
                    <Image src={gig.thumbnail || "/placeholder.svg"} alt={gig.title} fill className="object-cover" />
                    {gig.isFeatured && <Badge className="absolute top-3 right-3 bg-orange-500 text-white">مميز</Badge>}
                    <div className="absolute top-3 left-3 flex gap-2">
                      <button
                        onClick={() => toggleLike(gig.id)}
                        className="bg-white/80 hover:bg-white rounded-full p-2 transition-colors"
                      >
                        <Heart
                          className={`h-4 w-4 ${
                            likedServices.includes(gig.id) || gig.isLiked
                              ? "text-red-500 fill-current"
                              : "text-gray-600"
                          }`}
                        />
                      </button>
                      <button className="bg-white/80 hover:bg-white rounded-full p-2 transition-colors">
                        <Bookmark className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                  </div>

                  <div className="p-5">
                    {/* Freelancer Info */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="relative">
                        <Image
                          src={gig.freelancer.avatar || "/placeholder.svg"}
                          alt={gig.freelancer.name}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                        {gig.freelancer.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{gig.freelancer.name}</p>
                        <p className="text-xs text-gray-500">{gig.freelancer.level}</p>
                      </div>
                    </div>

                    {/* Service Title */}
                    <Link href={`/service/${gig.id}`}>
                      <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 hover:text-[#0C3C8B] transition-colors">
                        {gig.title}
                      </h3>
                    </Link>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="font-semibold text-sm">{gig.rating}</span>
                      </div>
                      <span className="text-gray-500 text-sm">({gig.reviewsCount})</span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {gig.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3 border-t">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>{gig.deliveryTime}</span>
                      </div>
                      <div className="text-left">
                        <p className="text-sm text-gray-500">يبدأ من</p>
                        <p className="text-lg font-bold text-[#0C3C8B]">${gig.price}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center mt-8">
              <Button variant="outline" className="px-8 py-3 bg-transparent">
                تحميل المزيد من الخدمات
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
