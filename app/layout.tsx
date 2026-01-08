// ===========================================
// Layout Principal (Root Layout)
// ===========================================
import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Meu Arsenal - Produtividade Dev',
  description: 'Centralize prompts, templates, snippets, ferramentas e checklists para desenvolvedores',
  keywords: ['produtividade', 'desenvolvedores', 'prompts', 'templates', 'snippets'],
  authors: [{ name: 'Arsenal Dev' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#0a0a0b',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`dark ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-arsenal-bg text-arsenal-text antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
