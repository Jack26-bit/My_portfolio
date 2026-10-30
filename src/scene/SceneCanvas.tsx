import { Suspense, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import { CubeSat } from './CubeSat'
import { OrbitPath } from './OrbitPath'
import { ProjectPlane } from './ProjectPlane'
import { CameraRig } from './CameraRig'
import { SpaceEnvironment } from './SpaceEnvironment'
import { PROJECTS, Project } from '../data/content'

interface SceneCanvasProps {
  scrollProgress: React.MutableRefObject<number>
  mouseRef: React.MutableRefObject<{ x: number; y: number }>
  onSelectProject: (project: Project) => void
}

/**
 * SceneCanvas
 * Houses the continuous 3D space-tech environment:
 * - 3U CubeSat hero model
 * - Orbit curve tracking scroll progression
 * - Interactive 3D Project cards
 * - Camera path rig
 * - Low-power, 60fps-optimized renderer (capped DPR at 2, single key light, no post-processing overhead)
 */
export function SceneCanvas({
  scrollProgress,
  mouseRef,
  onSelectProject,
}: SceneCanvasProps) {
  // Master orbit trajectory curve
  const orbitCurve = useMemo(() => {
    return new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(1.4, 0.0, 0.0),    // Hero
        new THREE.Vector3(2.5, 1.2, -1.5),   // Research
        new THREE.Vector3(0.0, -1.0, -3.5),  // Projects
        new THREE.Vector3(-3.0, 0.5, -1.5),  // Highlights
        new THREE.Vector3(-1.0, 2.0, 1.5),   // Orbit return / Contact
        new THREE.Vector3(1.4, 0.0, 0.0),    // Closed loop
      ],
      true,
      'catmullrom',
      0.6
    )
  }, [])

  // Layout positions for the 4 project planes in 3D space (placed along projects station)
  const projectPlanesConfig = useMemo(() => {
    return [
      {
        pos: [-3.3, 1.1, -0.6] as [number, number, number],
        rot: [0.05, 0.15, -0.02] as [number, number, number],
      },
      {
        pos: [3.3, 1.1, -0.6] as [number, number, number],
        rot: [0.05, -0.15, 0.02] as [number, number, number],
      },
      {
        pos: [-3.3, -1.3, -0.6] as [number, number, number],
        rot: [-0.05, 0.15, 0.01] as [number, number, number],
      },
      {
        pos: [3.3, -1.3, -0.6] as [number, number, number],
        rot: [-0.05, -0.15, -0.01] as [number, number, number],
      },
    ]
  }, [])

  return (
    <div className="canvas-container">
      <Canvas
        shadows
        dpr={[1, Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2)]}
        camera={{ position: [0, 0.5, 5.2], fov: 45, near: 0.1, far: 250 }}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          alpha: false,
        }}
      >
        <Suspense fallback={null}>
          <SpaceEnvironment />
          <CameraRig scrollProgress={scrollProgress} mouseRef={mouseRef} />
          <OrbitPath scrollProgress={scrollProgress} curve={orbitCurve} />
          <CubeSat mouseRef={mouseRef} scrollProgress={scrollProgress} />

          {/* Project 3D Planes */}
          {PROJECTS.map((proj, idx) => {
            const config = projectPlanesConfig[idx] || {
              pos: [0, 0, 0] as [number, number, number],
              rot: [0, 0, 0] as [number, number, number],
            }
            return (
              <ProjectPlane
                key={proj.id}
                project={proj}
                index={idx}
                position={config.pos}
                rotation={config.rot}
                onSelect={onSelectProject}
                mouseRef={mouseRef}
                scrollProgress={scrollProgress}
              />
            )
          })}
        </Suspense>
      </Canvas>
    </div>
  )
}
