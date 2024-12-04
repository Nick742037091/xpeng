import zhCN from './src/i18n/messages/zh-cn.json'

type Messages = typeof zhCN

declare global {
  // Use type safe message keys with `next-intl`
  interface IntlMessages extends Messages {}
}
