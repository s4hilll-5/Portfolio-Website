import Reveal from './Reveal'
import ScrambleText from './ScrambleText'

/** Mono eyebrow label used at the top of every section: "02 — About". */
export function SectionLabel({ index, label }) {
  return (
    <Reveal y={12} className="flex items-center gap-3 text-eyebrow text-muted">
      <span className="text-violet-soft">{index}</span>
      <span className="h-px w-10 bg-gradient-to-r from-violet/70 to-transparent" aria-hidden="true" />
      <ScrambleText text={label} duration={800} delay={150} />
    </Reveal>
  )
}
