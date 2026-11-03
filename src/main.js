import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes, scrollBehavior } from './router'
import reveal from './directives/reveal'
import './style.css'

// Every route is pre-rendered to static HTML at build time (see ssgOptions in
// vite.config.js) so search engines get real content and a 200 status.
// `base` keeps routing correct when the site is served from a sub-path (see src/data/site.js).
export const createApp = ViteSSG(App, { routes, scrollBehavior, base: import.meta.env.BASE_URL }, ({ app, isClient }) => {
  app.directive('reveal', reveal)

  // Offline support / installable app (vite-plugin-pwa). Production browser only.
  if (isClient && import.meta.env.PROD) {
    import('virtual:pwa-register').then(({ registerSW }) => registerSW({ immediate: true }))
  }
})
