import { motion } from 'motion/react'
import { allSkills, skillGroups } from '../../data/skills'
import Icon from '../ui/Icon'
import Reveal, { EASE } from '../ui/Reveal'
import { SectionLabel } from '../ui/SectionHeading'
import WordReveal from '../ui/WordReveal'

// Bento layout spans for the four groups on large screens
const spans = ['lg:col-span-7', 'lg:col-span-5', 'lg:col-span-5', 'lg:col-span-7']

function Marquee() {
  const items = [...allSkills, ...allSkills]
  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden border-y border-line py-6"
      style={{
        maskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)',
        WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)',
      }}
    >
      <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap">
        {items.map((skill, i) => (
          <span key={`${skill}-${i}`} className="flex items-center gap-10">
            <span
              className="font-display text-[clamp(1.8rem,4vw,3.25rem)] font-semibold tracking-[-0.03em] text-transparent"
              style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}
            >
              {skill}
            </span>
            <span className="h-1.5 w-1.5 rotate-45 bg-violet/60" />
          </span>
        ))}
      </div>
    </div>
  )
}

function SkillCard({ group, index, className }) {
  // Cursor spotlight via CSS variables — no React state on mousemove
  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`)
    event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`)
  }

  return (
    <motion.article
      onPointerMove={handleMove}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, delay: (index % 2) * 0.1, ease: EASE }}
      className={`spotlight group relative overflow-hidden rounded-[28px] border border-line bg-surface/70 p-7 backdrop-blur-sm transition-colors duration-500 hover:border-white/15 sm:p-9 ${className}`}
    >
      {/* Oversized outline number */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-6 right-4 font-display text-[8rem] font-semibold leading-none tracking-[-0.06em] text-transparent transition-transform duration-700 group-hover:-translate-y-2"
        style={{ WebkitTextStroke: '1px rgba(255,255,255,0.06)' }}
      >
        0{index + 1}
      </span>

      <div className="relative flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="relative grid h-12 w-12 place-items-center rounded-2xl border border-line bg-gradient-to-br from-white/[0.07] to-transparent text-violet-soft transition-colors duration-500 group-hover:text-cyan">
            <Icon name={group.icon} className="h-5 w-5" strokeWidth={1.6} />
          </span>
          <div>
            <h3 className="font-display text-xl font-medium tracking-tight sm:text-2xl">{group.title}</h3>
            <p className="mt-0.5 text-sm text-muted">{group.caption}</p>
          </div>
        </div>
        <span className="hidden font-mono text-xs text-subtle sm:block">
          {String(group.skills.length).padStart(2, '0')}
        </span>
      </div>

      <ul className="relative mt-9 flex flex-wrap gap-2.5" aria-label={`${group.title} skills`}>
        {group.skills.map((skill, i) => (
          <motion.li
            key={skill}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.55, delay: 0.15 + i * 0.05, ease: EASE }}
            className="flex items-center gap-2.5 rounded-xl border border-line bg-white/[0.025] px-3.5 py-2.5 text-[0.92rem] text-fg/90 transition-[border-color,background-color,transform] duration-300 hover:-translate-y-0.5 hover:border-violet/40 hover:bg-violet/[0.06]"
          >
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: i % 2 ? 'var(--color-cyan)' : 'var(--color-violet-soft)' }}
            />
            {skill}
          </motion.li>
        ))}
      </ul>
    </motion.article>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-28 md:py-40">
      <Marquee />

      <div className="mx-auto mt-24 max-w-7xl px-5 sm:px-8 md:mt-32">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel index="04" label="Skills" />
            <h2 aria-label="The stack I build with." className="mt-8 text-display-lg">
              <WordReveal lines={['The stack', { text: 'I build with.', className: 'font-accent text-muted' }]} />
            </h2>
          </div>
          <Reveal delay={0.15} className="lg:col-span-4 lg:col-start-9">
            <p className="text-[1.02rem] leading-relaxed text-muted">
              Languages, frameworks and tools I work with — from the first layout to the API behind it.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-12">
          {skillGroups.map((group, i) => (
            <SkillCard key={group.id} group={group} index={i} className={spans[i]} />
          ))}
        </div>
      </div>
    </section>
  )
}
