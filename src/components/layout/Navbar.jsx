import { useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { navLinks, profile } from '../../data/profile'
import { useDialogBehavior } from '../../hooks/useDialogBehavior'
import { GitHubIcon, LinkedInIcon } from '../ui/BrandIcons'
import { EASE } from '../ui/Reveal'
import ScrambleText from '../ui/ScrambleText'
import { scrollToTarget } from '../../lib/smoothScroll'

function Wordmark({ onClick }) {
  return (
    <a
      href="#home"
      onClick={onClick}
      className="group relative flex items-center gap-2 rounded-full px-3 py-2 font-display text-[0.95rem] font-semibold tracking-[0.08em]"
      aria-label={`${profile.name} — back to top`}
    >
      <span
        aria-hidden="true"
        className="relative grid h-6 w-6 place-items-center rounded-full border border-white/15 bg-white/[0.04]"
      >
        <span className="h-2 w-2 rounded-full bg-gradient-to-br from-violet-soft to-violet shadow-[0_0_12px_rgba(139,92,246,0.9)] transition-transform duration-500 group-hover:scale-125" />
      </span>
      <span>
        SAHIL<span className="text-violet-soft">.</span>DEV
      </span>
    </a>
  )
}

export default function Navbar({ active }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (value) => {
    const next = value > 24
    setScrolled((prev) => (prev === next ? prev : next))
  })

  const closeMenu = () => setOpen(false)
  useDialogBehavior({ open, containerRef: menuRef, onClose: closeMenu })

  // In the mobile menu, close first, then scroll once the page is unlocked.
  const navigateFromMenu = (event, id) => {
    event.preventDefault()
    setOpen(false)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        scrollToTarget(`#${id}`)
      })
    })
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <nav
        aria-label="Primary"
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full border px-2 py-1.5 transition-[background-color,border-color,box-shadow] duration-500 ${
          scrolled
            ? 'border-line bg-[#0b0c12]/70 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.8)] backdrop-blur-xl backdrop-saturate-150'
            : 'border-transparent bg-transparent'
        }`}
      >
        <Wordmark />

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = active === link.id
            return (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  aria-current={isActive ? 'location' : undefined}
                  className={`relative block rounded-full px-4 py-2 font-mono text-[0.7rem] uppercase tracking-[0.16em] transition-colors duration-300 ${
                    isActive ? 'text-fg' : 'text-muted hover:text-fg'
                  }`}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.07]"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  ) : null}
                  <ScrambleText text={link.label} trigger="hover" duration={420} className="relative" />
                </a>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="group hidden items-center gap-1.5 rounded-full bg-fg px-4 py-2 text-sm font-medium text-ink transition-shadow duration-500 hover:shadow-[0_8px_30px_-6px_rgba(139,92,246,0.7)] md:inline-flex"
          >
            Let&apos;s talk
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="grid h-11 w-11 place-items-center rounded-full border border-line-strong bg-white/[0.04] backdrop-blur md:hidden"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            data-lenis-prevent
            className="fixed inset-0 z-[70] flex flex-col bg-ink/[0.97] px-5 pb-8 pt-4 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            transition={{ duration: 0.35 }}
          >
            <div className="flex items-center justify-between px-1">
              <Wordmark onClick={(e) => navigateFromMenu(e, 'home')} />
              <button
                type="button"
                onClick={closeMenu}
                className="grid h-11 w-11 place-items-center rounded-full border border-line-strong bg-white/[0.04]"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Mobile" className="mt-12 flex-1">
              <ul className="space-y-1">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.06 + i * 0.05, ease: EASE }}
                  >
                    <a
                      href={`#${link.id}`}
                      onClick={(e) => navigateFromMenu(e, link.id)}
                      aria-current={active === link.id ? 'location' : undefined}
                      className="flex items-baseline gap-4 rounded-2xl px-2 py-3 font-display text-[2.4rem] font-medium leading-none tracking-tight"
                    >
                      <span className="font-mono text-xs text-violet-soft">0{i + 1}</span>
                      <span className={active === link.id ? 'text-fg' : 'text-fg/70'}>{link.label}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="space-y-4 border-t border-line pt-6"
            >
              <a href={`mailto:${profile.email}`} className="block break-all text-sm text-muted">
                {profile.email}
              </a>
              <div className="flex gap-3">
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid h-11 w-11 place-items-center rounded-full border border-line-strong"
                  aria-label="LinkedIn profile (opens in a new tab)"
                >
                  <LinkedInIcon className="h-4 w-4" />
                </a>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid h-11 w-11 place-items-center rounded-full border border-line-strong"
                  aria-label="GitHub profile (opens in a new tab)"
                >
                  <GitHubIcon className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
