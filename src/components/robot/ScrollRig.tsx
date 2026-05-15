import { useFrame, useThree } from '@react-three/fiber'
import { memo, useRef } from 'react'
import * as THREE from 'three'

import { usePortfolioStore } from '@/store/usePortfolioStore'

/**
 * Camera stays centered; look-at pans left as scroll progresses so the robot
 * lands in the left viewport lane beside the About card.
 */
export const ScrollRig = memo(function ScrollRig() {
  const { camera } = useThree()
  const lookAt = useRef(new THREE.Vector3(0, 0.38, 0))
  const journeySmoothed = useRef(0)

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05)
    const targetJourney = usePortfolioStore.getState().robotJourney
    const journeyLerp = 1 - Math.pow(0.000008, dt)
    journeySmoothed.current = THREE.MathUtils.lerp(journeySmoothed.current, targetJourney, journeyLerp)
    const t = journeySmoothed.current

    camera.position.x = 0
    camera.position.y = THREE.MathUtils.lerp(0.35, 0.4, t)
    camera.position.z = THREE.MathUtils.lerp(4.35, 3.45, t)

    lookAt.current.set(THREE.MathUtils.lerp(0, -0.15, t), THREE.MathUtils.lerp(0.38, 0.24, t), 0)
    camera.lookAt(lookAt.current)
  })

  return null
})
