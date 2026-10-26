import { useCallback, useState } from 'react'
import { AnimatePresence } from 'motion/react'
import { projects } from '../../data/projects'
import Reveal from '../ui/Reveal'
import { SectionLabel } from '../ui/SectionHeading'
import WordReveal from '../ui/WordReveal'
import ProjectCard from './ProjectCard'
import ProjectModal from './ProjectModal'

export default function Projects() {
  const [selectedId, setSelectedId] = useState(null)
  const selected = projects.find((project) => project.id === selectedId)
  const closeModal = useCallback(() => setSelectedId(null), [])

  return (
    <section id="work" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel index="03" label="Selected work" />
            <h2 aria-label="Projects that tell the story." className="mt-8 text-display-lg">
              <WordReveal lines={['Projects that', { text: 'tell the story.', className: 'font-accent text-muted' }]} />
            </h2>
          </div>
          <Reveal delay={0.15} className="lg:col-span-4 lg:col-start-9">
            <p className="text-[1.02rem] leading-relaxed text-muted">
              Three builds across travel, education and food — each taking an idea from interface to
              authentication and data.
            </p>
            <p className="mt-4 font-mono text-xs text-subtle">
              0{projects.length} projects · select one for the full breakdown
            </p>
          </Reveal>
        </div>

        <div className="mt-20 space-y-28 md:mt-28 md:space-y-40">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              reversed={i % 2 === 1}
              onOpen={() => setSelectedId(project.id)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected ? <ProjectModal key={selected.id} project={selected} onClose={closeModal} /> : null}
      </AnimatePresence>
    </section>
  )
}
