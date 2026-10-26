import { motion } from 'motion/react'
import { focusAreas, profile } from '../../data/profile'
import Icon from '../ui/Icon'
import Reveal, { EASE } from '../ui/Reveal'
import { SectionLabel } from '../ui/SectionHeading'
import WordReveal from '../ui/WordReveal'
import EducationTimeline from './EducationTimeline'

const facts = [
  { label: 'Based in', value: profile.location },
  { label: 'Degree', value: 'BSc IT, University of Mumbai' },
  { label: 'Focus', value: 'Full stack web applications' },
  { label: 'Status', value: 'Open to opportunities' },
]

export default function About() {
  return (
    <section id="about" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionLabel index="02" label="About" />

        <h2
          aria-label="Curious by nature. Developer by practice."
          className="mt-8 max-w-[16ch] text-display-lg"
        >
          <WordReveal
            lines={['Curious by nature.', { text: 'Developer by practice.', className: 'font-accent text-muted' }]}
            stagger={0.05}
          />
        </h2>

        <div className="mt-16 grid gap-16 md:mt-24 lg:grid-cols-12 lg:gap-10">
          {/* Intro — narrow left column */}
          <div className="lg:col-span-5">
            <Reveal className="space-y-6 text-[1.05rem] leading-[1.75] text-muted">
              <p>
                <span className="text-fg">
                  I&apos;m Sahil — a BSc IT graduate from the University of Mumbai who likes turning ideas into web
                  apps people can actually use.
                </span>{' '}
                Most of my work starts in React, JavaScript and TypeScript on the front end, then connects to real
                data through Node.js, Firebase, or Java with Spring Boot.
              </p>
              <p>
                My projects have pushed me past the interface: setting up authentication, designing CRUD flows,
                integrating REST APIs, and making sure every screen holds up on a phone as well as a desktop.
              </p>
              <p>
                I&apos;m sharpening my full-stack skills through IT Vedant&apos;s Full Stack Developer course and a
                MERN Stack course on Udemy, and I pick projects that make me solve something new each time.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-line pt-8">
                {facts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="text-eyebrow text-subtle">{fact.label}</dt>
                    <dd className="mt-2 text-sm text-fg">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* Focus areas — offset right column */}
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal y={12} className="mb-6 flex items-baseline justify-between">
              <h3 className="text-eyebrow text-muted">What I focus on</h3>
              <span className="font-mono text-xs text-subtle">0{focusAreas.length}</span>
            </Reveal>
            <ul className="border-t border-line">
              {focusAreas.map((area, i) => (
                <motion.li
                  key={area.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.8, delay: i * 0.07, ease: EASE }}
                  className="group relative border-b border-line"
                >
                  <div className="relative isolate flex gap-5 py-6 sm:gap-7 sm:py-7">
                    {/* hover wash */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 -z-10 origin-left scale-x-0 bg-gradient-to-r from-violet/[0.08] to-transparent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                    />
                    <span className="pt-1 font-mono text-xs text-subtle">0{i + 1}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-line bg-white/[0.03] text-muted transition-colors duration-500 group-hover:border-violet/40 group-hover:text-violet-soft">
                          <Icon name={area.icon} className="h-[18px] w-[18px]" strokeWidth={1.6} />
                        </span>
                        <h4 className="font-display text-lg font-medium tracking-tight sm:text-xl">{area.title}</h4>
                      </div>
                      <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-muted">{area.text}</p>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        <EducationTimeline />
      </div>
    </section>
  )
}
