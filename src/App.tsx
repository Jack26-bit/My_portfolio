import { useState, useEffect } from 'react'
import { SceneCanvas } from './scene/SceneCanvas'
import { HeroOverlay } from './sections/HeroOverlay'
import { ResearchOverlay } from './sections/ResearchOverlay'
import { ProjectsOverlay } from './sections/ProjectsOverlay'
import { HighlightsOverlay } from './sections/HighlightsOverlay'
import { ContactOverlay } from './sections/ContactOverlay'
import { Navigation } from './sections/Navigation'
import { ProjectDetailModal } from './sections/ProjectDetailModal'
import { StaticFallback } from './sections/StaticFallback'
import { useScrollProgress } from './hooks/useScrollProgress'
import { useMousePosition } from './hooks/useMousePosition'
import { Project } from './data/content'

export default function App() {
  const scrollProgress = useScrollProgress()
  const mouseRef = useMousePosition()

  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [is3dActive, setIs3dActive] = useState<boolean>(true)
  const [hasWebGL, setHasWebGL] = useState<boolean>(true)

  // Detect WebGL capability and prefers-reduced-motion
  useEffect(() => {
    // Check prefers-reduced-motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (motionQuery.matches) {
      setIs3dActive(false)
    }

    // Check WebGL support
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      if (!gl) {
        setHasWebGL(false)
        setIs3dActive(false)
      }
    } catch {
      setHasWebGL(false)
      setIs3dActive(false)
    }
  }, [])

  return (
    <div style={{ position: 'relative', minHeight: '100vh', backgroundColor: 'var(--bg)' }}>
      {/* Top Header / Navigation */}
      <Navigation
        scrollProgress={scrollProgress}
        is3dActive={is3dActive && hasWebGL}
        onToggle3D={() => setIs3dActive((prev) => !prev)}
      />

      {/* 3D WebGL Scene */}
      {is3dActive && hasWebGL ? (
        <>
          <SceneCanvas
            scrollProgress={scrollProgress}
            mouseRef={mouseRef}
            onSelectProject={setSelectedProject}
          />

          {/* HTML Overlay Stations along the scroll track */}
          <main className="scroll-track">
            <HeroOverlay />
            <ResearchOverlay />
            <ProjectsOverlay onSelectProject={setSelectedProject} />
            <HighlightsOverlay />
            <ContactOverlay />
          </main>
        </>
      ) : (
        /* Static Accessible Fallback (No WebGL or Reduced Motion) */
        <main style={{ paddingTop: '4rem' }}>
          <StaticFallback
            onSelectProject={setSelectedProject}
            onEnable3D={() => {
              if (hasWebGL) setIs3dActive(true)
            }}
          />
        </main>
      )}

      {/* Modal Dialog for Project Inspection */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  )
}
