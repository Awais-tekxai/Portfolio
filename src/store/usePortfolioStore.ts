import { create } from 'zustand'

import type { SectionId } from '@/types'

interface PortfolioState {
  activeSection: SectionId
  setActiveSection: (id: SectionId) => void
  scrollProgress: number
  setScrollProgress: (value: number) => void
  /** 0..1 hero → About: drives in-scene robot / camera only (not the whole canvas layer) */
  robotJourney: number
  setRobotJourney: (value: number) => void
  /** Normalized pointer -1..1 relative to viewport (for 3D + parallax) */
  pointerNorm: { x: number; y: number }
  setPointerNorm: (x: number, y: number) => void
  /** 0..1 intensity when hovering interactive regions */
  sceneIntensity: number
  setSceneIntensity: (value: number) => void
  loaderComplete: boolean
  setLoaderComplete: (value: boolean) => void
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  activeSection: 'hero',
  setActiveSection: (id) => set({ activeSection: id }),
  scrollProgress: 0,
  setScrollProgress: (value) => set({ scrollProgress: value }),
  robotJourney: 0,
  setRobotJourney: (value) => set({ robotJourney: value }),
  pointerNorm: { x: 0, y: 0 },
  setPointerNorm: (x, y) => set({ pointerNorm: { x, y } }),
  sceneIntensity: 0.35,
  setSceneIntensity: (value) => set({ sceneIntensity: value }),
  loaderComplete: false,
  setLoaderComplete: (value) => set({ loaderComplete: value }),
}))
