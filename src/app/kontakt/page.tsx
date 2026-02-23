import type { Metadata } from 'next'

import ContactFormClient from '@/components/ContactFormClient'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'Kontakt | Basenomat.pl',
  description:
    'Skontaktuj się z nami. Wyślij wiadomość przez formularz kontaktowy — odpowiemy najszybciej jak to możliwe.',
}

export default function KontaktPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">Kontakt</h1>
          <p className="mt-3 text-slate-600">
            Masz pytanie lub sugestię? Skorzystaj z formularza poniżej.
          </p>

          <div className="mt-10">
            <ContactFormClient />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
