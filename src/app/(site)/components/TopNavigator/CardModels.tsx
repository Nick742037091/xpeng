'use client'

import { useTopNavigatorContext } from './index'
import { useState } from 'react'
import clsx from 'clsx'

import styles from './index.module.scss'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useAppContext } from '@/components/app/AppProvider'
import { cn } from '@/lib/utils'

function CarModelsPanel({ active }: { active: boolean }) {
  const { isZh } = useAppContext()
  const { carModelList } = useTopNavigatorContext()
  const [hoverIndex, setHoverIndex] = useState(-1)
  const fillNum = 4 - (carModelList.length % 4)
  // 填充空数据，使每行都能对齐
  const fillCarModelList = [
    ...carModelList,
    ...Array(fillNum).fill({
      modelName: '',
      modelNameEn: '',
      modelImg: ''
    })
  ]
  return (
    <div
      className={clsx(
        'fixed z-[100] top-[56px] left-0 right-0 bg-white',
        'transition-all duration-300 ease-in-out',
        active ? 'h-[400px]' : 'h-0',
        'flex items-center justify-center overflow-hidden'
      )}
    >
      <div
        className="flex flex-wrap justify-between mt-[61px] mx-auto max-w-[77vw]"
        style={{ width: 'min(77vw, 1708px)' }}
      >
        {fillCarModelList.map((item, index) => {
          if (item.modelName === '') {
            return (
              <div key={index} className="px-[32px] pb-[40px]">
                <div className="w-[180px] h-[96px]" />
              </div>
            )
          }
          return (
            <div
              key={index}
              className="px-[32px] pb-[40px] flex flex-col items-center"
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(-1)}
            >
              <Image
                src={item.modelImg}
                alt={item.modelNameEn}
                width={180}
                height={96}
                className={clsx(
                  'w-[180px] h-[96px] transition-all duration-300 ease-in-out',
                  hoverIndex === index && 'scale-110'
                )}
              />
              <div
                className={clsx(
                  'text-[14px]',
                  hoverIndex === index && 'opacity-60'
                )}
              >
                {isZh ? item.modelName : item.modelNameEn}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function CarModels() {
  const t = useTranslations('TopNavigator')
  const { isCarModelHover, setIsCarModelHover } = useTopNavigatorContext()
  return (
    <div
      className={cn(
        styles.carModelNav,
        'flex items-center ml-[-156px] overflow-hidden'
      )}
      onMouseEnter={() => setIsCarModelHover(true)}
      onMouseLeave={() => setIsCarModelHover(false)}
    >
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
      <div className={cn(styles.navItem)}>
        <a href="/">{t('carModels')}</a>
      </div>
      <CarModelsPanel active={isCarModelHover} />
    </div>
  )
}
