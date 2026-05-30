import { useFrame } from '@react-three/fiber'
import { memo, useMemo, useRef } from 'react'
import * as THREE from 'three'

import { clamp } from '@/lib/utils'
import { usePortfolioStore } from '@/store/usePortfolioStore'

const ORBIT_RADIUS = 0.56
const TUBE_RADIUS = 0.032
const NUCLEUS_RADIUS = 0.11
const ORBIT_ANGLES = [0, Math.PI / 3, (2 * Math.PI) / 3]

/** Muted portfolio gradient — darker cyan → violet → purple */
const RING_PALETTE = ['#0891b2', '#7c6aad', '#5b21b6'] as const
const NUCLEUS_CORE = '#64748b'
const NUCLEUS_MID = '#0e7490'

function OrbitRing({
  angle,
  color,
  electronRef,
}: {
  angle: number
  color: string
  electronRef: React.RefObject<THREE.Mesh | null>
}) {
  return (
    <group rotation={[Math.PI / 2, angle, 0]}>
      <mesh>
        <torusGeometry args={[ORBIT_RADIUS, TUBE_RADIUS, 16, 96]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.52}
          metalness={0.6}
          roughness={0.22}
        />
      </mesh>
      <mesh ref={electronRef} position={[ORBIT_RADIUS, 0, 0]}>
        <sphereGeometry args={[0.045, 20, 20]} />
        <meshStandardMaterial
          color="#cbd5e1"
          emissive={color}
          emissiveIntensity={1.1}
          metalness={0.15}
          roughness={0.12}
        />
      </mesh>
    </group>
  )
}

export const ReactFollower = memo(function ReactFollower() {
  const logoRef = useRef<THREE.Group>(null)
  const ringsRef = useRef<THREE.Group>(null)
  const nucleusRef = useRef<THREE.Mesh>(null)
  const haloRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.PointLight>(null)
  const rimGlowRef = useRef<THREE.PointLight>(null)
  const electronRef0 = useRef<THREE.Mesh>(null)
  const electronRef1 = useRef<THREE.Mesh>(null)
  const electronRef2 = useRef<THREE.Mesh>(null)
  const electronRefs = [electronRef0, electronRef1, electronRef2]

  const logoPos = useRef(new THREE.Vector3(0, 0.35, 0.35))
  const logoVel = useRef(new THREE.Vector3())
  const accel = useRef(new THREE.Vector3())
  const scratch = useRef(new THREE.Vector3())
  const target = useRef(new THREE.Vector3(0, 0.35, 0.35))
  const journeySmoothed = useRef(0)

  const pointerNorm = usePortfolioStore((s) => s.pointerNorm)
  const sceneIntensity = usePortfolioStore((s) => s.sceneIntensity)
  const activeSection = usePortfolioStore((s) => s.activeSection)

  const colors = useMemo(
    () => ({
      cyan: new THREE.Color('#0891b2'),
      violet: new THREE.Color('#7c6aad'),
      purple: new THREE.Color('#5b21b6'),
      core: new THREE.Color(NUCLEUS_CORE),
      mid: new THREE.Color(NUCLEUS_MID),
    }),
    [],
  )

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05)
    const { width, height } = state.viewport
    const time = state.clock.elapsedTime

    const targetJourney = usePortfolioStore.getState().robotJourney
    const journeyLerp = 1 - Math.pow(0.000008, dt)
    journeySmoothed.current = THREE.MathUtils.lerp(journeySmoothed.current, targetJourney, journeyLerp)
    const t = journeySmoothed.current

    const isMobile = state.size.width < 1024
    const homeYBase = isMobile ? -0.08 : 0.35
    const pointerYScale = isMobile ? 0.18 : 0.28

    const pointerDamp = 1 - t * 0.75
    const homeX = THREE.MathUtils.lerp(0, -1.08, t)
    const homeY = THREE.MathUtils.lerp(homeYBase, -0.15, t)
    const tx = clamp(
      THREE.MathUtils.lerp(pointerNorm.x * width * 0.32 * pointerDamp, homeX, t * 0.9),
      -1.35,
      1.15,
    )
    const ty = clamp(
      THREE.MathUtils.lerp(pointerNorm.y * height * pointerYScale * pointerDamp + homeY, homeY, t * 0.35),
      isMobile ? -0.55 : -0.35,
      isMobile ? 0.85 : 1.25,
    )
    const tz = 0.28 + sceneIntensity * 0.35
    target.current.set(tx, ty, tz)

    accel.current.copy(target.current).sub(logoPos.current).multiplyScalar(34)
    scratch.current.copy(logoVel.current).multiplyScalar(7.5)
    accel.current.sub(scratch.current)
    logoVel.current.addScaledVector(accel.current, dt)
    logoPos.current.addScaledVector(logoVel.current, dt)

    const mix = THREE.MathUtils.clamp(sceneIntensity + (activeSection === 'hero' ? 0.18 : 0), 0, 1)

    if (logoRef.current) {
      logoRef.current.position.copy(logoPos.current)
      const float = Math.sin(time * 1.15) * 0.04 * (1 - t * 0.45)
      logoRef.current.position.y += float

      const sway = Math.sin(time * 0.6) * 0.02 * (1 - t * 0.6)
      const scrollYaw = THREE.MathUtils.lerp(0, 0.5, t)
      const pointerYaw = clamp(logoPos.current.x * 0.55, -0.55, 0.55)
      const pointerMix = 1 - t * 0.75
      const targetBodyY = scrollYaw + pointerYaw * pointerMix

      const lerpBody = 1 - Math.pow(0.82, dt * 55)
      logoRef.current.rotation.y = THREE.MathUtils.lerp(logoRef.current.rotation.y, targetBodyY, lerpBody)
      logoRef.current.rotation.x = THREE.MathUtils.lerp(
        logoRef.current.rotation.x,
        THREE.MathUtils.lerp(0, 0.12, t) + pointerNorm.y * 0.08 * pointerMix,
        lerpBody * 0.85,
      )
      logoRef.current.rotation.z = THREE.MathUtils.lerp(
        logoRef.current.rotation.z,
        sway + THREE.MathUtils.lerp(0, -0.06, t),
        lerpBody * 0.9,
      )

      const breathe = 1 + Math.sin(time * 2.1) * 0.028
      logoRef.current.scale.setScalar(breathe)
    }

    if (ringsRef.current) {
      ringsRef.current.rotation.y = time * 0.28
      ringsRef.current.rotation.z = Math.sin(time * 0.45) * 0.05
    }

    electronRefs.forEach((ref, i) => {
      if (!ref.current?.parent) return
      ref.current.parent.rotation.z = time * (0.85 + i * 0.22) * (i % 2 === 0 ? 1 : -1)
    })

    if (nucleusRef.current) {
      const mat = nucleusRef.current.material as THREE.MeshStandardMaterial
      mat.emissiveIntensity = 0.75 + mix * 0.95
      mat.color.lerpColors(colors.mid, colors.violet, mix * 0.55)
      mat.emissive.lerpColors(colors.core, colors.purple, mix * 0.35)
    }

    if (haloRef.current) {
      const mat = haloRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = 0.028 + mix * 0.022 + Math.sin(time * 1.8) * 0.004
      mat.color.lerpColors(colors.purple, colors.cyan, mix * 0.5)
    }

    if (glowRef.current) {
      glowRef.current.position.copy(logoPos.current)
      glowRef.current.intensity = 0.85 + mix * 1.35
      glowRef.current.color.lerpColors(colors.cyan, colors.violet, mix * 0.65)
    }

    if (rimGlowRef.current) {
      rimGlowRef.current.position.copy(logoPos.current)
      rimGlowRef.current.position.x += 0.12
      rimGlowRef.current.intensity = 0.32 + mix * 0.55
      rimGlowRef.current.color.lerpColors(colors.purple, colors.cyan, mix * 0.4)
    }
  })

  return (
    <group>
      <pointLight ref={glowRef} position={[0, 0, 0]} intensity={1.1} distance={5} decay={2} color="#0891b2" />
      <pointLight
        ref={rimGlowRef}
        position={[0.12, 0, 0]}
        intensity={0.45}
        distance={3.5}
        decay={2}
        color="#5b21b6"
      />

      <group ref={logoRef} position={[0, 0.35, 0]}>
        {/* Soft volumetric halo */}
        <mesh ref={haloRef} scale={1.22}>
          <sphereGeometry args={[ORBIT_RADIUS, 32, 32]} />
          <meshBasicMaterial
            color="#5b21b6"
            transparent
            opacity={0.03}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        <group ref={ringsRef}>
          {ORBIT_ANGLES.map((angle, i) => (
            <OrbitRing
              key={i}
              angle={angle}
              color={RING_PALETTE[i]}
              electronRef={electronRefs[i]}
            />
          ))}
        </group>

        {/* Nucleus — bright core with layered glow */}
        <mesh ref={nucleusRef} castShadow>
          <sphereGeometry args={[NUCLEUS_RADIUS, 64, 64]} />
          <meshStandardMaterial
            color={NUCLEUS_MID}
            emissive={NUCLEUS_CORE}
            emissiveIntensity={0.85}
            metalness={0.45}
            roughness={0.18}
          />
        </mesh>
        <mesh scale={1.55}>
          <sphereGeometry args={[NUCLEUS_RADIUS, 32, 32]} />
          <meshBasicMaterial
            color="#0891b2"
            transparent
            opacity={0.06}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>
    </group>
  )
})
