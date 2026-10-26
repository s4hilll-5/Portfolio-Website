import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowRight, MapPin } from 'lucide-react'
import { heroStack, profile } from '../../data/profile'
import MagneticButton from '../ui/MagneticButton'
import WordReveal from '../ui/WordReveal'
import { EASE } from '../ui/Reveal'
import ScrambleText from '../ui/ScrambleText'

const HEADLINE = 'Building digital experiences that feel different.'

export default function Hero() {
  const ref = useRef(null)
  const reduceMotion = useReducedMotion()
  // Starts just as the page-load curtain lifts.
  const base = reduceMotion ? 0 : 1.2

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 140])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const fadeUp = (delay) => ({
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay: base + delay, ease: EASE },
  })

  return (
    <section
      id="home"
      ref={ref}
      aria-label="Introduction"
      className="relative flex min-h-svh flex-col justify-center pb-32 pt-28 sm:pt-32"
    >
      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
        <motion.div className="relative z-10" style={{ y: contentY, opacity: contentOpacity }}>
          <motion.div {...fadeUp(0)} className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-emerald-400/20 bg-emerald-400/[0.07] px-3.5 py-1.5 text-xs font-medium text-emerald-200 backdrop-blur">
              <span className="h-2 w-2 animate-pulse-dot rounded-full bg-emerald-400" aria-hidden="true" />
              Open to Opportunities
            </span>
            <span className="inline-flex items-center gap-1.5 text-eyebrow text-muted">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              <ScrambleText text={profile.location} trigger="mount" delay={(base + 0.2) * 1000} duration={900} />
            </span>
          </motion.div>

          <h1 aria-label={HEADLINE} className="mt-8 text-display-xl sm:mt-10">
            <WordReveal
              trigger="mount"
              delay={base + 0.1}
              stagger={0.07}
              lines={[
                'Building digital',
                'experiences that',
                { text: 'feel different.', className: 'font-accent text-gradient' },
              ]}
            />
          </h1>

          <motion.p {...fadeUp(0.55)} className="mt-8 max-w-[34rem] text-lead text-muted">
            I&apos;m <span className="font-medium text-fg">{profile.firstName}</span>, a Full Stack Developer focused
            on crafting responsive interfaces and practical web applications.
          </motion.p>

          <motion.div {...fadeUp(0.7)} className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4">
            <MagneticButton href="#work" variant="primary">
              Explore My Work
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </MagneticButton>
            <MagneticButton href="#contact" variant="ghost">
              Let&apos;s Connect
            </MagneticButton>
          </motion.div>

          <motion.div {...fadeUp(0.85)} className="mt-14 flex flex-wrap items-center gap-x-4 gap-y-3">
            <span className="text-eyebrow text-subtle">Core stack</span>
            <span className="hidden h-px w-8 bg-line-strong sm:block" aria-hidden="true" />
            <ul className="flex flex-wrap items-center gap-x-1 gap-y-2" aria-label="Core technologies">
              {heroStack.map((tech, i) => (
                <motion.li
                  key={tech}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: base + 0.95 + i * 0.06, ease: EASE }}
                  className="flex items-center text-sm text-fg/80"
                >
                  {i > 0 ? (
                    <span className="mx-2.5 h-1 w-1 rounded-full bg-violet/70" aria-hidden="true" />
                  ) : null}
                  {tech}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>

      {/* Editorial frame along the bottom edge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: base + 1.2 }}
        className="absolute inset-x-0 bottom-6 mx-auto flex max-w-7xl items-end justify-between px-5 sm:bottom-8 sm:px-8"
      >
        <p className="hidden text-eyebrow text-subtle md:block">
          {profile.roles[0]} <span className="text-violet/70">/</span> {profile.roles[1]}
        </p>

        <a
          href="#about"
          className="group mx-auto flex flex-col items-center gap-2.5 rounded-full px-3 py-1 text-eyebrow text-muted transition-colors hover:text-fg md:mx-0"
          aria-label="Scroll to the About section"
        >
          <span className="relative flex h-9 w-[22px] justify-center rounded-full border border-white/25 pt-2 transition-colors group-hover:border-white/50">
            <span className="scroll-dot h-1.5 w-1 rounded-full bg-fg" />
          </span>
          <span aria-hidden="true">Scroll</span>
        </a>

        <p className="hidden text-eyebrow text-subtle md:block">
          <ScrambleText text="19.0760° N · 72.8777° E" trigger="mount" delay={(base + 1.3) * 1000} duration={1100} />
        </p>
      </motion.div>
    </section>
  )
}
