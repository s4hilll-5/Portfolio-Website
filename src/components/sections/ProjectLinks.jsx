import { ArrowUpRight, Globe } from 'lucide-react'
import { GitHubIcon } from '../ui/BrandIcons'

/**
 * GitHub / Live Demo links. When a URL hasn't been supplied in
 * src/data/projects.js, the link is shown as unavailable rather than broken.
 */
function ProjectLink({ href, label, icon, size }) {
  const base = size === 'lg' ? 'min-h-12 px-5 text-sm' : 'min-h-10 px-4 text-[0.82rem]'

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`group inline-flex items-center gap-2 rounded-full border border-line-strong bg-white/[0.03] text-fg transition-colors duration-300 hover:border-white/30 hover:bg-white/[0.07] ${base}`}
      >
        {icon}
        {label}
        <ArrowUpRight
          className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    )
  }

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-dashed border-white/12 text-subtle ${base}`}
      title={`${label} link not available yet`}
    >
      {icon}
      <span>{label}</span>
      <span className="font-mono text-[10px] uppercase tracking-wider text-subtle/80">· not available yet</span>
    </span>
  )
}

export default function ProjectLinks({ links, size = 'md' }) {
  return (
    <div className="flex flex-wrap gap-2.5">
      <ProjectLink href={links.github} label="GitHub" icon={<GitHubIcon className="h-4 w-4" />} size={size} />
      <ProjectLink
        href={links.live}
        label="Live Demo"
        icon={<Globe className="h-4 w-4" aria-hidden="true" />}
        size={size}
      />
    </div>
  )
}
