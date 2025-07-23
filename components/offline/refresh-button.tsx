"use client"

import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

export default function RefreshButton() {
  return (
    <Button 
      onClick={() => window.location.reload()} 
      className="w-full bg-[#0C3C8B] hover:bg-[#143F85]"
    >
      <RefreshCw className="w-4 h-4 ml-2" />
      إعادة المحاولة
    </Button>
  )
}