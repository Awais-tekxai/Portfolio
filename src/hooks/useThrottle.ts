import { useCallback, useEffect, useRef } from 'react'

export function useThrottleCallback<A extends unknown[]>(
  callback: (...args: A) => void,
  delayMs: number,
): (...args: A) => void {
  const last = useRef(0)
  const cb = useRef(callback)

  useEffect(() => {
    cb.current = callback
  }, [callback])

  useEffect(() => {
    last.current = 0
  }, [delayMs])

  return useCallback(
    (...args: A) => {
      const now = performance.now()
      if (now - last.current >= delayMs) {
        last.current = now
        cb.current(...args)
      }
    },
    [delayMs],
  )
}
