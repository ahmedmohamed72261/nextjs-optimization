import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from "lucide-react"

export const metadata: Metadata = {
  title: "تواصل معنا | ويز فريلانس",
  description: "تواصل مع فريق ويز فريلانس للحصول على الدعم والمساعدة",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-[#0C3C8B] mb-4">تواصل معنا</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            نحن هنا لمساعدتك. تواصل معنا في أي وقت وسنكون سعداء للرد على استفساراتك
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-[#0C3C8B]">
                  معلومات التواصل
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-[#0C3C8B]/10 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-[#0C3C8B]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">الهاتف</h3>
                    <p className="text-gray-600">+966 50 123 4567</p>
                    <p className="text-gray-600">+966 11 456 7890</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#0C3C8B]/10 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-[#0C3C8B]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">البر��د الإلكتروني</h3>
                    <p className="text-gray-600">info@wizfreelance.com</p>
                    <p className="text-gray-600">support@wizfreelance.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#0C3C8B]/10 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-[#0C3C8B]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">العنوان</h3>
                    <p className="text-gray-600">
                      الرياض، المملكة العربية السعودية
                      <br />
                      حي الملك فهد، طريق الملك عبدالعزيز
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#0C3C8B]/10 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-[#0C3C8B]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">ساعات العمل</h3>
                    <p className="text-gray-600">
                      الأحد - الخميس: 9:00 ص - 6:00 م
                      <br />
                      الجمعة - السبت: مغلق
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Support */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-[#0C3C8B]">
                  الدعم السريع
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                  <MessageCircle className="w-4 h-4 ml-2" />
                  واتساب
                </Button>
                <Button variant="outline" className="w-full">
                  <Phone className="w-4 h-4 ml-2" />
                  اتصال مباشر
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-[#0C3C8B]">
                  أرسل لنا رسالة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">الاسم الأول</Label>
                      <Input id="firstName" placeholder="أدخل اسمك الأول" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">الاسم الأخير</Label>
                      <Input id="lastName" placeholder="أدخل اسمك الأخير" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">البريد الإلكتروني</Label>
                      <Input id="email" type="email" placeholder="أدخل بريدك الإلكتروني" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">رقم الهاتف</Label>
                      <Input id="phone" placeholder="أدخل رقم هاتفك" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">الموضوع</Label>
                    <Input id="subject" placeholder="موضوع الرسالة" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">الرسالة</Label>
                    <Textarea
                      id="message"
                      placeholder="اكتب رسالتك هنا..."
                      rows={6}
                    />
                  </div>

                  <Button className="w-full bg-[#0C3C8B] hover:bg-[#143F85]">
                    <Send className="w-4 h-4 ml-2" />
                    إرسال الرسالة
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-[#0C3C8B] text-center">
                الأسئلة الشائعة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      كيف يمكنني طلب خدمة؟
                    </h3>
                    <p className="text-gray-600">
                      يمكنك تصفح الخدمات المتاحة واختيار الخدمة المناسبة، ثم ملء النموذج المطلوب وإرسال طلبك.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      ما هي طرق الدفع المتاحة؟
                    </h3>
                    <p className="text-gray-600">
                      نقبل جميع طرق الدفع الإلكترونية المحلية والدولية بما في ذلك الفيزا وماستركارد ومدى.
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      كم يستغرق تنفيذ المشروع؟
                    </h3>
                    <p className="text-gray-600">
                      يختلف وقت التنفيذ حسب نوع وحجم المشروع، وسيتم تحديد المدة الزمنية عند قبول الطلب.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      هل يمكنني تعديل الطلب بعد إرساله؟
                    </h3>
                    <p className="text-gray-600">
                      نعم، يمكنك تعديل الطلب قبل بدء العمل عليه. بعد بدء التنفيذ قد تطبق رسوم إضافية للتعديلات.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}