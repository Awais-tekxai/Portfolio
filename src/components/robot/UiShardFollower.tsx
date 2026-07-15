import { useFrame } from '@react-three/fiber'
import { memo, useMemo, useRef } from 'react'
import * as THREE from 'three'

import { clamp } from '@/lib/utils'
import { usePortfolioStore } from '@/store/usePortfolioStore'

const BAR_HEIGHTS = [0.18, 0.34, 0.26, 0.48, 0.38, 0.55, 0.3, 0.44] as const
const CODE_WIDTHS = [0.72, 0.48, 0.62, 0.38, 0.55] as const

function DashboardPanel() {
  return (
    <group>
      {/* Glass plate */}
      <mesh castShadow>
        <boxGeometry args={[1.55, 1.05, 0.04]} />
        <meshPhysicalMaterial
          color="#0b1020"
          metalness={0.2}
          roughness={0.2}
          transmission={0.28}
          thickness={0.6}
          ior={1.4}
          clearcoat={0.85}
          clearcoatRoughness={0.12}
          transparent
          opacity={0.92}
          envMapIntensity={1.1}
        />
      </mesh>

      {/* Soft face glow */}
      <mesh position={[0, 0, 0.025]}>
        <planeGeometry args={[1.48, 0.98]} />
        <meshBasicMaterial color="#7c3aed" transparent opacity={0.06} depthWrite={false} />
      </mesh>

      {/* Top header bar */}
      <mesh position={[0, 0.4, 0.03]}>
        <boxGeometry args={[1.35, 0.08, 0.012]} />
        <meshStandardMaterial color="#1e1b4b" metalness={0.3} roughness={0.35} />
      </mesh>
      <mesh position={[-0.48, 0.4, 0.038]}>
        <boxGeometry args={[0.28, 0.028, 0.008]} />
        <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={1.1} toneMapped={false} />
      </mesh>
      <mesh position={[-0.18, 0.4, 0.038]}>
        <boxGeometry args={[0.16, 0.022, 0.008]} />
        <meshStandardMaterial color="#a78bfa" emissive="#a78bfa" emissiveIntensity={0.7} toneMapped={false} />
      </mesh>

      {/* KPI chips */}
      {[
        { x: -0.42, color: '#22d3ee' },
        { x: 0, color: '#a78bfa' },
        { x: 0.42, color: '#818cf8' },
      ].map((chip) => (
        <group key={chip.x} position={[chip.x, 0.22, 0.035]}>
          <mesh>
            <boxGeometry args={[0.34, 0.16, 0.014]} />
            <meshStandardMaterial color="#111827" metalness={0.25} roughness={0.4} />
          </mesh>
          <mesh position={[0, 0.02, 0.01]}>
            <boxGeometry args={[0.18, 0.028, 0.006]} />
            <meshStandardMaterial
              color={chip.color}
              emissive={chip.color}
              emissiveIntensity={1.2}
              toneMapped={false}
            />
          </mesh>
          <mesh position={[0, -0.035, 0.01]}>
            <boxGeometry args={[0.12, 0.016, 0.006]} />
            <meshStandardMaterial color="#64748b" metalness={0.1} roughness={0.5} />
          </mesh>
        </group>
      ))}

      {/* Chart bars */}
      {BAR_HEIGHTS.map((h, i) => {
        const x = -0.52 + i * 0.145
        const color = i % 2 === 0 ? '#22d3ee' : '#a78bfa'
        return (
          <mesh key={i} position={[x, -0.28 + h / 2, 0.035]}>
            <boxGeometry args={[0.1, h, 0.02]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={0.85}
              metalness={0.2}
              roughness={0.25}
              toneMapped={false}
            />
          </mesh>
        )
      })}

      {/* Chart baseline */}
      <mesh position={[0, -0.3, 0.03]}>
        <boxGeometry args={[1.2, 0.008, 0.006]} />
        <meshStandardMaterial color="#334155" metalness={0.2} roughness={0.5} />
      </mesh>
    </group>
  )
}

function CodePanel() {
  return (
    <group>
      <mesh castShadow>
        <boxGeometry args={[0.95, 0.72, 0.035]} />
        <meshPhysicalMaterial
          color="#080e1c"
          metalness={0.25}
          roughness={0.22}
          transmission={0.2}
          thickness={0.45}
          clearcoat={0.7}
          transparent
          opacity={0.94}
        />
      </mesh>

      {/* Window dots */}
      {[
        [-0.32, '#f87171'],
        [-0.22, '#fbbf24'],
        [-0.12, '#34d399'],
      ].map(([x, color]) => (
        <mesh key={String(x)} position={[x as number, 0.26, 0.03]}>
          <sphereGeometry args={[0.022, 12, 12]} />
          <meshStandardMaterial color={color as string} emissive={color as string} emissiveIntensity={0.8} />
        </mesh>
      ))}

      {CODE_WIDTHS.map((w, i) => {
        const y = 0.1 - i * 0.1
        const color = i === 0 || i === 3 ? '#22d3ee' : i === 2 ? '#a78bfa' : '#94a3b8'
        return (
          <mesh key={i} position={[-0.3 + w / 2, y, 0.03]}>
            <boxGeometry args={[w, 0.035, 0.008]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={i < 3 ? 0.7 : 0.25}
              toneMapped={false}
            />
          </mesh>
        )
      })}
    </group>
  )
}

function StatCard() {
  return (
    <group>
      <mesh castShadow>
        <boxGeometry args={[0.7, 0.48, 0.03]} />
        <meshPhysicalMaterial
          color="#0c1222"
          metalness={0.2}
          roughness={0.25}
          transmission={0.22}
          thickness={0.4}
          clearcoat={0.6}
          transparent
          opacity={0.93}
        />
      </mesh>
      <mesh position={[0, 0.1, 0.025]}>
        <boxGeometry args={[0.38, 0.04, 0.008]} />
        <meshStandardMaterial color="#67e8f9" emissive="#67e8f9" emissiveIntensity={1.3} toneMapped={false} />
      </mesh>
      <mesh position={[0, -0.02, 0.025]}>
        <boxGeometry args={[0.28, 0.025, 0.006]} />
        <meshStandardMaterial color="#64748b" />
      </mesh>
      <mesh position={[0, -0.12, 0.025]}>
        <boxGeometry args={[0.5, 0.01, 0.005]} />
        <meshStandardMaterial color="#7c3aed" emissive="#7c3aed" emissiveIntensity={0.6} />
      </mesh>
    </group>
  )
}

export const UiShardFollower = memo(function UiShardFollower() {
  const rootRef = useRef<THREE.Group>(null)
  const mainRef = useRef<THREE.Group>(null)
  const codeRef = useRef<THREE.Group>(null)
  const statRef = useRef<THREE.Group>(null)
  const glowRef = useRef<THREE.PointLight>(null)
  const rimRef = useRef<THREE.PointLight>(null)

  const pos = useRef(new THREE.Vector3(0, 0.2, 0.15))
  const vel = useRef(new THREE.Vector3())
  const accel = useRef(new THREE.Vector3())
  const scratch = useRef(new THREE.Vector3())
  const target = useRef(new THREE.Vector3(0, 0.2, 0.15))
  const journeySmoothed = useRef(0)

  const pointerNorm = usePortfolioStore((s) => s.pointerNorm)
  const sceneIntensity = usePortfolioStore((s) => s.sceneIntensity)
  const activeSection = usePortfolioStore((s) => s.activeSection)

  const colors = useMemo(
    () => ({
      cyan: new THREE.Color('#22d3ee'),
      violet: new THREE.Color('#a78bfa'),
      purple: new THREE.Color('#7c3aed'),
    }),
    [],
  )

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05)
    const { width, height } = state.viewport
    const time = state.clock.elapsedTime
    const isMobile = state.size.width < 1024

    const targetJourney = usePortfolioStore.getState().robotJourney
    const journeyLerp = 1 - Math.pow(0.000008, dt)
    journeySmoothed.current = THREE.MathUtils.lerp(journeySmoothed.current, targetJourney, journeyLerp)
    const t = journeySmoothed.current

    const pointerDamp = 1 - t * 0.75
    const homeX = THREE.MathUtils.lerp(0, -1.05, t)
    const homeY = THREE.MathUtils.lerp(isMobile ? 0.05 : 0.22, -0.1, t)
    const pointerYScale = isMobile ? 0.14 : 0.24

    const tx = clamp(
      THREE.MathUtils.lerp(pointerNorm.x * width * 0.28 * pointerDamp, homeX, t * 0.9),
      -1.3,
      1.1,
    )
    const ty = clamp(
      THREE.MathUtils.lerp(pointerNorm.y * height * pointerYScale * pointerDamp + homeY, homeY, t * 0.35),
      isMobile ? -0.35 : -0.25,
      isMobile ? 0.7 : 1.05,
    )
    target.current.set(tx, ty, 0.18 + sceneIntensity * 0.25)

    accel.current.copy(target.current).sub(pos.current).multiplyScalar(26)
    scratch.current.copy(vel.current).multiplyScalar(6.5)
    accel.current.sub(scratch.current)
    vel.current.addScaledVector(accel.current, dt)
    pos.current.addScaledVector(vel.current, dt)

    const mix = THREE.MathUtils.clamp(sceneIntensity + (activeSection === 'hero' ? 0.15 : 0), 0, 1)
    const pointerMix = 1 - t * 0.75
    const lerpRot = 1 - Math.pow(0.82, dt * 48)

    if (rootRef.current) {
      rootRef.current.position.copy(pos.current)
      rootRef.current.position.y += Math.sin(time * 1.05) * 0.035 * (1 - t * 0.4)

      const yaw = clamp(pos.current.x * 0.42, -0.45, 0.45) * pointerMix + THREE.MathUtils.lerp(0, 0.45, t)
      const pitch = pointerNorm.y * 0.18 * pointerMix + THREE.MathUtils.lerp(0, 0.08, t)
      const roll = Math.sin(time * 0.5) * 0.03 * (1 - t * 0.5)

      rootRef.current.rotation.y = THREE.MathUtils.lerp(rootRef.current.rotation.y, yaw, lerpRot)
      rootRef.current.rotation.x = THREE.MathUtils.lerp(rootRef.current.rotation.x, pitch, lerpRot)
      rootRef.current.rotation.z = THREE.MathUtils.lerp(rootRef.current.rotation.z, roll, lerpRot)
    }

    if (mainRef.current) {
      mainRef.current.rotation.y = Math.sin(time * 0.35) * 0.04
      mainRef.current.position.y = Math.sin(time * 1.2) * 0.015
    }

    if (codeRef.current) {
      codeRef.current.position.y = 0.18 + Math.sin(time * 1.4 + 1) * 0.04
      codeRef.current.rotation.z = -0.18 + Math.sin(time * 0.6) * 0.03
      codeRef.current.rotation.y = 0.25 + pointerNorm.x * 0.08 * pointerMix
    }

    if (statRef.current) {
      statRef.current.position.y = -0.28 + Math.sin(time * 1.1 + 2.2) * 0.035
      statRef.current.rotation.z = 0.22 + Math.sin(time * 0.55 + 0.8) * 0.025
      statRef.current.rotation.y = -0.3 + pointerNorm.x * -0.06 * pointerMix
    }

    if (glowRef.current) {
      glowRef.current.position.copy(pos.current)
      glowRef.current.intensity = 1.1 + mix * 1.8
      glowRef.current.color.lerpColors(colors.cyan, colors.violet, mix * 0.5)
    }

    if (rimRef.current) {
      rimRef.current.position.copy(pos.current)
      rimRef.current.position.x += 0.25
      rimRef.current.position.y += 0.15
      rimRef.current.intensity = 0.45 + mix * 0.9
      rimRef.current.color.lerpColors(colors.purple, colors.cyan, mix * 0.4)
    }
  })

  return (
    <group>
      <pointLight ref={glowRef} intensity={1.4} distance={5} decay={2} color="#22d3ee" />
      <pointLight ref={rimRef} intensity={0.6} distance={3.8} decay={2} color="#7c3aed" />

      <group ref={rootRef} position={[0, 0.2, 0.15]} scale={0.92}>
        <group ref={mainRef}>
          <DashboardPanel />
        </group>

        <group ref={codeRef} position={[0.78, 0.18, 0.22]} rotation={[0.08, 0.28, -0.18]} scale={0.88}>
          <CodePanel />
        </group>

        <group ref={statRef} position={[-0.82, -0.28, 0.18]} rotation={[0.05, -0.28, 0.2]} scale={0.9}>
          <StatCard />
        </group>

        {/* Soft ground glow under the cluster */}
        <mesh position={[0, -0.72, -0.1]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.85, 32]} />
          <meshBasicMaterial color="#7c3aed" transparent opacity={0.07} depthWrite={false} blending={THREE.AdditiveBlending} />
        </mesh>
      </group>
    </group>
  )
})
