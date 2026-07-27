'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'

interface PoolDimensions {
  length: number | ''
  width: number | ''
  depth: number | ''
  shape: 'rectangle' | 'round' | 'oval'
}

interface PhProduct {
  name: string
  namePlus?: string
  minusPer10m3Per01: number
  plusPer10m3Per01: number
  unit: 'g'
  allegroUrlMinus?: string
  allegroUrlPlus?: string
  image?: string
  imagePlus?: string
}

interface CalculatedPhProduct {
  name: string
  namePlus?: string
  phMinus: string
  phPlus: string
  allegroUrlMinus?: string
  allegroUrlPlus?: string
  image?: string
  imagePlus?: string
}

export default function PhWaterCalculatorClient() {
  const [dimensions, setDimensions] = useState<PoolDimensions>({
    length: 8,
    width: 4,
    depth: 1.5,
    shape: 'rectangle',
  })

  const [measuredPh, setMeasuredPh] = useState<number | ''>(7.2)
  const [targetPh, setTargetPh] = useState<number | ''>(7.4)

  const [volumeLiters, setVolumeLiters] = useState<number | null>(null)
  const [products, setProducts] = useState<CalculatedPhProduct[] | null>(null)

  const phProducts: PhProduct[] = [
    { name: 'Gamix pH Minus', namePlus: 'Gamix pH Plus', minusPer10m3Per01: 100, plusPer10m3Per01: 100, unit: 'g', allegroUrlMinus: 'https://allegro.pl/oferta/gamix-regulator-ph-minus-granulat-4-5kg-do-basenu-obniza-ph-wody-ph-18444785220?utm_medium=afiliacja&utm_source=ctr_2&utm_campaign=d20953fc-d7a0-439f-a0d9-ef4f03649fc1&utm_content=7cf0f344eb4c#', allegroUrlPlus: 'https://allegro.pl/oferta/ph-plus-do-basenu-regulator-ph-wody-chemia-basenowa-4kg-gamix-do-2030-15579385986?utm_medium=afiliacja&utm_source=ctr_2&utm_campaign=d20953fc-d7a0-439f-a0d9-ef4f03649fc1&utm_content=43bc5287b516#', image: '/gamix-ph-minus.jpg', imagePlus: '/gamix-ph-plus.jpg' },
    { name: 'Bayrol pH Minus', namePlus: 'Bayrol pH Plus', minusPer10m3Per01: 100, plusPer10m3Per01: 100, unit: 'g', allegroUrlMinus: 'https://allegro.pl/oferta/bayrol-ph-minus-6kg-za-wysokie-ph-wody-basen-12548095642?utm_medium=afiliacja&utm_source=ctr_2&utm_campaign=d20953fc-d7a0-439f-a0d9-ef4f03649fc1&utm_content=0e5ead213d2f#', allegroUrlPlus: 'https://allegro.pl/oferta/granulat-podwyzszanie-ph-wody-w-basenie-bayrol-ph-plus-regulator-ph-5kg-15383077624?utm_medium=afiliacja&utm_source=ctr_2&utm_campaign=d20953fc-d7a0-439f-a0d9-ef4f03649fc1&utm_content=9b5d55b61603#', image: '/bayrol-ph-minus.jpg', imagePlus: '/bayrol-ph-plus.jpg' },
    { name: 'Chemoform pH Minus', namePlus: 'Chemoform pH Plus', minusPer10m3Per01: 75, plusPer10m3Per01: 50, unit: 'g', allegroUrlMinus: 'https://allegro.pl/oferta/granulat-chemoform-ph-minus-5-kg-do-obnizania-ph-w-wodzie-basenowej-18358141481?utm_medium=afiliacja&utm_source=ctr_2&utm_campaign=d20953fc-d7a0-439f-a0d9-ef4f03649fc1&utm_content=fa2b0852d053#', allegroUrlPlus: 'https://allegro.pl/oferta/ph-plus-chemia-basenowa-do-podwyzszania-ph-wody-basen-jacuzi-chemoform-3kg-7466775137?utm_medium=afiliacja&utm_source=ctr_2&utm_campaign=d20953fc-d7a0-439f-a0d9-ef4f03649fc1&utm_content=a002400f1ff3#', image: '/chemoform-ph-minus.jpg', imagePlus: '/chemoform-ph-plus.jpg' },
    { name: 'HTH pH Minus', minusPer10m3Per01: 75, plusPer10m3Per01: 0, unit: 'g', allegroUrlMinus: 'https://allegro.pl/oferta/hth-ph-minus-obniza-ph-wody-granulat-do-basenu-5kg-9841789849?utm_medium=afiliacja&utm_source=ctr_2&utm_campaign=d20953fc-d7a0-439f-a0d9-ef4f03649fc1&utm_content=55de00fec060#', image: '/hth-ph-minus.jpg' },
  ]

  const calculateVolumeLiters = (): number => {
    const length = dimensions.length || 0
    const width = dimensions.width || 0
    const depth = dimensions.depth || 0

    if (dimensions.shape === 'rectangle') {
      return length * width * depth * 1000
    }

    if (dimensions.shape === 'oval') {
      const a = length / 2
      const b = width / 2
      return Math.PI * a * b * depth * 1000
    }

    const radius = length / 2
    return Math.PI * radius * radius * depth * 1000
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

  const delta = useMemo(() => {
    const t = targetPh || 0
    const m = measuredPh || 0
    const d = t - m
    return Number.isFinite(d) ? d : 0
  }, [targetPh, measuredPh])

  const directionLabel = delta === 0 ? 'Bez zmian' : delta > 0 ? 'Podnieś pH' : 'Obniż pH'

  const calculate = () => {
    const vLiters = calculateVolumeLiters()
    const volumeM3 = vLiters / 1000

    const steps01 = Math.round((Math.abs(delta) / 0.1) * 100) / 100

    const relevantProducts = phProducts.filter((p) => {
      if (delta > 0) return p.plusPer10m3Per01 > 0
      if (delta < 0) return p.minusPer10m3Per01 > 0
      return true
    })

    const calculated = relevantProducts.map((p) => {
      const minusGrams = volumeM3 * (p.minusPer10m3Per01 / 10) * steps01
      const plusGrams = volumeM3 * (p.plusPer10m3Per01 / 10) * steps01

      const showMinus = delta < 0
      const showPlus = delta > 0

      const minusText = steps01 === 0 ? '—' : showMinus ? (p.minusPer10m3Per01 > 0 ? `${Math.round(minusGrams)} ${p.unit}` : 'nie dotyczy') : '—'
      const plusText = steps01 === 0 ? '—' : showPlus ? (p.plusPer10m3Per01 > 0 ? `${Math.round(plusGrams)} ${p.unit}` : 'nie dotyczy') : '—'

      return {
        name: p.name,
        namePlus: p.namePlus,
        phMinus: minusText,
        phPlus: plusText,
        allegroUrlMinus: p.allegroUrlMinus,
        allegroUrlPlus: p.allegroUrlPlus,
        image: p.image,
        imagePlus: p.imagePlus,
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
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <label className="cursor-pointer relative h-full">
                  <input
                    checked={dimensions.shape === 'rectangle'}
                    onChange={() => setDimensions((prev) => ({ ...prev, shape: 'rectangle' }))}
                    className="peer sr-only"
                    name="pool_shape"
                    type="radio"
                  />
                  <div className="p-4 rounded-xl border-2 border-slate-200 bg-blue-50 peer-checked:border-blue-500 peer-checked:bg-blue-100 transition-all flex items-center gap-3 h-full">
                    <span className="material-icons-round text-slate-400 peer-checked:text-blue-500">crop_landscape</span>
                    <div>
                      <span className="font-medium text-slate-700">Prostokątny</span>
                      <span className="text-sm text-slate-500 block">Standardowy kształt</span>
                    </div>
                  </div>
                </label>
                <label className="cursor-pointer relative h-full">
                  <input
                    checked={dimensions.shape === 'oval'}
                    onChange={() => setDimensions((prev) => ({ ...prev, shape: 'oval' }))}
                    className="peer sr-only"
                    name="pool_shape"
                    type="radio"
                  />
                  <div className="p-4 rounded-xl border-2 border-slate-200 bg-slate-50 peer-checked:border-blue-500 peer-checked:bg-blue-50 transition-all flex items-center gap-3 h-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-400 peer-checked:text-blue-500"><ellipse cx="12" cy="12" rx="10" ry="6" /></svg>
                    <div>
                      <span className="font-medium text-slate-700">Owalny</span>
                      <span className="text-sm text-slate-500 block">Zaokrąglone boki</span>
                    </div>
                  </div>
                </label>
                <label className="cursor-pointer relative h-full">
                  <input
                    checked={dimensions.shape === 'round'}
                    onChange={() => setDimensions((prev) => ({ ...prev, shape: 'round' }))}
                    className="peer sr-only"
                    name="pool_shape"
                    type="radio"
                  />
                  <div className="p-4 rounded-xl border-2 border-slate-200 bg-slate-50 peer-checked:border-blue-500 peer-checked:bg-blue-50 transition-all flex items-center gap-3 h-full">
                    <span className="material-icons-round text-slate-400 peer-checked:text-blue-500">circle</span>
                    <div>
                      <span className="font-medium text-slate-700">Okrągły</span>
                      <span className="text-sm text-slate-500 block">Symetryczny kształt</span>
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

                {(dimensions.shape === 'rectangle' || dimensions.shape === 'oval') && (
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

              <div className="mb-2">
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
                    onChange={(e) => {
                      const value = e.target.value
                      if (value === '') { setMeasuredPh(''); return }
                      const parsed = parseFloat(value)
                      if (!Number.isNaN(parsed)) setMeasuredPh(parsed)
                    }}
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
                    onChange={(e) => {
                      const value = e.target.value
                      if (value === '') { setTargetPh(''); return }
                      const parsed = parseFloat(value)
                      if (!Number.isNaN(parsed)) setTargetPh(parsed)
                    }}
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
                    {(measuredPh || 0).toFixed(1)} → {(targetPh || 0).toFixed(1)} (Δ {delta > 0 ? '+' : ''}{delta.toFixed(2)})
                  </span>
                </div>

                <h3 className="font-semibold text-slate-900 mb-3">Porównanie produktów do korekty pH:</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {products.map((product) => (
                    <div key={product.name} className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
                      <div className="p-4 flex gap-4">
                        <div className="w-20 h-20 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 overflow-hidden">
                          {(delta < 0 ? product.image : product.imagePlus) ? (
                            <img src={delta < 0 ? product.image : product.imagePlus} alt={product.name} className="max-w-full max-h-full object-contain p-1" />
                          ) : (
                            <span className="material-icons-round text-3xl text-slate-300">science</span>
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-slate-900 leading-tight">{delta < 0 ? product.name : (product.namePlus || product.name)}</div>
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

                      {((product.allegroUrlMinus && delta < 0) || (product.allegroUrlPlus && delta > 0)) && (
                        <div className="border-t border-slate-200 p-4">
                          {delta < 0 && product.allegroUrlMinus && (
                            <a
                              href="#"
                              data-href={product.allegroUrlMinus}
                              onClick={(e) => { e.preventDefault(); window.open(product.allegroUrlMinus, '_blank', 'noopener,noreferrer') }}
                              rel="sponsored nofollow"
                              className="w-full inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-xl transition-colors"
                            >
                              <span className="material-icons-round text-lg">shopping_cart</span>
                              Kup teraz na Allegro
                            </a>
                          )}
                          {delta > 0 && product.allegroUrlPlus && (
                            <a
                              href="#"
                              data-href={product.allegroUrlPlus}
                              onClick={(e) => { e.preventDefault(); window.open(product.allegroUrlPlus, '_blank', 'noopener,noreferrer') }}
                              rel="sponsored nofollow"
                              className="w-full inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-xl transition-colors"
                            >
                              <span className="material-icons-round text-lg">shopping_cart</span>
                              Kup teraz na Allegro
                            </a>
                          )}
                        </div>
                      )}
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
