import type { Metadata } from 'next'

import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import PhWaterCalculatorClient from '@/components/PhWaterCalculatorClient'

export const metadata: Metadata = {
  title: 'Kalkulator pH wody w basenie - pH Plus / pH Minus | Basenomat.pl',
  description:
    'Oblicz ile pH Minus lub pH Plus dodać, aby zmienić pH wody w basenie ze zmierzonego na docelowe. Kalkulator uwzględnia objętość basenu oraz porównanie dawek dla popularnych produktów.',
}

export default function KalkulatorPhWodyPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">Kalkulator pH wody</h1>
          <p className="mt-3 text-slate-600">
            Podaj kształt i wymiary basenu oraz zmierzone i docelowe pH. Otrzymasz porównanie dawek pH Minus / pH Plus dla różnych producentów.
          </p>
        </div>

        <PhWaterCalculatorClient />
      </main>
      <Footer />
    </div>
  )
}
