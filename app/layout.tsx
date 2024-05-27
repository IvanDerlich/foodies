import MainHeader from '@/components/MainHeader'
import { ToastContainer } from 'react-toastify'
import './globals.css'
import 'react-toastify/dist/ReactToastify.css'
import type { Metadata } from 'next'

const info = {
  images: [
    {
      url: 'https://blob.ivanderlich.com/foodies/meals/seed/OMpmNFLwlBTZ020-burger.jpg',
      width: 800,
      height: 600,
      alt: 'A delicious burger',
    },
  ],
  description:
    'Delicious meals, shared by a food-oving community. Created by Ivan Derlich following a tutorial by Maximillian Schwarzmüller.',
  title: 'NextLevel Food by Ivan Derlich',
}

export const metadata: Metadata = {
  title: {
    template: '%s | NextLevel Food by Ivan Derlich',
    default: info.title,
  },
  description: info.description,
  authors: [
    {
      name: 'Ivan Derlich',
      url: 'https://ivanderlich.com',
    },
  ],
  creator: 'Ivan Derlich',
  openGraph: {
    type: 'website',
    siteName: info.title,
    description: info.description,
    images: info.images,
    title: info.title,
  },
  twitter: {
    creator: '@ivanderlich',
    site: '@ivanderlich',
    card: 'summary_large_image',
    // Try to delete or uncomment fields bellow and see if it's still working. Wait for caching to expire.
    // title: info.title,
    // description: info.description,
    // images: info.images,
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
