'use client'

import { useState } from 'react'
import clsx from 'clsx'
import Image from 'next/image'

function HoverCard({
  title,
  description,
  bgSrc
}: {
  title: string
  description: string
  bgSrc: string
}) {
  const [isHover, setIsHover] = useState(false)
  return (
    <div
      className={clsx('w-[320px] h-[240px] relative overflow-hidden')}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Image
        src={bgSrc}
        alt={title}
        className={clsx(
          'w-full h-full object-cover',
          'transition-all duration-300',
          isHover && 'scale-[120%]'
        )}
        width={320}
        height={240}
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

export default function Charge() {
  return (
    <div className="bg-[#f9f9f9] pt-[80px] pb-[1.2rem]">
      <div className="pt-[120px] pb-[64px] text-center">
        <h2 className="text-[32px] tracking-[.16em] mb-[16px]">
          全场景充电服务
        </h2>
        <h2 className="text-[16px] tracking-[.16em] text-[rgba(0,0,0,.6)] font-[400]">
          全场景充电服务遍布全国的补能网络，贴心的自营充电服务，让鹏友没有里程焦虑
        </h2>
      </div>
      <div className="flex flex-wrap gap-[24px] justify-center">
        <HoverCard
          title="自营充电网络"
          description="1000+站点，覆盖全国所有地级行政区和直辖市；S4液冷超快充，最快充电5分钟，续航增加200km+"
          bgSrc="https://s.xiaopeng.com/xp-fe/mainsite/2023/home/charging1.jpg"
        />
      </div>
    </div>
  )
}
