'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'

const tools = [
  { href: '/kalkulator-chloru-do-basenu', label: 'Kalkulator chloru do basenu', icon: 'science' },
  { href: '/kalkulator-ph-wody', label: 'Kalkulator pH wody', icon: 'opacity' },
  { href: '/kalkulator-objetosci-basenu', label: 'Kalkulator objętości basenu', icon: 'water' },
]

export default function Navbar({ showHomeCta = false }: { showHomeCta?: boolean }) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link className="flex-shrink-0 flex items-center gap-2" href="/">
            <span className="material-icons-round text-blue-500 text-3xl">pool</span>
            <span className="font-bold text-xl tracking-tight text-slate-900">Basenomat.pl</span>
          </Link>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/blog" className="text-slate-700 font-medium hover:text-blue-500 transition-colors px-2 py-1">
              Blog
            </Link>
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((v) => !v)}
                className="flex items-center gap-1 text-slate-700 font-medium hover:text-blue-500 transition-colors px-2 py-1 rounded-lg"
              >
                Narzędzia
                <span className={`material-icons-round text-base transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}>
                  expand_more
                </span>
              </button>

              {dropdownOpen && (
                <div className="absolute left-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50">
                  {tools.map((tool) => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors text-sm font-medium"
                    >
                      <span className="material-icons-round text-lg text-blue-400">{tool.icon}</span>
                      {tool.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {showHomeCta && (
              <a
                className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-full font-medium transition-transform transform hover:scale-105 shadow-lg shadow-blue-500/30"
                href="#tools"
              >
                Zacznij teraz
              </a>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="text-slate-500 hover:text-blue-500 focus:outline-none"
            >
              <span className="material-icons-round text-3xl">{mobileOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white">
          <div className="px-4 py-2">
            <Link
              href="/blog"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-2 py-3 text-slate-700 hover:text-blue-500 transition-colors text-sm font-medium border-b border-slate-100"
            >
              <span className="material-icons-round text-lg text-blue-400">article</span>
              Blog
            </Link>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2 pt-3 pb-1">Narzędzia</p>
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-2 py-3 text-slate-700 hover:text-blue-500 transition-colors text-sm font-medium border-b border-slate-50 last:border-0"
              >
                <span className="material-icons-round text-lg text-blue-400">{tool.icon}</span>
                {tool.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
