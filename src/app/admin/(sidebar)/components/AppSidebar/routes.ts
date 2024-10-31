import { Home, User } from 'lucide-react'

export const routes: Route[] = [
  {
    title: '首页配置',
    icon: Home,
    children: [
      {
        title: '导航栏车型',
        url: '/admin/nav-car-models'
      }
    ]
  },
  {
    title: '用户管理',
    url: '/admin/customer',
    icon: User,
    children: []
  }
]

export type Route = {
  title: string
  url?: string
  icon?: typeof Home
  children?: Route[]
}
