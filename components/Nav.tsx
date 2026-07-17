'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { LINKS, NAV_ITEMS } from '@/lib/data'
import { RollText } from '@/components/ui/roll-text'

interface NavProps {
  initialTheme?: 'dark' | 'light'
  activeOverride?: string
}

export default function Nav({ initialTheme = 'dark', activeOverride }: NavProps) {
  const [theme, setTheme] = useState(initialTheme)
  const [active, setActive] = useState(activeOverride ?? '')

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('[data-nav-theme]')
    )
    if (sections.length === 0) return

    // Which section sits behind the fixed nav bar
    const themeObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setTheme(
              entry.target.getAttribute('data-nav-theme') === 'light'
                ? 'light'
                : 'dark'
            )
          }
        }
      },
      { rootMargin: '0px 0px -94% 0px', threshold: 0 }
    )
    sections.forEach((s) => themeObserver.observe(s))

    let activeObserver: IntersectionObserver | undefined
    if (!activeOverride) {
      activeObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting && entry.target.id) {
              setActive(entry.target.id)
            }
          }
        },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
      )
      sections.forEach((s) => s.id && activeObserver!.observe(s))
    }

    return () => {
      themeObserver.disconnect()
      activeObserver?.disconnect()
    }
  }, [activeOverride])

  const dark = theme === 'dark'

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 transition-colors duration-500 sm:px-9 lg:px-12 ${
        dark ? 'text-white' : 'text-ink'
      }`}
    >
      <Link
        href="/"
        aria-label="Ayan Dadsena, back to home"
        className="flex items-baseline gap-2.5 text-[15px] tracking-[0.02em]"
      >
        <span className="font-bold">AD</span>
        <span className="hidden font-normal sm:inline">AYAN DADSENA</span>
      </Link>

      <nav
        aria-label="Primary"
        className={`absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-1 rounded-full p-1.5 backdrop-blur-xl transition-colors duration-500 md:flex ${
          dark
            ? 'border border-white/10 bg-white/[0.07]'
            : 'border border-black/10 bg-black/[0.08]'
        }`}
      >
        {NAV_ITEMS.map((item) => {
          const isActive = active === item.id
          return (
            <Link
              key={item.id}
              href={item.href}
              aria-current={isActive ? 'true' : undefined}
              className={`group/roll rounded-full px-4 py-2 text-[14px] transition-colors duration-300 ${
                isActive
                  ? dark
                    ? 'bg-white font-medium text-ink'
                    : 'bg-ink font-medium text-white'
                  : dark
                    ? 'text-white/85 hover:bg-white/10 hover:text-white'
                    : 'text-ink/75 hover:bg-black/10 hover:text-ink'
              }`}
            >
              <RollText>{item.label}</RollText>
            </Link>
          )
        })}
      </nav>

      <a
        href={LINKS.resume}
        target="_blank"
        rel="noopener noreferrer"
        className="arrow-link u-link group/roll flex items-center gap-1.5 text-[15px]"
      >
        <RollText>Resume</RollText>
        <span className="arrow text-[13px]" aria-hidden>
          ↗
        </span>
      </a>
    </header>
  )
}
