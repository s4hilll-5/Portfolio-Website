import { motion } from 'motion/react'
import { Award, GraduationCap } from 'lucide-react'
import { certifications, education } from '../../data/profile'
import Reveal, { EASE } from '../ui/Reveal'

export default function EducationTimeline() {
  return (
    <div className="mt-24 grid gap-5 md:mt-32 lg:grid-cols-12">
      {/* Education */}
      <Reveal className="border-glow rounded-[28px] bg-surface/70 p-7 backdrop-blur-sm sm:p-10 lg:col-span-7">
        <div className="flex items-center justify-between">
          <h3 className="flex items-center gap-3 text-eyebrow text-muted">
            <GraduationCap className="h-4 w-4 text-violet-soft" aria-hidden="true" />
            Education
          </h3>
          <span className="font-mono text-xs text-subtle">2020 — 2026</span>
        </div>

        <ol className="relative mt-10 space-y-10 pl-8">
          {/* timeline rail draws itself in */}
          <motion.span
            aria-hidden="true"
            className="absolute bottom-2 left-[5px] top-2 w-px origin-top bg-gradient-to-b from-violet via-violet/40 to-transparent"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.4, ease: EASE }}
          />
          {education.map((item, i) => (
            <motion.li
              key={item.title}
              className="relative"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8, delay: 0.2 + i * 0.15, ease: EASE }}
            >
              <span
                aria-hidden="true"
                className={`absolute -left-8 top-1.5 h-[11px] w-[11px] rounded-full border-2 ${
                  i === 0
                    ? 'border-violet bg-ink shadow-[0_0_14px_rgba(139,92,246,0.8)]'
                    : 'border-white/30 bg-ink'
                }`}
              />
              <p className="font-mono text-xs tracking-wider text-violet-soft">{item.period}</p>
              <p className="mt-2 font-display text-xl font-medium tracking-tight sm:text-2xl">{item.title}</p>
              <p className="mt-1.5 text-muted">{item.place}</p>
            </motion.li>
          ))}
        </ol>
      </Reveal>

      {/* Certifications */}
      <div className="grid gap-5 lg:col-span-5">
        {certifications.map((cert, i) => (
          <Reveal
            key={cert.title}
            delay={0.1 + i * 0.1}
            className="group relative overflow-hidden rounded-[28px] border border-line bg-surface/70 p-7 backdrop-blur-sm transition-colors duration-500 hover:border-white/15 sm:p-8"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-60 transition-opacity duration-700 group-hover:opacity-100"
              style={{
                background:
                  i === 0
                    ? 'radial-gradient(circle, rgba(139,92,246,0.22), transparent 70%)'
                    : 'radial-gradient(circle, rgba(103,232,249,0.16), transparent 70%)',
              }}
            />
            <div className="relative flex items-start justify-between gap-4">
              <span className="grid h-11 w-11 place-items-center rounded-2xl border border-line bg-white/[0.03]">
                <Award className="h-5 w-5 text-violet-soft" strokeWidth={1.6} aria-hidden="true" />
              </span>
              <span className="rounded-full border border-line px-3 py-1 font-mono text-xs text-muted">
                {cert.year}
              </span>
            </div>
            <p className="relative mt-8 text-eyebrow text-subtle">Certification · {cert.issuer}</p>
            <h3 className="relative mt-2 font-display text-2xl font-medium tracking-tight">{cert.title}</h3>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
