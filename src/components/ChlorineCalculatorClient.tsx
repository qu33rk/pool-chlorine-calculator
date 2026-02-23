'use client'

import { useState } from 'react'
import Link from 'next/link'

interface PoolDimensions {
  length: number | ''
  width: number | ''
  depth: number | ''
  shape: 'rectangle' | 'round'
}

interface GranularProduct {
  name: string
  firstFillMin: number
  firstFillMax: number | null
  shockCloudy: number
  shockAlgae: number
  unit: string
}

interface CalculatedProduct {
  name: string
  firstFill: string
  shockCloudy: string
  shockAlgae: string
}

interface CalculationResult {
  volume: number
  products: CalculatedProduct[]
}

export default function ChlorineCalculatorClient() {
  const [dimensions, setDimensions] = useState<PoolDimensions>({
    length: 8,
    width: 4,
    depth: 1.5,
    shape: 'rectangle',
  })

  const [result, setResult] = useState<CalculationResult | null>(null)

  // Real granular chlorine products from reference table (dosage per 10 m³ in grams, converted to per m³)
  const granularProducts: GranularProduct[] = [
    { name: 'Chemoform T65', firstFillMin: 3.5, firstFillMax: 8, shockCloudy: 7, shockAlgae: 10, unit: 'g' },
    { name: 'HTH Shock', firstFillMin: 0, firstFillMax: null, shockCloudy: 15, shockAlgae: 25, unit: 'g' },
    { name: 'AstralPool Szok', firstFillMin: 1, firstFillMax: 3, shockCloudy: 15, shockAlgae: 0, unit: 'g' },
    { name: 'Bayrol Chlorifix', firstFillMin: 5, firstFillMax: null, shockCloudy: 20, shockAlgae: 20, unit: 'g' },
  ]

  const calculateVolume = (): number => {
    const length = dimensions.length || 0
    const width = dimensions.width || 0
    const depth = dimensions.depth || 0

    if (dimensions.shape === 'rectangle') {
      return length * width * depth * 1000
    }

    const radius = length / 2
    return Math.PI * radius * radius * depth * 1000
  }

  const calculateChemistry = () => {
    const volume = calculateVolume()
    const volumeInM3 = volume / 1000

    const calculatedProducts = granularProducts.map((product) => {
      const firstFillDosage = product.firstFillMax
        ? `${Math.round(volumeInM3 * product.firstFillMin)}-${Math.round(volumeInM3 * product.firstFillMax)} ${product.unit}`
        : product.firstFillMin > 0
          ? `${Math.round(volumeInM3 * product.firstFillMin)} ${product.unit}`
          : 'nie dotyczy'

      const shockCloudyDosage = product.shockCloudy > 0 ? `${Math.round(volumeInM3 * product.shockCloudy)} ${product.unit}` : '—'

      const shockAlgaeDosage = product.shockAlgae > 0 ? `${Math.round(volumeInM3 * product.shockAlgae)} ${product.unit}` : '—'

      return {
        name: product.name,
        firstFill: firstFillDosage,
        shockCloudy: shockCloudyDosage,
        shockAlgae: shockAlgaeDosage,
      }
    })

    setResult({
      volume,
      products: calculatedProducts,
    })
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

            {/* Dimensions Input */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <span className="material-icons-round text-blue-500">straighten</span>
                Wymiary basenu
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-base font-medium text-slate-900 mb-2">Długość basenu</label>
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
                      placeholder="np. 8.0"
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
              onClick={calculateChemistry}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-500 text-white font-bold py-4 px-6 rounded-xl hover:shadow-lg hover:opacity-95 transition-all transform hover:scale-[1.01] flex items-center justify-center gap-2 text-lg"
            >
              <span className="material-icons-round">calculate</span>
              Oblicz dawkowanie chloru
            </button>

            {/* Results */}
            {result && (
              <div className="mt-10 p-6 bg-blue-50 rounded-2xl border border-blue-200">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Wyniki obliczeń</h2>
                <div className="mb-4">
                  <span className="text-slate-600">Objętość basenu: </span>
                  <span className="font-semibold text-slate-900">{result.volume.toLocaleString('pl-PL')} litrów</span>
                </div>

                <h3 className="font-semibold text-slate-900 mb-3">Porównanie produktów chloru w granulacie:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {result.products.map((product) => (
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
                            <div className="text-sm text-slate-600">Pierwsze napełnienie / cotygodniowa pielęgnacja</div>
                            <div className="text-sm font-semibold text-slate-900 text-right whitespace-nowrap">{product.firstFill}</div>
                          </div>
                          <div className="flex items-start justify-between gap-4">
                            <div className="text-sm text-slate-600">Szok / mętna woda</div>
                            <div className="text-sm font-semibold text-slate-900 text-right whitespace-nowrap">{product.shockCloudy}</div>
                          </div>
                          <div className="flex items-start justify-between gap-4">
                            <div className="text-sm text-slate-600">Szok przy glonach</div>
                            <div className="text-sm font-semibold text-slate-900 text-right whitespace-nowrap">{product.shockAlgae}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                  <p className="text-sm text-slate-600">
                    <strong>Ważne:</strong> Pamiętaj, że podane wartości są orientacyjne. Zawsze sprawdzaj instrukcję na opakowaniu konkretnego producenta chemii basenowej.
                  </p>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <p className="text-sm text-slate-600 self-center sm:self-auto sm:flex-1">
                    Prawidłowe pH jest ważne, aby chlor działał skutecznie. Sprawdź i w razie potrzeby skoryguj pH przed chlorowaniem.
                  </p>
                  <Link
                    href="/kalkulator-ph-wody"
                    className="inline-flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-5 rounded-xl transition-colors sm:ml-auto"
                  >
                    Przejdź do kalkulatora pH
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
