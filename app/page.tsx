import Image from "next/image"
import Link from "next/link"
import { ChevronDown, Menu, Star, Search, Play, ArrowLeft, CheckCircle, Users, Award, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import AnimateOnScroll from "@/components/animate-on-scroll"
import TypeWriter from "@/components/type-writer"
import MostDemandedServices from "@/components/most-demanded-services"
import ClientServiceProcess from "@/components/client-service-process"
import KhamsatStyleServices from "@/components/khamsat-style-services"

const popularCategories = [
  { name: "تصميم جرافيك", icon: "🎨", services: 1250, color: "from-purple-500 to-pink-500" },
  { name: "برمجة وتطوير", icon: "💻", services: 890, color: "from-blue-500 to-cyan-500" },
  { name: "تسويق رقمي", icon: "📈", services: 670, color: "from-green-500 to-emerald-500" },
  { name: "كتابة وترجمة", icon: "✍️", services: 540, color: "from-orange-500 to-red-500" },
  { name: "تصوير", icon: "📸", services: 320, color: "from-indigo-500 to-purple-500" },
  { name: "استشارات", icon: "💡", services: 180, color: "from-yellow-500 to-orange-500" },
]

const featuredServices = [
  {
    id: 1,
    title: "سأصمم لك لوجو احترافي ومميز لعلامتك التجارية",
    price: 25,
    originalPrice: 50,
    rating: 4.9,
    reviews: 127,
    freelancer: "أحمد محمد",
    freelancerLevel: "بائع محترف",
    thumbnail: "/images/freelancer/design-work.jpg",
    deliveryTime: "3 أيام",
    badge: "الأكثر مبيعاً",
  },
  {
    id: 2,
    title: "سأطور لك موقع ويب متجاوب باستخدام أحدث التقنيات",
    price: 150,
    originalPrice: 200,
    rating: 4.8,
    reviews: 64,
    freelancer: "سارة أحمد",
    freelancerLevel: "بائع مميز",
    thumbnail: "/images/freelancer/coding.jpg",
    deliveryTime: "7 أيام",
    badge: "مميز",
  },
  {
    id: 3,
    title: "سأدير حساباتك على وسائل التواصل الاجتماعي بشكل احترافي",
    price: 75,
    originalPrice: 100,
    rating: 4.7,
    reviews: 156,
    freelancer: "فاطمة خالد",
    freelancerLevel: "بائع جديد",
    thumbnail: "/images/freelancer/marketing.jpg",
    deliveryTime: "30 يوم",
    badge: "الأكثر طلباً",
  },
]

const trustIndicators = [
  { icon: Shield, text: "دفع آمن ومضمون", color: "text-green-500" },
  { icon: Award, text: "فريلانسرز معتمدون", color: "text-blue-500" },
  { icon: CheckCircle, text: "ضمان الجودة", color: "text-purple-500" },
  { icon: Users, text: "دعم فني 24/7", color: "text-orange-500" },
]

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white" dir="rtl">
      {/* Enhanced Header/Navigation */}
      <header className="bg-white/95 backdrop-blur-md border-b shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative">
                  <Image
                    src="/logo.png"
                    alt="ويز فريلانس"
                    width={40}
                    height={40}
                    className="h-10 w-auto transition-transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-[#0C3C8B]/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-[#0C3C8B] to-[#143F85] bg-clip-text text-transparent">
                  ويز فريلانس
                </span>
              </Link>

              <ul className="hidden md:flex items-center gap-6">
                <li>
                  <Link
                    href="/"
                    className="text-gray-700 hover:text-[#0C3C8B] font-medium transition-colors relative group"
                  >
                    الرئيسية
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#0C3C8B] transition-all group-hover:w-full"></span>
                  </Link>
                </li>
                <li className="relative group">
                  <button className="flex items-center gap-1 text-gray-700 hover:text-[#0C3C8B] font-medium transition-colors">
                    التصنيفات
                    <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                  </button>
                </li>
                <li>
                  <Link
                    href="/freelancers"
                    className="text-gray-700 hover:text-[#0C3C8B] font-medium transition-colors relative group"
                  >
                    الفريلانسرز
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#0C3C8B] transition-all group-hover:w-full"></span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-gray-700 hover:text-[#0C3C8B] font-medium transition-colors relative group"
                  >
                    من نحن
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#0C3C8B] transition-all group-hover:w-full"></span>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/auth/signin" className="text-gray-700 hover:text-[#0C3C8B] font-medium transition-colors">
                تسجيل الدخول
              </Link>
              <Link
                href="/auth/signup"
                className="bg-gradient-to-r from-[#0C3C8B] to-[#143F85] hover:from-[#143F85] hover:to-[#0C3C8B] text-white px-6 py-2 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                انضم الآن
              </Link>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Enhanced Hero Section */}
      <section className="hero-section relative bg-gradient-to-br from-[#0C3C8B] via-[#143F85] to-[#1e40af] text-white py-24">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1200&text=Pattern')] opacity-5"></div>
        <div className="absolute top-20 right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimateOnScroll animation="fade-up" className="text-right">
              <Badge className="bg-white/20 text-white border-white/30 px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
                🚀 منصة العمل الحر الأولى في السعودية
              </Badge>

              <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
                اكتشف أفضل
                <br />
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  المواهب والخدمات
                </span>
                <br />
                <TypeWriter
                  words={["للتصميم والبرمجة", "للتسويق والكتابة", "لجميع احتياجاتك"]}
                  className="text-cyan-300"
                />
              </h1>

              <p className="text-xl mb-10 text-blue-100 leading-relaxed max-w-2xl">
                منصة ويز فريلانس تجمع بين أفضل المواهب والعملاء لتقديم خدمات عالية الجودة بأسعار تنافسية. ابدأ مشروعك
                اليوم واحصل على نتائج استثنائية.
              </p>

              {/* Enhanced Search Bar */}
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-3 flex items-center gap-3 mb-10 shadow-2xl">
                <input
                  type="text"
                  placeholder="ابحث عن الخدمة التي تحتاجها... (مثال: تصميم لوجو)"
                  className="flex-1 px-6 py-4 text-gray-800 focus:outline-none bg-transparent text-lg"
                />
                <Button className="bg-gradient-to-r from-[#0C3C8B] to-[#143F85] hover:from-[#143F85] hover:to-[#0C3C8B] px-8 py-4 rounded-xl shadow-lg">
                  <Search className="h-5 w-5 ml-2" />
                  بحث
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                {trustIndicators.map((indicator, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-blue-100">
                    <indicator.icon className={`h-4 w-4 ${indicator.color}`} />
                    <span>{indicator.text}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-white text-[#0C3C8B] hover:bg-gray-100 px-10 py-4 text-lg font-bold rounded-full shadow-xl transform hover:scale-105 transition-all duration-300">
                  <ArrowLeft className="h-5 w-5 ml-2" />
                  تصفح الخدمات
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-[#0C3C8B] px-10 py-4 text-lg font-bold rounded-full bg-transparent backdrop-blur-sm transition-all duration-300"
                >
                  ابدأ البيع الآن
                </Button>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-left" className="relative">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <Image
                  src="/images/freelancer/freelancer-hero.jpg"
                  alt="فريلانسر يعمل"
                  width={700}
                  height={500}
                  className="relative rounded-3xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-3xl"></div>

                {/* Play Button */}
                <Button
                  size="lg"
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 rounded-full p-6 group-hover:scale-110 transition-all duration-300"
                >
                  <Play className="h-8 w-8 ml-2" />
                </Button>

                {/* Floating Stats */}
                <div className="absolute -top-6 -right-6 bg-white rounded-2xl p-4 shadow-xl">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#0C3C8B]">+5000</div>
                    <div className="text-sm text-gray-600">فريلانسر نشط</div>
                  </div>
                </div>

                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">98%</div>
                    <div className="text-sm text-gray-600">معدل الرضا</div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Most Demanded Services Section - NEW */}
      <MostDemandedServices />

      {/* Enhanced Stats Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative">
        <div className="container mx-auto px-4">
          <AnimateOnScroll animation="fade-up">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-[#0C3C8B] mb-4">أرقام تتحدث عن نفسها</h2>
              <p className="text-xl text-gray-600">نفخر بثقة عملائنا وإنجازاتنا المتميزة</p>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "+5000", label: "فريلانسر نشط", icon: "👥", color: "from-blue-500 to-cyan-500" },
              { number: "+15000", label: "خدمة متاحة", icon: "🛍️", color: "from-green-500 to-emerald-500" },
              { number: "+25000", label: "مشروع مكتمل", icon: "✅", color: "from-purple-500 to-pink-500" },
              { number: "98%", label: "معدل الرضا", icon: "⭐", color: "from-orange-500 to-red-500" },
            ].map((stat, index) => (
              <AnimateOnScroll key={index} animation="fade-up" delay={index * 100}>
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center text-2xl mb-4 mx-auto group-hover:scale-110 transition-transform`}
                  >
                    {stat.icon}
                  </div>
                  <div className="text-4xl font-bold text-[#0C3C8B] mb-2 text-center">{stat.number}</div>
                  <div className="text-gray-600 text-center font-medium">{stat.label}</div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Client Service Process Section */}
      <ClientServiceProcess />

      {/* Enhanced Popular Categories */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <AnimateOnScroll animation="fade-up">
            <div className="text-center mb-16">
              <Badge className="bg-[#0C3C8B]/10 text-[#0C3C8B] px-4 py-2 rounded-full mb-4">التصنيفات الشائعة</Badge>
              <h2 className="text-4xl font-bold text-[#0C3C8B] mb-6">اكتشف الخدمات حسب التصنيف</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                تصفح مجموعة واسعة من الخدمات المتخصصة التي يقدمها أفضل الفريلانسرز في المنطقة
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {popularCategories.map((category, index) => (
                <AnimateOnScroll key={category.name} animation="fade-up" delay={index * 100}>
                  <Link href={`/category/${category.name}`}>
                    <div className="group cursor-pointer">
                      <div
                        className={`bg-gradient-to-br ${category.color} rounded-2xl p-8 text-center transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-2xl relative overflow-hidden`}
                      >
                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative z-10">
                          <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform">
                            {category.icon}
                          </div>
                          <h3 className="font-bold text-white mb-2 text-lg">{category.name}</h3>
                          <p className="text-white/90 text-sm">{category.services} خدمة</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </AnimateOnScroll>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Enhanced Featured Services */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <AnimateOnScroll animation="fade-up">
            <div className="text-center mb-16">
              <Badge className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full mb-4">الخدمات المميزة</Badge>
              <h2 className="text-4xl font-bold text-[#0C3C8B] mb-6">أفضل الخدمات من فريلانسرز محترفين</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                خدمات عالية الجودة مع ضمان الرضا التام وأسعار تنافسية
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredServices.map((service, index) => (
                <AnimateOnScroll key={service.id} animation="fade-up" delay={index * 100}>
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
                    <div className="aspect-video relative overflow-hidden">
                      <Image
                        src={service.thumbnail || "/placeholder.svg"}
                        alt={service.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                      {/* Badges */}
                      <Badge className="absolute top-4 right-4 bg-orange-500 text-white shadow-lg">
                        {service.badge}
                      </Badge>

                      {/* Price Badge */}
                      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-2">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-[#0C3C8B]">${service.price}</span>
                          <span className="text-sm text-gray-500 line-through">${service.originalPrice}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="font-bold text-gray-800 mb-3 text-lg line-clamp-2 group-hover:text-[#0C3C8B] transition-colors">
                        {service.title}
                      </h3>

                      {/* Freelancer Info */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-[#0C3C8B] to-[#143F85] rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {service.freelancer.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">{service.freelancer}</p>
                          <p className="text-xs text-gray-500">{service.freelancerLevel}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="font-bold text-sm">{service.rating}</span>
                          </div>
                          <span className="text-gray-500 text-sm">({service.reviews} تقييم)</span>
                        </div>
                        <div className="text-sm text-gray-500">⏱️ {service.deliveryTime}</div>
                      </div>

                      <Button className="w-full bg-gradient-to-r from-[#0C3C8B] to-[#143F85] hover:from-[#143F85] hover:to-[#0C3C8B] text-white rounded-xl py-3 font-bold transform hover:scale-105 transition-all duration-300">
                        اطلب الخدمة الآن
                      </Button>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button className="bg-gradient-to-r from-[#0C3C8B] to-[#143F85] hover:from-[#143F85] hover:to-[#0C3C8B] text-white px-10 py-4 text-lg rounded-full shadow-xl transform hover:scale-105 transition-all duration-300">
                <ArrowLeft className="h-5 w-5 ml-2" />
                عرض جميع الخدمات
              </Button>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Services Section */}
      <KhamsatStyleServices />

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#0C3C8B] via-[#143F85] to-[#1e40af] text-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200&text=Pattern')] opacity-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <AnimateOnScroll animation="fade-up">
            <Badge className="bg-white/20 text-white border-white/30 px-6 py-3 rounded-full mb-8 backdrop-blur-sm text-lg">
              🚀 ابدأ رحلتك معنا
            </Badge>

            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
              انضم إلى آلاف النجاحات
              <br />
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                واحقق أهدافك اليوم
              </span>
            </h2>

            <p className="text-xl max-w-4xl mx-auto mb-12 text-blue-100 leading-relaxed">
              سواء كنت فريلانسر تبحث عن فرص جديدة أو عميل يحتاج خدمات متخصصة، منصة ويز فريلانس هي المكان المثالي لتحقيق
              طموحاتك
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <Button className="bg-white text-[#0C3C8B] hover:bg-gray-100 px-12 py-6 text-xl font-bold rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300">
                <Users className="h-6 w-6 ml-3" />
                ابدأ البيع كفريلانسر
              </Button>
              <Button
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-[#0C3C8B] px-12 py-6 text-xl font-bold rounded-full bg-transparent backdrop-blur-sm transition-all duration-300"
              >
                <Search className="h-6 w-6 ml-3" />
                ابحث عن خدمة
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                { icon: "🔒", text: "دفع آمن 100%" },
                { icon: "⚡", text: "استجابة سريعة" },
                { icon: "🏆", text: "جودة مضمونة" },
                { icon: "🌟", text: "دعم متواصل" },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <div className="text-blue-100 text-sm">{item.text}</div>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-800"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <Image src="/logo.png" alt="ويز فريلانس" width={40} height={40} className="h-10 w-auto" />
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  ويز فريلانس
                </span>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                منصة العمل الحر الأولى في المملكة العربية السعودية. نربط بين أفضل المواهب والعملاء لتحقيق النجاح
                المشترك.
              </p>
              <div className="flex gap-4">
                {["📘", "🐦", "📷", "💼"].map((icon, index) => (
                  <div
                    key={index}
                    className="w-10 h-10 bg-gray-800 hover:bg-[#0C3C8B] rounded-full flex items-center justify-center cursor-pointer transition-colors"
                  >
                    {icon}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6 text-blue-400">للفريلانسرز</h3>
              <ul className="space-y-3 text-gray-400">
                {["كيف تبدأ", "نصائح للنجاح", "المجتمع", "الأسعار والعمولات"].map((item, index) => (
                  <li key={index}>
                    <Link href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6 text-blue-400">للعملاء</h3>
              <ul className="space-y-3 text-gray-400">
                {["كيف تطلب خدمة", "ضمان الجودة", "الدعم الفني", "طرق الدفع"].map((item, index) => (
                  <li key={index}>
                    <Link href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6 text-blue-400">تواصل معنا</h3>
              <ul className="space-y-3 text-gray-400">
                {["اتصل بنا", "الأسئلة الشائعة", "سياسة الخصوصية", "الشروط والأحكام"].map((item, index) => (
                  <li key={index}>
                    <Link href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 mb-4 md:mb-0">
              جميع الحقوق محفوظة © 2024 ويز فريلانس - صنع بـ ❤️ في السعودية
            </div>
            <div className="flex gap-6 text-sm text-gray-400">
              <Link href="#" className="hover:text-white transition-colors">
                سياسة الخصوصية
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                الشروط والأحكام
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                خريطة الموقع
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
