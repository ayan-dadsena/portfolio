'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LINKS, WRITING } from '@/lib/data'
import { useProximityWeight } from '@/lib/useProximityWeight'
import { BlurIn } from '@/components/ui/blur-in'
import { ArrowUpRight } from './icons'
import { RollText } from '@/components/ui/roll-text'

gsap.registerPlugin(ScrollTrigger)

// Splits text into per-letter spans that carry the cursor-proximity weight
// effect (same as the hero name). Spaces use a non-breaking space so the
// inline-block letters keep their gaps.
function ProxText({ text }: { text: string }) {
  return (
    <>
      {text.split('').map((ch, i) => (
        <span key={i} className="hero-letter" aria-hidden>
          {ch === ' ' ? ' ' : ch}
        </span>
      ))}
    </>
  )
}

export default function WritingSection() {
  const root = useRef<HTMLElement>(null)

  // Cursor-proximity variable weight on the light headings (hero-letter spans)
  useProximityWeight(root)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.to('.writing-bg', {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
        gsap.utils.toArray<HTMLElement>('.writing-reveal').forEach((el) => {
          gsap.from(el, {
            opacity: 0,
            y: 40,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%' },
          })
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={root}
      id="writing"
      data-nav-theme="dark"
      className="relative overflow-hidden bg-ink py-24 lg:py-32"
    >
      <div className="writing-bg absolute inset-[-8%] will-change-transform">
        <Image
          src="/images/writing-bg.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/30 to-ink" />
      </div>

      <div className="relative z-10 px-6 sm:px-9 lg:px-12">
        <BlurIn as="p" className="font-mono text-[13px] tracking-[0.14em] text-white/50">
          {WRITING.eyebrow}
        </BlurIn>

        {/* Eyebrow line spans the standard gutter; inner content is indented */}
        <div className="mt-8 border-t border-white/15 pt-12 lg:px-8 xl:px-16">
          <div className="flex flex-wrap items-end justify-between gap-10">
            <h2
              aria-label="Thinking out loud on Medium"
              className="writing-reveal text-[clamp(1.8rem,3.5vw,2.6rem)] font-light uppercase leading-tight tracking-[-0.01em] text-white"
            >
              <ProxText text="Thinking out loud on" />
              <span className="mt-2 flex items-center gap-6">
                <span className="font-serif text-[1.35em] font-normal normal-case italic">
                  Medium
                </span>
                <a
                  href={LINKS.medium}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn glass arrow-link group/roll text-[0.6em] font-medium normal-case tracking-normal text-white"
                >
                  <RollText>Follow</RollText>
                  <ArrowUpRight className="arrow h-4 w-4" strokeWidth={1.75} />
                </a>
              </span>
            </h2>
            <p className="writing-reveal max-w-[190px] text-right text-[13px] font-medium leading-[1.6] tracking-[0.1em] text-white/70">
              {WRITING.diary}
            </p>
          </div>

          <p className="writing-reveal mt-16 text-[12px] font-light uppercase tracking-[0.14em] text-white/50">
            Recent Articles
          </p>
          <div className="mt-5 space-y-4">
            {WRITING.articles.map((article) => (
              <a
                key={article.title}
                href={article.href}
                target="_blank"
                rel="noopener noreferrer"
                className="writing-reveal press-row glass block rounded-[20px] px-7 py-7 sm:px-9"
              >
                <div className="flex items-center justify-between gap-6">
                  <div>
                    <p className="font-mono text-[12px] tracking-[0.14em] text-white/60">
                      {article.date}
                    </p>
                    <p className="mt-2 text-[clamp(1.05rem,1.6vw,1.3rem)] font-bold text-white">
                      {article.title}
                    </p>
                  </div>
                  <span className="press-icon shrink-0 text-white">
                    <ArrowUpRight className="h-7 w-7" strokeWidth={1.75} />
                  </span>
                </div>
              </a>
            ))}
          </div>

          <div className="writing-reveal mt-24">
            <h3
              aria-label="Press"
              className="text-[clamp(1.6rem,2.8vw,2.4rem)] font-light uppercase text-white"
            >
              <ProxText text="Press" />
            </h3>
            <p className="mt-2 font-serif text-[clamp(1.1rem,1.6vw,1.35rem)] italic text-white/85">
              Features and publications
            </p>
          </div>

          <div className="mt-8 border-t border-white/15">
            {WRITING.press.map((item) => (
              <a
                key={item.title}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="writing-reveal press-row grid gap-3 border-b border-white/15 px-2 py-8 sm:grid-cols-[220px_1fr_60px] sm:items-start sm:gap-8"
              >
                <p className="font-mono text-[12px] leading-[1.6] tracking-[0.12em] text-white/60">
                  {item.source}
                </p>
                <div>
                  <p className="text-[clamp(1.05rem,1.5vw,1.25rem)] font-bold text-white">
                    {item.title}
                  </p>
                  <p className="mt-2 max-w-3xl text-[14px] leading-[1.7] text-white/65">
                    {item.description}
                  </p>
                </div>
                <span className="press-icon hidden justify-self-end text-white sm:block">
                  <ArrowUpRight className="h-7 w-7" strokeWidth={1.75} />
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
