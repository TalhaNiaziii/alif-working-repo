"use client"

import { useEffect, useState } from "react"

// This hook detects if the user has requested reduced motion
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Check if window is defined (client-side)
    if (typeof window !== "undefined") {
      // Check initial preference
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
      setPrefersReducedMotion(mediaQuery.matches)

      // Add listener for changes
      const handleChange = () => {
        setPrefersReducedMotion(mediaQuery.matches)
      }

      mediaQuery.addEventListener("change", handleChange)

      // Clean up
      return () => {
        mediaQuery.removeEventListener("change", handleChange)
      }
    }

    return undefined
  }, [])

  return prefersReducedMotion
}

