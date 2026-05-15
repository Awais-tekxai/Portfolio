import { useContext } from 'react'

import { LenisContext, type LenisInstance } from '@/components/providers/lenis-context'

export function useLenis(): LenisInstance | null {
  return useContext(LenisContext)
}
