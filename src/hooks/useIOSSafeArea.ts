'use client'

import { useEffect, useRef } from 'react'

/**
 * Hook to detect iOS devices and apply safe area top padding.
 * Works for both Capacitor apps and iOS Safari.
 * 
 * Safe area values:
 * - Dynamic Island (iPhone 14 Pro+, 15, 16, 17): 50px
 * - Notch (iPhone X, 11, 12, 13, 14): 47px
 * - iPhone SE / non-notch: 0px
 */
export function useIOSSafeArea<T extends HTMLElement>() {
    const ref = useRef<T>(null)

    useEffect(() => {
        if (!ref.current) return

        const isCapacitor = !!(window as any).Capacitor
        const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent) ||
            (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)

        if (isCapacitor || isIOS) {
            const screenHeight = window.screen.height
            let safeTop = 0

            if (screenHeight >= 852) {
                safeTop = 50 // Dynamic Island
            } else if (screenHeight >= 812) {
                safeTop = 47 // Notch
            }

            if (safeTop > 0) {
                ref.current.style.paddingTop = `${safeTop}px`
            }
        }
    }, [])

    return ref
}
