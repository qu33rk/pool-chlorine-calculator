'use client'

import { useState } from 'react'
import Link from 'next/link'

interface PoolDimensions {
  length: number | ''
  width: number | ''
  depth: number | ''
  shape: 'rectangle' | 'round'
}

interface RecommendedPool {
  id: string
  name: string
  brand: string
  volumeM3: number
  shape: 'rectangle' | 'round'
  dimensions: string
  depth: string
  affiliateUrl: string
  features: string[]
  image?: string
  minVolume: number
  maxVolume: number
}

const recommendedPools: RecommendedPool[] = [
  {
    id: 'intex-metal-frame-300x200',
    name: 'Basen prostokątny 300×200×75 cm',
    brand: 'Intex',
    volumeM3: 4.5,
    shape: 'rectangle',
    dimensions: '300 × 200 cm',
    depth: '75 cm',
    affiliateUrl: 'https://amzn.to/4yaKXb7',
    features: ['Stelaż metalowy', 'Folia 0.40 mm', 'Pompa filtrująca w zestawie', 'Łatwy montaż bez narzędzi'],
    image: '/4.5.jpg',
    minVolume: 3,
    maxVolume: 5,
  },
  {
    id: 'bestway-small-189x128x59',
    name: 'Basen 189×128×59 cm',
    brand: 'Generic',
    volumeM3: 1.43,
    shape: 'rectangle',
    dimensions: '189 × 128 cm',
    depth: '59 cm',
    affiliateUrl: 'https://amzn.to/4yiPmsH',
    features: ['Bardzo wytrzymały', 'Pompa filtrująca w zestawie', 'Pokrywa basenu'],
    image: '/basen.jpg',
    minVolume: 0,
    maxVolume: 2.93,
  },
  {
    id: 'bestway-medium-387x168x66',
    name: 'Basen 387×168×66 cm',
    brand: 'Generic',
    volumeM3: 4.29,
    shape: 'rectangle',
    dimensions: '387 × 168 cm',
    depth: '66 cm',
    affiliateUrl: 'https://amzn.to/4aK2nBk',
    features: ['Bardzo wytrzymały', 'Pompa filtrująca w zestawie', 'Pokrywa basenu'],
    image: '/basen.jpg',
    minVolume: 2.29,
    maxVolume: 6.29,
  },
  {
    id: 'bestway-large-453x208x84',
    name: 'Basen 453×208×84 cm',
    brand: 'Generic',
    volumeM3: 7.92,
    shape: 'rectangle',
    dimensions: '453 × 208 cm',
    depth: '84 cm',
    affiliateUrl: 'https://amzn.to/4h0iezt',
    features: ['Bardzo wytrzymały', 'Pompa filtrująca w zestawie', 'Pokrywa basenu'],
    image: '/basen.jpg',
    minVolume: 4.92,
    maxVolume: 10.92,
  },
]

export default function PoolVolumeCalculatorClient() {
  const [dimensions, setDimensions] = useState<PoolDimensions>({
    length: 8,
    width: 4,
    depth: 1.5,
    shape: 'rectangle',
  })

  const [volumeLiters, setVolumeLiters] = useState<number | null>(null)

  const calculateVolumeLiters = (): number => {
    const length = dimensions.length || 0
    const width = dimensions.width || 0
    const depth = dimensions.depth || 0

    if (dimensions.shape === 'rectangle') {
      return length * width * depth * 1000
    }

    const radius = length / 2
    return Math.PI * radius * radius * depth * 1000
  }

  const calculate = () => {
    setVolumeLiters(calculateVolumeLiters())
  }

  const incrementValue = (field: keyof PoolDimensions) => {
    if (field === 'shape') return
    setDimensions((prev) => ({
      ...prev,
      [field]: ((prev[field] as number) || 0) + 0.1,
    }))
  }

  const decrementValue = (field: keyof PoolDimensions) => {
    if (field === 'shape') return
    setDimensions((prev) => ({
      ...prev,
      [field]: Math.max(0.1, ((prev[field] as number) || 0) - 0.1),
    }))
  }

  const volumeM3 = volumeLiters ? volumeLiters / 1000 : null

  const visiblePools = volumeM3 !== null
    ? recommendedPools.filter((p) => volumeM3 >= p.minVolume && volumeM3 <= p.maxVolume)
          .sort((a, b) => Math.abs(a.volumeM3 - volumeM3) - Math.abs(b.volumeM3 - volumeM3))
    : []

  const bestMatchId = visiblePools[0]?.id

  const isBestMatch = (pool: RecommendedPool) => {
    if (volumeM3 === null || !bestMatchId) return false
    const diff = Math.abs(pool.volumeM3 - volumeM3)
    return pool.id === bestMatchId && diff <= volumeM3 * 0.3
  }

  return (
    <div className="py-20 bg-blue-50/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="p-8 sm:p-12">
            {/* Shape Selection */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <span className="material-icons-round text-blue-500">pool</span>
                Wybierz kształt basenu
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="cursor-pointer relative">
                  <input
                    checked={dimensions.shape === 'rectangle'}
                    onChange={() => setDimensions((prev) => ({ ...prev, shape: 'rectangle' }))}
                    className="peer sr-only"
                    name="pool_shape"
                    type="radio"
                  />
                  <div className="p-4 rounded-xl border-2 border-slate-200 bg-blue-50 peer-checked:border-blue-500 peer-checked:bg-blue-100 transition-all flex items-center gap-3">
                    <span className="material-icons-round text-slate-400 peer-checked:text-blue-500">crop_landscape</span>
                    <div>
                      <span className="font-medium text-slate-700">Prostokątny</span>
                      <span className="text-sm text-slate-500 block">Standardowy kształt</span>
                    </div>
                  </div>
                </label>

                <label className="cursor-pointer relative">
                  <input
                    checked={dimensions.shape === 'round'}
                    onChange={() => setDimensions((prev) => ({ ...prev, shape: 'round' }))}
                    className="peer sr-only"
                    name="pool_shape"
                    type="radio"
                  />
                  <div className="p-4 rounded-xl border-2 border-slate-200 bg-slate-50 peer-checked:border-blue-500 peer-checked:bg-blue-50 transition-all flex items-center gap-3">
                    <span className="material-icons-round text-slate-400 peer-checked:text-blue-500">circle</span>
                    <div>
                      <span className="font-medium text-slate-700">Okrągły</span>
                      <span className="text-sm text-slate-500 block">Basen rozporowy/stelażowy</span>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Dimensions */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <span className="material-icons-round text-blue-500">straighten</span>
                Wymiary basenu
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-base font-medium text-slate-900 mb-2">
                    {dimensions.shape === 'round' ? 'Średnica basenu' : 'Długość basenu'}
                  </label>
                  <div className="relative">
                    <input
                      value={dimensions.length}
                      onChange={(e) => {
                        const value = e.target.value
                        if (value === '') { setDimensions((prev) => ({ ...prev, length: '' })); return }
                        if (value.length > 1 && value.startsWith('0') && !value.startsWith('0.')) return
                        const parsed = parseFloat(value)
                        if (!Number.isNaN(parsed)) setDimensions((prev) => ({ ...prev, length: parsed }))
                      }}
                      className="w-full rounded-xl border-slate-300 bg-white text-slate-900 focus:border-blue-500 focus:ring-blue-500 py-3 pl-4 pr-28 shadow-sm placeholder-slate-300"
                      placeholder={dimensions.shape === 'round' ? 'np. 4.0' : 'np. 8.0'}
                      type="number"
                      step="0.1"
                      min="0.1"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-stretch rounded-r-xl overflow-hidden border-l border-slate-300">
                      <div className="flex items-center px-3 text-slate-500 text-sm bg-white pointer-events-none">metry</div>
                      <div className="flex flex-col bg-white">
                        <button type="button" onClick={() => incrementValue('length')} className="flex-1 px-3 hover:bg-slate-100 text-slate-500">
                          <span className="material-icons-round text-xs">expand_less</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => decrementValue('length')}
                          className="flex-1 px-3 hover:bg-slate-100 text-slate-500 border-t border-slate-300"
                        >
                          <span className="material-icons-round text-xs">expand_more</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {dimensions.shape === 'rectangle' && (
                  <div>
                    <label className="block text-base font-medium text-slate-900 mb-2">Szerokość basenu</label>
                    <div className="relative">
                      <input
                        value={dimensions.width}
                        onChange={(e) => {
                          const value = e.target.value
                          if (value === '') { setDimensions((prev) => ({ ...prev, width: '' })); return }
                          if (value.length > 1 && value.startsWith('0') && !value.startsWith('0.')) return
                          const parsed = parseFloat(value)
                          if (!Number.isNaN(parsed)) setDimensions((prev) => ({ ...prev, width: parsed }))
                        }}
                        className="w-full rounded-xl border-slate-300 bg-white text-slate-900 focus:border-blue-500 focus:ring-blue-500 py-3 pl-4 pr-28 shadow-sm placeholder-slate-300"
                        placeholder="np. 4.0"
                        type="number"
                        step="0.1"
                        min="0.1"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-stretch rounded-r-xl overflow-hidden border-l border-slate-300">
                        <div className="flex items-center px-3 text-slate-500 text-sm bg-white pointer-events-none">metry</div>
                        <div className="flex flex-col bg-white">
                          <button type="button" onClick={() => incrementValue('width')} className="flex-1 px-3 hover:bg-slate-100 text-slate-500">
                            <span className="material-icons-round text-xs">expand_less</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => decrementValue('width')}
                            className="flex-1 px-3 hover:bg-slate-100 text-slate-500 border-t border-slate-300"
                          >
                            <span className="material-icons-round text-xs">expand_more</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-base font-medium text-slate-900 mb-2">Głębokość (średnia)</label>
                <div className="relative">
                  <input
                    value={dimensions.depth}
                    onChange={(e) => {
                      const value = e.target.value
                      if (value === '') { setDimensions((prev) => ({ ...prev, depth: '' })); return }
                      if (value.length > 1 && value.startsWith('0') && !value.startsWith('0.')) return
                      const parsed = parseFloat(value)
                      if (!Number.isNaN(parsed)) setDimensions((prev) => ({ ...prev, depth: parsed }))
                    }}
                    className="w-full rounded-xl border-slate-300 bg-white text-slate-900 focus:border-blue-500 focus:ring-blue-500 py-3 pl-4 pr-28 shadow-sm placeholder-slate-300"
                    placeholder="np. 1.5"
                    type="number"
                    step="0.1"
                    min="0.1"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-stretch rounded-r-xl overflow-hidden border-l border-slate-300">
                    <div className="flex items-center px-3 text-slate-500 text-sm bg-white pointer-events-none">metry</div>
                    <div className="flex flex-col bg-white">
                      <button type="button" onClick={() => incrementValue('depth')} className="flex-1 px-3 hover:bg-slate-100 text-slate-500">
                        <span className="material-icons-round text-xs">expand_less</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => decrementValue('depth')}
                        className="flex-1 px-3 hover:bg-slate-100 text-slate-500 border-t border-slate-300"
                      >
                        <span className="material-icons-round text-xs">expand_more</span>
                      </button>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-slate-500 mt-2">Jeśli dno jest spadziste, podaj wartość uśrednioną (głębokość min + max) / 2.</p>
              </div>
            </div>

            <button
              onClick={calculate}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-500 text-white font-bold py-4 px-6 rounded-xl hover:shadow-lg hover:opacity-95 transition-all transform hover:scale-[1.01] flex items-center justify-center gap-2 text-lg"
            >
              <span className="material-icons-round">calculate</span>
              Oblicz objętość basenu
            </button>

            {volumeLiters !== null && (
              <div className="mt-10 p-6 bg-blue-50 rounded-2xl border border-blue-200">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Wynik</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <div className="text-sm text-slate-500">Objętość w litrach</div>
                    <div className="mt-1 text-2xl font-extrabold text-slate-900">{Math.round(volumeLiters).toLocaleString('pl-PL')} L</div>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <div className="text-sm text-slate-500">Objętość w m³</div>
                    <div className="mt-1 text-2xl font-extrabold text-slate-900">{(volumeM3 ?? 0).toFixed(2)} m³</div>
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <p className="text-sm text-slate-600 self-center sm:self-auto sm:flex-1">
                    Masz już objętość? Teraz możesz szybko obliczyć dawkowanie chloru.
                  </p>
                  <Link
                    href="/kalkulator-chloru-do-basenu"
                    className="inline-flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-5 rounded-xl transition-colors sm:ml-auto"
                  >
                    Przejdź do kalkulatora chloru
                  </Link>
                </div>
              </div>
            )}

            {volumeLiters !== null && volumeM3 !== null && visiblePools.length > 0 && (
              <div className="mt-8">
                <div className="flex items-center gap-2 mb-1">
                  <span className="material-icons-round text-blue-500">recommend</span>
                  <h3 className="text-lg font-bold text-slate-900">Polecane baseny</h3>
                </div>
                <p className="text-sm text-slate-500 mb-5">
                  Baseny o objętości zbliżonej do obliczonej ({volumeM3.toFixed(1)} m³)
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {visiblePools.map((pool) => (
                    <div
                      key={pool.id}
                      className={`rounded-2xl border-2 bg-white overflow-hidden flex flex-col transition-all hover:shadow-lg ${
                        isBestMatch(pool) ? 'border-blue-400' : 'border-slate-200'
                      }`}
                    >
                      <a href={pool.affiliateUrl} target="_blank" rel="sponsored nofollow" className="relative h-48 bg-white flex items-center justify-center overflow-hidden group">
                        {isBestMatch(pool) && (
                          <span className="absolute top-3 left-3 z-10 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                            Najlepsze dopasowanie
                          </span>
                        )}
                        {pool.image ? (
                          <img src={pool.image} alt={`${pool.brand} ${pool.name}`} className="max-w-full max-h-full object-contain p-2 transition-transform group-hover:scale-105" />
                        ) : (
                          <span className="material-icons-round text-7xl text-blue-200">pool</span>
                        )}
                      </a>

                      <div className="p-5 flex flex-col flex-1">
                        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{pool.brand}</div>
                        <div className="font-bold text-slate-900 mt-1">{pool.name}</div>

                        <div className="flex flex-wrap items-center gap-2 mt-3">
                          <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-sm font-semibold px-3 py-1 rounded-lg">
                            <span className="material-icons-round text-sm">water_drop</span>
                            {pool.volumeM3} m³
                          </span>
                          <span className="text-sm text-slate-500">{pool.dimensions} × {pool.depth}</span>
                        </div>

                        <ul className="mt-4 space-y-1.5 flex-1">
                          {pool.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                              <span className="material-icons-round text-emerald-500 text-sm mt-0.5">check_circle</span>
                              {feature}
                            </li>
                          ))}
                        </ul>

                        <a
                          href={pool.affiliateUrl}
                          target="_blank"
                          rel="sponsored nofollow"
                          className="mt-5 w-full inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-4 rounded-xl transition-colors"
                        >
                          Sprawdź na Amazon
                          <span className="material-icons-round text-lg">open_in_new</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
