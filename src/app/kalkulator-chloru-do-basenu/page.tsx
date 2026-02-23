import type { Metadata } from 'next'

import ChlorineCalculatorClient from '@/components/ChlorineCalculatorClient'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'Kalkulator chloru do basenu - oblicz dawkowanie granulatu',
  description:
    'Oblicz objętość basenu i sprawdź dawkowanie chloru w granulacie dla popularnych produktów. Szybkie porównanie dawek na start, przy mętnej wodzie i przy glonach.',
  alternates: {
    canonical: 'https://basenomat.pl/kalkulator-chloru-do-basenu/',
  },
  openGraph: {
    title: 'Kalkulator chloru do basenu - oblicz dawkowanie granulatu',
    description:
      'Podaj wymiary basenu i sprawdź ile chloru w granulacie potrzebujesz. Porównanie dawek dla popularnych produktów.',
    url: 'https://basenomat.pl/kalkulator-chloru-do-basenu/',
    type: 'website',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Kalkulator chloru do basenu',
  description:
    'Oblicz objętość basenu i sprawdź dawkowanie chloru w granulacie dla popularnych produktów.',
  url: 'https://basenomat.pl/kalkulator-chloru-do-basenu/',
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'All',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'PLN',
  },
}

export default function KalkulatorChloruDoBasenuPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">Kalkulator chloru do basenu</h1>
          <p className="mt-3 text-slate-600">
            Podaj kształt i wymiary basenu, a następnie porównaj ile chloru w granulacie potrzebujesz dla różnych produktów.
          </p>
        </div>
        <ChlorineCalculatorClient />
      </main>
      <Footer />
    </div>
  )
}
