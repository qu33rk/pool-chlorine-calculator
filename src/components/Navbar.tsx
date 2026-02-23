'use client'

import Link from 'next/link'

export default function Navbar({ showHomeCta = false }: { showHomeCta?: boolean }) {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link className="flex-shrink-0 flex items-center gap-2" href="/">
            <span className="material-icons-round text-blue-500 text-3xl">pool</span>
            <span className="font-bold text-xl tracking-tight text-slate-900">Basenomat.pl</span>
          </Link>
          {showHomeCta ? (
            <div className="hidden md:flex items-center space-x-4">
              <a className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-full font-medium transition-transform transform hover:scale-105 shadow-lg shadow-blue-500/30" href="#tools">
                Zacznij teraz
              </a>
            </div>
          ) : (
            <div className="hidden md:block" />
          )}
          <div className="md:hidden flex items-center">
            <button className="text-slate-500 hover:text-blue-500 focus:outline-none">
              <span className="material-icons-round text-3xl">menu</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
