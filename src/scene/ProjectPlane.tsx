import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'
import { Project } from '../data/content'

interface ProjectPlaneProps {
  project: Project
  index: number
  position: [number, number, number]
  rotation: [number, number, number]
  onSelect: (project: Project) => void
  mouseRef: React.MutableRefObject<{ x: number; y: number }>
  scrollProgress: React.MutableRefObject<number>
}

/**
 * 3D Project Card Plane
 * Positioned along the projects station orbit path.
 * Dynamically scales in at Station 03 (Projects), tilts toward cursor, and triggers detail modal.
 */
export function ProjectPlane({
  project,
  index,
  position,
  rotation,
  onSelect,
  mouseRef,
  scrollProgress,
}: ProjectPlaneProps) {
  const meshRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const currentScale = useRef(0)

  // Target rotations for cursor tilt
  const targetRotX = useRef(0)
  const targetRotY = useRef(0)

  useFrame((_, delta) => {
    if (!meshRef.current) return

    // Calculate proximity to Projects Station (center at 0.50, range 0.35 - 0.65)
    const dist = Math.abs(scrollProgress.current - 0.5)
    const targetScaleVal = dist < 0.14 ? 1 - dist / 0.14 : 0
    currentScale.current = THREE.MathUtils.damp(currentScale.current, targetScaleVal, 5, delta)
    meshRef.current.scale.setScalar(currentScale.current)
    meshRef.current.visible = currentScale.current > 0.02

    if (hovered && currentScale.current > 0.5) {
      targetRotX.current = -mouseRef.current.y * 0.25
      targetRotY.current = mouseRef.current.x * 0.25
    } else {
      targetRotX.current = 0
      targetRotY.current = 0
    }

    meshRef.current.rotation.x = THREE.MathUtils.damp(
      meshRef.current.rotation.x,
      rotation[0] + targetRotX.current,
      6,
      delta
    )
    meshRef.current.rotation.y = THREE.MathUtils.damp(
      meshRef.current.rotation.y,
      rotation[1] + targetRotY.current,
      6,
      delta
    )
    meshRef.current.position.z = THREE.MathUtils.damp(
      meshRef.current.position.z,
      position[2] + (hovered ? 0.35 : 0),
      6,
      delta
    )
  })

  return (
    <group
      ref={meshRef}
      position={position}
      rotation={rotation}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(true)
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        setHovered(false)
        document.body.style.cursor = 'default'
      }}
      onClick={(e) => {
        e.stopPropagation()
        onSelect(project)
      }}
    >
      {/* Card Base Plane */}
      <mesh castShadow receiveShadow>
        <planeGeometry args={[2.8, 1.8]} />
        <meshStandardMaterial
          color={hovered ? '#151821' : '#0e1015'}
          roughness={0.3}
          metalness={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Technical card border */}
      <lineSegments>
        <edgesGeometry args={[new THREE.PlaneGeometry(2.8, 1.8)]} />
        <lineBasicMaterial
          color={hovered ? '#e25822' : '#222632'}
          linewidth={hovered ? 2 : 1}
        />
      </lineSegments>

      {/* Project Index / Mission Index */}
      <Text
        position={[-1.15, 0.65, 0.02]}
        fontSize={0.09}
        color={hovered ? '#e25822' : '#828794'}
        anchorX="left"
        anchorY="top"
      >
        {`[0${index + 1}] MISSION PAYLOAD`}
      </Text>

      {/* Project Title */}
      <Text
        position={[-1.15, 0.35, 0.02]}
        fontSize={0.16}
        color="#f0f2f5"
        maxWidth={2.3}
        anchorX="left"
        anchorY="top"
      >
        {project.title}
      </Text>

      {/* Short description preview */}
      <Text
        position={[-1.15, -0.02, 0.02]}
        fontSize={0.085}
        color="#9ca1ad"
        maxWidth={2.3}
        lineHeight={1.3}
        anchorX="left"
        anchorY="top"
      >
        {project.description.length > 70
          ? `${project.description.slice(0, 70)}...`
          : project.description}
      </Text>

      {/* Tech stack badge list */}
      <Text
        position={[-1.15, -0.55, 0.02]}
        fontSize={0.075}
        color={hovered ? '#e25822' : '#6b7280'}
        anchorX="left"
        anchorY="bottom"
      >
        {project.stack.join('  ·  ')}
      </Text>

      {/* Click prompt icon */}
      <Text
        position={[1.15, -0.55, 0.02]}
        fontSize={0.075}
        color={hovered ? '#f0f2f5' : '#4b5260'}
        anchorX="right"
        anchorY="bottom"
      >
        {hovered ? 'EXPAND ->' : 'VIEW'}
      </Text>
    </group>
  )
}
