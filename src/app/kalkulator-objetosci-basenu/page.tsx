import type { Metadata } from 'next'

import Breadcrumbs from '@/components/Breadcrumbs'
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
      <Breadcrumbs items={[{ label: 'Kalkulator objętości basenu', href: '/kalkulator-objetosci-basenu' }]} />
      <main>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">Kalkulator objętości basenu</h1>
          <p className="mt-3 text-slate-600">
            Wybierz kształt i podaj wymiary, aby obliczyć objętość wody w basenie. Następnie przejdź do kalkulatora chloru i sprawdź dawkowanie.
          </p>
        </div>

        <PoolVolumeCalculatorClient />

        {/* Sekcja SEO */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16" aria-label="Informacje o obliczaniu objętości basenu">
          <div className="prose prose-slate max-w-none">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
              Jak obliczyć objętość basenu?
            </h2>
            
            <p className="text-slate-600 leading-relaxed mb-6">
              Prawidłowe określenie <strong>objętości basenu w litrach</strong> to podstawa skutecznej pielęgnacji wody. 
              Niezależnie od tego, czy posiadasz basen prostokątny, okrągły czy owalny, precyzyjne wyliczenie 
              ilości wody pozwala dobrać odpowiednią ilość chemii basenowej, ustawić filtrację i oszacować koszty eksploatacji.
            </p>

            <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-4">
              Dlaczego warto znać objętość basenu w metrach sześciennych?
            </h3>
            
            <ul className="space-y-3 text-slate-600 mb-8">
              <li className="flex items-start gap-3">
                <span className="text-blue-500 mt-1">•</span>
                <span><strong>Dozowanie chloru:</strong> Preparaty do dezynfekcji podaje się w gramach na każde 1000 litrów wody</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-500 mt-1">•</span>
                <span><strong>Regulacja pH:</strong> Środki chemiczne do korekty odczynu wody dawkowane są proporcjonalnie do objętości</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-500 mt-1">•</span>
                <span><strong>Wydajność pompy:</strong> Czas obiegu wody zależy od pojemności zbiornika</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-500 mt-1">•</span>
                <span><strong>Koszty utrzymania:</strong> Możesz oszacować miesięczne zużycie chemii i energii</span>
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-4">
              Wzory na objętość basenu – jak to działa?
            </h3>
            
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-50 rounded-xl p-5">
                <h4 className="font-semibold text-slate-900 mb-3">Basen prostokątny</h4>
                <p className="text-slate-600 text-sm mb-3">Wzór: długość × szerokość × głębokość = m³</p>
                <p className="text-slate-600 text-sm">
                  Przykład: basen 8 m × 4 m × 1,5 m = 48 m³ = <strong>48 000 litrów wody</strong>
                </p>
              </div>
              
              <div className="bg-blue-50 rounded-xl p-5">
                <h4 className="font-semibold text-slate-900 mb-3">Basen okrągły</h4>
                <p className="text-slate-600 text-sm mb-3">Wzór: π × (średnica/2)² × głębokość = m³</p>
                <p className="text-slate-600 text-sm">
                  Przykład: basen Ø 4,6 m × 1,2 m = ~20 m³ = <strong>20 000 litrów wody</strong>
                </p>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-4">
              Co zrobić, gdy dno basenu jest nierówne?
            </h3>
            
            <p className="text-slate-600 leading-relaxed mb-6">
              Wiele basenów ogrodowych ma spadziste dno – głębsze w środku i płytsze przy ścianach. 
              W takim przypadku zamiast jednej wartości podaj <strong>średnią głębokość</strong>: 
              dodaj głębokość maksymalną i minimalną, następnie podziel przez dwa. 
              Nasz kalkulator automatycznie przeliczy wynik na litry i metry sześcienne.
            </p>

            <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-4">
              Najczęściej zadawane pytania
            </h3>
            
            <div className="space-y-4">
              <details className="bg-slate-50 rounded-xl p-4 cursor-pointer">
                <summary className="font-medium text-slate-900">Ile litrów ma standardowy basen ogrodowy?</summary>
                <p className="text-slate-600 text-sm mt-3">
                  Typowy basen rodzinny o wymiarach 8 × 4 metry i głębokości 1,5 m mieści około 
                  <strong> 48 000 litrów wody</strong>. Baseny rozporowe (okrągłe) o średnicy 3,6 m 
                  i głębokości 0,9 m mieszczą około 9 000 litrów.
                </p>
              </details>
              
              <details className="bg-slate-50 rounded-xl p-4 cursor-pointer">
                <summary className="font-medium text-slate-900">Jak przeliczyć m³ na litry?</summary>
                <p className="text-slate-600 text-sm mt-3">
                  1 metr sześcienny (m³) = <strong>1000 litrów</strong>. Wystarczy pomnożyć wartość 
                  w m³ przez 1000, aby uzyskać pojemność w litrach. Nasz kalkulator wyświetla 
                  obie wartości automatycznie.
                </p>
              </details>
              
              <details className="bg-slate-50 rounded-xl p-4 cursor-pointer">
                <summary className="font-medium text-slate-900">Po co obliczać objętość przed zakupem chloru?</summary>
                <p className="text-slate-600 text-sm mt-3">
                  Dezynfekcja wody wymaga precyzyjnego dawkowania. Zbyt mała ilość chloru nie 
                  zapewni ochrony przed bakteriami, a zbyt duża może podrażniać skórę i oczy. 
                  Znając <strong>objętość basenu w litrach</strong>, możesz dokładnie zmierzyć 
                  potrzebną ilość chemii. Skorzystaj z naszego <a href="/kalkulator-chloru-do-basenu" className="text-blue-600 hover:underline">kalkulatora chloru</a>.
                </p>
              </details>
            </div>

            <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-4">
              Przydatne narzędzia do pielęgnacji basenu
            </h3>
            
            <p className="text-slate-600 leading-relaxed mb-4">
              Po obliczeniu objętości basenu skorzystaj z naszych innych kalkulatorów, 
              aby skutecznie zarządzać chemią basenową:
            </p>
            
            <div className="flex flex-wrap gap-3 mb-8">
              <a 
                href="/kalkulator-chloru-do-basenu" 
                className="group inline-flex items-center gap-2 text-slate-700 hover:text-blue-600 py-2 no-underline transition-colors"
              >
                <span className="text-sm font-medium">Kalkulator chloru</span>
                <span className="material-icons-round text-lg">arrow_forward</span>
              </a>
              <a 
                href="/kalkulator-ph-wody" 
                className="group inline-flex items-center gap-2 text-slate-700 hover:text-emerald-600 py-2 no-underline transition-colors"
              >
                <span className="text-sm font-medium">Kalkulator pH</span>
                <span className="material-icons-round text-lg">arrow_forward</span>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
