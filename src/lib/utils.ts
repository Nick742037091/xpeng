import { toast } from '@/hooks/use-toast'
import { COOKIE_NAME } from '@/i18n/request'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
export { confirm } from '@/components/admin/Confirm/index'
import Cookies from 'js-cookie'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function success(message: string, duration = 2000) {
  toast({ description: message, duration })
}

export function error(message: string, duration = 2000) {
  toast({ description: message, variant: 'destructive', duration })
}

// 判断是否是客户端组件
export function isClient() {
  return typeof window !== 'undefined'
}

// 判断是否是中文，在客户端组件中使用
export function isZh() {
  return Cookies.get(COOKIE_NAME) === 'zh-cn'
}
