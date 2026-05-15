import { useFrame } from '@react-three/fiber'
import { memo, useMemo, useRef } from 'react'
import * as THREE from 'three'

import { clamp } from '@/lib/utils'
import { usePortfolioStore } from '@/store/usePortfolioStore'

export const RobotFollower = memo(function RobotFollower() {
  const robotRef = useRef<THREE.Group>(null)
  const headRef = useRef<THREE.Group>(null)
  const ballRef = useRef<THREE.Mesh>(null)
  const ballGlowRef = useRef<THREE.PointLight>(null)

  const ballPos = useRef(new THREE.Vector3(0.45, 0.35, 0.35))
  const ballVel = useRef(new THREE.Vector3())
  const accel = useRef(new THREE.Vector3())
  const scratch = useRef(new THREE.Vector3())
  const target = useRef(new THREE.Vector3(0.45, 0.35, 0.35))
  const worldBall = useRef(new THREE.Vector3())
  const journeySmoothed = useRef(0)

  const pointerNorm = usePortfolioStore((s) => s.pointerNorm)
  const sceneIntensity = usePortfolioStore((s) => s.sceneIntensity)
  const activeSection = usePortfolioStore((s) => s.activeSection)

  const ballColor = useMemo(() => new THREE.Color('#22d3ee'), [])
  const accent = useMemo(() => new THREE.Color('#a78bfa'), [])

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05)
    const { width, height } = state.viewport

    const targetJourney = usePortfolioStore.getState().robotJourney
    // Tight follow so motion feels tied to scroll, not delayed
    const journeyLerp = 1 - Math.pow(0.000008, dt)
    journeySmoothed.current = THREE.MathUtils.lerp(journeySmoothed.current, targetJourney, journeyLerp)
    const t = journeySmoothed.current

    const pointerDamp = 1 - t * 0.75
    const ballHomeX = THREE.MathUtils.lerp(0.45, -0.88, t)
    const tx = clamp(
      THREE.MathUtils.lerp(pointerNorm.x * width * 0.32 * pointerDamp, ballHomeX, t * 0.9),
      -1.35,
      1.15,
    )
    const ty = clamp(pointerNorm.y * height * 0.28 * pointerDamp + 0.25, -0.35, 1.25)
    const tz = 0.28 + sceneIntensity * 0.35
    target.current.set(tx, ty, tz)

    accel.current.copy(target.current).sub(ballPos.current).multiplyScalar(34)
    scratch.current.copy(ballVel.current).multiplyScalar(7.5)
    accel.current.sub(scratch.current)
    ballVel.current.addScaledVector(accel.current, dt)
    ballPos.current.addScaledVector(ballVel.current, dt)

    if (ballRef.current) {
      ballRef.current.position.copy(ballPos.current)
      const breathe = 1 + Math.sin(state.clock.elapsedTime * 2.1) * 0.035
      ballRef.current.scale.setScalar(breathe)
      const mat = ballRef.current.material as THREE.MeshStandardMaterial
      const mix = THREE.MathUtils.clamp(sceneIntensity + (activeSection === 'hero' ? 0.15 : 0), 0, 1)
      mat.emissiveIntensity = 1.1 + mix * 1.4
      mat.color.lerpColors(ballColor, accent, mix * 0.45)
      mat.emissive.copy(mat.color)
    }

    if (ballGlowRef.current) {
      ballGlowRef.current.position.copy(ballPos.current)
      ballGlowRef.current.intensity = 1.2 + sceneIntensity * 2.4
      ballGlowRef.current.color.lerpColors(ballColor, accent, sceneIntensity * 0.6)
    }

    if (robotRef.current) {
      const baseX = 0
      const baseY = -0.55
      const aboutX = -1.08
      const aboutY = -0.5
      const float = Math.sin(state.clock.elapsedTime * 1.15) * 0.04 * (1 - t * 0.45)

      // Scroll-linked horizontal slide: center → left lane (no clip / no extra Y drop)
      robotRef.current.position.x = THREE.MathUtils.lerp(baseX, aboutX, t)
      robotRef.current.position.y = THREE.MathUtils.lerp(baseY, aboutY, t) + float
      robotRef.current.position.z = THREE.MathUtils.lerp(0, 0.06, t)

      const sway = Math.sin(state.clock.elapsedTime * 0.6) * 0.02 * (1 - t * 0.6)
      const scrollYaw = THREE.MathUtils.lerp(0, 0.5, t)
      const pointerYaw = clamp(ballPos.current.x * 0.55, -0.55, 0.55)
      const pointerMix = 1 - t * 0.75
      const targetBodyY = scrollYaw + pointerYaw * pointerMix

      const lerpBody = 1 - Math.pow(0.82, dt * 55)
      robotRef.current.rotation.y = THREE.MathUtils.lerp(robotRef.current.rotation.y, targetBodyY, lerpBody)
      robotRef.current.rotation.x = THREE.MathUtils.lerp(
        robotRef.current.rotation.x,
        THREE.MathUtils.lerp(0, 0.12, t),
        lerpBody * 0.85,
      )
      robotRef.current.rotation.z = THREE.MathUtils.lerp(robotRef.current.rotation.z, sway + THREE.MathUtils.lerp(0, -0.06, t), lerpBody * 0.9)
    }

    if (headRef.current && ballRef.current) {
      const head = headRef.current
      ballRef.current.getWorldPosition(worldBall.current)
      head.worldToLocal(worldBall.current)
      const yaw = Math.atan2(worldBall.current.x, worldBall.current.z + 0.55)
      const pitch = Math.atan2(worldBall.current.y, worldBall.current.z + 0.55)
      head.rotation.y = THREE.MathUtils.lerp(head.rotation.y, yaw * 0.65, 0.12)
      head.rotation.x = THREE.MathUtils.lerp(head.rotation.x, -pitch * 0.45, 0.1)
    }
  })

  return (
    <group>
      <pointLight ref={ballGlowRef} position={[0, 0, 0]} intensity={1.8} distance={4} decay={2} color="#22d3ee" />

      <group ref={robotRef} position={[0, -0.55, 0]}>
        {/* Body */}
        <mesh castShadow receiveShadow position={[0, 0.55, 0]}>
          <capsuleGeometry args={[0.32, 0.55, 10, 24]} />
          <meshStandardMaterial color="#0f172a" metalness={0.65} roughness={0.25} />
        </mesh>
        {/* Chest core */}
        <mesh position={[0, 0.62, 0.26]}>
          <circleGeometry args={[0.12, 32]} />
          <meshStandardMaterial
            color="#22d3ee"
            emissive="#22d3ee"
            emissiveIntensity={1.4}
            metalness={0.2}
            roughness={0.2}
          />
        </mesh>
        {/* Head */}
        <group ref={headRef} position={[0, 1.05, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.52, 0.42, 0.48]} />
            <meshStandardMaterial color="#111827" metalness={0.55} roughness={0.28} />
          </mesh>
          <mesh position={[-0.12, 0.04, 0.25]}>
            <sphereGeometry args={[0.055, 16, 16]} />
            <meshStandardMaterial color="#67e8f9" emissive="#67e8f9" emissiveIntensity={2} />
          </mesh>
          <mesh position={[0.12, 0.04, 0.25]}>
            <sphereGeometry args={[0.055, 16, 16]} />
            <meshStandardMaterial color="#67e8f9" emissive="#67e8f9" emissiveIntensity={2} />
          </mesh>
          {/* Antenna */}
          <mesh position={[0.18, 0.26, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.22, 12]} />
            <meshStandardMaterial color="#a78bfa" emissive="#a78bfa" emissiveIntensity={0.8} metalness={0.4} />
          </mesh>
        </group>
        {/* Arms */}
        <mesh position={[-0.42, 0.62, 0]} rotation={[0.2, 0, 0.35]}>
          <capsuleGeometry args={[0.07, 0.45, 8, 16]} />
          <meshStandardMaterial color="#0b1224" metalness={0.5} roughness={0.35} />
        </mesh>
        <mesh position={[0.42, 0.62, 0]} rotation={[0.2, 0, -0.35]}>
          <capsuleGeometry args={[0.07, 0.45, 8, 16]} />
          <meshStandardMaterial color="#0b1224" metalness={0.5} roughness={0.35} />
        </mesh>
      </group>

      <mesh ref={ballRef} castShadow>
        <sphereGeometry args={[0.13, 48, 48]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={1.4}
          metalness={0.15}
          roughness={0.15}
        />
      </mesh>
    </group>
  )
})
