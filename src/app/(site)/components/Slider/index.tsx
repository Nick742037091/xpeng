'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '@/components/ui/carousel'
import { type CarouselApi } from '@/components/ui/carousel'

import { sliderList } from './data'
import Image from 'next/image'
import Autoplay from 'embla-carousel-autoplay'
import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { GoX } from 'react-icons/go'
import { FaChevronRight } from 'react-icons/fa6'
import Link from 'next/link'

function Indicator({
  current,
  length,
  setCurrent
}: {
  current: number
  length: number
  setCurrent: (current: number) => void
}) {
  return (
    <div className="absolute z-[10] bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-[4px]">
      {Array.from({ length }).map((_, index) => (
        <div
          key={index}
          className="w-[44px] h-[44px] flex items-center justify-center cursor-pointer"
          onClick={() => setCurrent(index)}
        >
          <div
            className={clsx(
              'w-full h-[3px] rounded-full',
              current === index ? 'bg-[#a4ce4c]' : 'bg-[hsla(0,0%,100%,.3)]'
            )}
            style={{ transform: 'skewX(-30deg)' }}
          />
        </div>
      ))}
    </div>
  )
}

function SliderButton({
  text,
  href,
  className,
  index
}: {
  text: string
  href: string
  className?: string
  index: number
}) {
  const [isHover, setIsHover] = useState(false)
  const bgColor = index === 1 ? 'bg-white' : 'bg-transparent'
  let textColor = index === 1 ? 'text-black' : 'text-white'
  // 悬浮时字体为白色
  if (isHover) {
    textColor = 'text-white'
  }
  let arrowColor = index === 1 ? 'text-[#a4ce4c]' : 'text-white'
  // 悬浮时箭头为白色
  if (isHover) {
    arrowColor = 'text-white'
  }

  return (
    <Link
      key={index}
      href={href}
      className={clsx(
        className,
        'flex items-center justify-center text-[16px]',
        'border border-white btn-hover',
        'rounded-[4px] px-[32px] py-[11px] mr-[16px]',
        bgColor
      )}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <span className={clsx(textColor)}>{text}</span>
      <FaChevronRight className={clsx('ml-[4px] text-[14px]', arrowColor)} />
    </Link>
  )
}

export default function Slider() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) return
    api.on('select', () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  const autoplay = api?.plugins().autoplay
  // TODO 调整字体
  return (
    <div className="relative">
      <Indicator
        current={current}
        length={sliderList.length}
        setCurrent={(current) => {
          if (!api) return
          autoplay?.stop()
          api.scrollTo(current)
          autoplay?.play()
        }}
      />
      <Carousel
        setApi={setApi}
        opts={{
          loop: true
        }}
        plugins={[
          Autoplay({
            delay: 5000
          })
        ]}
      >
        <CarouselContent className="p-0">
          {sliderList.map((item, index) => (
            <CarouselItem
              key={index}
              className="basis-full h-[100vh] px-0 relative"
            >
              <Image
                src={item.img}
                alt="slider"
                className="w-full h-full"
                width={2048}
                height={1024}
              />
              <div
                className={clsx(
                  'absolute z-[10] left-[15%] top-[30%] text-white text-[32px]',
                  'font-[300]'
                )}
              >
                <GoX className="absolute text-[28px] top-[-16px] left-[-16px]" />
                <div className="">{item.title}</div>
                <div className="">{item.subtitle}</div>
                <div className="mt-[32px] flex items-center gap-[16px]">
                  {item.buttons.map((button, index) => (
                    <SliderButton
                      key={index}
                      text={button.text}
                      href={button.href}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
