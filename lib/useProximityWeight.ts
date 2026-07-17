import { useEffect, type RefObject } from 'react'

interface Options {
  base?: number
  max?: number
  // Width axis (`wdth`): letters stretch horizontally toward `widthMax` near the
  // cursor. Mona Sans supports 75–125; 100 is normal width.
  widthBase?: number
  widthMax?: number
  radius?: number
  // Per-frame approach fraction toward the target. Lower = more lag / heavier,
  // more viscous feel; higher = snappier. ~0.22 reads as a subtle linger at 60fps.
  ease?: number
}

// Cursor-proximity variable-font effect for `.hero-letter` spans within
// `sectionRef`. Each letter eases its weight (`wght`) and width (`wdth`) toward
// distance-based targets every frame rather than snapping, giving the change a
// slight viscous lag as the cursor passes through the text.
export function useProximityWeight<S extends HTMLElement>(
  sectionRef: RefObject<S | null>,
  {
    base = 300,
    max = 900,
    widthBase = 100,
    widthMax = 115,
    radius = 120,
    ease = 0.22,
  }: Options = {}
) {
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const letters = Array.from(
      section.querySelectorAll<HTMLElement>('.hero-letter')
    )
    if (letters.length === 0) return

    const wght = letters.map(() => base)
    const wdth = letters.map(() => widthBase)
    let px = 0
    let py = 0
    let active = false
    let rafId = 0

    const tick = () => {
      let moving = false
      for (let i = 0; i < letters.length; i++) {
        const rect = letters[i].getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        let t = 0
        if (active) {
          const dist = Math.hypot(px - cx, py - cy)
          t = Math.max(0, 1 - dist / radius)
        }
        const targetW = base + (max - base) * t
        const targetD = widthBase + (widthMax - widthBase) * t
        wght[i] += (targetW - wght[i]) * ease
        wdth[i] += (targetD - wdth[i]) * ease
        if (
          Math.abs(targetW - wght[i]) > 0.3 ||
          Math.abs(targetD - wdth[i]) > 0.05
        ) {
          moving = true
        }
        letters[i].style.fontVariationSettings = `'wght' ${Math.round(
          wght[i]
        )}, 'wdth' ${wdth[i].toFixed(1)}`
      }
      // Keep animating while the cursor is present or values are still settling.
      rafId = moving || active ? requestAnimationFrame(tick) : 0
    }

    const start = () => {
      if (!rafId) rafId = requestAnimationFrame(tick)
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return
      px = e.clientX
      py = e.clientY
      active = true
      start()
    }

    const onLeave = () => {
      active = false
      start()
    }

    section.addEventListener('pointermove', onMove)
    section.addEventListener('pointerleave', onLeave)
    return () => {
      section.removeEventListener('pointermove', onMove)
      section.removeEventListener('pointerleave', onLeave)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [sectionRef, base, max, widthBase, widthMax, radius, ease])
}
