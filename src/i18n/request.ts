import { getRequestConfig } from 'next-intl/server'
import Cookies from 'js-cookie'
import { isClient } from '@/lib/utils'
export const COOKIE_NAME = 'NEXT_LOCALE'
export const LOCALE_CN = 'zh-cn'
export const LOCALE_EN = 'en'
export default getRequestConfig(async () => {
  let locale = LOCALE_CN
  // 客户端和服务端组件获取cookie的方式不一致
  if (isClient()) {
    locale = Cookies.get(COOKIE_NAME) || LOCALE_CN
  } else {
    const { cookies } = await import('next/headers')
    locale = cookies().get(COOKIE_NAME)?.value || LOCALE_CN
  }
  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  }
})
