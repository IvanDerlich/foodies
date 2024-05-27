import MainHeader from '@/components/MainHeader'
import { ToastContainer } from 'react-toastify'
import './globals.css'
import 'react-toastify/dist/ReactToastify.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | NextLevel Food by Ivan Derlich',
    default: 'NextLevel Food by Ivan Derlich',
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
    siteName: 'Food App by Ivan Derlich',
    description:
      'Deelicious meals, shared by a food-loving community. Created by Ivan Derlich following a tutorial by Maximillian Schwarzmüller.',
    images: [
      {
        url: 'https://blob.ivanderlich.com/foodies/meals/seed/OMpmNFLwlBTZ020-burger.jpg',
        width: 800,
        height: 600,
        alt: 'A delicious burger',
      },
    ],
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
