import Image from "next/image"

export default function ThemeSelector() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="col-span-1 md:col-span-2">
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
          <h3 className="text-sm font-bold text-gray-500 mb-2">ترتيب الصفحات الرئيسية</h3>

          <div className="space-y-2">
            <div className="bg-gray-50 p-2 rounded flex justify-between items-center">
              <span className="text-[#0C3C8B] text-sm font-semibold">بانر عريض</span>
              <span className="text-[#143F85]">≡</span>
            </div>
            <div className="bg-gray-50 p-2 rounded flex justify-between items-center">
              <span className="text-[#0C3C8B] text-sm font-semibold">صور متحركة</span>
              <span className="text-[#143F85]">≡</span>
            </div>
            <div className="bg-gray-50 p-2 rounded flex justify-between items-center">
              <span className="text-[#0C3C8B] text-sm font-semibold">مميزات المتجر</span>
              <span className="text-[#143F85]">≡</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4">
          <h3 className="text-sm font-bold text-[#0C3C8B] mb-2">خيارات التصميم</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center justify-between">
              <span className="text-[#0C3C8B] font-semibold">عناصر الصفحة الرئيسية</span>
              <span className="text-[#0C3C8B]">⚙️</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-[#0C3C8B] font-semibold">قوائم المتجر</span>
              <span className="text-[#0C3C8B]">≡</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-[#0C3C8B] font-semibold">تخصيص التصميم</span>
              <span className="text-[#0C3C8B]">🎨</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="bg-white rounded-xl shadow-sm p-2 mb-2">
            <div className="aspect-video rounded-lg overflow-hidden mb-2">
              <Image
                src="/placeholder.svg?height=100&width=150&text=Theme1"
                alt="Theme 1"
                width={150}
                height={100}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-blue-50 rounded text-center py-1 text-xs text-gray-500">الثيم الحالي</div>
          </div>
          <p className="text-xs text-center text-gray-500">ثيم ويز</p>
        </div>

        <div className="bg-blue-50/30 rounded-xl p-4 flex flex-col items-center justify-center">
          <span className="text-xl font-bold text-gray-700">+50</span>
          <span className="text-xs text-gray-500">الثيم الحالي</span>
        </div>
      </div>
    </div>
  )
}
