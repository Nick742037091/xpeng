import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { AiOutlineGlobal } from 'react-icons/ai'
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
export default function LocalSelect() {
  const [locale, setLocale] = useCookies([COOKIE_NAME])
  return (
    <Popover>
      <PopoverTrigger>
        <AiOutlineGlobal className="cursor-pointer text-[24px] hover:opacity-60" />
      </PopoverTrigger>
      <PopoverContent className="w-[100px] mr-[20px] p-0 rounded-none border-none">
        <div className="flex flex-col">
          {locales.map((item) => (
            <div
              key={item.value}
              className={cn(
                'cursor-pointer p-[10px] hover:opacity-60',
                locale[COOKIE_NAME] === item.value && 'bg-black text-white'
              )}
              onClick={() => {
                setLocale(COOKIE_NAME, item.value)
                location.reload()
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
