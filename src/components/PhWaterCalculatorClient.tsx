'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'

interface PoolDimensions {
  length: number
  width: number
  depth: number
  shape: 'rectangle' | 'round'
}

interface PhProduct {
  name: string
  minusPer10m3Per01: number
  plusPer10m3Per01: number
  unit: 'g'
}

interface CalculatedPhProduct {
  name: string
  phMinus: string
  phPlus: string
}

export default function PhWaterCalculatorClient() {
  const [dimensions, setDimensions] = useState<PoolDimensions>({
    length: 8,
    width: 4,
    depth: 1.5,
    shape: 'rectangle',
  })

  const [measuredPh, setMeasuredPh] = useState<number>(7.2)
  const [targetPh, setTargetPh] = useState<number>(7.4)

  const [volumeLiters, setVolumeLiters] = useState<number | null>(null)
  const [products, setProducts] = useState<CalculatedPhProduct[] | null>(null)

  const phProducts: PhProduct[] = [
    { name: 'Chemoform', minusPer10m3Per01: 150, plusPer10m3Per01: 150, unit: 'g' },
    { name: 'HTH', minusPer10m3Per01: 150, plusPer10m3Per01: 150, unit: 'g' },
    { name: 'AstralPool', minusPer10m3Per01: 150, plusPer10m3Per01: 150, unit: 'g' },
    { name: 'Bayrol', minusPer10m3Per01: 200, plusPer10m3Per01: 200, unit: 'g' },
  ]

  const calculateVolumeLiters = (): number => {
    if (dimensions.shape === 'rectangle') {
      return dimensions.length * dimensions.width * dimensions.depth * 1000
    }

    const radius = dimensions.length / 2
    return Math.PI * radius * radius * dimensions.depth * 1000
  }

  const incrementValue = (field: keyof PoolDimensions) => {
    if (field === 'shape') return
    setDimensions((prev) => ({
      ...prev,
      [field]: (prev[field] as number) + 0.1,
    }))
  }

  const decrementValue = (field: keyof PoolDimensions) => {
    if (field === 'shape') return
    setDimensions((prev) => ({
      ...prev,
      [field]: Math.max(0.1, (prev[field] as number) - 0.1),
    }))
  }

  const delta = useMemo(() => {
    const d = targetPh - measuredPh
    return Number.isFinite(d) ? d : 0
  }, [targetPh, measuredPh])

  const directionLabel = delta === 0 ? 'Bez zmian' : delta > 0 ? 'Podnieś pH' : 'Obniż pH'

  const calculate = () => {
    const vLiters = calculateVolumeLiters()
    const volumeM3 = vLiters / 1000

    const steps01 = Math.round((Math.abs(delta) / 0.1) * 100) / 100

    const calculated = phProducts.map((p) => {
      const minusGrams = volumeM3 * (p.minusPer10m3Per01 / 10) * steps01
      const plusGrams = volumeM3 * (p.plusPer10m3Per01 / 10) * steps01

      const showMinus = delta < 0
      const showPlus = delta > 0

      const minusText = steps01 === 0 ? '—' : showMinus ? `${Math.round(minusGrams)} ${p.unit}` : '—'
      const plusText = steps01 === 0 ? '—' : showPlus ? `${Math.round(plusGrams)} ${p.unit}` : '—'

      return {
        name: p.name,
        phMinus: minusText,
        phPlus: plusText,
      }
    })

    setVolumeLiters(vLiters)
    setProducts(calculated)
  }

  return (
    <div className="py-20 bg-blue-50/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="p-8 sm:p-12">
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
                        if (value.length > 1 && value.startsWith('0') && !value.startsWith('0.')) return
                        setDimensions((prev) => ({ ...prev, length: parseFloat(value) || 0 }))
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
                          if (value.length > 1 && value.startsWith('0') && !value.startsWith('0.')) return
                          setDimensions((prev) => ({ ...prev, width: parseFloat(value) || 0 }))
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

              <div className="mb-2">
                <label className="block text-base font-medium text-slate-900 mb-2">Głębokość (średnia)</label>
                <div className="relative">
                  <input
                    value={dimensions.depth}
                    onChange={(e) => {
                      const value = e.target.value
                      if (value.length > 1 && value.startsWith('0') && !value.startsWith('0.')) return
                      setDimensions((prev) => ({ ...prev, depth: parseFloat(value) || 0 }))
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

            <div className="mb-8">
              <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <span className="material-icons-round text-blue-500">opacity</span>
                Dane pH
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-base font-medium text-slate-900 mb-2">Zmierzone pH</label>
                  <input
                    value={measuredPh}
                    onChange={(e) => setMeasuredPh(parseFloat(e.target.value) || 0)}
                    className="w-full rounded-xl border-slate-300 bg-white text-slate-900 focus:border-blue-500 focus:ring-blue-500 py-3 px-4 shadow-sm placeholder-slate-300"
                    placeholder="np. 7.2"
                    type="number"
                    step="0.1"
                    min="0"
                    max="14"
                  />
                </div>
                <div>
                  <label className="block text-base font-medium text-slate-900 mb-2">Docelowe pH</label>
                  <input
                    value={targetPh}
                    onChange={(e) => setTargetPh(parseFloat(e.target.value) || 0)}
                    className="w-full rounded-xl border-slate-300 bg-white text-slate-900 focus:border-blue-500 focus:ring-blue-500 py-3 px-4 shadow-sm placeholder-slate-300"
                    placeholder="np. 7.4"
                    type="number"
                    step="0.1"
                    min="0"
                    max="14"
                  />
                </div>
              </div>

              <div className="mt-4 text-sm text-slate-600">
                <span className="font-semibold text-slate-900">Kierunek korekty:</span> {directionLabel}
              </div>
            </div>

            <button
              onClick={calculate}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-500 text-white font-bold py-4 px-6 rounded-xl hover:shadow-lg hover:opacity-95 transition-all transform hover:scale-[1.01] flex items-center justify-center gap-2 text-lg"
            >
              <span className="material-icons-round">calculate</span>
              Oblicz korektę pH
            </button>

            {volumeLiters !== null && products && (
              <div className="mt-10 p-6 bg-blue-50 rounded-2xl border border-blue-200">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Wyniki obliczeń</h2>
                <div className="mb-4">
                  <span className="text-slate-600">Objętość basenu: </span>
                  <span className="font-semibold text-slate-900">{Math.round(volumeLiters).toLocaleString('pl-PL')} litrów</span>
                </div>

                <div className="mb-4">
                  <span className="text-slate-600">Zmiana pH: </span>
                  <span className="font-semibold text-slate-900">
                    {measuredPh.toFixed(1)} → {targetPh.toFixed(1)} (Δ {delta > 0 ? '+' : ''}{delta.toFixed(2)})
                  </span>
                </div>

                <h3 className="font-semibold text-slate-900 mb-3">Porównanie produktów do korekty pH:</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {products.map((product) => (
                    <div key={product.name} className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
                      <div className="p-4 flex gap-4">
                        <div className="w-20 h-20 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 text-xs shrink-0">
                          image
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-slate-900 leading-tight">{product.name}</div>
                          <div className="text-sm text-slate-500 mt-1">Dawki dla Twojej objętości</div>
                        </div>
                      </div>

                      <div className="border-t border-slate-200">
                        <div className="p-4 grid gap-3">
                          <div className="flex items-start justify-between gap-4">
                            <div className="text-sm text-slate-600">pH Minus (obniżenie)</div>
                            <div className="text-sm font-semibold text-slate-900 text-right whitespace-nowrap">{product.phMinus}</div>
                          </div>
                          <div className="flex items-start justify-between gap-4">
                            <div className="text-sm text-slate-600">pH Plus (podwyższenie)</div>
                            <div className="text-sm font-semibold text-slate-900 text-right whitespace-nowrap">{product.phPlus}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                  <p className="text-sm text-slate-600">
                    <strong>Informacja:</strong> Podane dawki są orientacyjne i bazują na tabeli „na 10 m³ i zmianę pH o 0,1”. Zawsze sprawdzaj instrukcje producenta i dodawaj chemię stopniowo, wykonując ponowny pomiar pH.
                  </p>
                </div>

                <div className="mt-4 p-4 bg-red-50 rounded-xl border border-red-200">
                  <p className="text-sm text-slate-700">
                    <strong>Uwaga:</strong> Dawki wyliczono dla wody o średniej twardości i alkaliczności (TAC). Przy bardzo twardej wodzie może być potrzebna większa ilość granulatu, aby skutecznie zmienić pH (przełamać bufor węglanowy). Granulat zawsze rozpuszczaj w wiadrze z wodą przed wlaniem do basenu.
                  </p>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <p className="text-sm text-slate-600 self-center sm:self-auto sm:flex-1">
                    Masz już ustawione pH? Teraz możesz przejść do wyliczenia dawkowania chloru.
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
          </div>
        </div>
      </div>
    </div>
  )
}
