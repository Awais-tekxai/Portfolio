import { motion } from 'framer-motion'
import { Send } from 'lucide-react'
import { type FormEvent, useMemo, useState } from 'react'

import { MagneticButton } from '@/components/common/MagneticButton'
import { Reveal } from '@/components/common/Reveal'
import { SectionShell } from '@/components/common/SectionShell'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { PROFILE } from '@/data/profile'

export function ContactSection() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const mailHref = useMemo(() => {
    const subject = encodeURIComponent('Portfolio inquiry')
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)
    return `mailto:${PROFILE.email}?subject=${subject}&body=${body}`
  }, [email, message, name])

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    window.location.href = mailHref
  }

  return (
    <SectionShell
      id="contact"
      className="border-t border-white/5 bg-gradient-to-b from-[#020014]/93 via-[#050816]/95 to-[#020014] py-28 pb-[max(8rem,calc(7rem+env(safe-area-inset-bottom)))] backdrop-blur-xl lg:pb-28"
    >
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 social-rail-inset lg:grid-cols-[0.95fr_1.05fr]">
        <Reveal>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.45em] text-slate-500">Contact</p>
            <h2 className="mt-3 font-display text-3xl text-slate-50 sm:text-4xl">Let&apos;s architect your next interface.</h2>
            <p className="mt-4 text-sm text-slate-400">
              Available for frontend collaborations, product teams, and ambitious web experiences.
            </p>
            <div className="mt-8 space-y-3 text-sm text-slate-300">
              <p>
                <span className="text-xs uppercase tracking-[0.35em] text-slate-500">Email</span>
                <br />
                <a className="text-cyan-200 hover:text-white" href={`mailto:${PROFILE.email}`}>
                  {PROFILE.email}
                </a>
              </p>
              <p>
                <span className="text-xs uppercase tracking-[0.35em] text-slate-500">Location</span>
                <br />
                {PROFILE.location}
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <motion.form
            onSubmit={onSubmit}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_0_80px_rgba(124,58,237,0.18)] backdrop-blur-2xl sm:p-8"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(34,211,238,0.18),transparent_45%),radial-gradient(circle_at_100%_100%,rgba(124,58,237,0.22),transparent_45%)]" />
            <div className="relative z-10 grid gap-5">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" name="message" value={message} onChange={(e) => setMessage(e.target.value)} required rows={5} />
              </div>
              <MagneticButton strength={0.22}>
                <Button variant="primary" className="w-full rounded-full sm:w-auto" type="submit">
                  Send message <Send className="h-4 w-4" />
                </Button>
              </MagneticButton>
            </div>
          </motion.form>
        </Reveal>
      </div>
    </SectionShell>
  )
}
