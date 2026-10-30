import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface CubeSatProps {
  mouseRef: React.MutableRefObject<{ x: number; y: number }>
  scrollProgress: React.MutableRefObject<number>
}

/**
 * 3U CubeSat Hero Object
 * Built from precise geometric primitives following standard 1U/3U CubeSat specifications:
 * - 100x100x340mm structural envelope (1.0 x 1.0 x 3.4 ratio)
 * - Hard-anodized aluminum 6061 rails and corner brackets
 * - Photovoltaic cell arrays with busbars
 * - Deployable solar wings with gold Kapton MLI backing
 * - Nadir-facing payload sensor aperture (optical lens)
 * - NavIC/GNSS dual-frequency ceramic patch antenna
 * - Deployable UHF/VHF tape-spring communications whip antenna
 */
export function CubeSat({ mouseRef, scrollProgress }: CubeSatProps) {
  const groupRef = useRef<THREE.Group>(null)
  const chassisRef = useRef<THREE.Group>(null)

  // Solar wing fold angle
  const wingAngle = 0.35

  useFrame((state, delta) => {
    if (!groupRef.current || !chassisRef.current) return

    // Subtle continuous idle rotation in space
    chassisRef.current.rotation.y += delta * 0.15
    chassisRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.08
    chassisRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.3) * 0.05

    // Smooth mouse parallax
    const targetX = mouseRef.current.x * 0.3
    const targetY = mouseRef.current.y * 0.2
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.05)
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY, 0.05)

    // Orbital tumble progression tied subtly to scroll
    const scrollTumble = scrollProgress.current * Math.PI * 1.5
    groupRef.current.position.y = Math.sin(scrollProgress.current * Math.PI * 2) * 0.4
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, scrollTumble * 0.2, 0.05)
  })

  return (
    <group ref={groupRef} position={[1.6, 0, 0]} scale={[1.15, 1.15, 1.15]}>
      <group ref={chassisRef}>
        {/* Main 3U Bus Body (1.0 x 3.0 x 1.0) */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.0, 3.0, 1.0]} />
          <meshStandardMaterial
            color="#14171d"
            metalness={0.85}
            roughness={0.25}
          />
        </mesh>

        {/* 4 Hard Anodized Corner Rails */}
        {[-0.51, 0.51].map((x) =>
          [-0.51, 0.51].map((z) => (
            <mesh key={`rail-${x}-${z}`} position={[x, 0, z]} castShadow>
              <boxGeometry args={[0.08, 3.12, 0.08]} />
              <meshStandardMaterial
                color="#2a2e38"
                metalness={0.9}
                roughness={0.3}
              />
            </mesh>
          ))
        )}

        {/* Top & Bottom Deployer Interface Rings / Stand-offs */}
        <mesh position={[0, 1.55, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
          <meshStandardMaterial color="#3d424e" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0, -1.55, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
          <meshStandardMaterial color="#3d424e" metalness={0.8} roughness={0.3} />
        </mesh>

        {/* Body Solar Cell Arrays (Front & Back Faces) */}
        {[-0.505, 0.505].map((z, idx) => (
          <group key={`cells-z-${idx}`} position={[0, 0, z]}>
            {/* 3 panels per 3U face */}
            {[-0.95, 0, 0.95].map((y, pIdx) => (
              <group key={`pz-${pIdx}`} position={[0, y, 0]}>
                <mesh receiveShadow>
                  <boxGeometry args={[0.88, 0.88, 0.01]} />
                  <meshStandardMaterial
                    color="#0d1b2a"
                    metalness={0.95}
                    roughness={0.15}
                  />
                </mesh>
                {/* Silver cell busbars */}
                <mesh position={[0, 0, 0.008]}>
                  <boxGeometry args={[0.02, 0.84, 0.005]} />
                  <meshStandardMaterial color="#c0c5ce" metalness={1.0} roughness={0.2} />
                </mesh>
              </group>
            ))}
          </group>
        ))}

        {/* Body Solar Cell Arrays (Left Face) */}
        <group position={[-0.505, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          {[-0.95, 0, 0.95].map((y, pIdx) => (
            <mesh key={`pl-${pIdx}`} position={[0, y, 0]}>
              <boxGeometry args={[0.88, 0.88, 0.01]} />
              <meshStandardMaterial
                color="#0d1b2a"
                metalness={0.95}
                roughness={0.15}
              />
            </mesh>
          ))}
        </group>

        {/* Deployable Solar Wings (+X Wing) */}
        <group position={[0.52, 0, 0]} rotation={[0, 0, -wingAngle]}>
          {/* Hinge bracket */}
          <mesh position={[0.04, 0, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 2.6, 8]} />
            <meshStandardMaterial color="#2d3139" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Main wing panel */}
          <group position={[0.9, 0, 0]}>
            {/* Front PV side */}
            <mesh position={[0, 0, 0.005]} castShadow>
              <boxGeometry args={[1.7, 2.7, 0.02]} />
              <meshStandardMaterial
                color="#0b1726"
                metalness={0.9}
                roughness={0.12}
              />
            </mesh>
            {/* Back Gold Kapton MLI thermal blanket */}
            <mesh position={[0, 0, -0.006]}>
              <boxGeometry args={[1.7, 2.7, 0.005]} />
              <meshStandardMaterial
                color="#c48a1b"
                metalness={0.8}
                roughness={0.25}
              />
            </mesh>
            {/* Solar cell division grid */}
            {[-0.8, -0.26, 0.26, 0.8].map((y, sIdx) => (
              <mesh key={`sgrid-r-${sIdx}`} position={[0, y, 0.017]}>
                <boxGeometry args={[1.65, 0.01, 0.005]} />
                <meshStandardMaterial color="#606775" metalness={0.9} roughness={0.3} />
              </mesh>
            ))}
          </group>
        </group>

        {/* Deployable Solar Wings (-X Wing) */}
        <group position={[-0.52, 0, 0]} rotation={[0, 0, wingAngle]}>
          {/* Hinge bracket */}
          <mesh position={[-0.04, 0, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 2.6, 8]} />
            <meshStandardMaterial color="#2d3139" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Main wing panel */}
          <group position={[-0.9, 0, 0]}>
            {/* Front PV side */}
            <mesh position={[0, 0, 0.005]} castShadow>
              <boxGeometry args={[1.7, 2.7, 0.02]} />
              <meshStandardMaterial
                color="#0b1726"
                metalness={0.9}
                roughness={0.12}
              />
            </mesh>
            {/* Back Gold Kapton MLI thermal blanket */}
            <mesh position={[0, 0, -0.006]}>
              <boxGeometry args={[1.7, 2.7, 0.005]} />
              <meshStandardMaterial
                color="#c48a1b"
                metalness={0.8}
                roughness={0.25}
              />
            </mesh>
            {/* Solar cell division grid */}
            {[-0.8, -0.26, 0.26, 0.8].map((y, sIdx) => (
              <mesh key={`sgrid-l-${sIdx}`} position={[0, y, 0.017]}>
                <boxGeometry args={[1.65, 0.01, 0.005]} />
                <meshStandardMaterial color="#606775" metalness={0.9} roughness={0.3} />
              </mesh>
            ))}
          </group>
        </group>

        {/* Nadir Payload Aperture (Bottom Plate Sensor Lens for Earth/Atmosphere Scintillation Observation) */}
        <group position={[0, -1.51, 0]} rotation={[Math.PI / 2, 0, 0]}>
          {/* Lens bezel */}
          <mesh position={[0, 0, 0.02]}>
            <cylinderGeometry args={[0.26, 0.28, 0.06, 24]} />
            <meshStandardMaterial color="#1a1c22" metalness={0.95} roughness={0.1} />
          </mesh>
          {/* Lens glass */}
          <mesh position={[0, 0, 0.045]}>
            <cylinderGeometry args={[0.22, 0.22, 0.01, 24]} />
            <meshStandardMaterial
              color="#0d2b38"
              metalness={0.9}
              roughness={0.05}
            />
          </mesh>
          {/* Secondary optical sensor ring */}
          <mesh position={[0.28, 0.28, 0.01]}>
            <cylinderGeometry args={[0.08, 0.08, 0.03, 16]} />
            <meshStandardMaterial color="#2d3340" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>

        {/* NavIC / GNSS Ceramic Patch Antenna (Top Face Zenith) */}
        <group position={[0, 1.51, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          {/* Ground plane */}
          <mesh position={[0, 0, 0.01]}>
            <boxGeometry args={[0.65, 0.65, 0.02]} />
            <meshStandardMaterial color="#c29b38" metalness={0.85} roughness={0.3} />
          </mesh>
          {/* Ceramic dielectric patch */}
          <mesh position={[0, 0, 0.03]}>
            <boxGeometry args={[0.42, 0.42, 0.03]} />
            <meshStandardMaterial color="#dedede" metalness={0.1} roughness={0.4} />
          </mesh>
          {/* Feed pin */}
          <mesh position={[0.08, 0.08, 0.046]}>
            <cylinderGeometry args={[0.015, 0.015, 0.01, 8]} />
            <meshStandardMaterial color="#ffd700" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>

        {/* Communications Monopole Antennas (Deployable Spring Booms) */}
        <group position={[0.45, 1.5, 0.45]} rotation={[0.2, 0, 0.3]}>
          <mesh position={[0, 0.7, 0]}>
            <cylinderGeometry args={[0.006, 0.006, 1.4, 8]} />
            <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>
        <group position={[-0.45, 1.5, -0.45]} rotation={[-0.2, 0, -0.3]}>
          <mesh position={[0, 0.7, 0]}>
            <cylinderGeometry args={[0.006, 0.006, 1.4, 8]} />
            <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>

        {/* Attitude Control System: Star Tracker Aperture on Zenith */}
        <group position={[-0.25, 1.52, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <mesh>
            <cylinderGeometry args={[0.07, 0.09, 0.05, 16]} />
            <meshStandardMaterial color="#1f232d" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>
      </group>
    </group>
  )
}
