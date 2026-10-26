import { useId } from 'react'

/*
 * Layered dessert-in-a-glass illustration (SVG).
 * layers: top → bottom, each { color, depth } where depth is where the layer
 * starts (0 = rim, 1 = base). Toppings: 'pistachio' | 'chocolate' | 'berry' | 'mango' | 'rose'.
 */

const GLASS = 'M22 34 L98 34 L90 136 Q89 143 82 143 L38 143 Q31 143 30 136 Z'
const wave = (y) => `M0 ${y} Q15 ${y - 3} 30 ${y} T60 ${y} T90 ${y} T120 ${y} V160 H0 Z`

const toppings = {
  pistachio: (
    <g>
      {[
        [48, 14, 3], [58, 9, 2.6], [69, 13, 3.2], [53, 22, 2.4], [74, 21, 2.2], [42, 24, 2.6], [64, 18, 2],
      ].map(([x, y, r], i) => (
        <path key={i} d={`M${x - r} ${y} l${r} -${r * 0.8} l${r} ${r * 0.8} l-${r} ${r * 0.8} Z`} fill={i % 2 ? '#9DB17C' : '#B7C98F'} />
      ))}
    </g>
  ),
  chocolate: (
    <g>
      <path d="M52 2 L60 20 L50 22 Z" fill="#3B2416" />
      <path d="M64 6 L72 22 L62 21 Z" fill="#5A3A28" />
      {[[44, 22], [76, 24], [58, 26]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2" fill="#2A170D" />
      ))}
    </g>
  ),
  berry: (
    <g>
      <circle cx="60" cy="6" r="7" fill="#D7263D" />
      <circle cx="57.5" cy="3.5" r="2" fill="#fff" opacity="0.55" />
      <path d="M60 -1 Q63 -8 68 -9" stroke="#3F6212" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M44 22 q4 -3 8 0 M70 23 q4 -3 8 0" stroke="#D7263D" strokeWidth="2" fill="none" strokeLinecap="round" />
    </g>
  ),
  mango: (
    <g>
      {[[52, 12], [64, 10], [58, 20], [72, 19], [46, 21]].map(([x, y], i) => (
        <rect key={i} x={x - 4} y={y - 4} width="8" height="8" rx="2" fill={i % 2 ? '#F59E0B' : '#FBBF24'} transform={`rotate(${i * 17} ${x} ${y})`} />
      ))}
    </g>
  ),
  rose: (
    <g>
      {[[50, 14], [62, 9], [70, 18], [56, 22]].map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx="5" ry="3" fill={i % 2 ? '#F9A8D4' : '#F472B6'} transform={`rotate(${i * 40} ${x} ${y})`} />
      ))}
      {[[44, 22], [76, 22]].map(([x, y], i) => (
        <path key={i} d={`M${x - 3} ${y} l3 -2.4 l3 2.4 l-3 2.4 Z`} fill="#9DB17C" />
      ))}
    </g>
  ),
}

export default function DessertCup({ layers, topping = 'pistachio', cream = '#FFF4E4', drizzle, className = '' }) {
  const id = useId().replace(/:/g, '')

  return (
    <svg viewBox="0 -12 120 164" className={className} aria-hidden="true">
      <defs>
        <clipPath id={`${id}glass`}>
          <path d={GLASS} />
        </clipPath>
        <linearGradient id={`${id}sheen`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0.35" />
          <stop offset="0.25" stopColor="#fff" stopOpacity="0.05" />
          <stop offset="0.75" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.18" />
        </linearGradient>
        <radialGradient id={`${id}cream`} cx="0.4" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#fff" />
          <stop offset="1" stopColor={cream} />
        </radialGradient>
      </defs>

      {/* shadow */}
      <ellipse cx="60" cy="147" rx="38" ry="4.5" fill="#3B2416" opacity="0.14" />

      {/* layers */}
      <g clipPath={`url(#${id}glass)`}>
        <rect x="0" y="30" width="120" height="120" fill={layers[0]?.color ?? cream} />
        {layers.map((layer, i) => (
          <path key={i} d={wave(34 + layer.depth * 109)} fill={layer.color} />
        ))}
        {/* crumb texture on the base */}
        {[[40, 132], [52, 136], [66, 131], [78, 137], [46, 139], [72, 140], [60, 134]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="1.6" fill="#000" opacity="0.12" />
        ))}
      </g>

      {/* glass */}
      <path d={GLASS} fill={`url(#${id}sheen)`} stroke="rgba(255,255,255,0.85)" strokeWidth="1.2" />
      <path d="M31 44 L36 128" stroke="#fff" strokeOpacity="0.55" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="60" cy="34" rx="38" ry="4.5" fill="rgba(255,255,255,0.35)" stroke="rgba(255,255,255,0.9)" strokeWidth="1" />

      {/* cream swirl */}
      <ellipse cx="60" cy="31" rx="30" ry="8" fill={`url(#${id}cream)`} />
      <ellipse cx="60" cy="23" rx="22" ry="7.5" fill={`url(#${id}cream)`} />
      <ellipse cx="60" cy="15" rx="13" ry="6" fill={`url(#${id}cream)`} />
      <path d="M40 28 Q60 34 80 27 M45 20 Q60 25 75 20" stroke="#000" strokeOpacity="0.06" strokeWidth="1.2" fill="none" />

      {drizzle ? (
        <path
          d="M38 30 Q44 38 48 30 Q53 22 58 29 Q63 37 68 28 Q73 20 78 29 L80 40 Q78 46 76 40"
          stroke={drizzle}
          strokeWidth="2.6"
          fill="none"
          strokeLinecap="round"
        />
      ) : null}

      {toppings[topping]}
    </svg>
  )
}
