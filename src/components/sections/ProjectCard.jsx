import { useRef } from 'react'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { useFinePointer } from '../../hooks/useMediaQuery'
import ProjectMockup from '../mockups/ProjectMockup'
import { EASE } from '../ui/Reveal'
import ProjectLinks from './ProjectLinks'

export default function ProjectCard({ project, reversed = false, onOpen }) {
  const articleRef = useRef(null)
  const finePointer = useFinePointer()
  const reduceMotion = useReducedMotion()
  const canTilt = finePointer && !reduceMotion

  // Subtle 3D tilt + glare that follow the cursor
  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)
  const rotateX = useSpring(tiltX, { stiffness: 140, damping: 18 })
  const rotateY = useSpring(tiltY, { stiffness: 140, damping: 18 })
  const glareX = useMotionValue(50)
  const glareY = useMotionValue(30)
  const glare = useMotionTemplate`radial-gradient(520px circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.10), transparent 45%)`


  const handleMove = (event) => {
    if (!canTilt) return
    const rect = event.currentTarget.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width
    const py = (event.clientY - rect.top) / rect.height
    tiltY.set((px - 0.5) * 6)
    tiltX.set((0.5 - py) * 5)
    glareX.set(px * 100)
    glareY.set(py * 100)
  }

  const resetTilt = () => {
    tiltX.set(0)
    tiltY.set(0)
  }

  return (
    <article
      ref={articleRef}
      aria-labelledby={`${project.id}-heading`}
      className="relative grid items-center gap-10 lg:grid-cols-12 lg:gap-14"
    >
      {/* Preview */}
      <div className={`relative isolate lg:col-span-7 ${reversed ? 'lg:order-2' : ''}`}>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-[12%] -z-10 opacity-80"
          style={{ background: `radial-gradient(closest-side, ${project.theme.glow}, transparent)` }}
        />
        <motion.div
          initial={{ opacity: 0, y: 70, clipPath: 'inset(10% 6% 10% 6% round 28px)' }}
          whileInView={{ opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0% round 28px)' }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1.2, ease: EASE }}
        >

        <button
          type="button"
          onClick={onOpen}
          onPointerMove={handleMove}
          onPointerLeave={resetTilt}
          className="group block w-full rounded-[28px] text-left"
          style={{ perspective: 1400 }}
          data-cursor="View"
          aria-label={`Open ${project.title} project details`}
        >
          <motion.div
            className="relative overflow-hidden rounded-[28px] border border-line bg-surface/80 p-2 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)] transition-colors duration-500 group-hover:border-white/15 sm:p-3"
            style={canTilt ? { rotateX, rotateY } : undefined}
          >
            <div className="flex items-center justify-between px-2 pb-2.5 pt-1 sm:px-3 sm:pb-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-subtle">
                Concept preview
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-subtle">
                {project.index} / {project.title}
              </span>
            </div>
            <div className="relative overflow-hidden rounded-[20px]">
              <div className="transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]">
                <ProjectMockup name={project.mockup} />
              </div>
            </div>

            {canTilt ? (
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: glare }}
              />
            ) : null}

            <span className="absolute bottom-5 right-5 hidden items-center gap-2 rounded-full bg-fg px-4 py-2 text-xs font-medium text-ink opacity-0 transition-all duration-500 group-hover:opacity-100 sm:inline-flex sm:bottom-6 sm:right-6 sm:translate-y-2 sm:group-hover:translate-y-0">
              View details <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
          </motion.div>
        </button>
        </motion.div>
      </div>

      {/* Story */}
      <div className={`lg:col-span-5 ${reversed ? 'lg:order-1' : ''}`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, delay: 0.15, ease: EASE }}
        >
          <div className="flex items-end gap-5">
            <span
              aria-hidden="true"
              className="font-display text-[clamp(3.5rem,7vw,5.5rem)] font-semibold leading-[0.8] tracking-[-0.05em] text-transparent"
              style={{ WebkitTextStroke: '1px rgba(255,255,255,0.22)' }}
            >
              {project.index}
            </span>
            <p className="pb-1 text-eyebrow" style={{ color: project.theme.accent }}>
              {project.category}
            </p>
          </div>

          <h3 id={`${project.id}-heading`} className="mt-6 text-display-md">
            {project.title}
          </h3>
          <p className="mt-5 max-w-md text-[1.02rem] leading-relaxed text-muted">{project.summary}</p>

          <dl className="mt-8 grid max-w-md grid-cols-2 gap-6 border-t border-line pt-6">
            {project.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse">
                <dt className="mt-1 text-xs text-muted">{stat.label}</dt>
                <dd className="font-display text-2xl font-medium tracking-tight">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <ul className="mt-8 flex max-w-md flex-wrap gap-2" aria-label={`${project.title} technologies`}>
          {project.tech.map((tech, i) => (
            <motion.li
              key={tech}
              initial={{ opacity: 0, y: 10, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.5, delay: 0.25 + i * 0.05, ease: EASE }}
              className="rounded-full border border-line bg-white/[0.025] px-3 py-1.5 font-mono text-[11px] text-fg/80 transition-colors duration-300 hover:border-white/25 hover:text-fg"
            >
              {tech}
            </motion.li>
          ))}
        </ul>

        <motion.div
          className="mt-9 flex flex-col gap-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
        >
          <div>
            <button
              type="button"
              onClick={onOpen}
              className="group inline-flex min-h-12 items-center gap-2.5 rounded-full bg-fg px-6 text-[0.95rem] font-medium text-ink transition-shadow duration-500 hover:shadow-[0_10px_40px_-8px_rgba(139,92,246,0.65)]"
            >
              View Project
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </button>
          </div>
          <ProjectLinks links={project.links} />
        </motion.div>
      </div>
    </article>
  )
}
