import './app.scss'
import TopNavigatorWrapper from './components/TopNavigator/wrapper'
import { Toaster } from '@/components/ui/toaster'

export default function HomeLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <TopNavigatorWrapper />
      <Toaster />
      {children}
    </div>
  )
}
