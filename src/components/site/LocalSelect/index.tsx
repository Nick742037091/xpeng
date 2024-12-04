import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { ReactNode } from 'react'
import { COOKIE_NAME } from '@/i18n/request'
import { useCookies } from 'react-cookie'
import { cn } from '@/lib/utils'

const locales = [
  {
    label: '简体中文',
    value: 'zh-cn'
  },
  {
    label: 'English',
    value: 'en'
  }
]
export default function LocalSelect({
  children,
  onChange
}: {
  children: ReactNode
  onChange: (value: string) => void
}) {
  const [locale] = useCookies([COOKIE_NAME])
  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent className="w-[100px] mr-[20px] p-0">
        <div className="flex flex-col">
          {locales.map((item) => (
            <div
              key={item.value}
              className={cn(
                'cursor-pointer p-[10px] hover:opacity-60',
                locale[COOKIE_NAME] === item.value && 'bg-black text-white'
              )}
              onClick={() => {
                onChange(item.value)
              }}
            >
              <div>{item.label}</div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
