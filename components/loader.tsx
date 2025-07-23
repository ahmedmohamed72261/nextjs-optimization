"use client"

import { ThreeDots } from "react-loader-spinner"

interface LoaderProps {
  color?: string
  height?: number
  width?: number
  className?: string
}

export default function Loader({ color = "#0C3C8B", height = 80, width = 80, className = "" }: LoaderProps) {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <ThreeDots height={height} width={width} radius="9" color={color} ariaLabel="three-dots-loading" visible={true} />
    </div>
  )
}
