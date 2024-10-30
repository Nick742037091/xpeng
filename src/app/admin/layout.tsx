import { Toaster } from '@/components/ui/toaster'
import NextTopLoader from 'nextjs-toploader'
import './app.scss'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <NextTopLoader />
      <Toaster />
      {children}
    </div>
  )
}
