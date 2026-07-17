'use client'

import { createElement, type ElementType, type ReactNode } from 'react'
import { motion, useReducedMotion, type Variants } from 'motion/react'
import { cn } from '@/lib/utils'

type Tag = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div'

interface BlurInProps {
  children: ReactNode
  className?: string
  // Element to render. Defaults to a div so it inherits surrounding typography.
  as?: Tag
  // Blur-in reveal timing (seconds).
  duration?: number
  delay?: number
  // Slide-up distance in px — the text rises while it blurs in.
  y?: number
  // Starting blur amount in px.
  blur?: number
  // Replay every time it scrolls into view, or only the first time.
  once?: boolean
  // Forwarded for headings whose visible text is split into aria-hidden spans.
  'aria-label'?: string
}

// Scroll-triggered blur-in: text rises and un-blurs as it enters the viewport.
// Uses `motion` (already a project dependency) and honors reduced-motion.
export function BlurIn({
  children,
  className,
  as = 'div',
  duration = 1.4,
  delay = 0,
  y = 26,
  blur = 10,
  once = true,
  'aria-label': ariaLabel,
}: BlurInProps) {
  const reduce = useReducedMotion()

  if (reduce) {
    return createElement(
      as as ElementType,
      { className: cn(className), 'aria-label': ariaLabel },
      children
    )
  }

  const variants: Variants = {
    hidden: { filter: `blur(${blur}px)`, opacity: 0, y },
    visible: { filter: 'blur(0px)', opacity: 1, y: 0 },
  }

  const MotionTag = motion[as]

  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '0px 0px -12% 0px' }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      variants={variants}
      className={cn(className)}
      aria-label={ariaLabel}
    >
      {children}
    </MotionTag>
  )
}
