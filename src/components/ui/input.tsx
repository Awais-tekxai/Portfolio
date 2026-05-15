import * as React from 'react'

import { cn } from '@/lib/utils'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'flex h-11 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-slate-100 shadow-inner shadow-black/30 outline-none transition focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = 'Input'
