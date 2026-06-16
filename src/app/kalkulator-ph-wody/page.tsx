import type { Metadata } from 'next'

import Breadcrumbs from '@/components/Breadcrumbs'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import PhWaterCalculatorClient from '@/components/PhWaterCalculatorClient'

export const metadata: Metadata = {
  title: 'Kalkulator pH wody w basenie - pH Plus / pH Minus',
  description:
    'Oblicz ile pH Minus lub pH Plus dodać, aby zmienić pH wody w basenie ze zmierzonego na docelowe. Kalkulator uwzględnia objętość basenu oraz porównanie dawek dla popularnych produktów.',
  alternates: {
    canonical: 'https://basenomat.pl/kalkulator-ph-wody/',
  },
  openGraph: {
    title: 'Kalkulator pH wody w basenie - pH Plus / pH Minus',
    description:
      'Dowiedz się ile środka pH-Plus lub pH-Minus dodać, aby uzyskać idealny odczyn wody w basenie.',
    url: 'https://basenomat.pl/kalkulator-ph-wody/',
    type: 'website',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Kalkulator pH wody w basenie',
  description:
    'Oblicz ile pH Minus lub pH Plus dodać, aby zmienić pH wody w basenie ze zmierzonego na docelowe.',
  url: 'https://basenomat.pl/kalkulator-ph-wody/',
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'All',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'PLN',
  },
}

export default function KalkulatorPhWodyPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs items={[{ label: 'Kalkulator pH wody', href: '/kalkulator-ph-wody' }]} />
      <main>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">Kalkulator pH wody</h1>
          <p className="mt-3 text-slate-600">
            Podaj kształt i wymiary basenu oraz zmierzone i docelowe pH. Otrzymasz porównanie dawek pH Minus / pH Plus dla różnych producentów.
          </p>
        </div>

        <PhWaterCalculatorClient />

        {/* Sekcja SEO */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16" aria-label="Informacje o pH w basenie">
          <div className="prose prose-slate max-w-none">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
              pH w basenie – dlaczego to takie ważne?
            </h2>
            
            <p className="text-slate-600 leading-relaxed mb-6">
              Jeśli masz basen, wiesz już pewnie, że chlor to nie wszystko. Nawet jak dorzucisz go w odpowiedniej ilości, 
              to przy złym pH będzie działał jak kiepski detergent – czyli właściwie wcale. Odczyn wody to taka podstawa, 
              o której wielu zapomina, a potem dziwi się, że woda jest mętna albo oczy pieką po pierwszym skoku.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              Idealne pH basenu to gdzieś między <strong>7.2 a 7.6</strong>. Poniżej tego zakresu woda staje się kwaśna – 
              podrażnia skórę, oczy, a przy okazji żre metalowe elementy basenu i pompy. Powyżej 7.6 chlor przestaje 
              działać efektywnie, a woda robi się mleczna. Żadna z tych opcji nie jest fajna.
            </p>

            <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-4">
              Jak sprawdzić pH i co z tym zrobić?
            </h3>
            
            <p className="text-slate-600 leading-relaxed mb-6">
              Najprostsza metoda? Testery paskowe lub kroplowe – kupisz w każdym markecie budowlanym lub sklepie 
              basenowym. Pomiar zajmuje 30 sekund. Jak masz za niskie pH, wsypujesz pH Plus. Jak za wysokie – pH Minus. 
              Brzmi prosto, ale ilość to już czarna magia dla wielu. Każdy producent ma inne zalecenia, a te "łyżki na 10m³" 
              nikt nie pamięta. Stąd ten kalkulator – wpisujesz wymiary, zmierzone i docelowe pH, a dostajesz wyniki 
              dla różnych producentów naraz.
            </p>

            <div className="bg-slate-50 rounded-xl p-5 mb-8">
              <h4 className="font-semibold text-slate-900 mb-3">Kilka rzeczy, które warto wiedzieć:</h4>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Dawki w kalkulatorze to orientacyjne wartości z tabel producentów. Zawsze dodawaj mniej niż wychodzi, 
                  sprawdź pH po godzinie, a potem doreguluj.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Granulat pH Plus/Minus zawsze rozpuszczaj w wiadrze ciepłej wody przed wlaniem do basenu. 
                  Inaczej zostaną białe plamy na dnie.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Przy bardzo twardej wodzie (np. na południu Polski) bufor węglanowy jest mocniejszy 
                  i potrzebujesz więcej pH Minus, żeby cokolwiek zmienić.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Nigdy nie reguluj pH, jak w basenie są ludzie. Dawkuj wieczorem, gdy basen jest pusty.</span>
                </li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-4">
              Najczęstsze problemy z pH w basenach ogrodowych
            </h3>
            
            <div className="space-y-4 mb-8">
              <details className="bg-slate-50 rounded-xl p-4 cursor-pointer">
                <summary className="font-medium text-slate-900">Za niskie pH – oczy czerwone, skóra swędzi</summary>
                <p className="text-slate-600 text-sm mt-3">
                  To klasyczny objaw kwaśnej wody. pH poniżej 7.0 zaczyna być nieprzyjemne dla organizmu. 
                  Szybka korekta pH Plus powinna pomóc. Jak masz 6.8 lub mniej, dodawaj stopniowo – 
                  lepiej zrobić to w 2-3 etapach niż przesadzić.
                </p>
              </details>
              
              <details className="bg-slate-50 rounded-xl p-4 cursor-pointer">
                <summary className="font-medium text-slate-900">Za wysokie pH – woda mleczna, chlor nie działa</summary>
                <p className="text-slate-600 text-sm mt-3">
                  Przy pH powyżej 7.8 chlor traci skuteczność. Woda może też robić się mętna od złogów. 
                  pH Minus jest tańszy niż pH Plus, więc przynajmniej portfel tego nie odczuje mocno.
                </p>
              </details>
              
              <details className="bg-slate-50 rounded-xl p-4 cursor-pointer">
                <summary className="font-medium text-slate-900">pH skacze non stop – co jest grane?</summary>
                <p className="text-slate-600 text-sm mt-3">
                  Niestabilne pH to często wina niskiej alkaliczności (TAC). Najpierw ustaw TAC na poziomie 
                  80-120 mg/l, a dopiero potem baw się w korektę pH. Inaczej będziesz katować chemię bez efektu.
                </p>
              </details>
            </div>

            <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-4">
              Inne kalkulatory, które mogą się przydać
            </h3>
            
            <p className="text-slate-600 leading-relaxed mb-4">
              Jeśli jeszcze nie znasz objętości basenu, najpierw tam zajrzyj. Bez litrów nie policzysz sensownie pH:
            </p>
            
            <div className="flex flex-wrap gap-3 mb-8">
              <a 
                href="/kalkulator-objetosci-basenu" 
                className="group inline-flex items-center gap-2 text-slate-700 hover:text-blue-600 py-2 no-underline transition-colors"
              >
                <span className="text-sm font-medium">Kalkulator objętości basenu</span>
                <span className="material-icons-round text-lg">arrow_forward</span>
              </a>
              <a 
                href="/kalkulator-chloru-do-basenu" 
                className="group inline-flex items-center gap-2 text-slate-700 hover:text-emerald-600 py-2 no-underline transition-colors"
              >
                <span className="text-sm font-medium">Kalkulator chloru</span>
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
