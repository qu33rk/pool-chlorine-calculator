import type { Metadata } from 'next'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Polityka prywatności',
  description:
    'Polityka prywatności serwisu Basenomat.pl – zasady przetwarzania danych osobowych oraz wykorzystywania plików cookies.',
  robots: {
    index: true,
    follow: true,
  },
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">Polityka prywatności</h1>
          <p className="mt-4 text-slate-600">
            Niniejsza Polityka Prywatności opisuje zasady przetwarzania danych oraz wykorzystywania plików cookies w serwisie Basenomat.pl.
          </p>

          <div className="mt-10 space-y-8 text-slate-700">
            <section>
              <h2 className="text-xl font-bold text-slate-900">1. Administrator</h2>
              <p className="mt-2">
                Administratorem serwisu jest Basenomat.pl. W sprawach związanych z prywatnością możesz skontaktować się poprzez dane kontaktowe dostępne w serwisie.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900">2. Zakres danych</h2>
              <p className="mt-2">
                Serwis może przetwarzać dane techniczne (np. adres IP, identyfikatory urządzeń, dane przeglądarki) oraz dane podane dobrowolnie w ramach kontaktu.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900">3. Cel przetwarzania</h2>
              <p className="mt-2">
                Dane mogą być wykorzystywane w celu zapewnienia poprawnego działania serwisu, prowadzenia statystyk oraz obsługi zapytań.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900">4. Pliki cookies</h2>
              <p className="mt-2">
                Serwis może korzystać z plików cookies w celu zapewnienia funkcjonalności, bezpieczeństwa oraz analizy ruchu.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900">5. Zmiany</h2>
              <p className="mt-2">
                Polityka prywatności może być aktualizowana. Zmiany będą publikowane na tej stronie.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
