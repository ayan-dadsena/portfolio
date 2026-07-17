'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LINKS, NAV_ITEMS } from '@/lib/data'
import { InstagramIcon, LinkedInIcon, MediumIcon } from './icons'
import { FrameButton } from '@/components/ui/frame-button'
import { RollText } from '@/components/ui/roll-text'
import { BlurIn } from '@/components/ui/blur-in'
import { TiltCard } from '@/components/ui/tilt-card'

gsap.registerPlugin(ScrollTrigger)

const NAME = 'AYAN DADSENA'

export default function ContactSection() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.contact-card', {
          opacity: 0,
          y: 60,
          duration: 1.6,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.contact-card', start: 'top 85%' },
        })
        gsap.from('.contact-letter', {
          yPercent: 110,
          duration: 0.9,
          stagger: 0.04,
          ease: 'expo.out',
          scrollTrigger: { trigger: '.contact-name', start: 'top 88%' },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <section
      ref={root}
      id="contact"
      data-nav-theme="dark"
      className="relative bg-ink px-6 pb-12 pt-24 sm:px-9 lg:px-12 lg:pt-32"
    >
      <BlurIn as="p" className="font-mono text-[13px] tracking-[0.14em] text-white/50">
        05 - CONTACT
      </BlurIn>

      <div className="mt-8 border-t border-white/15" />

      <div className="contact-card mt-10">
        <TiltCard
          max={3.5}
          glare={false}
          className="rounded-[20px] border border-white/[0.06] bg-coal px-7 py-12 sm:px-12 lg:px-20 lg:py-16"
        >
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
          <BlurIn
            as="h2"
            className="font-serif text-[clamp(2.4rem,4.5vw,3.4rem)] italic leading-tight text-white"
          >
            Let&rsquo;s connect
          </BlurIn>

          <div className="space-y-10">
            <div>
              <p className="font-mono text-[12px] tracking-[0.14em] text-white/50">
                EMAIL
              </p>
              <a
                href={`mailto:${LINKS.email}`}
                className="u-link mt-2 inline-block text-[clamp(1.15rem,1.8vw,1.5rem)] font-bold text-white"
              >
                {LINKS.email}
              </a>
            </div>
            <div>
              <p className="font-mono text-[12px] tracking-[0.14em] text-white/50">
                FOLLOW ALONG
              </p>
              <div className="mt-4 flex gap-3">
                {[
                  { href: LINKS.linkedin, label: 'LinkedIn', Icon: LinkedInIcon },
                  { href: LINKS.instagram, label: 'Instagram', Icon: InstagramIcon },
                  { href: LINKS.medium, label: 'Medium', Icon: MediumIcon },
                ].map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="social-chip flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white"
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 border-y border-white/10 py-6">
          <div className="flex flex-wrap items-center gap-x-10 gap-y-3">
            <p className="font-mono text-[12px] tracking-[0.14em] text-white/50">
              EXPLORE
            </p>
            <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-2">
              {NAV_ITEMS.slice(0, 4).map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className="u-link group/roll text-[14px] text-white/85"
                >
                  <RollText>{item.label}</RollText>
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <FrameButton onClick={scrollTop} className="group/roll">
            <RollText>Back to top</RollText>
          </FrameButton>
        </div>
        </TiltCard>
      </div>

      <p
        className="contact-name mt-20 flex flex-wrap justify-center gap-x-[0.35em] overflow-hidden text-center font-display text-[clamp(2.6rem,11.5vw,9.5rem)] font-extrabold uppercase leading-[1.05] tracking-[-0.03em] text-white"
        aria-label={NAME}
      >
        {NAME.split(' ').map((word, w) => (
          <span key={w} className="inline-flex whitespace-nowrap" aria-hidden>
            {word.split('').map((ch, i) => (
              <span key={i} className="contact-letter inline-block">
                {ch}
              </span>
            ))}
          </span>
        ))}
      </p>

      <div className="mt-14 flex items-center justify-between border-t border-white/10 pt-6 text-[12px] tracking-[0.14em] text-white/60">
        <p>DESIGNED BY AYAN DADSENA</p>
        <p>2026</p>
      </div>
    </section>
  )
}
