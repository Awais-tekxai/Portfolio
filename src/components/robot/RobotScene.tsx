import { AdaptiveDpr, AdaptiveEvents } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense, useMemo } from 'react'

import { UiShardFollower } from '@/components/robot/UiShardFollower'
import { ScrollRig } from '@/components/robot/ScrollRig'
import { cn } from '@/lib/utils'

function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.28} />
      <directionalLight position={[3.2, 5.5, 3.5]} intensity={1.55} color="#e9d5ff" />
      <directionalLight position={[-3.5, 1.8, -2]} intensity={0.85} color="#22d3ee" />
    </>
  )
}

export type RobotSceneVariant = 'card' | 'backdrop'

interface RobotSceneProps {
  variant?: RobotSceneVariant
  /** Lower max DPR on mobile / reduced-motion for performance */
  dprCap?: number
  /** Pause the render loop when the scene is hidden off-screen */
  active?: boolean
}

export function RobotScene({ variant = 'card', dprCap, active = true }: RobotSceneProps) {
  const isBackdrop = variant === 'backdrop'

  const dpr = useMemo(() => {
    const coarse = window.matchMedia('(pointer: coarse)').matches
    let max = coarse ? 1 : 1.35
    if (isBackdrop && coarse) max = 1
    else if (isBackdrop) max = 1.25
    if (dprCap !== undefined) max = Math.min(max, dprCap)
    return [1, max] as [number, number]
  }, [isBackdrop, dprCap])

  const bgHex = '#06060d'
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches

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
        className={cn('!touch-none', isBackdrop && 'h-full min-h-0 w-full')}
        style={isBackdrop ? { height: '100%', width: '100%' } : undefined}
        dpr={dpr}
        frameloop={active ? 'always' : 'never'}
        performance={{ min: 0.5, debounce: 200 }}
        gl={{
          alpha: true,
          antialias: !isMobile,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        onCreated={({ gl, scene }) => {
          gl.setClearColor(0x000000, 0)
          gl.domElement.style.background = 'transparent'
          if (isBackdrop) scene.background = null
        }}
        camera={{ position: [0, 0.35, 4.35], fov: isBackdrop ? 34 : 36, near: 0.1, far: 40 }}
      >
        {!isBackdrop ? <color attach="background" args={[bgHex]} /> : null}
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
        <Suspense fallback={null}>
          <SceneLights />
          <ScrollRig />
          <UiShardFollower />
        </Suspense>
      </Canvas>
    </div>
  )
}
