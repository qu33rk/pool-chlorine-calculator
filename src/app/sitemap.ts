import type { MetadataRoute } from 'next'

import { getAllPosts } from '@/sanity/queries'

export const dynamic = 'force-static'

function withTrailingSlash(path: string) {
  return path.endsWith('/') ? path : `${path}/`
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

  if (!siteUrl) {
    return []
  }

  const base = siteUrl.replace(/\/$/, '')

  const staticUrls = [
    '/',
    '/kalkulator-chloru-do-basenu',
    '/kalkulator-ph-wody',
    '/kalkulator-objetosci-basenu',
    '/blog',
    '/kontakt',
    '/polityka-prywatnosci',
  ]

  const now = new Date()

  const staticEntries: MetadataRoute.Sitemap = staticUrls.map((pathname) => ({
    url: `${base}${withTrailingSlash(pathname)}`,
    lastModified: now,
  }))

  let postEntries: MetadataRoute.Sitemap = []
  try {
    const posts = await getAllPosts()
    postEntries = posts.map((post) => ({
      url: `${base}/blog/${post.slug.current}/`,
      lastModified: post.publishedAt ? new Date(post.publishedAt) : now,
    }))
  } catch {
    // no-op — Sanity not configured
  }

  return [...staticEntries, ...postEntries]
}
