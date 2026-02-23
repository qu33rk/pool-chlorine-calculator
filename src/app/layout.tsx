import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Basenomat.pl - Twój asystent w pielęgnacji basenu',
  description: 'Zadbaj o krystalicznie czystą wodę bez skomplikowanych obliczeń. Nasze narzędzia pomogą Ci precyzyjnie dobrać chemię basenową w kilka sekund.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl" className="bg-blue-50 text-slate-800 font-sans antialiased">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
