"use client"

import type React from "react"
import { useEffect, useState, useRef, Suspense } from "react"
import { usePathname } from "next/navigation"
import LoadingScreen from "../LoadingScreen/LoadingScreen"
import GlobalLoadingFallback from "../LoadingScreen/GlobalLoadingFallback"

// Create a client component that uses useSearchParams
function PageTransitionContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(false)
  const previousPathRef = useRef<string | null>(null)
  const initialLoadDoneRef = useRef(false)

  // Track route changes to show loading screen
  useEffect(() => {
    // Skip loading on initial page load
    if (!initialLoadDoneRef.current) {
      initialLoadDoneRef.current = true
      return
    }

    // Only show loading screen if the path actually changed
    const currentPath = pathname
    if (previousPathRef.current !== currentPath) {
      setIsLoading(true)
      previousPathRef.current = currentPath
    }
  }, [pathname])

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  return (
    <>
      {isLoading && <LoadingScreen isLoading={isLoading} onLoadingComplete={handleLoadingComplete} />}
      {children}
    </>
  )
}

export default function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<GlobalLoadingFallback />}>
      <PageTransitionContent>{children}</PageTransitionContent>
    </Suspense>
  )
}
