'use client'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from '@/components/ui/hover-card'

import styles from './index.module.scss'
import clsx from 'clsx'
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { ListNavCarModelItem } from '@/server/action/navCarModels'
import { CarModels } from './CardModels'
import Account from './Account'
import { SiteProfile } from '@/lib/dal'
import LocalSelect from '@/components/site/LocalSelect'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import { useAppContext } from '@/components/app/AppProvider'
function LeftIcon() {
  const { isBgTransparent } = useTopNavigatorContext()
  return (
    <a href="/" className="absolute left-[40px]">
      <Image
        src={
          isBgTransparent
            ? 'https://xps01.xiaopeng.com/www/public/img/white-logo.570fd7b8.svg'
            : 'https://xps01.xiaopeng.com/www/public/img/black-logo.98ed887d.svg'
        }
        alt="home"
        width={40}
        height={25}
        className="w-[40px] h-[25px]"
      />
    </a>
  )
}

function RightButtons() {
  const { isBgTransparent } = useTopNavigatorContext()
  const t = useTranslations('TopNavigator')
  return (
    <div className="absolute right-[40px] flex items-center gap-[24px]">
      <a
        href="/test-drive"
        className={clsx(
          'border rounded-[4px] px-[16px] py-[8px]',
          'flex items-center justify-center leading-[1.1] btn-hover',
          isBgTransparent ? 'border-white' : 'border-black'
        )}
      >
        <span>{t('testDrive')}</span>
      </a>
      <div className="w-[36px] h-[36px] flex items-center justify-center">
        <LocalSelect />
      </div>
      <Account />
    </div>
  )
}

export function HoverMenus({
  children,
  list
}: {
  children: React.ReactNode
  list: { link: string; title: string; onClick?: () => void }[]
}) {
  const { isZh } = useAppContext()
  return (
    <HoverCard openDelay={200}>
      <HoverCardTrigger>{children}</HoverCardTrigger>
      <HoverCardContent
        className={cn(
          'flex flex-col items-center gap-[20px] w-[200px]',
          isZh ? 'w-[110px]' : 'w-[180px]'
        )}
      >
        {list.map((item, index) => {
          if (item.onClick) {
            return (
              <span
                key={index}
                className="hover:opacity-60 cursor-pointer"
                onClick={item.onClick}
              >
                {item.title}
              </span>
            )
          }
          return (
            <a href={item.link} key={index} className="hover:opacity-60">
              {item.title}
            </a>
          )
        })}
      </HoverCardContent>
    </HoverCard>
  )
}

function CenterNavigators() {
  const t = useTranslations('TopNavigator')
  return (
    <div className="mx-auto flex">
      <CarModels />
      <HoverMenus
        list={[
          { link: '/', title: t('fuyaoArchitecture') },
          { link: '/', title: t('intelligentTechnology') }
        ]}
      >
        <div className={styles.navItem}>{t('smart')}</div>
      </HoverMenus>
      <a href="/" className={styles.navItem}>
        {t('charge')}
      </a>
      <a href="/" className={styles.navItem}>
        {t('store')}
      </a>
      <a href="/" className={styles.navItem}>
        {t('finance')}
      </a>
      <a href="/" className={styles.navItem}>
        {t('afterSale')}
      </a>
      <HoverMenus
        list={[
          { link: '/', title: t('aboutXiaopeng') },
          { link: '/', title: t('consultationCenter') },
          { link: '/', title: t('investorRelations') },
          { link: '/', title: t('egs') },
          { link: '/', title: t('joinInCooperation') },
          { link: '/', title: t('joinUs') }
        ]}
      >
        <div className={styles.navItem}>{t('aboutUs')}</div>
      </HoverMenus>
    </div>
  )
}

export default function TopNavigator({
  carModelList,
  profile
}: {
  carModelList: ListNavCarModelItem[]
  profile: SiteProfile | null
}) {
  const [isCarModelHover, setIsCarModelHover] = useState(false)
  const [isBgTransparent, setIsBgTransparent] = useState(true)
  // 页面向下滚动时，设置白色底色
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsBgTransparent(false)
      } else {
        setIsBgTransparent(true)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  const delayTimmer = useRef<NodeJS.Timeout | null>(null)
  // 背景显示为透明需要延迟执行
  useEffect(() => {
    if (delayTimmer.current) {
      clearTimeout(delayTimmer.current)
    }
    if (isCarModelHover) {
      setIsBgTransparent(false)
    } else {
      delayTimmer.current = setTimeout(() => {
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
        carModelList,
        setIsCarModelHover,
        profile
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
  // 由于导航栏是客户端组件，只能在其上层的服务端组件获取carModelList，通过props传入，然后将其放在context中，供CarModelsPanel组件使用
  carModelList: ListNavCarModelItem[]
  setIsCarModelHover: (value: boolean) => void
  profile: SiteProfile | null
}>({
  isCarModelHover: false,
  isBgTransparent: true,
  carModelList: [],
  setIsCarModelHover: () => {},
  profile: null
})
export const useTopNavigatorContext = () => {
  return useContext(TopNavigatorContext)
}
