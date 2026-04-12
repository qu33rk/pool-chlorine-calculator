import Link from 'next/link'

export type BreadcrumbItem = {
  label: string
  href?: string
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://basenomat.pl'

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const all: BreadcrumbItem[] = [{ label: 'Strona główna', href: '/' }, ...items]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: all.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${SITE_URL.replace(/\/$/, '')}${item.href}` } : {}),
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="max-w-4xl mx-auto px-4 sm:px-6 pt-4">
        <ol className="flex flex-wrap items-center gap-1 text-sm text-slate-500">
          {all.map((item, index) => {
            const isLast = index === all.length - 1
            return (
              <li key={index} className="flex items-center gap-1">
                {index > 0 && (
                  <span className="material-icons-round text-slate-300 text-sm select-none">
                    chevron_right
                  </span>
                )}
                {!isLast && item.href ? (
                  <Link
                    href={item.href}
                    className="hover:text-blue-500 transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className={isLast ? 'text-slate-900 font-medium' : ''}>
                    {item.label}
                  </span>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}
