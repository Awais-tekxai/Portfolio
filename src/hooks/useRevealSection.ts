import { useInView } from 'react-intersection-observer'

export function useRevealSection(threshold: number | number[] = 0.28) {
  return useInView({ threshold, triggerOnce: true })
}
