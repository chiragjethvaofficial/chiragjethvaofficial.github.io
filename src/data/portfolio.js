// ─────────────────────────────────────────────────────────────
// Profile, skills and career data (everything that isn't Markdown).
// Projects, articles and code snippets live in /content.
// Files in /public are referenced root-relative ('/images/x.webp')
// and wrapped in withBase() so they work under any base path.
// ─────────────────────────────────────────────────────────────

import { withBase } from './site.js'
import { posts, projects } from '../content'

export { SITE_URL } from './site.js'

const liveCount = projects.filter((p) => p.status === 'live').length

export const profile = {
  name: 'Chirag Jethva',
  role: 'Android Developer',
  roles: ['Android Developer', 'Kotlin & Java', 'Jetpack Compose & MVVM', 'Product, client & government apps'],
  tagline:
    'I build and ship Android apps people use every day — government transport apps, an AI video generator, a fashion marketplace, dialers and everyday tools.',
  location: 'Surat, Gujarat, India',
  email: 'chiragjethvaofficial@gmail.com',
  resumeUrl: withBase(''), // e.g. withBase('/resume.pdf') after adding public/resume.pdf
  availableForWork: true,
  avatar: withBase('/images/avatar.webp'), // '' shows initials instead
  shortBio:
    `Android developer since 2021, working in Kotlin and Java with Jetpack Compose and MVVM. I have built apps for government services, clients and products — ${liveCount} of them live on Google Play.`,
  bio: [
    'I build native Android apps end to end in Kotlin and Java: MVVM architecture, UI with Jetpack Compose and XML, REST API integration, Firebase, Google Play Billing, Room/SQLite, and release and maintenance on Google Play.',
    'My work spans three kinds of projects. Government apps for public transport: live bus tracking for Ahmedabad’s AMTS, and fare collection, ticketing machines (ETM) and Pay & Park for Rajkot Rajpath. Client projects such as the Vidix AI photo and video generator, which I built on my own. And products like the ZenZi clothing marketplace, built end to end with user and admin modules.',
    'I care about clean, maintainable code, stable releases and turning business requirements into practical Android solutions. I have also led a small team as a senior developer, and I’m open to Android roles, freelance projects and client collaborations.',
  ],
  languages: ['English', 'Gujarati', 'Hindi'],
}

// Shown wherever there is no avatar photo ('CJ').
profile.initials = profile.name.split(/\s+/).map((w) => w[0]).join('').slice(0, 2).toUpperCase()

export const socials = [
  { name: 'GitHub', url: 'https://github.com/chiragjethvaofficial', icon: 'github' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/chiragjethva0911', icon: 'linkedin' },
  // { name: 'X', url: 'https://x.com/your-handle', icon: 'x' },
  // { name: 'Instagram', url: 'https://www.instagram.com/your-handle/', icon: 'instagram' },
]

export const skills = [
  { group: 'Languages', items: ['Kotlin', 'Java', 'Dart', 'SQL'] },
  { group: 'Android UI', items: ['Jetpack Compose', 'XML Views', 'Material 3', 'Navigation', 'Figma'] },
  { group: 'Architecture', items: ['MVVM', 'Clean Architecture', 'Hilt', 'Coroutines', 'Flow', 'RxJava'] },
  { group: 'APIs & Data', items: ['REST APIs', 'Retrofit', 'JSON', 'Room', 'SQLite', 'WorkManager'] },
  { group: 'Platform & Location', items: ['Android SDK', 'InCallService', 'Exact Alarms', 'Biometric', 'Maps', 'GPS Tracking'] },
  { group: 'Firebase & Monetization', items: ['Firebase', 'Analytics', 'Crashlytics', 'AdMob', 'Play Billing', 'In-App Purchases'] },
  { group: 'Domains', items: ['Government Projects', 'Ticketing & POS', 'Marketplace', 'Image Processing'] },
  { group: 'Tooling & Release', items: ['Android Studio', 'Git', 'Android Testing', 'Debugging', 'Play Console'] },
]

// Career journey on /about. Dates are 'YYYY-MM' (or 'YYYY' when only the
// year is known); `end: null` means current. Durations are derived from them.
export const experience = [
  {
    role: 'Android Developer',
    company: 'Origin Infotech',
    start: '2025-04',
    end: null,
    description:
      'Developing and maintaining Android apps in Kotlin and Java: new features from business requirements, API integration, UI implementation, debugging and performance improvements, delivered with the team.',
    tags: ['Kotlin', 'Java', 'Jetpack Compose', 'Firebase'],
  },
  {
    role: 'Android Developer',
    company: 'Cursor Soft Pvt. Ltd.',
    start: '2024-05',
    end: '2025-03',
    description:
      'Government and public-transport apps: live bus tracking in My AMTS (Ahmedabad Municipal Transport Service), the AFCS fare collection app for Rajkot Rajpath Ltd., Pay & Park ticketing and parking, and ETM (electronic ticketing machine) ticket creation and transactions. Worked directly with stakeholders on requirements.',
    tags: ['Kotlin', 'Java', 'Government Projects', 'Maps', 'Ticketing & POS'],
  },
  {
    role: 'Senior Android Developer & Team Lead',
    company: 'SkyWalk Infotech',
    start: '2023-01',
    end: '2024-05',
    description:
      'Led and mentored the team while planning, building and delivering client apps in Java and Kotlin. Turned client requirements into custom features, adopted Jetpack Compose (and wrote a complete Compose tutorial for the team), and used analytics and debugging to improve reliability.',
    tags: ['Kotlin', 'Java', 'Jetpack Compose', 'Team Lead'],
  },
  {
    role: 'Junior Android Developer',
    company: 'SkyWalk Infotech',
    start: '2022-02',
    end: '2023-01',
    description: 'Android app development at SkyWalk Infotech, leading to a promotion to Senior Android Developer in January 2023.',
    tags: ['Java', 'Kotlin'],
  },
  {
    role: 'Android Developer',
    company: 'Lathiya Infotech',
    start: '2021-02',
    end: '2022-02',
    description:
      'Built a strong foundation in Java and the Android SDK: maintaining apps, troubleshooting crashes, reskinning and customising app UIs, and working inside existing codebases.',
    tags: ['Java', 'Android SDK'],
  },
]

export const education = [
  {
    degree: 'Higher Secondary Certificate (12th)',
    short: 'HSC',
    school: 'Khodiyar Vidhyalaya',
    start: '2018',
    end: '2019',
  },
]

export const statuses = {
  live: { label: 'Live on Play', short: 'Live' },
  completed: { label: 'Completed', short: 'Completed' },
  'in-progress': { label: 'In progress', short: 'In progress' },
}

// Projects and blog posts live in Markdown under /content (see src/content/index.js).
export { projects, posts, snippets, types, postTags, getProject, getPost } from '../content'

export { liveCount }

export const stats = [
  { label: 'Apps live on Google Play', value: projects.filter((p) => p.status === 'live').length },
  { label: 'Android projects built', value: projects.length },
  { label: 'Technologies used', value: new Set(projects.flatMap((p) => p.tags)).size },
]

export const nav = [
  { label: 'Home', to: '/', icon: 'home' },
  { label: 'About', to: '/about', icon: 'user' },
  { label: 'Projects', to: '/projects', icon: 'grid' },
  // Blog appears once there is at least one post (drafts count in local dev).
  ...(posts.length ? [{ label: 'Blog', to: '/blog', icon: 'pen' }] : []),
  { label: 'Contact', to: '/contact', icon: 'mail' },
]
