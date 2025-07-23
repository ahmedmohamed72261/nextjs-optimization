import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// Utility for merging Tailwind classes conditionally
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility for image optimization
export function getImageProps(src: string, width: number, height: number) {
  return {
    src,
    width,
    height,
    alt: "",
    loading: "lazy",
    decoding: "async",
  }
}
