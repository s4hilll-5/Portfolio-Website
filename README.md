# Sahil Vishwakarma — Portfolio

Personal portfolio for **Sahil Santosh Vishwakarma**, Full Stack Developer (Mumbai, India).
Built with React, Vite, Tailwind CSS v4 and Motion for React.

## Features

- **Cosmic animated background**: a canvas starfield with a slowly turning low-poly wireframe globe, an inner core mesh and an orbit ring. The globe tilts toward the cursor, rotates as you scroll, glides to a new spot in every section and sets as a "planet" behind the contact section. Edges light up near the cursor. It sits on top of soft gradient orbs, a faint technical grid, a cursor glow and film grain.
- **Cinematic intro**: a short loading curtain with a 000→100 counter. It never blocks clicks.
- **Premium details**: inertial smooth scrolling (Lenis), a custom cursor that becomes a "View" disc over project previews, decoding-text labels and nav links, magnetic buttons, word-by-word headline reveals, a serif accent type and animated gradient highlights.
- **Sections**: Hero, About (focus areas, education timeline, certifications), Selected work (3 projects with illustrated UI previews and a details modal), Skills (bento grid + marquee), Contact (copy-email, form) and Footer.
- **Accessible**: semantic headings, skip link, visible focus rings, keyboard-trapped dialogs that close on Escape, and `prefers-reduced-motion` support. With reduced motion there's no smooth scroll, no custom cursor and a still background.
- **Responsive**: tuned for phone, tablet, laptop and desktop, with no horizontal scroll. Phones get a lighter background (fewer stars, no cursor effects, lower pixel ratio).
- **SEO**: title, description, Open Graph/Twitter tags, JSON-LD `Person` data, favicons and `robots.txt`.

## Getting started

Requires **Node.js 20.19+ or 22.12+** (needed by Vite 8).

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## Production build

```bash
npm run build     # outputs to dist/
npm run preview   # serves dist/ locally to check the build
```

## Deploying

### Vercel
1. Push this folder to a GitHub repository.
2. On vercel.com choose **Add New → Project** and import the repository.
3. Vercel detects Vite automatically. The build command is `npm run build` and the output directory is `dist`.
4. Optional: under **Settings → Environment Variables**, add `VITE_SITE_URL` (for example `https://your-project.vercel.app`) so social previews use absolute URLs. Then redeploy.

### Netlify
1. Push to GitHub, then on netlify.com choose **Add new site → Import an existing project**.
2. Set the build command to `npm run build` and the publish directory to `dist`.
3. Add `VITE_SITE_URL` under **Site configuration → Environment variables** if you want absolute Open Graph URLs.

This is a single page with anchor navigation, so no redirect or rewrite rules are needed.

## Environment variables

Copy `.env.example` to `.env.local` and fill in what you need:

| Variable | Purpose |
| --- | --- |
| `VITE_SITE_URL` | Deployed URL. Adds the canonical link and absolute `og:url` / `og:image`. |
| `VITE_CONTACT_ENDPOINT` | Optional form endpoint that accepts JSON POSTs (for example a Formspree form URL). When it's empty, the contact form opens the visitor's email app with the message pre-filled. It never pretends a message was sent. |

Anything prefixed `VITE_` ends up in the public JavaScript bundle. Never put secret keys there.

## Editing content

All content lives in `src/data/`, separate from the components:

- `profile.js` — name, contact details, nav, focus areas, education, certifications
- `projects.js` — project text, tech, features, stats and **links**
- `skills.js` — skill groups

## Still needed from you

- **Project links**: in `src/data/projects.js`, set `links.github` and `links.live` for Stay-Smart, StudentHub and Bae Laban. Until then the site shows them as "not available yet" instead of linking nowhere.
- **Project screenshots (optional)**: the previews are original illustrated concepts, labelled "Concept preview", not real screenshots. To use real screenshots, put images in `public/projects/` and swap the mockup inside `ProjectCard.jsx` / `ProjectModal.jsx` for an `<img loading="lazy">`.
- **Site URL**: set `VITE_SITE_URL` after your first deploy.
- **Contact form service (optional)**: set `VITE_CONTACT_ENDPOINT` if you want messages delivered without opening an email app.

## Project structure

```
sahil-portfolio/
├── index.html                  # SEO, Open Graph, JSON-LD, favicons
├── vite.config.js              # React + Tailwind plugins, site-URL injection
├── package.json
├── .env.example
├── public/
│   ├── favicon.svg, favicon-32.png, apple-touch-icon.png
│   ├── og-image.jpg            # 1200×630 social preview
│   └── robots.txt
└── src/
    ├── main.jsx                # fonts, global CSS, root render
    ├── App.jsx                 # page composition, smooth scroll, cursor
    ├── index.css               # design tokens, utilities, keyframes
    ├── data/                   # profile.js, projects.js, skills.js
    ├── lib/smoothScroll.js     # Lenis setup + helpers
    ├── hooks/                  # useActiveSection, useMediaQuery, useDialogBehavior
    └── components/
        ├── background/         # AnimatedBackground, CosmosCanvas, CursorGlow
        ├── layout/             # Navbar, Footer, PageReveal, ScrollProgress, SectionIndicator
        ├── sections/           # Hero, About, EducationTimeline, Projects, ProjectCard,
        │                       # ProjectModal, ProjectLinks, Skills, Contact, ContactForm
        ├── mockups/            # Illustrated project previews (StaySmart, StudentHub, BaeLaban…)
        └── ui/                 # Reveal, WordReveal, ScrambleText, MagneticButton,
                                # CustomCursor, ScaleBox, SectionHeading, Icon, BrandIcons
```

## Tech

React 19 · Vite 8 · Tailwind CSS 4 · Motion for React · Lenis · Lucide React · Geist / Geist Mono / Instrument Serif (self-hosted via Fontsource)
