import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { SiteConfigProvider } from '@/lib/site-config'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair'
});

export const metadata: Metadata = {
  title: 'Novair - Donner une seconde vie aux téléphones pour sauver des vies',
  description: 'Novair récupère et répare des téléphones pour les donner aux personnes sans-abri, leur permettant d\'appeler les secours en cas d\'urgence. Association étudiante engagée dans la solidarité numérique.',
  keywords: ['Novair', 'téléphones', 'sans-abri', 'solidarité', 'association', 'urgence', 'recyclage', 'numérique inclusif', 'SAMU Social', 'Maraude'],
  authors: [{ name: 'Novair Association' }],
  creator: 'Novair Association',
  publisher: 'Novair Association',
  robots: 'index, follow',
  generator: 'Next.js',
  metadataBase: new URL('https://novair.fr'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://novair.fr',
    siteName: 'Novair',
    title: 'Novair - Donner une seconde vie aux téléphones pour sauver des vies',
    description: 'Novair récupère et répare des téléphones pour les donner aux personnes sans-abri, leur permettant d\'appeler les secours en cas d\'urgence.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Novair - Donner une seconde vie aux téléphones',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Novair - Donner une seconde vie aux téléphones pour sauver des vies',
    description: 'Novair récupère et répare des téléphones pour les donner aux personnes sans-abri.',
    images: ['/og-image.jpg'],
    creator: '@novair',
  },
  verification: {
    google: 'your-google-verification-code', // À remplacer par votre code
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <SiteConfigProvider>
          {children}
        </SiteConfigProvider>
        <Analytics />
      </body>
    </html>
  )
}
