"use client"

import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  quality?: number
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  sizes?: string
  fill?: boolean
  loading?: 'lazy' | 'eager'
  onLoad?: () => void
  onError?: () => void
  onClick?: () => void
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  quality = 85,
  placeholder = 'empty',
  blurDataURL,
  sizes,
  fill = false,
  loading = 'lazy',
  onLoad,
  onError,
  onClick,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef<HTMLDivElement>(null)

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || loading === 'eager') {
      setIsInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1,
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [priority, loading])

  const handleLoad = () => {
    setIsLoading(false)
    onLoad?.()
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
    onError?.()
  }

  // Generate blur placeholder
  const generateBlurDataURL = (w: number, h: number) => {
    const canvas = document.createElement('canvas')
    canvas.width = w
    canvas.height = h
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.fillStyle = '#f3f4f6'
      ctx.fillRect(0, 0, w, h)
    }
    return canvas.toDataURL()
  }

  const defaultBlurDataURL = blurDataURL || (width && height ? generateBlurDataURL(width, height) : undefined)

  if (hasError) {
    return (
      <div 
        className={cn(
          "flex items-center justify-center bg-gray-100 text-gray-400",
          className
        )}
        style={{ width, height }}
        role="img"
        aria-label={`فشل في تحميل الصورة: ${alt}`}
      >
        <svg 
          className="w-8 h-8" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
          />
        </svg>
      </div>
    )
  }

  return (
    <div 
      ref={imgRef}
      className={cn("relative overflow-hidden", className)}
      style={!fill ? { width, height } : undefined}
      onClick={onClick}
    >
      {isInView && (
        <>
          <Image
            src={src}
            alt={alt}
            width={fill ? undefined : width}
            height={fill ? undefined : height}
            fill={fill}
            priority={priority}
            quality={quality}
            placeholder={placeholder}
            blurDataURL={defaultBlurDataURL}
            sizes={sizes || (fill ? "100vw" : undefined)}
            className={cn(
              "transition-opacity duration-300",
              isLoading ? "opacity-0" : "opacity-100"
            )}
            onLoad={handleLoad}
            onError={handleError}
            {...props}
          />
          
          {/* Loading skeleton */}
          {isLoading && (
            <div 
              className="absolute inset-0 bg-gray-200 animate-pulse"
              aria-hidden="true"
            />
          )}
        </>
      )}
      
      {/* Placeholder when not in view */}
      {!isInView && (
        <div 
          className="w-full h-full bg-gray-100 animate-pulse"
          style={{ width, height }}
          aria-hidden="true"
        />
      )}
    </div>
  )
}

// Progressive image component with multiple sources
export function ProgressiveImage({
  src,
  alt,
  lowQualitySrc,
  className,
  ...props
}: OptimizedImageProps & {
  lowQualitySrc?: string
}) {
  const [currentSrc, setCurrentSrc] = useState(lowQualitySrc || src)
  const [isHighQualityLoaded, setIsHighQualityLoaded] = useState(false)

  useEffect(() => {
    if (lowQualitySrc && src !== lowQualitySrc) {
      const img = new window.Image()
      img.onload = () => {
        setCurrentSrc(src)
        setIsHighQualityLoaded(true)
      }
      img.src = src
    }
  }, [src, lowQualitySrc])

  return (
    <OptimizedImage
      src={currentSrc}
      alt={alt}
      className={cn(
        "transition-all duration-500",
        !isHighQualityLoaded && lowQualitySrc && "filter blur-sm scale-105",
        className
      )}
      {...props}
    />
  )
}

// Image with aspect ratio container
export function AspectRatioImage({
  aspectRatio = "16/9",
  className,
  ...props
}: OptimizedImageProps & {
  aspectRatio?: string
}) {
  return (
    <div 
      className={cn("relative w-full", className)}
      style={{ aspectRatio }}
    >
      <OptimizedImage
        fill
        className="object-cover"
        {...props}
      />
    </div>
  )
}

// Gallery image with zoom functionality
export function GalleryImage({
  className,
  enableZoom = true,
  ...props
}: OptimizedImageProps & {
  enableZoom?: boolean
}) {
  const [isZoomed, setIsZoomed] = useState(false)

  return (
    <div className={cn("relative group cursor-pointer", className)}>
      <OptimizedImage
        className={cn(
          "transition-transform duration-300",
          enableZoom && "group-hover:scale-105",
          isZoomed && "scale-150"
        )}
        onClick={() => enableZoom && setIsZoomed(!isZoomed)}
        {...props}
      />
      
      {enableZoom && (
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white bg-opacity-20 rounded-full p-2">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </div>
        </div>
      )}
    </div>
  )
}