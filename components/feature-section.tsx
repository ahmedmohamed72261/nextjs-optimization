import type { ReactNode } from "react"

interface FeatureSectionProps {
  icon: ReactNode
  title: string
}

export default function FeatureSection({ icon, title }: FeatureSectionProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-[#143F85]/10 p-2 rounded-full text-[#143F85]">{icon}</div>
        <h3 className="font-bold text-[#0C3C8B] text-xl">{title}</h3>
      </div>
    </div>
  )
}
