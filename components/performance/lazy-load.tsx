"use client"

import { Suspense, lazy, ComponentType } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

interface LazyLoadProps {
  fallback?: React.ReactNode
  children: React.ReactNode
}

// Generic lazy loading wrapper
export function LazyLoad({ fallback, children }: LazyLoadProps) {
  return (
    <Suspense fallback={fallback || <DefaultSkeleton />}>
      {children}
    </Suspense>
  )
}

// Default skeleton loader
function DefaultSkeleton() {
  return (
    <div className="space-y-4 p-4">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-32 w-full" />
    </div>
  )
}

// HOC for lazy loading components
export function withLazyLoading<T extends object>(
  Component: ComponentType<T>,
  fallback?: React.ReactNode
) {
  return function LazyComponent(props: T) {
    return (
      <Suspense fallback={fallback || <DefaultSkeleton />}>
        <Component {...props} />
      </Suspense>
    )
  }
}

// Intersection Observer based lazy loading
export function LazySection({ 
  children, 
  fallback,
  threshold = 0.1,
  rootMargin = '50px'
}: LazyLoadProps & {
  threshold?: number
  rootMargin?: string
}) {
  return (
    <div 
      className="lazy-section"
      data-threshold={threshold}
      data-root-margin={rootMargin}
    >
      <Suspense fallback={fallback || <DefaultSkeleton />}>
        {children}
      </Suspense>
    </div>
  )
}

// Preload component for critical resources
export function PreloadResource({ 
  href, 
  as, 
  type,
  crossOrigin 
}: {
  href: string
  as: string
  type?: string
  crossOrigin?: "" | "anonymous" | "use-credentials"
}) {
  return (
    <link
      rel="preload"
      href={href}
      as={as}
      type={type}
      crossOrigin={crossOrigin}
    />
  )
}

// DNS prefetch component
export function DNSPrefetch({ href }: { href: string }) {
  return <link rel="dns-prefetch" href={href} />
}

// Preconnect component
export function Preconnect({ href, crossOrigin }: { href: string; crossOrigin?: boolean }) {
  return (
    <link 
      rel="preconnect" 
      href={href} 
      crossOrigin={crossOrigin ? "" : undefined}
    />
  )
}