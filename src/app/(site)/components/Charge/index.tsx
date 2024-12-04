'use client'

import { useState } from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import HoverButton from '../HoverButton/index'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

function HoverCard({
  title,
  description,
  bgSrc,
  className
}: {
  title: string
  description: string
  bgSrc: string
  className?: string
}) {
  const [isHover, setIsHover] = useState(false)
  return (
    <div
      className={clsx(
        'relative overflow-hidden cursor-pointer rounded-[4Px] text-white',
        className
      )}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Image
        src={bgSrc}
        alt={title}
        className={clsx(
          'object-cover h-full w-full',
          'transition-all duration-300',
          isHover && 'scale-[120%]'
        )}
        width="1000"
        height="1000"
      />
      <div className="absolute bottom-[22px] mx-[32px]">
        <h2 className="text-[18px] tracking-[.16em]">{title}</h2>
        {isHover && (
          <p className="text-[14px] tracking-[.22em]">{description}</p>
        )}
      </div>
    </div>
  )
}

const useDataList = () => {
  const t = useTranslations('HomePage')
  return [
    {
      title: t('Charge.dataList.0.title'),
      description: t('Charge.dataList.0.description'),
      bgSrc: 'https://s.xiaopeng.com/xp-fe/mainsite/2023/home/charging1.jpg'
    },
    {
      title: t('Charge.dataList.1.title'),
      description: t('Charge.dataList.1.description'),
      bgSrc: 'https://s.xiaopeng.com/xp-fe/mainsite/2023/home/charging2.jpg'
    },
    {
      title: t('Charge.dataList.2.title'),
      description: t('Charge.dataList.2.description'),
      bgSrc: 'https://s.xiaopeng.com/xp-fe/mainsite/2023/home/charging3.jpg'
    },
    {
      title: t('Charge.dataList.3.title'),
      description: t('Charge.dataList.3.description'),
      bgSrc: 'https://s.xiaopeng.com/xp-fe/mainsite/2023/home/charging4.jpg'
    },
    {
      title: t('Charge.dataList.4.title'),
      description: t('Charge.dataList.4.description'),
      bgSrc: 'https://s.xiaopeng.com/xp-fe/mainsite/2023/home/charging5.jpg'
    }
  ]
}

export default function Charge() {
  const t = useTranslations('HomePage')
  const dataList = useDataList()
  const firstItem = dataList[0]
  const otherGroup: (typeof dataList)[] = []
  // 将其他数据分组，每组2个
  for (let i = 1; i < dataList.length; i += 2) {
    otherGroup.push(dataList.slice(i, i + 2))
  }
  return (
    <div className="bg-[#f9f9f9] pt-[80px] pb-[120px] flex flex-col items-center">
      <div className="pt-[120px] pb-[64px] text-center">
        <h2 className="text-[32px] tracking-[.16em] mb-[16px] font-[HYYakuHei]">
          {t('Charge.title')}
        </h2>
        <h2 className="text-[16px] tracking-[.16em] text-[rgba(0,0,0,.6)] font-[400] max-w-[80vw]">
          {t('Charge.description')}
        </h2>
      </div>
      <div className="flex gap-[32px] justify-stretch">
        <HoverCard {...firstItem} className="h-[660px] w-[418px]" />
        <div className="flex-1 flex flex-col justify-between">
          {otherGroup.map((group, index) => (
            <div key={index} className="flex gap-x-[32px]">
              {group.map((item) => (
                <HoverCard
                  key={item.title}
                  {...item}
                  className="h-[314px] w-[418px]"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <Link href="/charge" className="mt-[60px]">
        <HoverButton text={t('Charge.learnMore')} theme="transparent-black" />
      </Link>
    </div>
  )
}
