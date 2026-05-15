import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max)
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}
