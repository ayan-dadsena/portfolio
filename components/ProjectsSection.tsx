'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useProximityWeight } from '@/lib/useProximityWeight'
import { BlurIn } from '@/components/ui/blur-in'
import { TiltCard } from '@/components/ui/tilt-card'

gsap.registerPlugin(ScrollTrigger)

const CARDS = [0, 1, 2, 3]
const HEADING = 'Projects'

export default function ProjectsSection() {
  const root = useRef<HTMLElement>(null)

  // Cursor-proximity variable weight on the PROJECTS heading (same as hero name)
  useProximityWeight(root)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray<HTMLElement>('.project-card').forEach((card, i) => {
          gsap.fromTo(
            card,
            { y: i % 2 === 0 ? 70 : -40 },
            {
              y: i % 2 === 0 ? -70 : 40,
              ease: 'none',
              scrollTrigger: {
                trigger: root.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            }
          )
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={root}
      id="projects"
      data-nav-theme="dark"
      className="relative overflow-hidden bg-ink px-6 py-24 sm:px-9 lg:px-12 lg:py-32"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-90"
        style={{
          background:
            'radial-gradient(circle, rgba(150,150,195,0.32) 0%, rgba(120,120,165,0.12) 42%, rgba(9,9,11,0) 70%)',
        }}
        aria-hidden
      />

      <div className="relative flex flex-wrap items-baseline justify-between gap-4">
        <BlurIn as="p" className="font-mono text-[13px] tracking-[0.14em] text-white/50">
          03 - PROJECTS
        </BlurIn>
        <BlurIn
          as="h2"
          aria-label={HEADING}
          className="font-display text-[clamp(2.4rem,5.5vw,4.5rem)] font-light uppercase tracking-[-0.02em] text-white"
        >
          {HEADING.split('').map((ch, i) => (
            <span key={i} className="hero-letter" aria-hidden>
              {ch}
            </span>
          ))}
        </BlurIn>
      </div>

      <div className="relative mt-16">
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4 lg:gap-8">
          {CARDS.map((i) => (
            <div
              key={i}
              className={`project-card will-change-transform ${
                i % 2 === 1 ? 'mt-10 lg:mt-20' : ''
              }`}
              aria-hidden
            >
              <TiltCard className="glass-card aspect-[341/436] rounded-[30px]" />
            </div>
          ))}
        </div>

        <div className="projects-soon pointer-events-none absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center">
          <BlurIn
            as="p"
            className="font-serif text-[clamp(2.4rem,5vw,4.4rem)] italic tracking-[0.03em] text-white [text-shadow:0_0_45px_rgba(160,160,210,0.5)]"
          >
            Coming Soon
          </BlurIn>
        </div>
      </div>
    </section>
  )
}
