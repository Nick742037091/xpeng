'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const HomeIcon = () => {
  return (
    <Link href="/" className="text-white">
      <Image
        src="https://xps01.xiaopeng.com/www/public/img/white-logo.570fd7b8.svg"
        alt="home"
        width={40}
        height={25}
      />
    </Link>
  )
}

export default function TopNavigator() {
  // 登录页不显示顶部导航栏
  const pathname = usePathname()
  if (pathname === '/login') {
    return null
  }
  return (
    <div className="flex fixed top-0 left-0 right-0 z-50 h-[56px] items-center px-[40px]">
      <HomeIcon />
    </div>
  )
}
