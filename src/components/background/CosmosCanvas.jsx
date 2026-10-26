import { useEffect, useRef } from 'react'

/*
 * Canvas "cosmos": a twinkling starfield with a slowly turning low-poly
 * wireframe globe (plus an inner core mesh and a tilted orbit ring).
 *
 * - The globe glides to a new position/size for each section (`section` prop).
 * - It turns toward the cursor, rotates with scroll, and edges near the
 *   cursor light up (desktop only).
 * - Everything runs in one requestAnimationFrame loop using refs, so React
 *   never re-renders while it animates. Lines are batched by opacity into a
 *   handful of paths per frame to keep drawing cheap.
 * - Reduced motion: a single still frame, redrawn only on resize/section change.
 */

// ---------------------------------------------------------------------------
// Geometry helpers
// ---------------------------------------------------------------------------

function mulberry32(seed) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const normalize = ([x, y, z]) => {
  const l = Math.hypot(x, y, z)
  return [x / l, y / l, z / l]
}

/** Subdivided icosahedron, then jittered so it reads as an organic low-poly globe. */
function buildGlobe(subdivisions, rand, { radial = 0.06, tangential = 0.08 } = {}) {
  const t = (1 + Math.sqrt(5)) / 2
  let verts = [
    [-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0],
    [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t],
    [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1],
  ].map(normalize)
  let faces = [
    [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
    [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
    [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
    [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1],
  ]

  for (let s = 0; s < subdivisions; s += 1) {
    const cache = new Map()
    const midpoint = (a, b) => {
      const key = a < b ? `${a}_${b}` : `${b}_${a}`
      if (cache.has(key)) return cache.get(key)
      const [ax, ay, az] = verts[a]
      const [bx, by, bz] = verts[b]
      verts.push(normalize([(ax + bx) / 2, (ay + by) / 2, (az + bz) / 2]))
      cache.set(key, verts.length - 1)
      return verts.length - 1
    }
    const next = []
    for (const [a, b, c] of faces) {
      const ab = midpoint(a, b)
      const bc = midpoint(b, c)
      const ca = midpoint(c, a)
      next.push([a, ab, ca], [b, bc, ab], [c, ca, bc], [ab, bc, ca])
    }
    faces = next
  }

  // Jitter: push along the surface a little, and in/out a little.
  verts = verts.map(([x, y, z]) => {
    const j = normalize([
      x + (rand() - 0.5) * tangential * 2,
      y + (rand() - 0.5) * tangential * 2,
      z + (rand() - 0.5) * tangential * 2,
    ])
    const r = 1 + (rand() - 0.5) * radial * 2
    return [j[0] * r, j[1] * r, j[2] * r]
  })

  const edgeSet = new Set()
  const edges = []
  for (const [a, b, c] of faces) {
    for (const [p, q] of [[a, b], [b, c], [c, a]]) {
      const key = p < q ? `${p}_${q}` : `${q}_${p}`
      if (!edgeSet.has(key)) {
        edgeSet.add(key)
        edges.push(p, q)
      }
    }
  }

  return { positions: Float32Array.from(verts.flat()), edges: Uint16Array.from(edges), count: verts.length }
}

// ---------------------------------------------------------------------------
// Where the globe sits for each section (viewport-relative)
// ---------------------------------------------------------------------------

function targetFor(section, w, h, scrollY) {
  const small = w < 768
  const m = Math.min(w, h)
  switch (section) {
    case 'about':
      return small
        ? { cx: w * 0.92, cy: h * 0.28, r: w * 0.42, alpha: 0.45 }
        : { cx: w * 0.86, cy: h * 0.42, r: m * 0.3, alpha: 0.6 }
    case 'work':
      return small
        ? { cx: w * 0.5, cy: h * 0.5, r: w * 0.78, alpha: 0.26 }
        : { cx: w * 0.5, cy: h * 0.52, r: Math.min(w * 0.4, h * 0.62), alpha: 0.3 }
    case 'skills':
      return small
        ? { cx: w * 0.08, cy: h * 0.72, r: w * 0.5, alpha: 0.45 }
        : { cx: w * 0.13, cy: h * 0.6, r: m * 0.34, alpha: 0.6 }
    case 'contact':
      return small
        ? { cx: w * 0.5, cy: h * 1.08, r: w * 0.72, alpha: 0.55 }
        : { cx: w * 0.5, cy: h * 1.2, r: Math.min(w * 0.4, h * 0.78), alpha: 0.6 }
    default: {
      // Hero: drifts upward as the hero scrolls away
      const lift = Math.min(scrollY, h) * 0.22
      return small
        ? { cx: w * 0.5, cy: h * 0.36 - lift, r: w * 0.48, alpha: 0.62 }
        : { cx: w * 0.73, cy: h * 0.53 - lift, r: m * 0.37, alpha: 1 }
    }
  }
}

// ---------------------------------------------------------------------------
// Line batching: lines are grouped into opacity buckets → one stroke per bucket
// ---------------------------------------------------------------------------

const BUCKETS = 10

function createBatch(maxAlpha, rgb, width) {
  return { maxAlpha, rgb, width, buckets: Array.from({ length: BUCKETS }, () => []) }
}

function addLine(batch, x1, y1, x2, y2, alpha) {
  if (alpha < 0.006) return
  const i = Math.min(BUCKETS - 1, Math.floor((alpha / batch.maxAlpha) * BUCKETS))
  batch.buckets[i].push(x1, y1, x2, y2)
}

function flushBatch(ctx, batch) {
  ctx.lineWidth = batch.width
  for (let i = 0; i < BUCKETS; i += 1) {
    const lines = batch.buckets[i]
    if (!lines.length) continue
    ctx.strokeStyle = `rgba(${batch.rgb}, ${(((i + 0.6) / BUCKETS) * batch.maxAlpha).toFixed(3)})`
    ctx.beginPath()
    for (let k = 0; k < lines.length; k += 4) {
      ctx.moveTo(lines[k], lines[k + 1])
      ctx.lineTo(lines[k + 2], lines[k + 3])
    }
    ctx.stroke()
    lines.length = 0
  }
}

// ---------------------------------------------------------------------------

const RING_SEGMENTS = 140
const RING_RADIUS = 1.42
const FOCAL = 3.4

export default function CosmosCanvas({ section = 'home', interactive = true, reducedMotion = false }) {
  const canvasRef = useRef(null)
  const sectionRef = useRef(section)
  const redrawRef = useRef(null)

  useEffect(() => {
    sectionRef.current = section
    redrawRef.current?.()
  }, [section])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return undefined

    const rand = mulberry32(2026)
    const outer = buildGlobe(2, rand, { radial: 0.07, tangential: 0.085 })
    const inner = buildGlobe(1, rand, { radial: 0.05, tangential: 0.06 })
    const outerProj = new Float32Array(outer.count * 3)
    const innerProj = new Float32Array(inner.count * 3)
    const ringProj = new Float32Array(RING_SEGMENTS * 3)

    // A few long chords through the globe, for an inner "network" feel
    const chords = []
    for (let i = 0; i < 14; i += 1) {
      chords.push(Math.floor(rand() * outer.count), Math.floor(rand() * outer.count))
    }
    // Vertices that get a small cyan glow
    const hotVertices = []
    for (let i = 0; i < outer.count; i += 13) hotVertices.push(i)

    const back = createBatch(0.2, '150, 132, 246', 0.6)
    const front = createBatch(0.42, '226, 228, 240', 0.7)
    const lit = createBatch(0.6, '196, 240, 255', 0.9)

    const coarse = window.matchMedia('(pointer: coarse)')
    let w = 0
    let h = 0
    let small = false
    let stars = []
    let frameId = 0
    let resizeFrame = 0
    let running = false
    let lastTime = performance.now()
    let spin = 0
    let shooting = null
    let nextShootingAt = performance.now() + 6000

    const pointer = { nx: 0, ny: 0, sx: 0, sy: 0, x: -9999, y: -9999, active: false }
    let state = null // current globe placement (eased toward the section target)

    const makeStars = () => {
      const count = small ? 120 : Math.round(Math.min(340, Math.max(160, (w * h) / 5000)))
      stars = Array.from({ length: count }, () => {
        const bright = Math.random() < 0.06
        return {
          x: Math.random(),
          y: Math.random(),
          depth: 0.15 + Math.random() * 0.85,
          size: bright ? 1.4 + Math.random() * 0.8 : 0.5 + Math.random() * 0.8,
          bright,
          base: bright ? 0.6 + Math.random() * 0.3 : 0.18 + Math.random() * 0.5,
          phase: Math.random() * Math.PI * 2,
          speed: 0.4 + Math.random() * 1.4,
        }
      })
    }

    const resize = () => {
      const prevWidth = w
      w = window.innerWidth
      h = window.innerHeight
      small = w < 768 || coarse.matches
      const dpr = Math.min(window.devicePixelRatio || 1, small ? 1.5 : 2)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      // Mobile browsers fire resize when the URL bar hides; only rebuild on width changes.
      if (w !== prevWidth || !stars.length) makeStars()
    }

    // Project a mesh with rotation (Y then X) into screen space: [x, y, depthT]
    const project = (positions, count, out, rotY, rotX, scale, cx, cy, r) => {
      const cosY = Math.cos(rotY)
      const sinY = Math.sin(rotY)
      const cosX = Math.cos(rotX)
      const sinX = Math.sin(rotX)
      for (let i = 0; i < count; i += 1) {
        const x = positions[i * 3] * scale
        const y = positions[i * 3 + 1] * scale
        const z = positions[i * 3 + 2] * scale
        const x1 = x * cosY + z * sinY
        const z1 = -x * sinY + z * cosY
        const y2 = y * cosX - z1 * sinX
        const z2 = y * sinX + z1 * cosX
        const p = FOCAL / (FOCAL + z2)
        out[i * 3] = cx + x1 * r * p
        out[i * 3 + 1] = cy + y2 * r * p
        out[i * 3 + 2] = Math.min(1, Math.max(0, (z2 / scale + 1) / 2)) // 0 = front, 1 = back
      }
    }

    const meshLines = (mesh, proj, globalAlpha, litEnabled) => {
      const { edges } = mesh
      for (let e = 0; e < edges.length; e += 2) {
        const a = edges[e] * 3
        const b = edges[e + 1] * 3
        const x1 = proj[a]
        const y1 = proj[a + 1]
        const x2 = proj[b]
        const y2 = proj[b + 1]
        const depth = (proj[a + 2] + proj[b + 2]) / 2
        const facing = 1 - depth
        const alpha = (0.03 + 0.39 * facing ** 1.7) * globalAlpha
        if (depth > 0.55) addLine(back, x1, y1, x2, y2, alpha * 0.9)
        else addLine(front, x1, y1, x2, y2, alpha)

        if (litEnabled && depth < 0.6) {
          const mx = (x1 + x2) / 2 - pointer.x
          const my = (y1 + y2) / 2 - pointer.y
          const d2 = mx * mx + my * my
          if (d2 < 180 * 180) {
            const k = 1 - Math.sqrt(d2) / 180
            addLine(lit, x1, y1, x2, y2, k * k * 0.6 * globalAlpha)
          }
        }
      }
    }

    const draw = (time) => {
      const dt = Math.min(48, time - lastTime) / 16.67
      lastTime = time
      const t = time * 0.001
      const scrollY = window.scrollY
      const target = targetFor(sectionRef.current, w, h, scrollY)

      // Ease placement toward the section target (instant with reduced motion)
      if (!state || reducedMotion) {
        state = reducedMotion ? { ...target } : { ...target, r: target.r * 0.82, alpha: 0 }
      } else {
        const k = 1 - (1 - 0.045) ** dt
        state.cx += (target.cx - state.cx) * k
        state.cy += (target.cy - state.cy) * k
        state.r += (target.r - state.r) * k
        state.alpha += (target.alpha - state.alpha) * k * 0.8
      }

      if (!reducedMotion) {
        spin += 0.0011 * dt
        pointer.sx += (pointer.nx - pointer.sx) * 0.05 * dt
        pointer.sy += (pointer.ny - pointer.sy) * 0.05 * dt
      }

      ctx.clearRect(0, 0, w, h)

      // 1. Stars (parallax with scroll + a touch with the cursor)
      ctx.fillStyle = '#ffffff'
      for (const s of stars) {
        let y = (s.y * h - scrollY * s.depth * 0.07) % h
        if (y < 0) y += h
        const x = s.x * w - pointer.sx * s.depth * 14
        const twinkle = reducedMotion ? 1 : 0.55 + 0.45 * Math.sin(t * s.speed + s.phase)
        ctx.globalAlpha = s.base * twinkle
        if (s.bright) {
          ctx.beginPath()
          ctx.arc(x, y, s.size * 0.7, 0, Math.PI * 2)
          ctx.fill()
          ctx.globalAlpha = s.base * twinkle * 0.05
          ctx.beginPath()
          ctx.arc(x, y, s.size * 2.4, 0, Math.PI * 2)
          ctx.fill()
        } else {
          ctx.fillRect(x, y, s.size, s.size)
        }
      }
      ctx.globalAlpha = 1

      // 2. Shooting star (rare, desktop only)
      if (!reducedMotion && !small) {
        if (!shooting && time > nextShootingAt) {
          shooting = {
            x: w * (0.15 + Math.random() * 0.6),
            y: h * (0.05 + Math.random() * 0.25),
            vx: 9 + Math.random() * 4,
            vy: 3.5 + Math.random() * 2,
            life: 0,
          }
        }
        if (shooting) {
          shooting.life += dt
          shooting.x += shooting.vx * dt
          shooting.y += shooting.vy * dt
          const fade = Math.sin(Math.min(1, shooting.life / 70) * Math.PI)
          const tail = ctx.createLinearGradient(shooting.x, shooting.y, shooting.x - shooting.vx * 14, shooting.y - shooting.vy * 14)
          tail.addColorStop(0, `rgba(255,255,255,${(0.55 * fade).toFixed(3)})`)
          tail.addColorStop(1, 'rgba(255,255,255,0)')
          ctx.strokeStyle = tail
          ctx.lineWidth = 1.1
          ctx.beginPath()
          ctx.moveTo(shooting.x, shooting.y)
          ctx.lineTo(shooting.x - shooting.vx * 14, shooting.y - shooting.vy * 14)
          ctx.stroke()
          if (shooting.life > 70) {
            shooting = null
            nextShootingAt = time + 9000 + Math.random() * 9000
          }
        }
      }

      const { cx, cy, r, alpha } = state
      if (alpha < 0.01) return

      // 3. Atmosphere: soft body glow + faint outer halo circle
      const glow = ctx.createRadialGradient(cx - r * 0.25, cy - r * 0.3, r * 0.1, cx, cy, r * 1.15)
      glow.addColorStop(0, `rgba(139, 92, 246, ${(0.1 * alpha).toFixed(3)})`)
      glow.addColorStop(0.6, `rgba(40, 36, 70, ${(0.08 * alpha).toFixed(3)})`)
      glow.addColorStop(1, 'rgba(8, 9, 13, 0)')
      ctx.fillStyle = glow
      ctx.beginPath()
      ctx.arc(cx, cy, r * 1.15, 0, Math.PI * 2)
      ctx.fill()

      ctx.strokeStyle = `rgba(255, 255, 255, ${(0.05 * alpha).toFixed(3)})`
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.arc(cx, cy, r * 1.2, 0, Math.PI * 2)
      ctx.stroke()

      // 4. Meshes
      const rotY = spin + pointer.sx * 0.38 + scrollY * 0.0007
      const rotX = 0.3 + pointer.sy * 0.24 + (reducedMotion ? 0 : Math.sin(t * 0.12) * 0.05)
      project(outer.positions, outer.count, outerProj, rotY, rotX, 1, cx, cy, r)
      project(inner.positions, inner.count, innerProj, -rotY * 1.6 + 0.8, rotX + 0.6, 0.56, cx, cy, r)

      const litEnabled = interactive && pointer.active && !small && !reducedMotion
      meshLines(inner, innerProj, alpha * 0.5, false)
      meshLines(outer, outerProj, alpha, litEnabled)

      for (let c = 0; c < chords.length; c += 2) {
        const a = chords[c] * 3
        const b = chords[c + 1] * 3
        addLine(back, outerProj[a], outerProj[a + 1], outerProj[b], outerProj[b + 1], 0.05 * alpha)
      }

      // 5. Tilted orbit ring
      // Small tilt → a thin ellipse seen almost edge-on, crossing in front of the globe
      const ringTilt = 0.3 + pointer.sy * 0.08
      const ringRot = -0.22 + pointer.sx * 0.1
      const cosT = Math.cos(ringTilt)
      const sinT = Math.sin(ringTilt)
      const cosR = Math.cos(ringRot)
      const sinR = Math.sin(ringRot)
      for (let i = 0; i < RING_SEGMENTS; i += 1) {
        const a = (i / RING_SEGMENTS) * Math.PI * 2
        const x = Math.cos(a) * RING_RADIUS
        const z = Math.sin(a) * RING_RADIUS
        const y1 = -z * sinT
        const z1 = z * cosT
        const x2 = x * cosR - y1 * sinR
        const y2 = x * sinR + y1 * cosR
        const p = FOCAL / (FOCAL + z1)
        ringProj[i * 3] = cx + x2 * r * p
        ringProj[i * 3 + 1] = cy + y2 * r * p
        ringProj[i * 3 + 2] = (z1 / RING_RADIUS + 1) / 2
      }
      for (let i = 0; i < RING_SEGMENTS; i += 1) {
        const a = i * 3
        const b = ((i + 1) % RING_SEGMENTS) * 3
        const depth = (ringProj[a + 2] + ringProj[b + 2]) / 2
        const ringAlpha = (0.04 + 0.22 * (1 - depth) ** 1.4) * alpha
        // The back half of the ring is hidden where the globe covers it
        const behindGlobe =
          depth > 0.5 && Math.hypot(ringProj[a] - cx, ringProj[a + 1] - cy) < r * 0.98
        addLine(depth > 0.5 ? back : front, ringProj[a], ringProj[a + 1], ringProj[b], ringProj[b + 1], behindGlobe ? ringAlpha * 0.25 : ringAlpha)
      }

      flushBatch(ctx, back)
      flushBatch(ctx, front)
      flushBatch(ctx, lit)

      // 6. Vertex sparkle (front side only) + a few cyan nodes
      ctx.fillStyle = '#E8EAF5'
      for (let i = 0; i < outer.count; i += 1) {
        const depth = outerProj[i * 3 + 2]
        if (depth > 0.42) continue
        ctx.globalAlpha = (0.55 - depth) * alpha
        ctx.fillRect(outerProj[i * 3] - 0.8, outerProj[i * 3 + 1] - 0.8, 1.6, 1.6)
      }
      for (const i of hotVertices) {
        const depth = outerProj[i * 3 + 2]
        if (depth > 0.5) continue
        const x = outerProj[i * 3]
        const y = outerProj[i * 3 + 1]
        const pulse = reducedMotion ? 1 : 0.7 + 0.3 * Math.sin(t * 1.6 + i)
        ctx.fillStyle = '#67E8F9'
        ctx.globalAlpha = 0.12 * alpha * pulse * (1 - depth)
        ctx.beginPath()
        ctx.arc(x, y, 6, 0, Math.PI * 2)
        ctx.fill()
        ctx.globalAlpha = 0.85 * alpha * pulse * (1 - depth)
        ctx.beginPath()
        ctx.arc(x, y, 1.6, 0, Math.PI * 2)
        ctx.fill()
      }

      // 7. A node travelling along the ring
      const nodeIndex = Math.floor(((reducedMotion ? 0.15 : t * 0.035) % 1) * RING_SEGMENTS)
      const nx = ringProj[nodeIndex * 3]
      const ny = ringProj[nodeIndex * 3 + 1]
      const nodeFront = 1 - ringProj[nodeIndex * 3 + 2]
      ctx.fillStyle = '#67E8F9'
      ctx.globalAlpha = (0.15 + 0.2 * nodeFront) * alpha
      ctx.beginPath()
      ctx.arc(nx, ny, 9, 0, Math.PI * 2)
      ctx.fill()
      ctx.globalAlpha = (0.4 + 0.6 * nodeFront) * alpha
      ctx.beginPath()
      ctx.arc(nx, ny, 2.2, 0, Math.PI * 2)
      ctx.fill()
      ctx.globalAlpha = 1
    }

    const loop = (time) => {
      draw(time)
      frameId = requestAnimationFrame(loop)
    }

    const start = () => {
      if (running || reducedMotion) return
      running = true
      lastTime = performance.now()
      frameId = requestAnimationFrame(loop)
    }

    const stop = () => {
      running = false
      cancelAnimationFrame(frameId)
    }

    const redrawStill = () => {
      if (reducedMotion) draw(performance.now())
    }
    redrawRef.current = redrawStill

    const onResize = () => {
      cancelAnimationFrame(resizeFrame)
      resizeFrame = requestAnimationFrame(() => {
        resize()
        redrawStill()
      })
    }

    const onPointerMove = (event) => {
      if (event.pointerType !== 'mouse') return
      pointer.x = event.clientX
      pointer.y = event.clientY
      pointer.nx = (event.clientX / w) * 2 - 1
      pointer.ny = (event.clientY / h) * 2 - 1
      pointer.active = true
    }

    const onPointerLeave = () => {
      pointer.active = false
      pointer.nx = 0
      pointer.ny = 0
    }

    const onVisibility = () => {
      if (document.hidden) stop()
      else start()
    }

    resize()
    if (reducedMotion) draw(performance.now())
    else start()

    window.addEventListener('resize', onResize)
    document.addEventListener('visibilitychange', onVisibility)
    if (interactive && !reducedMotion) {
      window.addEventListener('pointermove', onPointerMove, { passive: true })
      document.documentElement.addEventListener('pointerleave', onPointerLeave)
    }

    return () => {
      stop()
      redrawRef.current = null
      cancelAnimationFrame(resizeFrame)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('pointermove', onPointerMove)
      document.documentElement.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [interactive, reducedMotion])

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
}
