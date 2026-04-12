import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import Breadcrumbs from '@/components/Breadcrumbs'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { getAllPostSlugs, getPostBySlug } from '@/sanity/queries'
import type { Block } from '@/sanity/queries'
import { PortableText } from '@/sanity/portable-text'

export const dynamic = 'force-static'
export const dynamicParams = false

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  try {
    const slugs = await getAllPostSlugs()
    if (slugs.length > 0) return slugs.map((slug) => ({ slug }))
  } catch {
    // no-op
  }
  return [{ slug: '_placeholder' }]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://basenomat.pl'
  const url = `${SITE_URL.replace(/\/$/, '')}/blog/${slug}/`

  return {
    title: post.seoTitle ?? post.title,
    description: post.seoDescription ?? post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: post.seoTitle ?? post.title,
      description: post.seoDescription ?? post.excerpt,
      publishedTime: post.publishedAt,
      ...(post.mainImage?.asset?.url
        ? { images: [{ url: post.mainImage.asset.url, alt: post.mainImage.alt ?? post.title }] }
        : {}),
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://basenomat.pl'
  const base = SITE_URL.replace(/\/$/, '')

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.seoDescription ?? post.excerpt,
    datePublished: post.publishedAt,
    author: { '@type': 'Organization', name: post.author?.name ?? 'Basenomat.pl' },
    publisher: {
      '@type': 'Organization',
      name: 'Basenomat.pl',
      url: base,
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${base}/blog/${slug}/` },
    ...(post.mainImage?.asset?.url
      ? { image: post.mainImage.asset.url }
      : {}),
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumbs
        items={[
          { label: 'Blog', href: '/blog' },
          { label: post.title },
        ]}
      />

      <main className="py-10">
        <article className="max-w-3xl mx-auto px-4 sm:px-6">
          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.categories.map((cat) => (
                <span
                  key={cat.title}
                  className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full"
                >
                  {cat.title}
                </span>
              ))}
            </div>
          )}

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
            {post.title}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-slate-500">
            {post.publishedAt && (
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString('pl-PL', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </time>
            )}
            {post.author?.name && (
              <span className="flex items-center gap-1">
                <span className="material-icons-round text-base">person</span>
                {post.author.name}
              </span>
            )}
          </div>

          {post.mainImage?.asset?.url && (
            <div className="mt-6 rounded-2xl overflow-hidden shadow-md">
              <img
                src={post.mainImage.asset.url}
                alt={post.mainImage.alt ?? post.title}
                className="w-full object-cover max-h-[420px]"
              />
            </div>
          )}

          {post.excerpt && (
            <p className="mt-6 text-lg text-slate-600 leading-relaxed border-l-4 border-blue-200 pl-4 italic">
              {post.excerpt}
            </p>
          )}

          <div className="mt-8">
            {post.body && (
              typeof post.body === 'string'
                ? <div
                    className="prose prose-slate max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h3:text-xl prose-p:leading-relaxed prose-a:text-blue-600 prose-blockquote:border-blue-400 prose-blockquote:text-slate-600"
                    dangerouslySetInnerHTML={{ __html: post.body }}
                  />
                : <PortableText blocks={post.body as Block[]} />
            )}
          </div>
        </article>
      </main>

      <Footer />
    </div>
  )
}
