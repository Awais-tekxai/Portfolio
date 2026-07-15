import { Canvas } from '@react-three/fiber'
import { Environment, SoftShadows } from '@react-three/drei'
import { Suspense, useMemo } from 'react'

import { UiShardFollower } from '@/components/robot/UiShardFollower'
import { ScrollRig } from '@/components/robot/ScrollRig'
import { cn } from '@/lib/utils'
import { usePortfolioStore } from '@/store/usePortfolioStore'

function DynamicLights() {
  const intensity = usePortfolioStore((s) => s.sceneIntensity)
  const key = 1.15 + intensity * 1.4
  const rim = 0.55 + intensity * 0.9

  return (
    <>
      <ambientLight intensity={0.18 + intensity * 0.12} />
      <directionalLight position={[3.5, 6, 4]} intensity={key} color="#e9d5ff" castShadow />
      <directionalLight position={[-4, 2, -2]} intensity={rim} color="#22d3ee" />
    </>
  )
}

export type RobotSceneVariant = 'card' | 'backdrop'

interface RobotSceneProps {
  variant?: RobotSceneVariant
  /** Lower max DPR on mobile / reduced-motion for performance */
  dprCap?: number
}

export function RobotScene({ variant = 'card', dprCap }: RobotSceneProps) {
  const isBackdrop = variant === 'backdrop'

  const dpr = useMemo(() => {
    const coarse = window.matchMedia('(pointer: coarse)').matches
    let max = coarse ? 1.25 : 1.75
    if (isBackdrop && coarse) max = 1.15
    else if (isBackdrop) max = 1.65
    if (dprCap !== undefined) max = Math.min(max, dprCap)
    return [1, max] as [number, number]
  }, [isBackdrop, dprCap])

  const bgHex = '#06060d'

  return (
    <div
      className={cn(
        isBackdrop && 'pointer-events-none relative h-full min-h-0 w-full',
        !isBackdrop && 'relative h-[380px] w-full sm:h-[420px] lg:h-[520px]',
      )}
    >
      {!isBackdrop ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-80 rounded-[28px] bg-[radial-gradient(circle_at_30%_20%,rgba(124,58,237,0.35),transparent_55%),radial-gradient(circle_at_80%_0%,rgba(34,211,238,0.25),transparent_45%)]"
        />
      ) : null}
      <Canvas
        shadows
        className={cn('!touch-none', isBackdrop && 'h-full min-h-0 w-full')}
        style={isBackdrop ? { height: '100%', width: '100%' } : undefined}
        dpr={dpr}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        onCreated={({ gl, scene }) => {
          if (!isBackdrop) return
          gl.setClearColor(0x000000, 0)
          gl.domElement.style.background = 'transparent'
          scene.background = null
        }}
        camera={{ position: [0, 0.35, 4.35], fov: isBackdrop ? 34 : 36, near: 0.1, far: 40 }}
      >
        {!isBackdrop ? <color attach="background" args={[bgHex]} /> : null}
        <Suspense fallback={null}>
          <DynamicLights />
          {isBackdrop ? null : <SoftShadows size={18} samples={12} focus={0.6} />}
          <ScrollRig />
          <UiShardFollower />
          <Environment preset="city" background={false} />
        </Suspense>
      </Canvas>
    </div>
  )
}
