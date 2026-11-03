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
  roles: ['Android Developer', 'Kotlin & Jetpack Compose', 'Shipping apps to Google Play', 'Clean Architecture fan'],
  tagline:
    'I build and ship Android apps people use every day — dialers, contacts, a photo vault, an AI video generator, a fashion marketplace and everyday tools.',
  location: 'India',
  email: 'chiragjethvaofficial@gmail.com',
  resumeUrl: withBase(''), // e.g. withBase('/resume.pdf') after adding public/resume.pdf
  availableForWork: true,
  avatar: withBase(''), // e.g. withBase('/images/avatar.webp') after adding the photo; '' shows initials
  shortBio:
    `Android developer working in Kotlin and Jetpack Compose. I have shipped ${liveCount} apps to Google Play — from default dialers that take over core phone roles, to an AI video generator, a fashion marketplace, a photo vault and everyday tools.`,
  bio: [
    'I build native Android apps end to end: architecture, UI, background work, monetization and release. Most of my work lives on Google Play, where apps have to be fast, stable and pass strict policy review.',
    'A lot of it sits close to the platform — replacement phone dialers built on InCallService and CallScreeningService, default SMS/MMS messengers, exact-alarm scheduling, home-screen widgets, and media apps that handle Android 14 partial photo access.',
    'Right now I am building a full PDF reader and editor: pdf.js running inside a WebView bridged to Kotlin, with annotation, signatures, in-place text editing, form filling, password lock and a camera document scanner, split across ~15 Clean Architecture modules.',
  ],
}

// Shown wherever there is no avatar photo ('CJ').
profile.initials = profile.name.split(/\s+/).map((w) => w[0]).join('').slice(0, 2).toUpperCase()

export const socials = [
  { name: 'GitHub', url: 'https://github.com/chiragjethvaofficial', icon: 'github' },
  // { name: 'LinkedIn', url: 'https://www.linkedin.com/in/your-username', icon: 'linkedin' },
  // { name: 'X', url: 'https://x.com/your-handle', icon: 'x' },
  // { name: 'Instagram', url: 'https://www.instagram.com/your-handle/', icon: 'instagram' },
]

export const skills = [
  { group: 'Languages', items: ['Kotlin', 'Java', 'JavaScript', 'SQL'] },
  { group: 'Android UI', items: ['Jetpack Compose', 'Material 3', 'XML Views', 'ViewBinding', 'Navigation', 'Lottie'] },
  { group: 'Architecture & DI', items: ['Clean Architecture', 'MVVM', 'Multi-module', 'Hilt', 'Coroutines', 'Flow', 'RxJava'] },
  { group: 'Data & Background', items: ['Room', 'DataStore', 'Realm', 'WorkManager', 'Retrofit', 'Foreground Services'] },
  { group: 'Media & Camera', items: ['Media3 ExoPlayer', 'Coil', 'Glide', 'CameraX', 'OpenCV', 'PDFBox', 'pdf.js'] },
  { group: 'Platform & Telephony', items: ['InCallService', 'CallScreeningService', 'Default SMS role', 'App Widgets', 'Exact Alarms', 'Biometric'] },
  { group: 'Firebase & Monetization', items: ['Firebase', 'Remote Config', 'Crashlytics', 'AdMob', 'UMP Consent', 'Play Billing'] },
  { group: 'Tooling & Release', items: ['Gradle KTS', 'Baseline Profiles', 'Macrobenchmark', 'In-app Updates', 'Git'] },
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
      'Building and maintaining a portfolio of consumer Android apps on Google Play: dialers, SMS messengers, galleries, calendar, alarm clock and utilities.',
    tags: ['Kotlin', 'Jetpack Compose', 'Firebase'],
  },
  {
    role: 'Android Developer',
    company: 'Wonder Software',
    start: '2021-01',
    end: '2025-03',
    description: 'Built and maintained native Android apps in Kotlin and Java.',
    tags: ['Kotlin', 'Java'],
  },
]

export const education = [
  {
    degree: 'Master of Computer Applications',
    short: 'MCA',
    school: '', // TODO: university / college name
    start: '2019',
    end: '2021',
  },
  {
    degree: 'Bachelor of Computer Applications',
    short: 'BCA',
    school: '', // TODO: university / college name
    start: '2016',
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
