import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'
import { useLenis } from '@/hooks/useLenis'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { cn } from '@/lib/utils'
import { usePortfolioStore } from '@/store/usePortfolioStore'
import type { SectionId } from '@/types'

const LINKS: { id: SectionId; label: string }[] = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

export function DynamicNavbar() {
  const lenis = useLenis()
  const active = usePortfolioStore((s) => s.activeSection)
  const [open, setOpen] = useState(false)
  const isDesktopNav = useMediaQuery('(min-width: 768px)')

  const scrollOffset = isDesktopNav ? -88 : -96

  const scrollTo = (id: SectionId) => {
    const target = document.getElementById(id)
    if (!target) return
    lenis?.scrollTo(target, { offset: scrollOffset, duration: 1.15 })
    setOpen(false)
  }

  const brandActive = useMemo(() => active === 'hero', [active])

  useEffect(() => {
    if (!open) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [open])

  useEffect(() => {
    if (isDesktopNav) setOpen(false)
  }, [isDesktopNav])

  return (
    <header className="fixed inset-x-0 top-0 z-[120] px-4 pt-[max(1rem,env(safe-area-inset-top))] sm:px-6 lg:pl-14 xl:pl-16">
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/10 bg-[#050816]/70 px-3 py-2 shadow-[0_0_0_1px_rgba(124,58,237,0.18),0_18px_60px_rgba(0,0,0,0.65)] backdrop-blur-2xl sm:px-4">
        <button
          type="button"
          onClick={() => scrollTo('hero')}
          className="flex min-w-0 items-center gap-2 text-left"
          aria-label="Scroll to top"
        >
          <span
            className={cn(
              'truncate font-display text-sm font-semibold tracking-[0.22em] text-slate-100 transition',
              brandActive && 'text-gradient',
            )}
          >
            AWAIS<span className="text-cyan-300">.</span>
          </span>
        </button>

        <nav className="hidden items-center gap-0.5 md:flex lg:gap-1" aria-label="Primary">
          {LINKS.map((link) => {
            const isActive = active === link.id
            return (
              <button
                key={link.id}
                type="button"
                onClick={() => scrollTo(link.id)}
                className={cn(
                  'relative rounded-full px-2.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-slate-400 transition hover:text-slate-100 lg:px-3 lg:text-xs lg:tracking-[0.18em]',
                  isActive && 'text-slate-50',
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-violet-600/35 via-fuchsia-500/25 to-cyan-400/25"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="hidden md:block">
          <Button size="sm" variant="primary" className="rounded-full px-5 text-xs" onClick={() => scrollTo('contact')}>
            Let&apos;s talk
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-100 md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[119] bg-black/50 backdrop-blur-sm md:hidden"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="mx-auto mt-3 max-h-[min(70dvh,520px)] max-w-6xl overflow-y-auto overscroll-contain rounded-2xl border border-white/10 bg-[#050816]/95 p-4 shadow-2xl backdrop-blur-2xl md:hidden"
            >
              <div className="flex flex-col gap-1">
                {LINKS.map((link) => (
                  <button
                    key={link.id}
                    type="button"
                    className="rounded-xl px-3 py-3 text-left text-sm text-slate-200 hover:bg-white/5"
                    onClick={() => scrollTo(link.id)}
                  >
                    {link.label}
                  </button>
                ))}
                <Button
                  variant="primary"
                  className="mt-2 w-full rounded-full"
                  onClick={() => scrollTo('contact')}
                >
                  Let&apos;s talk
                </Button>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
