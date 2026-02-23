import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar showHomeCta />
      
      {/* Hero Section */}
      <header className="relative overflow-hidden pt-16 pb-24 lg:pt-32 lg:pb-40">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 -left-24 w-72 h-72 bg-teal-400/20 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-sm font-semibold mb-6 border border-blue-200">
            <span className="mr-2">✨</span> Nowość: Kalkulator pH wody
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6">
            Twój asystent w <br className="hidden md:block"/>
            <span className="bg-gradient-to-r from-blue-500 to-teal-400 text-transparent bg-clip-text">pielęgnacji basenu</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600">
            Zadbaj o krystalicznie czystą wodę bez skomplikowanych obliczeń. Nasze narzędzia pomogą Ci precyzyjnie dobrać chemię basenową w kilka sekund.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <a className="px-8 py-3.5 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-semibold text-lg shadow-xl shadow-blue-500/20 transition-all hover:-translate-y-1 flex items-center gap-2" href="#tools">
              <span className="material-icons-round">calculate</span>
              Odkryj kalkulatory
            </a>
            <a className="px-8 py-3.5 rounded-full bg-white border border-slate-200 text-slate-700 font-semibold text-lg hover:bg-slate-50 transition-all flex items-center gap-2" href="#jak-to-dziala">
              <span className="material-icons-round">school</span>
              Jak to działa?
            </a>
          </div>
        </div>
      </header>

      <section className="py-20 bg-blue-50/50" id="jak-to-dziala">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Jak to działa?</h2>
            <p className="mt-4 text-lg text-slate-600">
              To proste — wybierz kalkulator, wpisz dane i otrzymaj gotową dawkę oraz kolejne kroki.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
              <div className="h-10 w-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                <span className="material-icons-round">touch_app</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">1. Wybierz narzędzie</h3>
              <p className="mt-2 text-sm text-slate-600">
                Przejdź do kalkulatora chloru, pH lub objętości wody — zależnie od tego co chcesz policzyć.
              </p>
            </div>
            <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
              <div className="h-10 w-10 rounded-lg bg-teal-100 text-teal-600 flex items-center justify-center mb-4">
                <span className="material-icons-round">edit</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">2. Wpisz parametry</h3>
              <p className="mt-2 text-sm text-slate-600">
                Uzupełnij wymiary basenu oraz potrzebne wartości (np. zmierzone i docelowe pH).
              </p>
            </div>
            <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
              <div className="h-10 w-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center mb-4">
                <span className="material-icons-round">done_all</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">3. Zobacz wynik i wskazówki</h3>
              <p className="mt-2 text-sm text-slate-600">
                Otrzymasz dawkę dla popularnych produktów oraz podpowiedzi co zrobić dalej.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-20 bg-white relative" id="tools">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Narzędzia basenowe</h2>
            <p className="mt-4 text-lg text-slate-600">Wybierz odpowiednie narzędzie, aby rozpocząć obliczenia.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="col-span-1 md:col-span-2 lg:col-span-2 relative group rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row items-center md:items-start gap-8 overflow-hidden">
              <div className="absolute top-6 right-6 z-20 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide shadow-sm ring-4 ring-blue-50">Popularne</div>
              <div className="w-full md:w-1/2 flex flex-col justify-between h-full space-y-4 z-10">
                <div>
                  <div className="h-12 w-12 rounded-xl bg-blue-500 flex items-center justify-center text-white mb-4 shadow-lg shadow-blue-500/30">
                    <span className="material-icons-round text-2xl">science</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Kalkulator chloru do basenu</h3>
                  <p className="mt-2 text-slate-600 leading-relaxed">
                    Podaj kształt oraz wymiary basenu, a my obliczymy jego objętość i pokażemy dawkowanie chloru w granulacie dla popularnych produktów.
                  </p>
                </div>
                <Link className="inline-flex items-center text-blue-500 font-semibold hover:text-blue-700 transition-colors group-hover:translate-x-1 duration-300" href="/kalkulator-chloru-do-basenu">
                  Uruchom kalkulator <span className="material-icons-round ml-1">arrow_forward</span>
                </Link>
              </div>
              <div className="w-full md:w-1/2 relative h-48 md:h-auto rounded-xl overflow-hidden shadow-inner border border-blue-200 bg-white flex items-center justify-center">
                <img alt="Swimming pool with clear blue water" className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmqSuRukRhM8OHlPDbd90Wya-c4rulZfYj1i_L2HpBpU3QnH9Y4qDtiBlCeQDDKwdhvL3E6QXC26Qu65gV6Y0pK7OUZrxRf_700KIN2sJXXba9D6ocqqfpcMwzv4vTkEf1Pl4aKanWSnPlrvD2k7ul1mA7mkxEyo7jZ1j88yD8wsHDuJQHHRW5vy3dYD6Q9TpiDOTy4jXjfiH5XypKN5LjVnVliWFUoNObSu61BNgsJVJF9MAb6GzyeGLVJTEtnz_miRKs9-H_jqpD"/>
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent"></div>
              </div>
            </div>
            <div className="group rounded-2xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="h-10 w-10 rounded-lg bg-teal-100 text-teal-600 flex items-center justify-center mb-4">
                <span className="material-icons-round">water</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Objętość wody</h3>
              <p className="mt-2 text-sm text-slate-500">
                Szybko oblicz ile litrów wody mieści Twój basen prostokątny lub okrągły.
              </p>
              <Link className="mt-4 inline-flex items-center text-sm font-medium text-slate-600 group-hover:text-blue-500 transition-colors" href="/kalkulator-objetosci-basenu">
                Oblicz objętość <span className="material-icons-round text-sm ml-1">chevron_right</span>
              </Link>
            </div>
            <div className="group rounded-2xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="h-10 w-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center mb-4">
                <span className="material-icons-round">opacity</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Regulacja pH</h3>
              <p className="mt-2 text-sm text-slate-500">
                Dowiedz się ile środka pH-Plus lub pH-Minus dodać, aby uzyskać idealny odczyn.
              </p>
              <Link className="mt-4 inline-flex items-center text-sm font-medium text-slate-600 group-hover:text-blue-500 transition-colors" href="/kalkulator-ph-wody">
                Reguluj pH <span className="material-icons-round text-sm ml-1">chevron_right</span>
              </Link>
            </div>
            <div className="group rounded-2xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="h-10 w-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center mb-4">
                <span className="material-icons-round">thermostat</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Koszt ogrzewania</h3>
              <p className="mt-2 text-sm text-slate-500">
                Szacunkowe koszty podgrzania wody w basenie przy użyciu pompy ciepła.
              </p>
              <a className="mt-4 inline-flex items-center text-sm font-medium text-slate-600 group-hover:text-blue-500 transition-colors" href="#">
                Sprawdź koszty <span className="material-icons-round text-sm ml-1">chevron_right</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-500 mb-6">
                <span className="material-icons-round text-3xl">verified_user</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Bezpieczeństwo</h3>
              <p className="mt-3 text-slate-600">
                Prawidłowo dobrana chemia to bezpieczeństwo dla skóry i oczu wszystkich kąpiących się.
              </p>
            </div>
            <div>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 text-teal-600 mb-6">
                <span className="material-icons-round text-3xl">savings</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Oszczędność</h3>
              <p className="mt-3 text-slate-600">
                Nie marnuj środków chemicznych. Dozuj dokładnie tyle, ile potrzebuje Twój basen.
              </p>
            </div>
            <div>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 text-purple-600 mb-6">
                <span className="material-icons-round text-3xl">speed</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Szybkość</h3>
              <p className="mt-3 text-slate-600">
                Wyniki w ułamku sekundy. Zapomnij o skomplikowanych wzorach i kalkulatorze w ręku.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
