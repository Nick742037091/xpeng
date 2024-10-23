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
import { createContext, useContext, useEffect, useState } from 'react'
import { carModelList } from './data'

function LeftIcon() {
  const { isBgTransparent } = useTopNavigatorContext()
  return (
    <Link href="/" className="absolute left-[40px]">
      <Image
        src={
          isBgTransparent
            ? 'https://xps01.xiaopeng.com/www/public/img/white-logo.570fd7b8.svg'
            : 'https://xps01.xiaopeng.com/www/public/img/black-logo.98ed887d.svg'
        }
        alt="home"
        width={40}
        height={25}
      />
    </Link>
  )
}

function RightButtons() {
  const { isBgTransparent } = useTopNavigatorContext()
  return (
    <div className="absolute right-[40px] flex items-center gap-[24px]">
      <Link
        href="/test-drive"
        className={clsx(
          'border border-white rounded-[4px] px-[16px] py-[8px]',
          'flex items-center justify-center leading-[1.1] btn-hover',
          isBgTransparent ? 'border-white' : 'border-black'
        )}
      >
        预约试驾
      </Link>
      <div className="w-[36px] h-[36px] flex items-center justify-center">
        <AiOutlineGlobal className="cursor-pointer text-[24px] hover:opacity-60" />
      </div>
      <Link href="/login" className=" hover:opacity-60">
        登录
      </Link>
    </div>
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

function CarModelsPanel({ active }: { active: boolean }) {
  const [hoverIndex, setHoverIndex] = useState(-1)
  return (
    <div
      className={clsx(
        'fixed z-[100] top-[56px] left-0 right-0 bg-white',
        'transition-all duration-300 ease-in-out',
        active ? 'h-[400px]' : 'h-0',
        'flex items-center justify-center overflow-hidden'
      )}
    >
      <div className="flex flex-wrap max-w-[77vw] mt-[61px] mx-auto">
        {carModelList.map((item, index) => (
          <div
            key={item.modelName}
            className="px-[32px] pb-[40px] flex flex-col items-center"
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(-1)}
          >
            <Image
              src={item.modelImg}
              alt={item.modelName}
              width={180}
              height={96}
              className={clsx(
                'transition-all duration-300 ease-in-out',
                hoverIndex === index && 'scale-110'
              )}
            />
            <div
              className={clsx(
                'text-[14px]',
                hoverIndex === index && 'opacity-60'
              )}
            >
              {item.modelName}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function CarModels() {
  const { isCarModelHover, setIsCarModelHover } = useTopNavigatorContext()
  return (
    <div
      className={clsx(
        styles.navItem,
        styles.carModelNav,
        isCarModelHover && styles.hovering
      )}
      onMouseEnter={() => setIsCarModelHover(true)}
      onMouseLeave={() => setIsCarModelHover(false)}
    >
      <Link href="/">车型</Link>
      <div className={styles.carAnimation}>
        {/* TODO carAnimation 增加左右边缘模糊 */}
        <Image
          src="/site/top-navigator/p7+.png"
          alt="new-card"
          className={clsx(styles.carImage, isCarModelHover && styles.hovering)}
          width={104}
          height={48}
        />
      </div>
      <CarModelsPanel active={isCarModelHover} />
    </div>
  )
}

function CenterNavigators() {
  return (
    <div className="mx-auto flex">
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
        <div className={styles.navItem}>关于我们</div>
      </HoverMenus>
    </div>
  )
}

export default function TopNavigator() {
  const [isCarModelHover, setIsCarModelHover] = useState(false)
  const [isBgTransparent, setIsBgTransparent] = useState(true)
  // 背景显示为透明需要延迟执行
  useEffect(() => {
    if (isCarModelHover) {
      setIsBgTransparent(false)
    } else {
      setTimeout(() => {
        setIsBgTransparent(true)
      }, 300)
    }
  }, [isCarModelHover])
  // 登录页不显示顶部导航栏
  const pathname = usePathname()
  if (pathname === '/login') {
    return null
  }
  return (
    <TopNavigatorContext.Provider
      value={{
        isCarModelHover,
        isBgTransparent,
        setIsCarModelHover
      }}
    >
      <div
        className={clsx(
          'flex fixed top-0 left-0 right-0 z-50 h-[56px] items-center',
          isBgTransparent ? styles.bgTransparent : styles.bgLight
        )}
      >
        <LeftIcon />
        <CenterNavigators />
        <RightButtons />
      </div>
    </TopNavigatorContext.Provider>
  )
}

const TopNavigatorContext = createContext<{
  isCarModelHover: boolean
  isBgTransparent: boolean
  setIsCarModelHover: (value: boolean) => void
}>({
  isCarModelHover: false,
  isBgTransparent: true,
  setIsCarModelHover: () => {}
})
export const useTopNavigatorContext = () => {
  return useContext(TopNavigatorContext)
}
