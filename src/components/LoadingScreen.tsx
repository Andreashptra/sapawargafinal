'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    // Wait for page to fully load, then fade out
    const handleLoad = () => {
      setTimeout(() => {
        setFadeOut(true)
        setTimeout(() => setVisible(false), 600) // match fade-out duration
      }, 1200) // minimum display time
    }

    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad)
      return () => window.removeEventListener('load', handleLoad)
    }
  }, [])

  if (!visible) return null

  return (
    <div
      className={`loading-screen ${fadeOut ? 'loading-screen--fade-out' : ''}`}
      aria-label="Memuat halaman"
    >
      {/* Decorative background circles */}
      <div className="loading-bg-circle loading-bg-circle--1" />
      <div className="loading-bg-circle loading-bg-circle--2" />

      <div className="loading-content">
        {/* Logo with pulse animation */}
        <div className="loading-logo-wrapper">
          <div className="loading-logo-ring" />
          <Image
            src="/sapa-warga_logo_keckebonagung.svg"
            alt="Logo Kabupaten Demak"
            width={100}
            height={100}
            className="loading-logo"
            priority
          />
        </div>

        {/* Sengkuyung text with shadow animation */}
        <h1 className="loading-title">SENGKUYUNG</h1>
        <p className="loading-subtitle">Sistem Pengaduan Masyarakat</p>

        {/* Loading dots */}
        <div className="loading-dots">
          <span className="loading-dot" />
          <span className="loading-dot" />
          <span className="loading-dot" />
        </div>
      </div>
    </div>
  )
}
