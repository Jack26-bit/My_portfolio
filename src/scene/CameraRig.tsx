import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

interface CameraRigProps {
  scrollProgress: React.MutableRefObject<number>
  mouseRef: React.MutableRefObject<{ x: number; y: number }>
}

/**
 * CameraRig
 * Smoothly navigates the camera along an orbital CatmullRom trajectory
 * as the user scrolls between the 5 stations:
 * 0.00: Hero (Orbiting 3U CubeSat inspection)
 * 0.25: Research (Sensor payload & NavIC scintillation study)
 * 0.50: Projects (Aligned with interactive 3D project cards)
 * 0.75: Highlights (Mission telemetry milestones)
 * 1.00: Contact (Orbital exit vector & telemetry uplink)
 */
export function CameraRig({ scrollProgress, mouseRef }: CameraRigProps) {
  const { camera } = useThree()

  // Define camera waypoints curve
  const { pathCurve, lookAtCurve } = useMemo(() => {
    // Camera positions along scroll
    const cameraWaypoints = [
      new THREE.Vector3(0.0, 0.5, 5.2),    // 0.00: Hero
      new THREE.Vector3(2.6, 1.4, 4.0),    // 0.25: Research
      new THREE.Vector3(0.0, 0.0, 7.8),    // 0.50: Projects
      new THREE.Vector3(-2.4, 1.2, 5.4),   // 0.75: Highlights
      new THREE.Vector3(0.2, 2.8, 6.4),    // 1.00: Contact
    ]

    // Corresponding look-at target waypoints
    const lookAtWaypoints = [
      new THREE.Vector3(0.8, 0.0, 0.0),    // Focus on CubeSat
      new THREE.Vector3(0.6, -0.4, 0.0),   // Focus on payload aperture
      new THREE.Vector3(0.0, -0.2, 0.0),   // Focus on project plane array
      new THREE.Vector3(-0.4, 0.1, 0.0),   // Focus on highlight milestones
      new THREE.Vector3(0.5, 0.4, -1.2),   // Orbital horizon exit
    ]

    return {
      pathCurve: new THREE.CatmullRomCurve3(cameraWaypoints, false, 'catmullrom', 0.5),
      lookAtCurve: new THREE.CatmullRomCurve3(lookAtWaypoints, false, 'catmullrom', 0.5),
    }
  }, [])

  const currentPos = useRef(new THREE.Vector3(0, 0.5, 5.2))
  const currentLookAt = useRef(new THREE.Vector3(0.8, 0, 0))

  useFrame((_, delta) => {
    // Bound progress strictly between 0 and 1
    const p = Math.max(0, Math.min(1, scrollProgress.current))

    // Sample targets from spline curves
    const targetPos = pathCurve.getPointAt(p)
    const targetLookAt = lookAtCurve.getPointAt(p)

    // Add subtle mouse parallax to target position
    const parallaxX = mouseRef.current.x * 0.4
    const parallaxY = mouseRef.current.y * 0.3
    targetPos.x += parallaxX
    targetPos.y += parallaxY

    // Smoothly damp current camera coordinates towards target
    currentPos.current.x = THREE.MathUtils.damp(currentPos.current.x, targetPos.x, 3.5, delta)
    currentPos.current.y = THREE.MathUtils.damp(currentPos.current.y, targetPos.y, 3.5, delta)
    currentPos.current.z = THREE.MathUtils.damp(currentPos.current.z, targetPos.z, 3.5, delta)

    currentLookAt.current.x = THREE.MathUtils.damp(currentLookAt.current.x, targetLookAt.x, 4.0, delta)
    currentLookAt.current.y = THREE.MathUtils.damp(currentLookAt.current.y, targetLookAt.y, 4.0, delta)
    currentLookAt.current.z = THREE.MathUtils.damp(currentLookAt.current.z, targetLookAt.z, 4.0, delta)

    camera.position.copy(currentPos.current)
    camera.lookAt(currentLookAt.current)
  })

  return null
}
