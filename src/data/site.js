// Where the site is published. Dependency-free so Node-side code (vite.config.js,
// scripts/) and the browser bundle can both import it.
//
// To move the site (for example to a custom domain), change SITE_URL only:
//   GitHub user site:    'https://<user>.github.io'          (repo named <user>.github.io)
//   GitHub project page: 'https://<user>.github.io/<repo>'
//   Custom domain:       'https://example.com'   (and add public/CNAME)
export const SITE_URL = 'https://chiragjethvaofficial.github.io'

// Path the site is served from, always with a trailing slash: '/' or '/<repo>/'.
export const BASE_PATH = new URL(`${SITE_URL}/`).pathname.replace(/\/+$/, '/')

/** Prefixes a root-relative path ('/images/x.webp') with the base path. */
export const withBase = (path) => (path?.startsWith('/') && !path.startsWith('//') ? BASE_PATH + path.slice(1) : path)
