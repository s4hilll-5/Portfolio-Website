import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useFinePointer, useMediaQuery } from '../../hooks/useMediaQuery'
import CosmosCanvas from './CosmosCanvas'
import CursorGlow from './CursorGlow'

/*
 * Layered, fixed background (back to front):
 *   1. ambient gradient orbs — drift on their own, re-arrange per section,
 *      and parallax with scroll
 *   2. top light beam — strongest over the hero, fades as you scroll
 *   3. fine technical grid — scrolls slowly for depth
 *   4. canvas cosmos — starfield + wireframe globe that moves per section
 *   5. cursor glow (desktop only)
 *   6. vignette for text contrast
 * Film grain is rendered separately above the content (see App).
 */

// Where the three orbs sit for each section. Values are offsets from their base position.
const scenes = {
  home: {
    a: { x: '0vw', y: '0vh', scale: 1, opacity: 1 },
    b: { x: '0vw', y: '0vh', scale: 1, opacity: 0.75 },
    c: { x: '0vw', y: '0vh', scale: 0.9, opacity: 0.6 },
  },
  about: {
    a: { x: '38vw', y: '8vh', scale: 0.85, opacity: 0.8 },
    b: { x: '-55vw', y: '18vh', scale: 1.1, opacity: 0.55 },
    c: { x: '10vw', y: '-12vh', scale: 1, opacity: 0.5 },
  },
  work: {
    a: { x: '-6vw', y: '28vh', scale: 1.15, opacity: 0.9 },
    b: { x: '-20vw', y: '-10vh', scale: 0.9, opacity: 0.55 },
    c: { x: '-30vw', y: '-20vh', scale: 1.1, opacity: 0.7 },
  },
  skills: {
    a: { x: '30vw', y: '-6vh', scale: 0.8, opacity: 0.5 },
    b: { x: '-40vw', y: '20vh', scale: 1.25, opacity: 0.9 },
    c: { x: '25vw', y: '-30vh', scale: 0.85, opacity: 0.45 },
  },
  contact: {
    a: { x: '22vw', y: '45vh', scale: 1.2, opacity: 1 },
    b: { x: '-28vw', y: '40vh', scale: 1, opacity: 0.8 },
    c: { x: '-5vw', y: '-25vh', scale: 0.8, opacity: 0.4 },
  },
}

const orbTransition = { duration: 2.6, ease: [0.16, 1, 0.3, 1] }

export default function AnimatedBackground({ activeSection = 'home' }) {
  const reduceMotion = useReducedMotion()
  const finePointer = useFinePointer()
  const isMobile = useMediaQuery('(max-width: 767px)')
  const scene = scenes[activeSection] ?? scenes.home

  const { scrollY, scrollYProgress } = useScroll()
  const layerAY = useTransform(scrollYProgress, [0, 1], ['0vh', '-22vh'])
  const layerBY = useTransform(scrollYProgress, [0, 1], ['0vh', '18vh'])
  const gridPosition = useTransform(scrollY, (v) => `0px ${(-v * 0.1).toFixed(1)}px`)
  const beamOpacity = useTransform(scrollY, [0, 700], [1, 0.15])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink">
      {/* 1. Ambient orbs */}
      <motion.div className="absolute inset-0" style={reduceMotion ? undefined : { y: layerAY }}>
        <motion.div
          className="absolute -left-[18vmax] -top-[22vmax] h-[78vmax] w-[78vmax]"
          animate={scene.a}
          transition={orbTransition}
        >
          <div
            className="orb-drift-a h-full w-full rounded-full"
            style={{
              background:
                'radial-gradient(circle at center, rgba(139,92,246,0.17) 0%, rgba(139,92,246,0.05) 38%, transparent 68%)',
            }}
          />
        </motion.div>
        <motion.div
          className="absolute -bottom-[20vmax] left-[30vw] h-[64vmax] w-[64vmax]"
          animate={scene.c}
          transition={orbTransition}
        >
          <div
            className="orb-drift-c h-full w-full rounded-full"
            style={{
              background:
                'radial-gradient(circle at center, rgba(91,33,182,0.18) 0%, rgba(76,29,149,0.05) 40%, transparent 68%)',
            }}
          />
        </motion.div>
      </motion.div>

      <motion.div className="absolute inset-0" style={reduceMotion ? undefined : { y: layerBY }}>
        <motion.div
          className="absolute -right-[22vmax] top-[8vh] h-[62vmax] w-[62vmax]"
          animate={scene.b}
          transition={orbTransition}
        >
          <div
            className="orb-drift-b h-full w-full rounded-full"
            style={{
              background:
                'radial-gradient(circle at center, rgba(103,232,249,0.08) 0%, rgba(103,232,249,0.025) 40%, transparent 68%)',
            }}
          />
        </motion.div>
      </motion.div>

      {/* 2. Light beam from the top */}
      <motion.div
        className="absolute inset-x-0 top-0 h-[85vh]"
        style={{
          opacity: beamOpacity,
          background:
            'radial-gradient(ellipse 55% 60% at 50% -12%, rgba(196,181,253,0.09) 0%, rgba(139,92,246,0.035) 40%, transparent 72%)',
        }}
      />

      {/* 3. Technical grid */}
      <motion.div
        className="bg-tech-grid absolute inset-0"
        style={reduceMotion ? undefined : { backgroundPosition: gridPosition }}
      />

      {/* 4. Starfield + wireframe globe */}
      <CosmosCanvas section={activeSection} interactive={finePointer} reducedMotion={!!reduceMotion} />

      {/* 5. Cursor light */}
      {finePointer && !reduceMotion && !isMobile ? <CursorGlow /> : null}

      {/* 6. Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 120% 90% at 50% 40%, transparent 55%, rgba(8,9,13,0.75) 100%)',
        }}
      />
    </div>
  )
}

/** Film grain sits above everything at very low opacity (static on mobile, see index.css). */
export function GrainOverlay() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[80] overflow-hidden opacity-[0.045]">
      <div className="grain absolute -inset-[10%]" />
    </div>
  )
}
