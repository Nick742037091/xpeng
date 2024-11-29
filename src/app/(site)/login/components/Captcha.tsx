import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { useRef, useState } from 'react'
import SliderCaptcha from 'rc-slider-captcha'
import ImageBg from '../imgs/captcha-bg.jpeg'
import { cn } from '@/lib/utils'
import { createPuzzle } from 'create-puzzle'

/**
 * rc-slider-captcha参考文档：https://caijf.github.io/rc-slider-captcha/
 * create-puzzle参考文档：https://caijf.github.io/create-puzzle/index.html#/#api
 *
 **/

/** 拼图位置范围 */
const PUZZLE_RANGE = 10

export const useCaptcha = () => {
  const [isOpen, setIsOpen] = useState(false)
  const openResolve = useRef<((value: boolean) => void) | null>(null)

  const open = () => {
    return new Promise((resolve) => {
      openResolve.current = resolve
      setIsOpen(true)
    })
  }
  const onOpenChange = (val: boolean) => {
    setIsOpen(val)
    if (!val) {
      openResolve.current?.(false)
    }
  }
  // 拼图位置
  const [positionX, setPositionX] = useState(0)
  // 获取滑块验证码的背景图、拼图和拼图位置
  const getCaptcha = async () => {
    const result = await createPuzzle(ImageBg.src)
    setPositionX(result.x)
    return {
      bgUrl: result.bgUrl,
      puzzleUrl: result.puzzleUrl
    }
  }
  // 验证滑块验证码
  const verifyCaptcha = async (data: { x: number }) => {
    if (
      data &&
      data.x > positionX - PUZZLE_RANGE &&
      data.x < positionX + PUZZLE_RANGE
    ) {
      return Promise.resolve(true)
    }
    return Promise.reject(false)
  }

  const context = (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className={cn('flex flex-col items-center')}>
        <DialogHeader>
          <DialogTitle>请完成安全验证</DialogTitle>
        </DialogHeader>
        <SliderCaptcha
          bgSize={{ width: ImageBg.width, height: ImageBg.height }}
          puzzleSize={{ height: ImageBg.height }}
          // 拼图和背景图高度需要一致
          request={getCaptcha}
          onVerify={async (data) => {
            await verifyCaptcha(data)
            openResolve.current?.(true)
            setIsOpen(false)
          }}
        />
      </DialogContent>
    </Dialog>
  )

  return { context, open }
}
