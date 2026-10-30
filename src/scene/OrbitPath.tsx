import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface OrbitPathProps {
  scrollProgress: React.MutableRefObject<number>
  curve: THREE.CatmullRomCurve3
}

/**
 * OrbitPath
 * Represents the orbital trajectory.
 * The satellite and camera progress along this curve based on scroll position.
 * Has subtle station waypoint nodes corresponding to each section.
 */
export function OrbitPath({ scrollProgress, curve }: OrbitPathProps) {
  const markerRef = useRef<THREE.Mesh>(null)
  const pulseRef = useRef<THREE.Mesh>(null)

  // Generate points along the curve for line rendering
  const { lineGeometry, stationPoints } = useMemo(() => {
    const points = curve.getPoints(200)
    const geom = new THREE.BufferGeometry().setFromPoints(points)

    // Calculate station points at 0.0, 0.25, 0.50, 0.75, 1.0
    const stationRatios = [0.0, 0.25, 0.5, 0.75, 1.0]
    const stations = stationRatios.map((r) => curve.getPointAt(r))

    return { lineGeometry: geom, stationPoints: stations }
  }, [curve])

  useFrame((state) => {
    if (!markerRef.current) return
    const p = Math.max(0, Math.min(1, scrollProgress.current))
    const currentPos = curve.getPointAt(p)
    markerRef.current.position.copy(currentPos)

    if (pulseRef.current) {
      pulseRef.current.position.copy(currentPos)
      const scale = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.25
      pulseRef.current.scale.set(scale, scale, scale)
    }
  })

  return (
    <group>
      {/* Primary orbital path line */}
      {/* @ts-ignore */}
      <line geometry={lineGeometry}>
        <lineBasicMaterial
          color="#222834"
          transparent
          opacity={0.65}
          linewidth={1}
        />
      </line>

      {/* Orbit Station Waypoints */}
      {stationPoints.map((pos, i) => (
        <group key={`station-${i}`} position={pos}>
          {/* Subtle node beacon */}
          <mesh>
            <sphereGeometry args={[0.07, 16, 16]} />
            <meshBasicMaterial color={i === 0 ? '#e25822' : '#384050'} />
          </mesh>
          {/* Minimal orbital node ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.14, 0.16, 32]} />
            <meshBasicMaterial
              color={i === 0 ? '#e25822' : '#282e3b'}
              side={THREE.DoubleSide}
              transparent
              opacity={0.8}
            />
          </mesh>
        </group>
      ))}

      {/* Current orbit beacon following user scroll */}
      <mesh ref={markerRef}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshBasicMaterial color="#e25822" />
      </mesh>

      {/* Subtle pulse ring around current orbital position */}
      <mesh ref={pulseRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.15, 0.22, 24]} />
        <meshBasicMaterial
          color="#e25822"
          transparent
          opacity={0.35}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}
