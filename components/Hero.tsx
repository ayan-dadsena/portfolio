'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HERO, LINKS } from '@/lib/data'
import { useProximityWeight } from '@/lib/useProximityWeight'
import { ArrowUpRight, InstagramIcon, LinkedInIcon, MediumIcon } from './icons'
import { RollText } from '@/components/ui/roll-text'

gsap.registerPlugin(ScrollTrigger)

const NAME_LINES = ['AYAN', 'DADSENA']
// Scrub through the first N seconds of the bg video across one screen of scroll
const VIDEO_SCRUB_SECONDS = 2

export default function Hero() {
  const root = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Cursor-proximity: each letter's weight eases toward its distance-based
  // target, giving the weight change a subtle viscous lag.
  useProximityWeight(root, { radius: 150 })

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.hero-line', {
          yPercent: 110,
          filter: 'blur(14px)',
          duration: 1.15,
          stagger: 0.09,
          ease: 'expo.out',
          delay: 0.15,
        })
        gsap.from('.hero-fade', {
          opacity: 0,
          y: 26,
          filter: 'blur(10px)',
          duration: 0.9,
          stagger: 0.08,
          ease: 'power3.out',
          delay: 0.55,
        })
        gsap.from('.hero-discipline', {
          opacity: 0,
          x: 24,
          filter: 'blur(8px)',
          duration: 0.7,
          stagger: 0.06,
          ease: 'power3.out',
          delay: 0.7,
        })
        gsap.fromTo(
          '.hero-bg',
          { scale: 1.12 },
          { scale: 1, duration: 1.8, ease: 'expo.out' }
        )
        gsap.to('.hero-bg', {
          yPercent: 14,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })

        // Scrub the background video: scrolling down plays it forward through
        // the first couple seconds, scrolling up reverses it back to the start.
        const video = videoRef.current
        if (video) {
          const scrub = { t: 0 }
          gsap.to(scrub, {
            t: VIDEO_SCRUB_SECONDS,
            ease: 'none',
            scrollTrigger: {
              trigger: root.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
            onUpdate: () => {
              if (video.readyState >= 1) video.currentTime = scrub.t
            },
          })
        }
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={root}
      id="top"
      data-nav-theme="dark"
      className="relative flex min-h-[100dvh] flex-col justify-end overflow-hidden bg-ink"
    >
      <div className="hero-bg absolute inset-0 will-change-transform">
        <video
          ref={videoRef}
          src="/videos/kinetic-digital-canvas.mp4"
          poster="/images/hero-bg.jpg"
          muted
          playsInline
          preload="auto"
          aria-hidden
          className="absolute inset-0 h-full w-full rotate-180 object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink" />
      </div>

      <div className="relative z-10 flex flex-1 flex-col justify-center px-6 pt-28 sm:px-9 lg:px-12">
        <h1
          aria-label={NAME_LINES.join(' ')}
          className="font-display text-[clamp(3.2rem,9.5vw,8rem)] uppercase leading-[0.95] tracking-[-0.03em] text-white"
        >
          {NAME_LINES.map((line) => (
            <span key={line} className="block overflow-hidden pb-1" aria-hidden>
              <span className="hero-line block whitespace-nowrap">
                {line.split('').map((ch, i) => (
                  <span key={i} className="hero-letter">
                    {ch}
                  </span>
                ))}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-10 max-w-md">
          <p className="hero-fade text-[clamp(1.15rem,2vw,1.55rem)] font-bold text-white">
            {HERO.subhead}
          </p>
          <p className="hero-fade mt-4 text-[17px] leading-relaxed text-white/85">
            Exploring how <strong>finance</strong>, <strong>strategy</strong>, and{' '}
            <strong>design</strong> come together to empower communities and create
            lasting value
          </p>
          <div className="hero-fade mt-8 flex flex-wrap items-center gap-4">
            <a href="#contact" className="btn btn-solid arrow-link group/roll">
              <RollText>Get in touch</RollText>
              <ArrowUpRight className="arrow h-3.5 w-3.5" />
            </a>
            <a href="#experience" className="btn btn-ghost group/roll">
              <RollText>View Experience</RollText>
            </a>
          </div>
        </div>

        <ul
          className="pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 text-right text-[15px] leading-[2.1] tracking-[0.08em] text-white/80 sm:right-9 lg:right-16 lg:block"
          aria-label="Areas of focus"
        >
          {HERO.disciplines.map((d) => (
            <li key={d} className="hero-discipline">
              {d}
            </li>
          ))}
        </ul>
      </div>

      <div className="relative z-10 flex items-end justify-between px-6 pb-8 sm:px-9 lg:px-12">
        <p className="hero-fade text-[12px] tracking-[0.14em] text-white/60">
          DESIGNED BY <span className="whitespace-nowrap">AYAN DADSENA</span>
        </p>
        <div className="hero-fade glass flex items-center gap-2 rounded-full p-2">
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
              className="social-chip flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white"
            >
              <Icon className="h-[18px] w-[18px]" />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
