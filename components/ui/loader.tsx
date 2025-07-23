"use client"

import { FallingLines } from "react-loader-spinner"

interface LoaderProps {
  color?: string
  width?: string
  visible?: boolean
  ariaLabel?: string
  className?: string
}

export default function Loader({
  color = "#0065D2",
  width = "500",
  visible = true,
  ariaLabel = "falling-circles-loading",
  className = "h-screen flex justify-center pl-10 items-center",
}: LoaderProps) {
  return (
    <div className={className}>
      <FallingLines color={color} width={width} visible={visible} ariaLabel={ariaLabel} />
    </div>
  )
}
