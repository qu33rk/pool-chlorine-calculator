import './globals.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

const SITE_URL = 'https://basenomat.pl'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Basenomat.pl - Twój asystent w pielęgnacji basenu',
    template: '%s | Basenomat.pl',
  },
  description:
    'Zadbaj o krystalicznie czystą wodę bez skomplikowanych obliczeń. Nasze narzędzia pomogą Ci precyzyjnie dobrać chemię basenową w kilka sekund.',
  keywords: [
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
    title: 'Basenomat.pl - Twój asystent w pielęgnacji basenu',
    description:
      'Zadbaj o krystalicznie czystą wodę bez skomplikowanych obliczeń. Kalkulatory chloru, pH i objętości basenu za darmo.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Basenomat.pl - Twój asystent w pielęgnacji basenu',
    description:
      'Darmowe kalkulatory chemii basenowej: chlor, pH, objętość wody. Szybko, prosto i precyzyjnie.',
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
        'Twój asystent w pielęgnacji basenu – kalkulatory chloru, pH i objętości wody.',
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
