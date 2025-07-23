import Image from "next/image"
import { Card } from "@/components/ui/card"

interface ServiceCardProps {
  title: string
  description: string
  imageUrl: string
  subtitle?: string
  centerTitle?: boolean
}

export default function ServiceCard({ title, description, imageUrl, subtitle, centerTitle = false }: ServiceCardProps) {
  return (
    <Card className="p-4 rounded-2xl border border-gray-100 shadow-sm">
      <div className="aspect-video rounded-t-2xl overflow-hidden mb-4">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          width={300}
          height={180}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className={`font-bold text-[#0C2145] text-lg mb-2 ${centerTitle ? "text-center" : "text-right"}`}>{title}</h3>
      {subtitle && <h4 className="font-bold text-[#0C2145] text-base mb-2 text-center">{subtitle}</h4>}
      <p className="text-sm text-gray-700 text-right">{description}</p>
    </Card>
  )
}
