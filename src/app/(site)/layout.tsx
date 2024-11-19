import './app.scss'
import TopNavigatorWrapper from './components/TopNavigator/wrapper'
import { Toaster } from '@/components/ui/toaster'

function Tag() {
  return (
    <div className="bg-black/10 px-[4px] py-[2px] text-red-500 fixed bottom-[10px] right-[10px] z-[9999]">
      个人测试网站，
      <a className="underline" href="https://www.xiaopeng.com/" target="_blank">
        官网请访问
      </a>
    </div>
  )
}
export default function HomeLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <Tag />
      <TopNavigatorWrapper />
      <Toaster />
      {children}
    </div>
  )
}
