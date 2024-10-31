import './app.scss'
import TopNavigatorWrapper from './components/TopNavigator/wrapper'

export default function HomeLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <TopNavigatorWrapper />
      {children}
    </div>
  )
}
