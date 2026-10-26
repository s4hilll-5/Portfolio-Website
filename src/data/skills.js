// Skills are listed as technologies Sahil works with — no ratings or percentages.

export const skillGroups = [
  {
    id: 'frontend',
    title: 'Frontend',
    caption: 'Interfaces and layout',
    icon: 'LayoutTemplate',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Bootstrap', 'Tailwind CSS'],
  },
  {
    id: 'backend',
    title: 'Backend & Data',
    caption: 'Servers, auth and storage',
    icon: 'Server',
    skills: ['Node.js', 'Firebase'],
  },
  {
    id: 'languages',
    title: 'Programming Languages',
    caption: 'Languages I write in',
    icon: 'Braces',
    skills: ['JavaScript', 'Java', 'Python', 'C++'],
  },
  {
    id: 'tools',
    title: 'Tools & Concepts',
    caption: 'How the work gets built',
    icon: 'Wrench',
    skills: ['Git', 'GitHub', 'REST APIs', 'CRUD operations', 'Responsive web development', 'Mapbox'],
  },
]

// Unique list for the scrolling marquee.
export const allSkills = [...new Set(skillGroups.flatMap((group) => group.skills))]
