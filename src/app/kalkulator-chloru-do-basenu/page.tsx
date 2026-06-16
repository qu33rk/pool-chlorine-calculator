import type { Metadata } from 'next'

import Breadcrumbs from '@/components/Breadcrumbs'
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
      <Breadcrumbs items={[{ label: 'Kalkulator chloru do basenu', href: '/kalkulator-chloru-do-basenu' }]} />
      <main>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">Kalkulator chloru do basenu</h1>
          <p className="mt-3 text-slate-600">
            Podaj kształt i wymiary basenu, a następnie porównaj ile chloru w granulacie potrzebujesz dla różnych produktów.
          </p>
        </div>
        <ChlorineCalculatorClient />

        {/* Sekcja SEO */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16" aria-label="Informacje o chlorowaniu basenu">
          <div className="prose prose-slate max-w-none">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
              Ile chloru do basenu?
            </h2>
            
            <p className="text-slate-600 leading-relaxed mb-6">
              Każdy kto pierwszy raz otwiera sezon basenowy, zadaje to samo pytanie: "ile tego chloru wsypać?". 
              Niestety nie ma jednej odpowiedzi. Wszystko zależy od tego czy startujesz z zimy, czy woda stała się mętna, 
              czy może dopiero co zauważyłeś pierwsze glony. Są trzy różne scenariusze i trzy różne dawki.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              Najważniejsze to nie przesadzić. Więcej chloru nie znaczy lepiej. Za dużo i nie wejdziesz do wody przez 3 dni, 
              bo będzie śmierdziało jak na basenie po zawodach pływackich. Za mało – bakterie zrobią sobie piknik. 
              Szukasz takiego złotego środka, gdzie woda jest czysta, ale nie wypala włosów z nosa.
            </p>

            <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-4">
              Trzy sytuacje, trzy dawki – co wybrać?
            </h3>
            
            <p className="text-slate-600 leading-relaxed mb-6">
              Kalkulator pokazuje trzy opcje: start sezonu (świeża woda po zimie), woda mętna (coś tam się dzieje, ale jeszcze nie zielono), 
              oraz glony (woda zielona jak bulion). Różnica w dawkach jest spora – przy glonach możesz potrzebować nawet 3-4 razy więcej chloru 
              niż przy normalnym podtrzymaniu. Nie panikuj jak kalkulator wypluje dużą liczbę przy opcji "glony" – to celowe, 
              żeby zabić to wszystko co się namnożyło.
            </p>

            <div className="bg-slate-50 rounded-xl p-5 mb-8">
              <h4 className="font-semibold text-slate-900 mb-3">Co warto zapamiętać:</h4>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Chlor wsypuj wieczorem, gdy słońce nie praży. UV rozbija chlor w ciągu kilku godzin, 
                  więc rano dodany połowa ucieknie zanim zdąży zadziałać.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Rozpuszczaj granulat w wiadrze ciepłej wody przed wlaniem. Rzucanie suchych granulek prosto do basenu 
                  robi białe plamy na folii, których potem nie da się zetrzeć.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Czekaj minimum 2-3 godziny po chlorowaniu zanim ktoś wejdzie do wody. Chlor musi zadziałać, 
                  a potem trochę się ulotnić. Inaczej dostaniesz zapalenia spojówek w prezencie.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Kontroluj pH przed chlorowaniem. Przy pH powyżej 7.6 chlor praktycznie nie działa, 
                  nawet jak wsypiesz tonę.</span>
                </li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-4">
              Który chlor wybrać? Granulat, tabletki, czy płyn?
            </h3>
            
            <p className="text-slate-600 leading-relaxed mb-6">
              Ten kalkulator bazuje na granulacie – to najpopularniejsza forma w Polsce. Szybko się rozpuszcza i działa prawie od razu. 
              Tabletki są wygodniejsze (wrzucasz i zapominasz), ale działają wolniej. Płynny chlor to głównie dla basenów publicznych, 
              w domowych rzadko się go używa bo trudno przechowywać i transportować.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              Zauważysz, że różne firmy mają różne zalecenia. Chemoform, HTH, AstralPool, Bayrol – każdy chce być inny. 
              W praktyce różnice są niewielkie, ale kalkulator pokazuje je wszystkie żebyś nie musiał szukać w internecie. 
              Wybierz ten który masz pod ręką w sklepie, a nie ten co wychodzi najtaniej w excelu.
            </p>

            <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-4">
              Najczęstsze błędy przy chlorowaniu
            </h3>
            
            <div className="space-y-4 mb-8">
              <details className="bg-slate-50 rounded-xl p-4 cursor-pointer">
                <summary className="font-medium text-slate-900">Dodałem chlor, a woda dalej zielona</summary>
                <p className="text-slate-600 text-sm mt-3">
                  Albo dawkujesz za mało, albo filtracja nie działa. Chlor zabija glony, ale potrzebuje czasu i obiegu wody. 
                  Sprawdź czy pompa chodzi wystarczająco długo. Czasem trzeba zrobić szok chlorowy dwa razy, 
                  z przerwą 24h między dawkami.
                </p>
              </details>
              
              <details className="bg-slate-50 rounded-xl p-4 cursor-pointer">
                <summary className="font-medium text-slate-900">Woda mętna po chlorowaniu</summary>
                <p className="text-slate-600 text-sm mt-3">
                  To normalne – chlor powoduje, że martwe glony i brud opadają na dno tworząc mętność. 
                  Daj filtracji czas (12-24h), ewentualnie użyj klarownika. Nie panikuj, to znak że chlor działa.
                </p>
              </details>
              
              <details className="bg-slate-50 rounded-xl p-4 cursor-pointer">
                <summary className="font-medium text-slate-900">Dzieci skarżą się na pieczenie oczu</summary>
                <p className="text-slate-600 text-sm mt-3">
                  Albo za dużo chloru, albo złe pH. Przy dobrej ilości chloru i pH w normie, oczy nie powinny piec. 
                  Sprawdź testerem oba parametry. Jak chlor za wysoki – poczekaj dzień bez dawkowania, 
                  słońce samo go zdegraduje.
                </p>
              </details>
            </div>

            <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-4">
              Pozostałe narzędzia
            </h3>
            
            <p className="text-slate-600 leading-relaxed mb-4">
              Jeśli jeszcze nie wiesz ile litrów ma Twój basen, albo potrzebujesz wyregulować pH:
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
                href="/kalkulator-ph-wody" 
                className="group inline-flex items-center gap-2 text-slate-700 hover:text-emerald-600 py-2 no-underline transition-colors"
              >
                <span className="text-sm font-medium">Kalkulator pH wody</span>
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
