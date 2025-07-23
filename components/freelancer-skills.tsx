import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface FreelancerSkillsProps {
  title: string
  description: string
  imageUrl: string
  skills: string[]
  rating: number
  projects: number
  price: string
}

export default function FreelancerSkills({
  title,
  description,
  imageUrl,
  skills,
  rating,
  projects,
  price,
}: FreelancerSkillsProps) {
  return (
    <Card className="p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
      <div className="aspect-video rounded-t-2xl overflow-hidden mb-4">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          width={300}
          height={180}
          className="w-full h-full object-cover"
        />
      </div>

      <h3 className="font-bold text-[#0C2145] text-lg mb-2 text-right">{title}</h3>
      <p className="text-sm text-gray-700 text-right mb-4">{description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {skills.map((skill, index) => (
          <Badge key={index} variant="secondary" className="text-xs">
            {skill}
          </Badge>
        ))}
      </div>

      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center gap-1">
          <span className="text-yellow-500">★</span>
          <span>{rating}</span>
          <span className="text-gray-500">({projects} مشروع)</span>
        </div>
        <span className="font-bold text-[#0C3C8B]">{price}</span>
      </div>
    </Card>
  )
}
