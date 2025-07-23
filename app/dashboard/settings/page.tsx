import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { getAuthStatus } from "@/lib/actions/auth-actions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Bell, Shield, CreditCard, Globe } from "lucide-react"
import type { Client } from "@/lib/database/types"

export const metadata: Metadata = {
  title: "الإعدادات | ويز فريلانس",
  description: "إدارة إعدادات حسابك",
}

export default async function SettingsPage() {
  const authResult = await getAuthStatus()

  if (!authResult.success || !authResult.data?.user) {
    redirect("/auth/signin")
  }

  const { user, client } = authResult.data

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0C3C8B] mb-2">الإعدادات</h1>
          <p className="text-gray-600">إدارة إعدادات حسابك وتفضيلاتك</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              الملف الشخصي
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              الإشعارات
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              الأمان
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              الفواتير
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              التفضيلات
            </TabsTrigger>
          </TabsList>

          {/* Profile Settings */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-[#0C3C8B]">
                  معلومات الملف الشخصي
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">الاسم الكامل</Label>
                    <Input
                      id="fullName"
                      defaultValue={(client as Client | null)?.full_name || user.user_metadata?.full_name || ""}
                      placeholder="أدخل اسمك الكامل"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">البريد الإلكتروني</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue={user.email || ""}
                      placeholder="أدخل بريدك الإلكتروني"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">رقم الهاتف</Label>
                    <Input
                      id="phone"
                      defaultValue={(client as Client | null)?.phone || ""}
                      placeholder="أدخل رقم هاتفك"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">اسم الشركة (اختياري)</Label>
                    <Input
                      id="company"
                      defaultValue={(client as Client | null)?.company_name || ""}
                      placeholder="أدخل اسم شركتك"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">نبذة تعريفية</Label>
                  <Textarea
                    id="bio"
                    defaultValue=""
                    placeholder="اكتب نبذة تعريفية عنك"
                    rows={4}
                  />
                </div>
                <Button className="bg-[#0C3C8B] hover:bg-[#143F85]">
                  حفظ التغ��يرات
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Settings */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-[#0C3C8B]">
                  إعدادات الإشعارات
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">إشعارات البريد الإلكتروني</h3>
                      <p className="text-sm text-gray-500">تلقي إشعارات عبر البريد الإلكتروني</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">إشعارات الرسائل النصية</h3>
                      <p className="text-sm text-gray-500">تلقي إشعارات عبر الرسائل النصية</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">إشعارات تحديث الطلبات</h3>
                      <p className="text-sm text-gray-500">إشعار عند تحديث حالة الطلبات</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">إشعارات العروض الجديدة</h3>
                      <p className="text-sm text-gray-500">إشعار عند وجود عروض جديدة</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
                <Button className="bg-[#0C3C8B] hover:bg-[#143F85]">
                  حفظ الإعدادات
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-[#0C3C8B]">
                  إعدادات الأمان
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">تغيير كلمة المرور</h3>
                    <div className="space-y-3">
                      <Input type="password" placeholder="كلمة المرور الحالية" />
                      <Input type="password" placeholder="كلمة المرور الجديدة" />
                      <Input type="password" placeholder="تأكيد كلمة المرور الجديدة" />
                    </div>
                    <Button className="mt-3 bg-[#0C3C8B] hover:bg-[#143F85]">
                      تحديث كلمة المرور
                    </Button>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">المصادقة الثنائية</h3>
                        <p className="text-sm text-gray-500">تفعيل المصادقة الثنائية لحماية إضافية</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing Settings */}
          <TabsContent value="billing">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-[#0C3C8B]">
                  إعدادات الفواتير
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center py-8">
                  <CreditCard className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    لا توجد فواتير حتى الآن
                  </h3>
                  <p className="text-gray-600">
                    ستظهر فواتيرك هنا عند إتمام أول طلب
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences Settings */}
          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-[#0C3C8B]">
                  التفضيلات العامة
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">اللغة</h3>
                      <p className="text-sm text-gray-500">اختر لغة واجهة المستخدم</p>
                    </div>
                    <select className="border rounded-md px-3 py-2">
                      <option value="ar">العربية</option>
                      <option value="en">English</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">المنطقة الزمنية</h3>
                      <p className="text-sm text-gray-500">اختر منطقتك الزمنية</p>
                    </div>
                    <select className="border rounded-md px-3 py-2">
                      <option value="Asia/Riyadh">الرياض (GMT+3)</option>
                      <option value="Asia/Dubai">دبي (GMT+4)</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">الوضع المظلم</h3>
                      <p className="text-sm text-gray-500">تفعيل الوضع المظلم للواجهة</p>
                    </div>
                    <Switch />
                  </div>
                </div>
                <Button className="bg-[#0C3C8B] hover:bg-[#143F85]">
                  حفظ التفضيلات
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}