import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

function withTrailingSlash(path: string) {
  return path.endsWith('/') ? path : `${path}/`
}

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

  if (!siteUrl) {
    return []
  }

  const base = siteUrl.replace(/\/$/, '')

  const urls = [
    '/',
    '/kalkulator-chloru-do-basenu',
    '/kalkulator-ph-wody',
    '/kalkulator-objetosci-basenu',
    '/kontakt',
    '/polityka-prywatnosci',
  ]

  const now = new Date()

  return urls.map((pathname) => ({
    url: `${base}${withTrailingSlash(pathname)}`,
    lastModified: now,
  }))
}
