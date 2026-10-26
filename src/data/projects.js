// Project content lives here so it can be edited without touching components.
//
// links.github / links.live: paste the real URLs as strings when they're ready.
// Leave them as null and the site shows them as "not available yet" instead of
// a broken link.
//
// mockup: which illustrated preview to render (see components/mockups).
// The previews are original concept illustrations, not screenshots.

export const projects = [
  {
    id: 'stay-smart',
    index: '01',
    title: 'Stay-Smart',
    category: 'Hotel Booking Platform',
    summary:
      'A responsive hotel booking platform featuring over 19,000 stay listings across 36 Indian states and union territories.',
    detail:
      'Stay-Smart covers the full booking journey: guests search and filter stays, check property details and room availability, sign in, and manage or cancel their bookings. Behind it, an admin dashboard brings together booking insights, revenue analytics, property management and CSV export.',
    stats: [
      { value: '19,000+', label: 'stay listings' },
      { value: '36', label: 'states & UTs' },
    ],
    tech: ['React.js', 'TypeScript', 'Tailwind CSS', 'Firebase'],
    features: [
      'Hotel search and filtering',
      'Property details and room availability',
      'Authentication with Firebase Authentication',
      'Booking management and cancellation',
      'Cloud Firestore and Firebase Storage',
      'Admin dashboard with booking insights and revenue analytics',
      'Property management and CSV export',
    ],
    highlights: ['Search & filters', 'Bookings', 'Admin analytics', 'CSV export'],
    links: { github: null, live: null },
    mockup: 'stay-smart',
    theme: {
      glow: 'rgba(251, 146, 60, 0.20)',
      accent: '#FDBA74',
      accentSoft: 'rgba(253, 186, 116, 0.12)',
    },
  },
  {
    id: 'studenthub',
    index: '02',
    title: 'StudentHub',
    category: 'Student Productivity Platform',
    summary:
      'A full-stack student productivity platform for managing academic activities and monitoring progress.',
    detail:
      'StudentHub brings assignments, attendance, timetables, study plans and exams into one dashboard, with analytics to track academic progress. The React front end talks to a Spring Boot REST API secured with Spring Security and JWT, with role-based access and data stored in MySQL — a project that spans the whole stack.',
    stats: [
      { value: 'Full stack', label: 'React ⇄ Spring Boot' },
      { value: 'JWT', label: 'role-based access' },
    ],
    tech: ['React', 'Tailwind CSS', 'Java', 'Spring Boot', 'MySQL', 'Spring Security', 'JWT'],
    features: [
      'Interactive dashboard',
      'Assignment management',
      'Attendance tracking',
      'Timetable and study planning',
      'Exam management',
      'Academic progress analytics',
      'Secure authentication and role-based access',
      'REST APIs and MySQL database management',
    ],
    highlights: ['Dashboard', 'Attendance', 'Progress analytics', 'Role-based auth'],
    links: { github: null, live: null },
    mockup: 'studenthub',
    theme: {
      glow: 'rgba(103, 232, 249, 0.18)',
      accent: '#67E8F9',
      accentSoft: 'rgba(103, 232, 249, 0.12)',
    },
  },
  {
    id: 'bae-laban',
    index: '03',
    title: 'Bae Laban',
    category: 'Premium Dessert Website',
    summary:
      'A responsive dessert website featuring interactive product discovery and pickup ordering.',
    detail:
      'Bae Laban pairs an animated landing page with a menu customers actually enjoy browsing: filterable products, interactive dessert cards, a cart and pickup ordering with live order tracking. Customer accounts and admin dashboards run on Firebase Authentication and Firestore, with GSAP driving the motion.',
    stats: [
      { value: 'Pickup', label: 'ordering flow' },
      { value: 'Live', label: 'order tracking' },
    ],
    tech: ['React', 'Tailwind CSS', 'GSAP', 'Firebase'],
    features: [
      'Menu browsing and product filtering',
      'Cart management',
      'Pickup ordering',
      'Animated landing page',
      'Interactive dessert cards',
      'Live order tracking',
      'Customer accounts and admin dashboards',
      'Firebase Authentication and Firestore',
    ],
    highlights: ['Animated landing', 'Cart & pickup', 'Order tracking', 'Admin dashboard'],
    links: { github: null, live: null },
    mockup: 'bae-laban',
    theme: {
      glow: 'rgba(198, 139, 89, 0.22)',
      accent: '#E8C39E',
      accentSoft: 'rgba(232, 195, 158, 0.12)',
    },
  },
]
