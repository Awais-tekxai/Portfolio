import { Fragment, useEffect, useRef, useState } from 'react'

import { SKILL_GROUPS, type SkillItem } from '@/data/skills'

import { SkillIcon, skillIconAccent } from './SkillIcon'

const MARQUEE_PX_PER_SEC = 42

function CategoryLabel({ label }: { label: string }) {
  return (
    <div
      className="flex shrink-0 items-center rounded-2xl border border-violet-500/25 bg-violet-500/10 px-5 py-3 shadow-[0_0_32px_rgba(124,58,237,0.12)]"
      aria-hidden
    >
      <span className="whitespace-nowrap text-xs font-semibold uppercase tracking-[0.35em] text-violet-200/90">
        {label}
      </span>
    </div>
  )
}

function SkillChip({ skill }: { skill: SkillItem }) {
  const accent = skillIconAccent(skill.icon)

  return (
    <div
      className="group flex shrink-0 items-center gap-3.5 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-md transition duration-300 hover:border-white/20 hover:bg-white/[0.07]"
      title={skill.name}
    >
      <span
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 transition duration-300 group-hover:scale-105"
        style={{
          backgroundColor: `${accent}18`,
          boxShadow: `0 0 24px ${accent}22`,
        }}
      >
        <SkillIcon iconKey={skill.icon} />
      </span>
      <span className="whitespace-nowrap text-sm font-medium tracking-wide text-slate-200">{skill.name}</span>
    </div>
  )
}

function MarqueeSegment({ copyIndex }: { copyIndex: number }) {
  return (
    <>
      {SKILL_GROUPS.map((group) => (
        <Fragment key={`${copyIndex}-${group.label}`}>
          <CategoryLabel label={group.label} />
          {group.skills.map((skill) => (
            <SkillChip key={`${copyIndex}-${skill.name}`} skill={skill} />
          ))}
        </Fragment>
      ))}
    </>
  )
}

export function SkillsMarquee() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [durationSec, setDurationSec] = useState(55)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const syncDuration = () => {
      const loopWidth = track.scrollWidth / 2
      if (loopWidth > 0) {
        setDurationSec(loopWidth / MARQUEE_PX_PER_SEC)
      }
    }

    syncDuration()

    const observer = new ResizeObserver(syncDuration)
    observer.observe(track)

    return () => observer.disconnect()
  }, [])

  return (
    <div className="skills-marquee-fade relative overflow-hidden" aria-label="Technical skills">
      <div
        ref={trackRef}
        className="skills-marquee-track flex w-max items-center gap-4 py-1"
        style={{ animationDuration: `${durationSec}s` }}
      >
        <MarqueeSegment copyIndex={0} />
        <MarqueeSegment copyIndex={1} />
      </div>
    </div>
  )
}
