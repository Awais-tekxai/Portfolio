import { useFrame, useThree } from '@react-three/fiber'
import { memo, useRef } from 'react'
import * as THREE from 'three'

import { usePortfolioStore } from '@/store/usePortfolioStore'

/**
 * Camera stays centered; look-at pans left as scroll progresses so the UI cluster
 * lands in the left viewport lane beside the About card.
 */
export const ScrollRig = memo(function ScrollRig() {
  const { camera, size } = useThree()
  const lookAt = useRef(new THREE.Vector3(0, 0.38, 0))
  const journeySmoothed = useRef(0)

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05)
    const isMobile = size.width < 1024
    const targetJourney = usePortfolioStore.getState().robotJourney
    const journeyLerp = 1 - Math.pow(0.000008, dt)
    journeySmoothed.current = THREE.MathUtils.lerp(journeySmoothed.current, targetJourney, journeyLerp)
    const t = journeySmoothed.current

    camera.position.x = 0

    if (isMobile) {
      camera.position.y = 0.2
      camera.position.z = 4.5
      lookAt.current.set(0, 0.12, 0)
    } else {
      camera.position.y = THREE.MathUtils.lerp(0.35, 0.4, t)
      camera.position.z = THREE.MathUtils.lerp(4.5, 3.55, t)
      lookAt.current.set(THREE.MathUtils.lerp(0, -0.12, t), THREE.MathUtils.lerp(0.32, 0.2, t), 0)
    }

    camera.lookAt(lookAt.current)
  })

  return null
})
