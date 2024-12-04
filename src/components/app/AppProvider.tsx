'use client'

import { CookiesProvider } from 'react-cookie'
import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl'

export default function AppProvider({
  children,
  locale,
  messages
}: {
  children: React.ReactNode
  locale: string
  messages: AbstractIntlMessages | undefined
}) {
  // TODO 集成Crowdin，在ci/cd中自动翻译并更新messages
  return (
    <CookiesProvider>
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </CookiesProvider>
  )
}
