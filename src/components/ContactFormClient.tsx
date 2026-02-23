'use client'

import { useState } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function ContactFormClient() {
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [company, setCompany] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const canSubmit = Boolean(name.trim()) && Boolean(email.trim()) && Boolean(message.trim())

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!accessKey) {
      setStatus('error')
      setErrorMessage('Brak konfiguracji formularza (ACCESS KEY).')
      return
    }

    if (company) {
      setStatus('success')
      setErrorMessage('')
      setName('')
      setEmail('')
      setMessage('')
      setCompany('')
      return
    }

    setStatus('loading')
    setErrorMessage('')

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: 'Basenomat.pl — wiadomość z formularza kontaktowego',
          from_name: 'Basenomat.pl',
          name,
          email,
          message,
          botcheck: company,
        }),
      })

      const data = (await res.json()) as { success?: boolean; message?: string }

      if (!res.ok || !data?.success) {
        setStatus('error')
        setErrorMessage(data?.message || 'Nie udało się wysłać wiadomości. Spróbuj ponownie za chwilę.')
        return
      }

      setStatus('success')
      setName('')
      setEmail('')
      setMessage('')
      setCompany('')
    } catch {
      setStatus('error')
      setErrorMessage('Nie udało się wysłać wiadomości. Sprawdź połączenie i spróbuj ponownie.')
    }
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
      <div className="p-8 sm:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Napisz do nas</h2>
            <p className="mt-3 text-slate-600">
              Masz pytanie o dawkowanie, chcesz zgłosić błąd w kalkulatorze albo zaproponować nowe narzędzie? Wyślij
              wiadomość — odpowiemy najszybciej jak to możliwe.
            </p>

            <div className="mt-8 space-y-4 text-sm text-slate-600">
              <div className="flex items-start gap-3">
                <span className="material-icons-round text-blue-500">schedule</span>
                <div>
                  <div className="font-semibold text-slate-900">Czas odpowiedzi</div>
                  <div>Zwykle w ciągu 1–2 dni roboczych</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-icons-round text-blue-500">info</span>
                <div>
                  <div className="font-semibold text-slate-900">Wskazówka</div>
                  <div>Jeśli pytasz o basen, podaj proszę przybliżoną objętość w m³.</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="block text-base font-medium text-slate-900 mb-2">Imię</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border-slate-300 bg-white text-slate-900 focus:border-blue-500 focus:ring-blue-500 py-3 px-4 shadow-sm placeholder-slate-300"
                  placeholder="np. Jan"
                  type="text"
                  autoComplete="given-name"
                />
              </div>

              <div>
                <label className="block text-base font-medium text-slate-900 mb-2">E-mail</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border-slate-300 bg-white text-slate-900 focus:border-blue-500 focus:ring-blue-500 py-3 px-4 shadow-sm placeholder-slate-300"
                  placeholder="np. jan@example.com"
                  type="email"
                  autoComplete="email"
                />
              </div>

              <div>
                <label className="block text-base font-medium text-slate-900 mb-2">Wiadomość</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-xl border-slate-300 bg-white text-slate-900 focus:border-blue-500 focus:ring-blue-500 py-3 px-4 shadow-sm placeholder-slate-300 min-h-[140px]"
                  placeholder="Opisz krótko o co chodzi…"
                />
              </div>

              <input
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                type="text"
                name="company"
              />

              {status === 'success' ? (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-900">
                  Wiadomość została wysłana. Dziękujemy!
                </div>
              ) : null}

              {status === 'error' ? (
                <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-rose-900">{errorMessage}</div>
              ) : null}

              <button
                type="submit"
                disabled={!canSubmit || status === 'loading'}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-500 text-white font-bold py-4 px-6 rounded-xl hover:shadow-lg hover:opacity-95 transition-all transform hover:scale-[1.01] flex items-center justify-center gap-2 text-lg disabled:opacity-60 disabled:hover:shadow-none disabled:hover:scale-100"
              >
                <span className="material-icons-round">send</span>
                {status === 'loading' ? 'Wysyłanie…' : 'Wyślij wiadomość'}
              </button>

              <p className="text-xs text-slate-500">
                Formularz działa dzięki Web3Forms. Twoje dane są wykorzystywane wyłącznie do obsługi zapytania.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
