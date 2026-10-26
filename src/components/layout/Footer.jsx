import { ArrowUp } from 'lucide-react'
import { profile } from '../../data/profile'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative mt-10 overflow-hidden border-t border-line">
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-14 sm:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="space-y-1.5">
            <p className="font-display text-lg font-medium">{profile.name}</p>
            <p className="text-sm text-muted">{profile.location}</p>
          </div>

          <div className="flex flex-col gap-1.5 text-sm text-muted md:items-end">
            <p>Designed and built with curiosity.</p>
            <p className="font-mono text-xs tracking-wider text-subtle">
              © {year} {profile.name}
            </p>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-between border-t border-line pt-6">
          <p className="text-eyebrow text-subtle">{profile.wordmark}</p>
          <a
            href="#home"
            className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-4 text-sm text-muted transition-colors hover:border-white/25 hover:text-fg"
          >
            Back to top
            <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* Oversized outlined wordmark as a closing flourish */}
      <p
        aria-hidden="true"
        className="pointer-events-none select-none whitespace-nowrap text-center font-display font-semibold leading-[0.8] tracking-[-0.05em] text-transparent"
        style={{
          fontSize: 'clamp(4rem, 17vw, 16rem)',
          WebkitTextStroke: '1px rgba(255,255,255,0.08)',
          marginBottom: '-0.12em',
        }}
      >
        SAHIL.DEV
      </p>
    </footer>
  )
}
