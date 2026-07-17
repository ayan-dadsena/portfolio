import type { Metadata } from 'next'
import { Mona_Sans, Instrument_Serif, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import SmoothScroll from '@/components/SmoothScroll'

// Variable font (wght + wdth axes) — primary sans; both axes drive the
// cursor-proximity effect on the hero name and section headings.
const monaSans = Mona_Sans({
  subsets: ['latin'],
  variable: '--font-mona',
  display: 'swap',
  axes: ['wdth'],
})

const instrument = Instrument_Serif({
  subsets: ['latin'],
  variable: '--font-instrument',
  weight: '400',
  style: ['normal', 'italic'],
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  weight: ['400', '500'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Ayan Dadsena',
  description:
    "Finance @ UT Austin's McCombs. Exploring how finance, strategy, and design come together to empower communities and create lasting value.",
  openGraph: {
    title: 'Ayan Dadsena',
    description:
      "Finance @ UT Austin's McCombs. Exploring how finance, strategy, and design come together to empower communities and create lasting value.",
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${monaSans.variable} ${instrument.variable} ${jetbrains.variable}`}
    >
      <body className="font-body bg-ink text-white antialiased">
        <SmoothScroll />
        {children}
      </body>
    </html>
  )
}
