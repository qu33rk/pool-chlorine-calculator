'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import type { TocItem } from '@/lib/toc'

interface TableOfContentsProps {
  items: TocItem[]
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')
  const [hidden, setHidden] = useState(false)
  const listRef = useRef<HTMLUListElement>(null)

  const scrollActiveIntoView = useCallback((id: string) => {
    if (!listRef.current) return
    const activeEl = listRef.current.querySelector(`[data-toc-id="${id}"]`)
    if (activeEl) {
      activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [])

  useEffect(() => {
    if (items.length === 0) return

    const headingObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
            scrollActiveIntoView(entry.target.id)
          }
        }
      },
      { rootMargin: '0px 0px -80% 0px', threshold: 0.1 },
    )

    for (const item of items) {
      const el = document.getElementById(item.id)
      if (el) headingObserver.observe(el)
    }

    const footer = document.querySelector('footer')
    let footerObserver: IntersectionObserver | undefined
    if (footer) {
      footerObserver = new IntersectionObserver(
        ([entry]) => setHidden(entry.isIntersecting),
        { threshold: 0 },
      )
      footerObserver.observe(footer)
    }

    return () => {
      headingObserver.disconnect()
      footerObserver?.disconnect()
    }
  }, [items, scrollActiveIntoView])

  if (items.length === 0) return null

  return (
    <nav
      className={`hidden xl:block fixed left-6 top-24 w-56 z-40 transition-opacity duration-300 ${
        hidden ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-label="Spis treści"
    >
      <div className="flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
        <span className="material-icons-round text-sm">list</span>
        Spis treści
      </div>
      <ul
        ref={listRef}
        className="space-y-1 border-l border-slate-200 max-h-[calc(100vh-10rem)] overflow-y-auto overscroll-contain pr-2"
      >
        {items.map((item) => {
          const isActive = activeId === item.id
          return (
            <li key={item.id} data-toc-id={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  const el = document.getElementById(item.id)
                  if (el) {
                    const headerOffset = 80
                    const elementPosition = el.getBoundingClientRect().top + window.scrollY
                    window.scrollTo({
                      top: elementPosition - headerOffset,
                      behavior: 'smooth',
                    })
                    setActiveId(item.id)
                  }
                }}
                className={`block border-l-2 leading-snug transition-all duration-200 ${
                  item.level === 3
                    ? 'pl-7 text-xs py-1'
                    : 'pl-4 text-sm font-medium py-2'
                } ${
                  isActive
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                {item.text}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
