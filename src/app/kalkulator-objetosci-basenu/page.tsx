import type { Metadata } from 'next'

import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import PoolVolumeCalculatorClient from '@/components/PoolVolumeCalculatorClient'

export const metadata: Metadata = {
  title: 'Kalkulator objętości basenu - oblicz litry i m³',
  description:
    'Oblicz objętość basenu w litrach i m³ na podstawie kształtu (prostokątny lub okrągły) oraz wymiarów. Po obliczeniach przejdź do kalkulatora chloru.',
  alternates: {
    canonical: 'https://basenomat.pl/kalkulator-objetosci-basenu/',
  },
  openGraph: {
    title: 'Kalkulator objętości basenu - oblicz litry i m³',
    description:
      'Szybko oblicz ile litrów wody mieści Twój basen prostokątny lub okrągły.',
    url: 'https://basenomat.pl/kalkulator-objetosci-basenu/',
    type: 'website',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Kalkulator objętości basenu',
  description:
    'Oblicz objętość basenu w litrach i metrach sześciennych na podstawie kształtu i wymiarów.',
  url: 'https://basenomat.pl/kalkulator-objetosci-basenu/',
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'All',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'PLN',
  },
}

export default function KalkulatorObjetosciBasenuPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">Kalkulator objętości basenu</h1>
          <p className="mt-3 text-slate-600">
            Wybierz kształt i podaj wymiary, aby obliczyć objętość wody w basenie. Następnie przejdź do kalkulatora chloru i sprawdź dawkowanie.
          </p>
        </div>

        <PoolVolumeCalculatorClient />
      </main>
      <Footer />
    </div>
  )
}
