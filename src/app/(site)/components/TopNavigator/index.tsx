'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AiOutlineGlobal } from 'react-icons/ai'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from '@/components/ui/hover-card'

import styles from './index.module.scss'
import clsx from 'clsx'
import { useState } from 'react'

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

function HoverMenus({
  children,
  list
}: {
  children: React.ReactNode
  list: { link: string; title: string }[]
}) {
  return (
    <HoverCard openDelay={200}>
      <HoverCardTrigger>{children}</HoverCardTrigger>
      <HoverCardContent className="flex flex-col items-center gap-[20px] w-[110px]">
        {list.map((item) => (
          <Link href={item.link} key={item.link} className="hover:opacity-60">
            {item.title}
          </Link>
        ))}
      </HoverCardContent>
    </HoverCard>
  )
}

function CarModels() {
  const [isHover, setIsHover] = useState(false)
  return (
    <div className={clsx(styles.navItem, styles.carModel)}>
      <div className={styles.carAnimation}>
        <Image
          src="/site/top-navigator/p7+.png"
          alt="new-card"
          className={clsx(styles.carImage, isHover && styles.hovering)}
          width={104}
          height={48}
        />
      </div>

      <Link
        href="/"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        车型
      </Link>
    </div>
  )
}

function CenterNavigators() {
  return (
    <div className="absolute left-[50%] translate-x-[-50%] top-0 bottom-0 flex items-center">
      <CarModels />
      <HoverMenus
        list={[
          { link: '/', title: '扶摇架构' },
          { link: '/', title: '智能科技' }
        ]}
      >
        <div className={styles.navItem}>智能</div>
      </HoverMenus>
      <Link href="/" className={styles.navItem}>
        充电
      </Link>
      <Link href="/" className={styles.navItem}>
        门店
      </Link>
      <Link href="/" className={styles.navItem}>
        金融
      </Link>
      <Link href="/" className={styles.navItem}>
        售后
      </Link>
      <HoverMenus
        list={[
          { link: '/', title: '关于小鹏' },
          { link: '/', title: '咨询中心' },
          { link: '/', title: '投资者关系' },
          { link: '/', title: 'EGS' },
          { link: '/', title: '授权加盟' },
          { link: '/', title: '加入我们' }
        ]}
      >
        <div className={styles.navItem}>联系我们</div>
      </HoverMenus>
    </div>
  )
}

function RightButtons() {
  return (
    <div className="ml-auto flex items-center gap-[24px]">
      <Link
        href="/test-drive"
        className="text-white border border-white rounded-[4px] px-[16px] py-[8px] 
        flex items-center justify-center leading-[1.1] btn-hover"
      >
        预约试驾
      </Link>
      <AiOutlineGlobal className="cursor-pointer text-white text-[24px] hover:opacity-60" />
      <Link href="/login" className="text-white hover:opacity-60">
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
