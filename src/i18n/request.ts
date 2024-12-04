import { getRequestConfig } from 'next-intl/server'
import Cookies from 'js-cookie'
import { isClient } from '@/lib/utils'
export const COOKIE_NAME = 'NEXT_LOCALE'

export default getRequestConfig(async () => {
  let locale = 'zh-cn'
  // 客户端和服务端组件获取cookie的方式不一致
  if (isClient()) {
    locale = Cookies.get(COOKIE_NAME) || 'zh-cn'
  } else {
    const { cookies } = await import('next/headers')
    locale = cookies().get(COOKIE_NAME)?.value || 'zh-cn'
  }
  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  }
})
