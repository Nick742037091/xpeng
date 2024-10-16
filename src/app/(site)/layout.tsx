import TopNavigator from './components/TopNavigator/index'

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
