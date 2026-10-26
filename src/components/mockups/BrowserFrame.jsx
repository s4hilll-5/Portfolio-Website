import { Lock } from 'lucide-react'

/**
 * Minimal browser chrome around a mockup. `tone` switches between the dark
 * frame (most projects) and a warm light frame (Bae Laban).
 */
export default function BrowserFrame({ title, tone = 'dark', children }) {
  const dark = tone === 'dark'
  return (
    <div
      className="flex h-full w-full flex-col overflow-hidden"
      style={{ background: dark ? '#0B0E17' : '#F7EFE4' }}
    >
      <div
        className="flex h-[34px] shrink-0 items-center gap-2 px-4"
        style={{
          background: dark ? '#121623' : '#ECE1D3',
          borderBottom: `1px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(59,36,22,0.08)'}`,
        }}
      >
        <span className="h-[9px] w-[9px] rounded-full" style={{ background: dark ? '#3A3F4F' : '#D9C7B2' }} />
        <span className="h-[9px] w-[9px] rounded-full" style={{ background: dark ? '#3A3F4F' : '#D9C7B2' }} />
        <span className="h-[9px] w-[9px] rounded-full" style={{ background: dark ? '#3A3F4F' : '#D9C7B2' }} />
        <div
          className="mx-auto flex h-[20px] w-[280px] items-center justify-center gap-1.5 rounded-md text-[10px]"
          style={{
            background: dark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.6)',
            color: dark ? '#8A93A8' : '#7A5B47',
          }}
        >
          <Lock className="h-2.5 w-2.5" aria-hidden="true" />
          {title}
        </div>
        <span className="w-[43px]" />
      </div>
      <div className="relative min-h-0 flex-1">{children}</div>
    </div>
  )
}
