'use client'

import { CookiesProvider } from 'react-cookie'
import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl'
import { createContext, useContext } from 'react'

export default function AppProvider({
  children,
  locale,
  messages
}: {
  children: React.ReactNode
  locale: string
  messages: AbstractIntlMessages
}) {
  // TODO 集成Crowdin，在ci/cd中自动翻译并更新messages
  // APP 根布局为服务端组件，将locale和messages放在context中，供客户端组件使用
  return (
    <CookiesProvider>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <AppContext.Provider value={{ locale }}>{children}</AppContext.Provider>
      </NextIntlClientProvider>
    </CookiesProvider>
  )
}

// 不使用next-intl的messages，推荐使用useTranslations，因为i8n ally能提供更好的开发体验
export const AppContext = createContext<{
  locale: string
}>({
  locale: ''
})

export function useAppContext() {
  const { locale } = useContext(AppContext)
  const isZh = locale === 'zh-cn'
  return { locale, isZh }
}
