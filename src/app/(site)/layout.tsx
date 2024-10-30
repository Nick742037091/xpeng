import TopNavigator from './components/TopNavigator/index'
import './app.scss'

export default function HomeLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <TopNavigator />
      {children}
    </div>
  )
}
