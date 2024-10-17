'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AiOutlineGlobal } from 'react-icons/ai'

function HomeIcon() {
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

function CenterNavigators() {
  return <div className="flex-1"></div>
}

function RightButtons() {
  return (
    <div className="flex items-center gap-[24px]">
      <Link
        href="/test-drive"
        className="text-white border border-white rounded-[4px] px-[16px] py-[8px] 
        flex items-center justify-center"
      >
        预约试驾
      </Link>
      <AiOutlineGlobal style={{ color: 'white', fontSize: 24 }} />
      <Link href="/login" className="text-white">
        登录
      </Link>
    </div>
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
      <CenterNavigators />
      <RightButtons />
    </div>
  )
}
