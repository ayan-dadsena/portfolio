import type { ComponentPropsWithoutRef } from 'react'
import React from 'react'
import { cn } from '@/lib/utils'

type BaseProps = {
  children: React.ReactNode
  className?: string
  size?: number
  offset?: number
  hoverOffset?: number
}

type ButtonProps = BaseProps &
  ComponentPropsWithoutRef<'button'> & {
    as?: 'button'
    href?: never
  }

type AnchorProps = BaseProps &
  Omit<ComponentPropsWithoutRef<'a'>, 'href'> & {
    as: 'link'
    href: string
  }

type FrameButtonProps = ButtonProps | AnchorProps

// Rectangular CTA that inverts (white-on-dark → dark-on-white) on hover, with
// chevron corner markers that spread outward. Tuned for dark (bg-ink) sections.
export function FrameButton({
  children,
  className,
  size = 18,
  offset = 7,
  hoverOffset = 6,
  ...props
}: FrameButtonProps) {
  const styles = cn(
    'group relative inline-flex items-center justify-center overflow-visible',
    'border border-white/30 px-8 py-4',
    'cursor-pointer select-none no-underline',
    'text-sm font-medium uppercase tracking-[0.2em] text-white',
    'transition-colors duration-300',
    'hover:bg-white hover:text-ink',
    'active:scale-[0.985]',
    className
  )

  const content = (
    <>
      {children}
      <FrameMarkers size={size} offset={offset} hoverOffset={hoverOffset} />
    </>
  )

  if (props.as === 'link') {
    const { as, href, ...anchorProps } = props
    return (
      <a href={href} className={styles} {...anchorProps}>
        {content}
      </a>
    )
  }

  const { as, ...buttonProps } = props
  return (
    <button className={styles} {...buttonProps}>
      {content}
    </button>
  )
}

type IconProps = React.SVGProps<SVGSVGElement>

function chevron(path: string) {
  return function Chevron({ className, ...props }: IconProps) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        {...props}
      >
        <path d={path} />
      </svg>
    )
  }
}

const ChevronUpLeft = chevron('M8 16v-8h8')
const ChevronUpRight = chevron('M16 16v-8h-8')
const ChevronDownRight = chevron('M16 8v8h-8')
const ChevronDownLeft = chevron('M8 8v8h8')

interface FrameMarkersProps {
  size: number
  offset: number
  hoverOffset: number
}

function FrameMarkers({ size, offset, hoverOffset }: FrameMarkersProps) {
  const base = cn(
    'pointer-events-none absolute text-white/40',
    'transition-all duration-300 ease-out group-hover:text-white',
    'group-hover:[transform:translate(var(--mx),var(--my))]'
  )
  const dim = { width: size, height: size }
  const off = `-${offset}px`
  const mv = `${hoverOffset}px`
  const neg = `-${hoverOffset}px`

  return (
    <>
      <ChevronUpLeft
        className={base}
        style={{ ...dim, top: off, left: off, '--mx': neg, '--my': neg } as React.CSSProperties}
      />
      <ChevronUpRight
        className={base}
        style={{ ...dim, top: off, right: off, '--mx': mv, '--my': neg } as React.CSSProperties}
      />
      <ChevronDownRight
        className={base}
        style={{ ...dim, bottom: off, right: off, '--mx': mv, '--my': mv } as React.CSSProperties}
      />
      <ChevronDownLeft
        className={base}
        style={{ ...dim, bottom: off, left: off, '--mx': neg, '--my': mv } as React.CSSProperties}
      />
    </>
  )
}

export default FrameButton
