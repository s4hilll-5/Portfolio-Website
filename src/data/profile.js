// Personal details used across the site. Update here, not in components.

export const profile = {
  fullName: 'Sahil Santosh Vishwakarma',
  name: 'Sahil Vishwakarma',
  firstName: 'Sahil',
  wordmark: 'SAHIL.DEV',
  role: 'Full Stack Developer',
  roles: ['Full Stack Developer', 'React.js Developer'],
  location: 'Mumbai, India',
  available: true,
  email: 'sahilvishwakarma0293@gmail.com',
  phone: '+91 80815 13226',
  phoneHref: 'tel:+918081513226',
  linkedin: 'https://www.linkedin.com/in/sahil-vishwakarma-8a0067428/',
  linkedinLabel: 'in/sahil-vishwakarma',
  github: 'https://github.com/s4hilll-5',
  githubLabel: 'github.com/s4hilll-5',
}

// Section ids double as anchor targets and navigation items.
export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

export const sectionIds = navLinks.map((link) => link.id)

export const heroStack = ['React', 'JavaScript', 'TypeScript', 'Java', 'Spring Boot', 'Firebase']

export const focusAreas = [
  {
    title: 'Responsive frontend development',
    text: 'Layouts that hold together from a small phone to a wide desktop, built with Tailwind CSS, Bootstrap and plain CSS.',
    icon: 'MonitorSmartphone',
  },
  {
    title: 'Interactive React applications',
    text: 'Component-driven interfaces with clear state, reusable pieces and motion that makes an app feel responsive.',
    icon: 'Atom',
  },
  {
    title: 'Backend and database integration',
    text: 'Connecting interfaces to real data through Firebase, Node.js and Spring Boot REST APIs backed by Firestore and MySQL.',
    icon: 'Database',
  },
  {
    title: 'Authentication and CRUD functionality',
    text: 'Sign-in flows, protected and role-based access, and the create, read, update and delete logic behind every screen.',
    icon: 'ShieldCheck',
  },
  {
    title: 'Continuous learning and problem-solving',
    text: 'Breaking unfamiliar problems into small steps, and picking up the tools a project needs to get it finished.',
    icon: 'Lightbulb',
  },
]

export const education = [
  {
    period: '2023 — 2026',
    title: 'Bachelor of Science in Information Technology',
    place: 'University of Mumbai',
  },
  {
    period: '2020 — 2022',
    title: 'Higher Secondary Certificate',
    place: 'Viva College of Science and Commerce',
  },
]

export const certifications = [
  { title: 'Full Stack Developer Course', issuer: 'IT Vedant', year: '2026' },
  { title: 'MERN Stack', issuer: 'Udemy', year: '2026' },
]
