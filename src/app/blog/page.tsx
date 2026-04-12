import type { Metadata } from 'next'
import Link from 'next/link'

import Breadcrumbs from '@/components/Breadcrumbs'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { getAllPosts } from '@/sanity/queries'

export const metadata: Metadata = {
  title: 'Blog — pielęgnacja basenu, poradniki',
  description:
    'Artykuły i poradniki o pielęgnacji basenu, chemii basenowej, dozowaniu chloru i regulacji pH. Sprawdź najnowsze wpisy na Basenomat.pl.',
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <div className="min-h-screen">
      <Navbar />
      <Breadcrumbs items={[{ label: 'Blog', href: '/blog' }]} />

      <main className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Blog
          </h1>
          <p className="mt-3 text-slate-600">
            Poradniki i artykuły o pielęgnacji basenu, chemii basenowej i utrzymaniu czystej wody.
          </p>

          {posts.length === 0 ? (
            <div className="mt-16 text-center text-slate-500">
              <span className="material-icons-round text-5xl text-slate-300">article</span>
              <p className="mt-4 text-lg">Brak artykułów. Wróć wkrótce!</p>
            </div>
          ) : (
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {posts.map((post) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug.current}`}
                  className="group rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col"
                >
                  {post.mainImage?.asset?.url && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.mainImage.asset.url}
                        alt={post.mainImage.alt ?? post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-5 flex flex-col flex-1">
                    {post.categories && post.categories.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
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
                    <h2 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="mt-2 text-sm text-slate-500 leading-relaxed line-clamp-3 flex-1">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="mt-4 flex items-center justify-between">
                      {post.publishedAt && (
                        <time className="text-xs text-slate-400">
                          {new Date(post.publishedAt).toLocaleDateString('pl-PL', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </time>
                      )}
                      <span className="text-sm font-semibold text-blue-500 flex items-center gap-1">
                        Czytaj <span className="material-icons-round text-sm">arrow_forward</span>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
