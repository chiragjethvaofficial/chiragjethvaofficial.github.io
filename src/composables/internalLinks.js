import { useEventListener } from '@vueuse/core'
import { useRouter } from 'vue-router'
import { BASE_PATH } from '../data/site.js'

/**
 * Markdown renders plain <a href="/base/projects/x"> links (the base path is added
 * at build time in vite.config.js). This makes clicks on internal links inside
 * `target` use the SPA router instead of a full page reload.
 */
export function useInternalLinks(target) {
  const router = useRouter()
  useEventListener(target, 'click', (e) => {
    const a = e.target.closest?.('a[href]')
    if (!a || a.target === '_blank' || e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return
    const href = a.getAttribute('href')
    if (!href?.startsWith(BASE_PATH) || href.startsWith('//')) return
    e.preventDefault()
    router.push('/' + href.slice(BASE_PATH.length))
  })
}
