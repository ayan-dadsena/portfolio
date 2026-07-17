'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { EXPERIENCES } from '@/lib/data'
import ExperienceRow from './ExperienceRow'
import { BlurIn } from '@/components/ui/blur-in'

gsap.registerPlugin(ScrollTrigger)

export default function ExperienceSection() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray<HTMLElement>('.exp-row').forEach((row) => {
          gsap.from(row, {
            opacity: 0,
            y: 50,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: { trigger: row, start: 'top 88%' },
          })
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={root}
      id="experience"
      data-nav-theme="light"
      className="theme-light relative bg-paper py-24 text-ink lg:py-32"
    >
      <div className="px-6 sm:px-9 lg:px-12">
        <BlurIn as="p" className="font-mono text-[13px] tracking-[0.14em] text-ink/60">
          02 - EXPERIENCE
        </BlurIn>
        <BlurIn
          as="h2"
          className="mt-8 font-serif text-[clamp(2.2rem,4.5vw,3.4rem)] italic leading-tight [text-wrap:balance]"
        >
          Experience that carries value
        </BlurIn>
      </div>

      <div className="mt-16 border-t border-ink/15">
        {EXPERIENCES.map((exp) => (
          <ExperienceRow key={exp.slug} exp={exp} />
        ))}
      </div>

      <div className="mt-10 flex items-center justify-between px-6 text-[12px] tracking-[0.14em] text-ink/60 sm:px-9 lg:px-12">
        <p>DESIGNED BY AYAN DADSENA</p>
        <p>2026</p>
      </div>
    </section>
  )
}
