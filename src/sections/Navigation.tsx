import { useEffect, useState } from 'react'
import { PROFILE } from '../data/content'

interface NavigationProps {
  scrollProgress: React.MutableRefObject<number>
  is3dActive: boolean
  onToggle3D: () => void
}

const STATIONS = [
  { id: 'hero', label: '01 ORBIT', target: 0.0 },
  { id: 'research', label: '02 RESEARCH', target: 0.25 },
  { id: 'projects', label: '03 PROJECTS', target: 0.5 },
  { id: 'highlights', label: '04 HIGHLIGHTS', target: 0.75 },
  { id: 'contact', label: '05 CONTACT', target: 1.0 },
]

export function Navigation({ scrollProgress, is3dActive, onToggle3D }: NavigationProps) {
  const [activeStation, setActiveStation] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const p = scrollProgress.current
      if (p < 0.15) setActiveStation(0)
      else if (p < 0.38) setActiveStation(1)
      else if (p < 0.65) setActiveStation(2)
      else if (p < 0.88) setActiveStation(3)
      else setActiveStation(4)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrollProgress])

  const scrollToStation = (targetProgress: number) => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    window.scrollTo({
      top: targetProgress * maxScroll,
      behavior: 'smooth',
    })
  }

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.25rem 2rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        backgroundColor: 'rgba(9, 10, 13, 0.75)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}
    >
      {/* Brand & Telemetry Status */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        <button
          onClick={() => scrollToStation(0)}
          style={{
            background: 'none',
            border: 'none',
            color: '#e6e8eb',
            fontSize: '0.9rem',
            fontWeight: 700,
            letterSpacing: '0.04em',
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          {PROFILE.name.toUpperCase()}
        </button>

        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            color: '#828794',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            borderLeft: '1px solid #1d2028',
            paddingLeft: '1.25rem',
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: '#e25822',
              display: 'inline-block',
            }}
          />
          BLR // LEO ORBIT
        </span>
      </div>

      {/* Station Navigation */}
      <nav
        aria-label="Orbit stations navigation"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.75rem',
        }}
      >
        <div style={{ display: 'none', gap: '1.5rem' }} className="md-flex">
          {STATIONS.map((station, idx) => {
            const isActive = activeStation === idx
            return (
              <button
                key={station.id}
                onClick={() => scrollToStation(station.target)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.08em',
                  color: isActive ? '#f0f2f5' : '#646977',
                  cursor: 'pointer',
                  position: 'relative',
                  padding: '0.25rem 0',
                  transition: 'color 0.2s ease',
                }}
              >
                {station.label}
                {isActive && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: '100%',
                      height: '1px',
                      backgroundColor: '#e25822',
                    }}
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* 3D / Reduced-Motion Toggle */}
        <button
          onClick={onToggle3D}
          style={{
            background: 'none',
            border: '1px solid #1d2028',
            padding: '0.35rem 0.75rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: is3dActive ? '#828794' : '#e25822',
            cursor: 'pointer',
            borderRadius: '2px',
          }}
          title="Toggle 3D WebGL Scene"
          aria-label="Toggle 3D scene"
        >
          {is3dActive ? '3D: ON' : '3D: OFF (STATIC)'}
        </button>
      </nav>
    </header>
  )
}
