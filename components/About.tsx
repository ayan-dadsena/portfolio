'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ABOUT, LINKS } from '@/lib/data'
import { FrameButton } from '@/components/ui/frame-button'
import { RollText } from '@/components/ui/roll-text'
import { BlurIn } from '@/components/ui/blur-in'

gsap.registerPlugin(ScrollTrigger)

function SplitWords({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className}>
      {text.split(' ').map((word, i) => (
        <span key={i} className="reveal-word inline-block">
          {word}
          {' '}
        </span>
      ))}
    </span>
  )
}

export default function About() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Word-by-word reveal on the title, scrubbed to scroll (left-to-right).
        gsap.fromTo(
          gsap.utils.toArray<HTMLElement>('.about-title .reveal-word'),
          { opacity: 0.2 },
          {
            opacity: 1,
            ease: 'none',
            stagger: 0.5,
            duration: 1,
            scrollTrigger: {
              trigger: '.about-title',
              start: 'top 82%',
              end: 'top 42%',
              scrub: true,
            },
          }
        )
        gsap.from('.about-signature', {
          opacity: 0,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.about-signature',
            start: 'top 90%',
          },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={root}
      id="about"
      data-nav-theme="dark"
      className="relative border-t border-white/10 bg-ink px-6 py-24 sm:px-9 lg:px-12 lg:py-32"
    >
      <BlurIn as="p" className="font-mono text-[13px] tracking-[0.14em] text-white/50">
        {ABOUT.eyebrow}
      </BlurIn>

      {/* Eyebrow line spans the section gutter; content sits in a centered band */}
      <div className="mt-8 border-t border-white/15 pt-12 lg:mt-10 lg:pt-16">
        <div className="mx-auto grid max-w-[1320px] gap-x-24 gap-y-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,400px)]">
          {/* Copy: sets the row height the image matches (title top → body bottom) */}
          <div className="lg:col-start-1 lg:row-start-1">
            <h2 className="about-title font-serif text-[clamp(1.8rem,2.7vw,2.35rem)] italic leading-snug text-white [text-wrap:balance] lg:whitespace-nowrap">
              <SplitWords text={ABOUT.title} />
            </h2>

            <div className="about-copy mt-9 max-w-[650px] space-y-6 text-[15px] leading-[1.85] text-white/80">
              {ABOUT.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <p className="font-bold text-white">{ABOUT.closer}</p>
            </div>
          </div>

          {/* Image stretches to the copy height; signature overhangs bottom-right */}
          <div className="relative lg:col-start-2 lg:row-start-1 lg:self-stretch">
            <div className="about-media relative h-full min-h-[440px] w-full overflow-hidden rounded-[6px]">
              <Image
                src="/images/about-portrait-v2.png"
                alt="Ayan Dadsena"
                fill
                sizes="(min-width: 1024px) 400px, 100vw"
                className="object-cover object-center"
              />
            </div>
            <div className="about-signature pointer-events-none absolute -bottom-[90px] -right-1 lg:-right-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/signature-v2.png"
                alt="Ayan Dadsena signature"
                className="h-24 w-auto opacity-95"
              />
            </div>
          </div>

          {/* Resume sits below the body copy, left column */}
          <div className="lg:col-start-1 lg:row-start-2">
            <FrameButton
              as="link"
              href={LINKS.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="group/roll !px-6 !py-3 !text-xs !tracking-[0.18em]"
            >
              <RollText>Resume</RollText>
            </FrameButton>
          </div>
        </div>
      </div>
    </section>
  )
}
