export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-icons-round text-blue-500 text-2xl">pool</span>
              <span className="font-bold text-xl text-slate-900">Basenomat.pl</span>
            </div>
            <p className="text-slate-500 text-sm max-w-sm">
              Twój niezawodny partner w utrzymaniu czystego i bezpiecznego basenu. Darmowe narzędzia i kalkulatory dostępne dla każdego.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Narzędzia</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><a className="hover:text-blue-500" href="/kalkulator-chloru-do-basenu">Kalkulator chloru</a></li>
              <li><a className="hover:text-blue-500" href="/kalkulator-ph-wody">Regulacja pH</a></li>
              <li><a className="hover:text-blue-500" href="/kalkulator-objetosci-basenu">Objętość basenu</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Firma</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><a className="hover:text-blue-500" href="/kontakt">Kontakt</a></li>
              <li><a className="hover:text-blue-500" href="/polityka-prywatnosci">Polityka prywatności</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-200 pt-8 grid grid-cols-1 md:grid-cols-3 items-center gap-4">
          <p className="text-sm text-slate-500 md:justify-self-start">
            © 2026 Basenomat.pl. Wszelkie prawa zastrzeżone.
          </p>
          <p className="text-sm text-slate-500 text-center md:justify-self-center">
            Developed by{' '}
            <a
              className="hover:text-blue-500"
              href="https://www.linkedin.com/in/eryk-witkowski/"
              target="_blank"
              rel="noreferrer"
            >
              Eryk Witkowski
            </a>
          </p>
          <div className="hidden md:block" />
        </div>
      </div>
    </footer>
  )
}
