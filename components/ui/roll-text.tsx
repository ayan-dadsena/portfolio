interface RollTextProps {
  children: string
  className?: string
}

// Hover text-roll: each letter rolls up and out while an identical copy rolls
// in from below, staggered left-to-right. Requires the host button/link to have
// the `group/roll` class so the roll fires on hover of that control (named so it
// won't be triggered by an unrelated ancestor `group`, e.g. experience rows).
export function RollText({ children, className }: RollTextProps) {
  const chars = [...children]
  return (
    <span
      className={`inline-block -translate-y-[1.5px] whitespace-nowrap ${className ?? ''}`}
      aria-label={children}
    >
      {chars.map((ch, i) => {
        const glyph = ch === ' ' ? ' ' : ch
        const delay = { transitionDelay: `${i * 22}ms` }
        return (
          <span
            key={i}
            aria-hidden
            className="relative inline-block overflow-hidden align-middle leading-[1.35]"
          >
            <span
              className="block transition-transform duration-[480ms] ease-out-expo group-hover/roll:-translate-y-full"
              style={delay}
            >
              {glyph}
            </span>
            <span
              className="absolute left-0 top-0 block translate-y-full transition-transform duration-[480ms] ease-out-expo group-hover/roll:translate-y-0"
              style={delay}
            >
              {glyph}
            </span>
          </span>
        )
      })}
    </span>
  )
}
