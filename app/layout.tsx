import MainHeader from '@/components/MainHeader'
import { ToastContainer } from 'react-toastify'
import './globals.css'

export const metadata = {
  title: 'NextLevel Food',
  description: 'Delicious meals, shared by a food-loving community.',
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
