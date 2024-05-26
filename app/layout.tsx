import MainHeader from '@/components/MainHeader'
import { ToastContainer } from 'react-toastify'
import './globals.css'
import 'react-toastify/dist/ReactToastify.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | NextLevel Food by Ivan Derlich',
    default: 'NextLevel Food by Ivan',
  },
  description:
    'Delicious meals, shared by a food-loving community. Created by Ivan Derlich following a tutorial by Maximillian Schwarzmüller.',
  authors: [
    {
      name: 'Ivan Derlich',
      url: 'https://ivanderlich.com',
    },
  ],
  creator: 'Ivan Derlich',
  openGraph: {
    type: 'website',
    siteName: 'NextLevel Food by Ivan Derlich',
    locale: 'en_US',
  },
  twitter: {
    creator: '@ivanderlich',
    site: '@ivanderlich',
    card: 'summary_large_image',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MainHeader />
        {children}
        <ToastContainer pauseOnHover position="top-center" />
      </body>
    </html>
  )
}
