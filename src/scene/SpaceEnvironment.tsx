import { useMemo } from 'react'
import * as THREE from 'three'

/**
 * Realistic Space Lighting & Distant Stellar Environment
 * - Single key light (harsh solar radiation in vacuum)
 * - Subtle cold fill from Earth albedo
 * - Natural star field with realistic magnitude distribution (no rainbow confetti)
 * - Atmospheric limb curve at nadir
 */
export function SpaceEnvironment() {
  // Generate realistic faint star points with natural magnitude spread
  const starData = useMemo(() => {
    const count = 1200
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      // Distribute on celestial sphere radius 90-140
      const r = 90 + Math.random() * 50
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)

      // Most stars are very faint, few are brighter
      sizes[i] = Math.pow(Math.random(), 3) * 1.5 + 0.4
    }

    const geom = new THREE.BufferGeometry()
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geom.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
    return geom
  }, [])

  return (
    <>
      {/* Primary Key Light: Direct Solar Radiance */}
      <directionalLight
        position={[12, 16, 10]}
        intensity={2.8}
        color="#fffbf2"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={40}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
        shadow-bias={-0.0005}
      />

      {/* Earth Albedo Fill Light (Cold Subtle Uplight from Nadir) */}
      <directionalLight
        position={[-8, -12, -6]}
        intensity={0.65}
        color="#3d5a80"
      />

      {/* Background Vacuum Ambient */}
      <ambientLight intensity={0.4} color="#181c26" />

      {/* Deep Space Background Color */}
      <color attach="background" args={['#08090c']} />

      {/* Distant Realistic Star Field */}
      {/* @ts-ignore */}
      <points geometry={starData}>
        <pointsMaterial
          size={0.08}
          color="#cfd4df"
          transparent
          opacity={0.65}
          sizeAttenuation
        />
      </points>

      {/* Subtle Earth Atmospheric Horizon Curve (Nadir perspective) */}
      <group position={[0, -42, -18]} rotation={[0.1, 0, 0]}>
        <mesh>
          <sphereGeometry args={[38, 64, 32]} />
          <meshStandardMaterial
            color="#07101c"
            roughness={0.9}
            metalness={0.1}
          />
        </mesh>
        {/* Subtle ionospheric limb glow ring */}
        <mesh position={[0, 0, 0]}>
          <ringGeometry args={[38.05, 38.35, 64]} />
          <meshBasicMaterial
            color="#1b4168"
            transparent
            opacity={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </>
  )
}
