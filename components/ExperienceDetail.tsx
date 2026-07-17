'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { ExperienceEntry } from '@/lib/data'
import ExperienceRow from './ExperienceRow'
import { BlurIn } from '@/components/ui/blur-in'
import { ArrowUpLeft } from './icons'
import { RollText } from '@/components/ui/roll-text'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  exp: ExperienceEntry
  other: ExperienceEntry
}

export default function ExperienceDetail({ exp, other }: Props) {
  const root = useRef<HTMLElement>(null)
  const textCol = useRef<HTMLDivElement>(null)

  // Text column scrolls normally, then freezes when it ends while images continue
  useEffect(() => {
    const el = textCol.current
    if (!el) return
    const setStickyTop = () => {
      const navOffset = 110
      const h = el.offsetHeight
      const vh = window.innerHeight
      el.style.top =
        h + navOffset > vh ? `${vh - h - 40}px` : `${navOffset}px`
    }
    setStickyTop()
    document.fonts.ready.then(setStickyTop)
    window.addEventListener('resize', setStickyTop)
    return () => window.removeEventListener('resize', setStickyTop)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.detail-fade', {
          opacity: 0,
          y: 30,
          duration: 1.5,
          stagger: 0.08,
          ease: 'power3.out',
          delay: 0.35,
        })
        gsap.utils.toArray<HTMLElement>('.detail-img').forEach((img) => {
          gsap.from(img, {
            opacity: 0,
            y: 60,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: img, start: 'top 90%' },
          })
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <main ref={root}>
      <section
        data-nav-theme="light"
        className="theme-light bg-paper pt-28 text-ink"
      >
        <div className="px-6 sm:px-9 lg:px-12">
          <Link
            href="/#experience"
            className="group/roll group inline-flex items-center gap-2 text-[15px] font-bold tracking-[0.06em]"
          >
            <ArrowUpLeft
              className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:-translate-x-1 group-hover:-translate-y-1"
              strokeWidth={2}
            />
            <RollText>BACK</RollText>
          </Link>

          <BlurIn
            as="h1"
            className="mt-8 pb-2 font-display text-[clamp(2.6rem,6.5vw,5rem)] font-extrabold tracking-[-0.02em]"
          >
            {exp.name}
          </BlurIn>
        </div>

        <div className="mt-8 border-t border-ink/15" />

        <div className="grid gap-14 px-6 py-16 sm:px-9 lg:grid-cols-[minmax(0,1fr)_minmax(0,44%)] lg:gap-20 lg:px-12">
          <div ref={textCol} className="lg:sticky lg:self-start">
            {exp.roles.map((role, i) => (
              <article
                key={role.title}
                className={`detail-fade ${i > 0 ? 'mt-20 border-t border-ink/15 pt-16' : ''}`}
              >
                <p className="font-mono text-[12px] tracking-[0.14em] text-ink/60">
                  {role.dates}
                </p>
                <h2 className="mt-3 text-[clamp(1.3rem,2vw,1.6rem)] font-bold leading-snug">
                  {role.title}
                </h2>
                <div className="mt-5 space-y-4 text-[14px] leading-[1.85] text-ink/80">
                  {role.description.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>

                <dl className="mt-8 border-t border-ink/15">
                  <div className="grid grid-cols-[110px_1fr] gap-6 border-b border-ink/15 py-5">
                    <dt className="text-[13px] font-bold">Skills Used</dt>
                    <dd className="text-[13px] leading-[1.8] text-ink/75">
                      {role.skills}
                    </dd>
                  </div>
                  <div className="grid grid-cols-[110px_1fr] gap-6 border-b border-ink/15 py-5">
                    <dt className="text-[13px] font-bold">Location</dt>
                    <dd className="text-[13px] text-ink/75">{role.location}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>

          <div className="space-y-6">
            {exp.gallery.map((img) => (
              <div
                key={img.src}
                className="detail-img overflow-hidden rounded-[20px] bg-ink"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={1224}
                  height={800}
                  sizes="(min-width: 1024px) 44vw, 100vw"
                  className="h-auto w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="px-6 pb-8 pt-10 sm:px-9 lg:px-12">
          <BlurIn
            as="h2"
            className="font-display text-[clamp(2rem,5vw,3.8rem)] font-extrabold tracking-[-0.02em]"
          >
            More Experience
          </BlurIn>
        </div>

        <div className="border-t border-ink/15">
          <ExperienceRow exp={other} />
        </div>

        <div className="flex items-center justify-between px-6 py-8 text-[12px] tracking-[0.14em] text-ink/60 sm:px-9 lg:px-12">
          <p>DESIGNED BY AYAN DADSENA</p>
          <p>2026</p>
        </div>
      </section>
    </main>
  )
}
