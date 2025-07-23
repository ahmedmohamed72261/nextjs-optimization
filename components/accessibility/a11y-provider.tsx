"use client"

import { createContext, useContext, useEffect, useState } from 'react'

interface A11yContextType {
  reducedMotion: boolean
  highContrast: boolean
  fontSize: 'small' | 'medium' | 'large'
  announcements: string[]
  announce: (message: string) => void
  toggleReducedMotion: () => void
  toggleHighContrast: () => void
  setFontSize: (size: 'small' | 'medium' | 'large') => void
}

const A11yContext = createContext<A11yContextType | undefined>(undefined)

export function A11yProvider({ children }: { children: React.ReactNode }) {
  const [reducedMotion, setReducedMotion] = useState(false)
  const [highContrast, setHighContrast] = useState(false)
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium')
  const [announcements, setAnnouncements] = useState<string[]>([])

  // Check for user preferences on mount
  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)
    
    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches)
    }
    
    mediaQuery.addEventListener('change', handleChange)
    
    // Check for high contrast preference
    const contrastQuery = window.matchMedia('(prefers-contrast: high)')
    setHighContrast(contrastQuery.matches)
    
    const handleContrastChange = (e: MediaQueryListEvent) => {
      setHighContrast(e.matches)
    }
    
    contrastQuery.addEventListener('change', handleContrastChange)

    // Load saved preferences
    const savedFontSize = localStorage.getItem('fontSize') as 'small' | 'medium' | 'large'
    if (savedFontSize) {
      setFontSize(savedFontSize)
    }

    const savedReducedMotion = localStorage.getItem('reducedMotion')
    if (savedReducedMotion) {
      setReducedMotion(savedReducedMotion === 'true')
    }

    const savedHighContrast = localStorage.getItem('highContrast')
    if (savedHighContrast) {
      setHighContrast(savedHighContrast === 'true')
    }

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
      contrastQuery.removeEventListener('change', handleContrastChange)
    }
  }, [])

  // Apply accessibility classes to document
  useEffect(() => {
    const root = document.documentElement
    
    // Apply reduced motion
    if (reducedMotion) {
      root.classList.add('reduce-motion')
    } else {
      root.classList.remove('reduce-motion')
    }

    // Apply high contrast
    if (highContrast) {
      root.classList.add('high-contrast')
    } else {
      root.classList.remove('high-contrast')
    }

    // Apply font size
    root.classList.remove('font-small', 'font-medium', 'font-large')
    root.classList.add(`font-${fontSize}`)

  }, [reducedMotion, highContrast, fontSize])

  const announce = (message: string) => {
    setAnnouncements(prev => [...prev, message])
    // Clear announcement after 5 seconds
    setTimeout(() => {
      setAnnouncements(prev => prev.filter(msg => msg !== message))
    }, 5000)
  }

  const toggleReducedMotion = () => {
    const newValue = !reducedMotion
    setReducedMotion(newValue)
    localStorage.setItem('reducedMotion', newValue.toString())
    announce(newValue ? 'تم تفعيل تقليل الحركة' : 'تم إلغاء تقليل الحركة')
  }

  const toggleHighContrast = () => {
    const newValue = !highContrast
    setHighContrast(newValue)
    localStorage.setItem('highContrast', newValue.toString())
    announce(newValue ? 'تم تفعيل التباين العالي' : 'تم إلغاء ا��تباين العالي')
  }

  const handleSetFontSize = (size: 'small' | 'medium' | 'large') => {
    setFontSize(size)
    localStorage.setItem('fontSize', size)
    const sizeText = size === 'small' ? 'صغير' : size === 'medium' ? 'متوسط' : 'كبير'
    announce(`تم تغيير حجم الخط إلى ${sizeText}`)
  }

  return (
    <A11yContext.Provider value={{
      reducedMotion,
      highContrast,
      fontSize,
      announcements,
      announce,
      toggleReducedMotion,
      toggleHighContrast,
      setFontSize: handleSetFontSize,
    }}>
      {children}
      <LiveRegion announcements={announcements} />
    </A11yContext.Provider>
  )
}

// Live region for screen reader announcements
function LiveRegion({ announcements }: { announcements: string[] }) {
  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
      role="status"
    >
      {announcements.map((announcement, index) => (
        <div key={index}>{announcement}</div>
      ))}
    </div>
  )
}

export function useA11y() {
  const context = useContext(A11yContext)
  if (context === undefined) {
    throw new Error('useA11y must be used within an A11yProvider')
  }
  return context
}

// Accessibility toolbar component
export function A11yToolbar() {
  const { 
    reducedMotion, 
    highContrast, 
    fontSize, 
    toggleReducedMotion, 
    toggleHighContrast, 
    setFontSize 
  } = useA11y()

  return (
    <div 
      className="fixed top-4 left-4 z-50 bg-white border border-gray-300 rounded-lg p-4 shadow-lg"
      role="toolbar"
      aria-label="أدوات إمكانية الوصول"
    >
      <h3 className="text-sm font-semibold mb-3">إمكانية الوصول</h3>
      
      <div className="space-y-2">
        <button
          onClick={toggleReducedMotion}
          className={`w-full text-left px-2 py-1 rounded text-sm ${
            reducedMotion ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'
          }`}
          aria-pressed={reducedMotion}
        >
          تقليل الحركة
        </button>
        
        <button
          onClick={toggleHighContrast}
          className={`w-full text-left px-2 py-1 rounded text-sm ${
            highContrast ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'
          }`}
          aria-pressed={highContrast}
        >
          التباين العالي
        </button>
        
        <div className="space-y-1">
          <label className="text-xs text-gray-600">حجم الخط:</label>
          <div className="flex gap-1">
            {(['small', 'medium', 'large'] as const).map((size) => (
              <button
                key={size}
                onClick={() => setFontSize(size)}
                className={`px-2 py-1 rounded text-xs ${
                  fontSize === size ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'
                }`}
                aria-pressed={fontSize === size}
              >
                {size === 'small' ? 'ص' : size === 'medium' ? 'م' : 'ك'}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}