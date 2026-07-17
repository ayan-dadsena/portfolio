import Image from 'next/image'
import Link from 'next/link'
import type { ExperienceEntry } from '@/lib/data'
import { ArrowUpRight } from './icons'
import { RollText } from '@/components/ui/roll-text'

// Shared row for the Experience section and the "More Experience" block on
// detail pages. On hover (lg): the title and arrow slide up from center to the
// top corners while the image zooms out (globals) and the blurb / positions
// slide up from the bottom border and blur in. The whole row links to the
// detail page via a stretched overlay link, so the nested "Visit site" anchor
// stays valid HTML (no anchor-in-anchor).
const slide =
  'lg:transition-all lg:duration-[320ms] lg:[transition-timing-function:cubic-bezier(0.5,0,0.4,1)]'
const revealFromBottom =
  'lg:translate-y-6 lg:opacity-0 lg:blur-[6px] lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-hover:blur-0'

export default function ExperienceRow({ exp }: { exp: ExperienceEntry }) {
  return (
    <div className="exp-row group relative grid border-b border-ink/15 lg:grid-cols-[1fr_minmax(0,44%)_1fr]">
      <Link
        href={`/experience/${exp.slug}`}
        aria-label={exp.name}
        className="absolute inset-0 z-0"
      />

      {/* Left: title (centered → top-left on hover), blurb + Visit site reveal at bottom */}
      <div className="pointer-events-none relative flex flex-col gap-4 p-6 lg:block lg:border-r lg:border-ink/15 lg:p-8">
        <h3
          className={`exp-title text-[clamp(1.3rem,1.8vw,1.6rem)] font-bold lg:absolute lg:inset-x-8 lg:top-1/2 lg:-translate-y-1/2 lg:group-hover:top-8 lg:group-hover:translate-y-0 ${slide}`}
        >
          {exp.name}
        </h3>
        <div
          className={`hidden lg:absolute lg:inset-x-8 lg:bottom-8 lg:block ${revealFromBottom} ${slide}`}
        >
          <p className="text-[14px] leading-[1.8] text-ink/75">{exp.blurb}</p>
          <a
            href={exp.site}
            target="_blank"
            rel="noopener noreferrer"
            className="u-link group/roll pointer-events-auto relative z-10 mt-4 inline-flex items-center gap-1.5 text-[13px] font-bold text-ink"
          >
            <RollText>Visit site</RollText>
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
          </a>
        </div>
      </div>

      {/* Middle: image */}
      <div className="exp-media pointer-events-none relative aspect-[612/322] overflow-hidden bg-ink">
        <Image
          src={exp.image}
          alt={exp.imageAlt}
          fill
          sizes="(min-width: 1024px) 44vw, 100vw"
          className={
            exp.logoFit === 'contain' ? 'object-contain p-10' : 'object-cover'
          }
        />
      </div>

      {/* Right: arrow (centered → top-right on hover), positions reveal at bottom */}
      <div className="pointer-events-none relative flex flex-col gap-4 p-6 lg:block lg:border-l lg:border-ink/15 lg:p-8">
        <div
          className={`flex justify-end lg:absolute lg:right-8 lg:top-1/2 lg:-translate-y-1/2 lg:group-hover:top-8 lg:group-hover:translate-y-0 ${slide}`}
        >
          <ArrowUpRight className="h-9 w-9" strokeWidth={1.75} />
        </div>
        <div
          className={`text-right lg:absolute lg:inset-x-8 lg:bottom-8 ${revealFromBottom} ${slide}`}
        >
          {exp.positions.map((pos, i) => (
            <div key={pos} className="mb-4 last:mb-0">
              <p className="font-mono text-[11px] tracking-[0.14em] text-ink/55">
                {exp.roles[i]?.dates}
              </p>
              <p className="mt-1 text-[clamp(1rem,1.4vw,1.25rem)] font-bold leading-tight">
                {pos}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
