import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, Check, Copy, Mail, Phone } from 'lucide-react'
import { profile } from '../../data/profile'
import { GitHubIcon, LinkedInIcon } from '../ui/BrandIcons'
import Reveal, { EASE } from '../ui/Reveal'
import { SectionLabel } from '../ui/SectionHeading'
import WordReveal from '../ui/WordReveal'
import ContactForm from './ContactForm'

const channels = [
  {
    label: 'LinkedIn',
    value: profile.linkedinLabel,
    href: profile.linkedin,
    icon: <LinkedInIcon className="h-[18px] w-[18px]" />,
    external: true,
  },
  {
    label: 'GitHub',
    value: profile.githubLabel,
    href: profile.github,
    icon: <GitHubIcon className="h-[18px] w-[18px]" />,
    external: true,
  },
  {
    label: 'Phone',
    value: profile.phone,
    href: profile.phoneHref,
    icon: <Phone className="h-[18px] w-[18px]" aria-hidden="true" />,
  },
]

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // Fallback for browsers/contexts without the async clipboard API
    const area = document.createElement('textarea')
    area.value = text
    area.setAttribute('readonly', '')
    area.style.position = 'fixed'
    area.style.opacity = '0'
    document.body.appendChild(area)
    area.select()
    let ok = false
    try {
      ok = document.execCommand('copy')
    } catch {
      ok = false
    }
    area.remove()
    return ok
  }
}

function CopyEmailButton() {
  const [state, setState] = useState('idle') // idle | copied | failed
  const timer = useRef(0)

  useEffect(() => () => clearTimeout(timer.current), [])

  const handleCopy = async () => {
    const ok = await copyText(profile.email)
    setState(ok ? 'copied' : 'failed')
    clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setState('idle'), 2400)
  }

  const label = { idle: 'Copy email', copied: 'Copied!', failed: 'Copy failed' }[state]

  return (
    <>
      <button
        type="button"
        onClick={handleCopy}
        className={`inline-flex min-h-12 items-center gap-2.5 rounded-full border px-5 text-[0.95rem] font-medium transition-colors duration-300 ${
          state === 'copied'
            ? 'border-emerald-400/40 bg-emerald-400/10 text-emerald-200'
            : 'border-line-strong bg-white/[0.03] text-fg hover:border-white/30 hover:bg-white/[0.07]'
        }`}
      >
        <span className="relative grid h-4 w-4 place-items-center">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={state === 'copied' ? 'check' : 'copy'}
              initial={{ scale: 0.4, opacity: 0, rotate: -30 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.4, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute"
            >
              {state === 'copied' ? (
                <Check className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Copy className="h-4 w-4" aria-hidden="true" />
              )}
            </motion.span>
          </AnimatePresence>
        </span>
        <span className="min-w-[5.5rem] text-left">{label}</span>
      </button>
      <span className="sr-only" aria-live="polite">
        {state === 'copied' ? 'Email address copied to clipboard' : state === 'failed' ? 'Could not copy the email address' : ''}
      </span>
    </>
  )
}

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-28 md:py-40">
      {/* closing horizon glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[70%]"
        style={{
          background:
            'radial-gradient(ellipse 60% 55% at 50% 100%, rgba(139,92,246,0.16), rgba(103,232,249,0.04) 45%, transparent 75%)',
        }}
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionLabel index="05" label="Contact" />

        <h2 aria-label="Have an idea? Let's build something meaningful." className="mt-8 text-display-xl">
          <WordReveal
            stagger={0.06}
            lines={['Have an idea?', "Let's build something", { text: 'meaningful.', className: 'font-accent text-gradient' }]}
          />
        </h2>

        <div className="mt-20 grid gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Direct channels */}
          <div className="lg:col-span-6">
            <Reveal className="@container">
              <p className="flex items-center gap-2 text-eyebrow text-muted">
                <Mail className="h-3.5 w-3.5" aria-hidden="true" /> Email
              </p>
              <a
                href={`mailto:${profile.email}`}
                className="link-underline mt-4 inline-block font-display font-medium leading-tight tracking-[-0.02em] [overflow-wrap:anywhere]"
                style={{ fontSize: 'clamp(1rem, 5.5cqi, 2.1rem)' }}
              >
                {profile.email}
              </a>
              <div className="mt-7 flex flex-wrap gap-3">
                <CopyEmailButton />
                <a
                  href={`mailto:${profile.email}`}
                  className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-fg px-5 text-[0.95rem] font-medium text-ink transition-shadow duration-500 hover:shadow-[0_10px_40px_-8px_rgba(139,92,246,0.65)]"
                >
                  Send an email
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </Reveal>

            <ul className="mt-14 border-t border-line">
              {channels.map((channel, i) => (
                <motion.li
                  key={channel.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
                  className="border-b border-line"
                >
                  <a
                    href={channel.href}
                    {...(channel.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="group flex min-h-[4.5rem] items-center gap-5 py-4 transition-colors"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line bg-white/[0.03] text-muted transition-colors duration-300 group-hover:border-violet/40 group-hover:text-fg">
                      {channel.icon}
                    </span>
                    <span className="flex-1">
                      <span className="block text-eyebrow text-subtle">{channel.label}</span>
                      <span className="mt-1 block text-[1.02rem] text-fg/90 transition-colors group-hover:text-fg">
                        {channel.value}
                      </span>
                    </span>
                    <ArrowUpRight
                      className="h-5 w-5 text-subtle transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg"
                      aria-hidden="true"
                    />
                    {channel.external ? <span className="sr-only">(opens in a new tab)</span> : null}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Form */}
          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
            <div className="border-glow rounded-[28px] bg-surface/70 p-6 backdrop-blur-sm sm:p-9">
              <h3 className="font-display text-2xl font-medium tracking-tight">Send a message</h3>
              <p className="mb-7 mt-2 text-sm text-muted">
                Share a few details and I&apos;ll get back to you by email.
              </p>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
