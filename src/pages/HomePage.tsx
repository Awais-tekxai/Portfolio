import { useEffect } from 'react'

import { AboutSection } from '@/components/sections/AboutSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { ExperienceSection } from '@/components/sections/ExperienceSection'
import { HeroSection } from '@/components/hero/HeroSection'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { SkillsSection } from '@/components/sections/SkillsSection'
import { PROFILE } from '@/data/profile'

export function HomePage() {
  useEffect(() => {
    document.title = `${PROFILE.shortName} | Frontend Engineer`
  }, [])

  return (
    <div className="relative">
      <div className="relative z-10 flex flex-col">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
      </div>
    </div>
  )
}
