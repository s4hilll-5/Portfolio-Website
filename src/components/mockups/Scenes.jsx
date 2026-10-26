import { useId } from 'react'

// Small illustrated "destination photos" for the Stay-Smart mockup.
// Pure SVG so there are no image files to load. ids come from useId so the
// same scene can render twice (card + modal) without gradient clashes.

const svgProps = {
  viewBox: '0 0 300 120',
  preserveAspectRatio: 'xMidYMid slice',
  className: 'h-full w-full',
  'aria-hidden': true,
}

export function CoastScene() {
  const id = useId().replace(/:/g, '')
  return (
    <svg {...svgProps}>
      <defs>
        <linearGradient id={`${id}sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1E1B4B" />
          <stop offset="0.38" stopColor="#6D28D9" />
          <stop offset="0.68" stopColor="#F472B6" />
          <stop offset="0.86" stopColor="#FDBA74" />
        </linearGradient>
        <linearGradient id={`${id}sea`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7C3AED" />
          <stop offset="1" stopColor="#1E1B4B" />
        </linearGradient>
        <radialGradient id={`${id}sun`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#FEF3C7" />
          <stop offset="0.6" stopColor="#FDBA74" />
          <stop offset="1" stopColor="#FB923C" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="300" height="120" fill={`url(#${id}sky)`} />
      <circle cx="196" cy="80" r="30" fill={`url(#${id}sun)`} />
      <circle cx="196" cy="80" r="13" fill="#FEF3C7" />
      <path d="M0 74 Q40 54 80 66 T160 70 L160 82 L0 82 Z" fill="#3B0764" opacity="0.85" />
      <rect y="80" width="300" height="40" fill={`url(#${id}sea)`} />
      {[86, 92, 98, 105, 112].map((y, i) => (
        <rect key={y} x={180 - i * 4} y={y} width={32 + i * 8} height="1.4" rx="0.7" fill="#FDE68A" opacity={0.7 - i * 0.12} />
      ))}
      {/* palm */}
      <path d="M44 120 Q48 96 58 72" stroke="#1A0B2E" strokeWidth="3" fill="none" />
      <path d="M58 72 Q44 62 30 68 M58 72 Q50 58 40 54 M58 72 Q64 58 76 56 M58 72 Q72 66 82 74 M58 72 Q60 64 58 52" stroke="#1A0B2E" strokeWidth="3.2" fill="none" strokeLinecap="round" />
    </svg>
  )
}

export function HillsScene() {
  const id = useId().replace(/:/g, '')
  return (
    <svg {...svgProps}>
      <defs>
        <linearGradient id={`${id}sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0F172A" />
          <stop offset="0.5" stopColor="#1E3A8A" />
          <stop offset="1" stopColor="#67E8F9" />
        </linearGradient>
        <linearGradient id={`${id}mist`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E0F2FE" stopOpacity="0" />
          <stop offset="1" stopColor="#E0F2FE" stopOpacity="0.35" />
        </linearGradient>
      </defs>
      <rect width="300" height="120" fill={`url(#${id}sky)`} />
      <circle cx="232" cy="26" r="7" fill="#F8FAFC" opacity="0.9" />
      <path d="M0 78 L60 30 L95 58 L140 18 L190 62 L230 36 L300 76 L300 120 L0 120 Z" fill="#334155" />
      <path d="M140 18 L128 30 L136 28 L142 34 L150 27 Z M60 30 L52 37 L60 35 L66 39 Z" fill="#F1F5F9" />
      <rect y="62" width="300" height="30" fill={`url(#${id}mist)`} />
      <path d="M0 92 L50 66 L100 86 L160 58 L220 88 L300 70 L300 120 L0 120 Z" fill="#1E293B" />
      {[30, 52, 74, 238, 258, 276].map((x, i) => (
        <path key={x} d={`M${x} ${112 - (i % 2) * 6} l7 -20 l7 20 Z`} fill="#0B1220" />
      ))}
    </svg>
  )
}

export function HeritageScene() {
  const id = useId().replace(/:/g, '')
  return (
    <svg {...svgProps}>
      <defs>
        <linearGradient id={`${id}sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7C2D12" />
          <stop offset="0.55" stopColor="#EA580C" />
          <stop offset="1" stopColor="#FED7AA" />
        </linearGradient>
      </defs>
      <rect width="300" height="120" fill={`url(#${id}sky)`} />
      <g fill="#3B0D0C">
        <rect x="60" y="64" width="180" height="56" />
        <path d="M120 64 Q150 18 180 64 Z" />
        <rect x="148" y="16" width="4" height="12" />
        <path d="M70 64 Q82 42 94 64 Z M206 64 Q218 42 230 64 Z" />
        <rect x="40" y="48" width="16" height="72" />
        <rect x="244" y="48" width="16" height="72" />
        <path d="M38 48 Q48 34 58 48 Z M242 48 Q252 34 262 48 Z" />
      </g>
      {[84, 112, 140, 168, 196].map((x) => (
        <path key={x} d={`M${x} 120 V96 Q${x + 9} 84 ${x + 18} 96 V120 Z`} fill="#FDBA74" opacity="0.55" />
      ))}
      <rect y="116" width="300" height="4" fill="#2A0A09" />
    </svg>
  )
}
