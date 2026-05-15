import Lenis from 'lenis'
import { createContext } from 'react'

export type LenisInstance = InstanceType<typeof Lenis>

export const LenisContext = createContext<LenisInstance | null>(null)
