import './globals.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://basenomat.pl'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Kalkulator basenu online — chlor, pH, objętość wody | Basenomat.pl',
    template: '%s | Basenomat.pl',
  },
  description:
    'Darmowy kalkulator basenu online. Oblicz dawkowanie chloru, skoryguj pH wody i sprawdź objętość basenu w kilka sekund. Precyzyjne wyniki dla popularnych produktów.',
  keywords: [
    'kalkulator basenu',
    'kalkulator basenowy',
    'kalkulator chloru',
    'chlor do basenu',
    'dawkowanie chloru',
    'kalkulator pH basenu',
    'objętość basenu',
    'chemia basenowa',
    'pielęgnacja basenu',
    'basen ogrodowy',
    'uzdatnianie wody basenowej',
  ],
  authors: [{ name: 'Basenomat.pl' }],
  creator: 'Basenomat.pl',
  publisher: 'Basenomat.pl',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    url: SITE_URL,
    siteName: 'Basenomat.pl',
    title: 'Kalkulator basenu online — chlor, pH, objętość wody | Basenomat.pl',
    description:
      'Darmowy kalkulator basenu: oblicz dawkowanie chloru, skoryguj pH i sprawdź objętość wody. Szybko i precyzyjnie.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kalkulator basenu online — chlor, pH, objętość wody | Basenomat.pl',
    description:
      'Darmowy kalkulator basenu: chlor, pH, objętość wody. Szybko, prosto i precyzyjnie.',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Basenomat.pl',
      description:
        'Darmowy kalkulator basenu online – oblicz dawkowanie chloru, pH i objętość wody.',
      inLanguage: 'pl-PL',
    },
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Basenomat.pl',
      url: SITE_URL,
      sameAs: [],
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl" className="bg-blue-50 text-slate-800 font-sans antialiased">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
