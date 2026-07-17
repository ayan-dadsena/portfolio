'use client'

import { useRef, type ReactNode } from 'react'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from 'motion/react'
import { cn } from '@/lib/utils'

interface TiltCardProps {
  children?: ReactNode
  max?: number
  glare?: boolean
  glareRadius?: number
  glareIntensity?: number
  glareColor?: string
  className?: string
}

const SPRING = { stiffness: 260, damping: 26, mass: 0.6 }

// 3D tilt + cursor glare on hover. Reads pointer position relative to the card
// and maps it to rotateX/rotateY (springed) plus a radial highlight that tracks
// the cursor. Honors reduced-motion by rendering a static card.
export function TiltCard({
  children,
  max = 12,
  glare = true,
  glareRadius = 55,
  glareIntensity = 0.14,
  glareColor = '150,150,195',
  className,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  const rotateX = useSpring(useMotionValue(0), SPRING)
  const rotateY = useSpring(useMotionValue(0), SPRING)
  const glareX = useMotionValue(50)
  const glareY = useMotionValue(50)
  const glareOpacity = useSpring(useMotionValue(0), SPRING)

  const transform = useMotionTemplate`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  const glareBg = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(${glareColor},${glareIntensity}), rgba(${glareColor},0) ${glareRadius}%)`

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    rotateX.set((0.5 - py) * max * 2)
    rotateY.set((px - 0.5) * max * 2)
    glareX.set(px * 100)
    glareY.set(py * 100)
  }

  const handleEnter = () => glareOpacity.set(1)
  const handleLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
    glareOpacity.set(0)
  }

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerEnter={handleEnter}
      onPointerLeave={handleLeave}
      style={{ transform }}
      className={cn('relative overflow-hidden will-change-transform', className)}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: glareBg, opacity: glareOpacity }}
        />
      )}
    </motion.div>
  )
}
