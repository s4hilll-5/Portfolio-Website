import { useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'motion/react'
import { Check, X } from 'lucide-react'
import { useDialogBehavior } from '../../hooks/useDialogBehavior'
import ProjectMockup from '../mockups/ProjectMockup'
import { EASE } from '../ui/Reveal'
import ProjectLinks from './ProjectLinks'

/** Full project details. Rendered inside <AnimatePresence> by Projects. */
export default function ProjectModal({ project, onClose }) {
  const panelRef = useRef(null)
  const closeRef = useRef(null)
  const titleId = `${project.id}-modal-title`

  useDialogBehavior({ open: true, containerRef: panelRef, onClose, initialFocusRef: closeRef })

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[75] flex items-end justify-center sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute inset-0 bg-[#05060a]/80 backdrop-blur-md" onClick={onClose} aria-hidden="true" />

      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        data-lenis-prevent
        className="relative max-h-[94svh] w-full max-w-5xl overflow-y-auto overscroll-contain rounded-t-[28px] border border-line-strong bg-surface shadow-[0_40px_120px_-20px_rgba(0,0,0,0.9)] sm:max-h-[90svh] sm:rounded-[28px]"
        initial={{ opacity: 0, y: 48, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 32, scale: 0.98, transition: { duration: 0.25 } }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-line bg-surface/90 px-5 py-4 backdrop-blur-xl sm:px-8 sm:py-5">
          <div>
            <p className="text-eyebrow" style={{ color: project.theme.accent }}>
              {project.index} · {project.category}
            </p>
            <h2 id={titleId} className="mt-1.5 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              {project.title}
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line-strong bg-white/[0.04] transition-colors hover:bg-white/[0.1]"
            aria-label="Close project details"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="px-5 pb-8 pt-5 sm:px-8 sm:pb-10 sm:pt-7">
          <figure>
            <div
              className="overflow-hidden rounded-[20px] border border-line p-1.5 sm:p-2"
              style={{ background: project.theme.accentSoft }}
            >
              <div className="overflow-hidden rounded-[14px]">
                <ProjectMockup name={project.mockup} />
              </div>
            </div>
            <figcaption className="mt-3 font-mono text-[11px] text-subtle">
              Illustrative concept preview with sample content — not a screenshot of the live application.
            </figcaption>
          </figure>

          <div className="mt-10 grid gap-10 md:grid-cols-5">
            <div className="md:col-span-3">
              <h3 className="text-eyebrow text-muted">Overview</h3>
              <p className="mt-4 text-[1.02rem] leading-relaxed text-fg/85">{project.detail}</p>

              <h3 className="mt-10 text-eyebrow text-muted">Key features</h3>
              <ul className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {project.features.map((feature, i) => (
                  <motion.li
                    key={feature}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.25 + i * 0.04, ease: EASE }}
                    className="flex gap-3 text-[0.95rem] leading-snug text-fg/85"
                  >
                    <span
                      className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full"
                      style={{ background: project.theme.accentSoft, color: project.theme.accent }}
                    >
                      <Check className="h-3 w-3" strokeWidth={2.5} aria-hidden="true" />
                    </span>
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="space-y-9 md:col-span-2">
              <div>
                <h3 className="text-eyebrow text-muted">At a glance</h3>
                <dl className="mt-4 grid grid-cols-2 gap-4">
                  {project.stats.map((stat) => (
                    <div key={stat.label} className="flex flex-col-reverse rounded-2xl border border-line bg-white/[0.02] p-4">
                      <dt className="mt-1 text-xs text-muted">{stat.label}</dt>
                      <dd className="font-display text-xl font-medium tracking-tight">{stat.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div>
                <h3 className="text-eyebrow text-muted">Built with</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <li key={tech} className="rounded-full border border-line px-3 py-1.5 font-mono text-[11px] text-fg/80">
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-eyebrow text-muted">Links</h3>
                <div className="mt-4">
                  <ProjectLinks links={project.links} size="lg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  )
}
