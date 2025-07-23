import type { Metadata } from "next"
import AboutContent from "@/components/about/about-content"

export const metadata: Metadata = {
  title: "تعرف على ويز فريلانس | روّاد التسويق الرقمي",
  description:
    "شركة تسويق متخصصة في التسويق الرقمي نقدم حلول مبتكرة لزيادة المبيعات، تعزيز العلامات التجارية، وتحقيق أهدافك التجارية بكفاءة!",
  openGraph: {
    title: "تعرف على ويز فريلانس | روّاد التسويق الرقمي",
    description:
      "شركة تسويق متخصصة في التسويق الرقمي نقدم حلول مبتكرة لزيادة المبيعات، تعزيز العلامات التجارية، وتحقيق أهدافك التجارية بكفاءة!",
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-video-preview": -1,
    "max-image-preview": "large",
  },
}

export default function AboutPage() {
  return <AboutContent />
}
