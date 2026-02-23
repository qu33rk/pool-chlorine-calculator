import type { Metadata } from 'next'

import ChlorineCalculatorClient from '@/components/ChlorineCalculatorClient'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'Kalkulator chloru do basenu - oblicz dawkowanie granulatu | Basenomat.pl',
  description:
    'Oblicz objętość basenu i sprawdź dawkowanie chloru w granulacie dla popularnych produktów. Szybkie porównanie dawek na start, przy mętnej wodzie i przy glonach.',
}

export default function KalkulatorChloruDoBasenuPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
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
