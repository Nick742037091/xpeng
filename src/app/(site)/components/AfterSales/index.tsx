'use client'

import { useState } from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import HoverButton from '../HoverButton/index'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

function HoverCard({
  bgSrc,
  className
}: {
  bgSrc: string
  className?: string
}) {
  const [isHover, setIsHover] = useState(false)
  return (
    <div
      className={clsx(
        'relative overflow-hidden w-[418px] h-[314px] cursor-pointer rounded-[4Px]',
        className
      )}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Image
        src={bgSrc}
        alt=""
        className={clsx(
          'object-cover h-full w-full',
          'transition-all duration-300',
          isHover && 'scale-[120%]'
        )}
        width={1000}
        height={1000}
      />
    </div>
  )
}

export default function AfterSales() {
  const t = useTranslations('AfterSales')
  const dataList = t.raw('dataList')

  return (
    <div className="pt-[80px] pb-[120px] flex flex-col items-center">
      <div className="pt-[120px] pb-[64px] text-center">
        <h2 className="text-[32px] tracking-[.16em] mb-[16px] font-[HYYakuHei]">
          {t('title')}
        </h2>
        <h2 className="text-[16px] tracking-[.16em] text-[rgba(0,0,0,.6)] font-[400]">
          {t('subtitle')}
        </h2>
      </div>
      <div className="flex gap-x-[32px]">
        {dataList.map((item, index) => (
          <div key={index} className="flex flex-col w-[418px]">
            <HoverCard bgSrc={item.bgSrc} className="mb-[24px]" />
            <h2 className="mb-[16px] text-[18px] tracking-[.16em]">
              {item.title}
            </h2>
            <p className="text-[16px] tracking-[.2em] text-[#666]">
              {item.description}
            </p>
            {item.tip && (
              <div className="mt-[16px] text-[14px] tracking-[.2em] text-[rgba(0,0,0,.3)]">
                {item.tip}
              </div>
            )}
          </div>
        ))}
      </div>
      <Link href="/after-sales" className="mt-[60px]">
        <HoverButton text={t('learnMore')} theme="transparent-black" />
      </Link>
    </div>
  )
}
