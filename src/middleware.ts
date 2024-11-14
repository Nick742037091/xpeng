import { NextRequest, NextResponse } from 'next/server'
import { decrypt } from './lib/session'

// 无须校验登录的页面
const publicPageRoutes = [
  // admin登录
  '/admin/sign-in'
]
// 无须校验登录的api
const publicApiRoutes = [
  // admin登录
  '/api/admin/login'
]

export default async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname
  const isAdminPage = /\/admin+/.test(pathname)
  const isApi = /\/api+/.test(pathname)
  const redirectToLogin = () => {
    if (isAdminPage) {
      // 后台页面跳转到登录页面
      return NextResponse.redirect(new URL('/admin/sign-in', req.nextUrl))
    } else if (isApi) {
      debugger
      // api返回未登录提示
      return NextResponse.json({
        code: 401,
        message: '请先登录',
        data: null
      })
    }
  }
  const next = () => NextResponse.next()

  // 不是api或者管理后台页面，不需要校验登录
  if (!isApi && !isAdminPage) return next()
  // 如果路径是公共路径，则直接跳过
  if (
    publicPageRoutes.includes(pathname) ||
    publicApiRoutes.includes(pathname)
  ) {
    return next()
  }
  // 由于使用了server action，用cookie进行登录验证比较合适
  const cookie = req.cookies.get('session')?.value
  if (!cookie) return redirectToLogin()
  const session = await decrypt(cookie)
  if (!session?.userId) return redirectToLogin()
  return next()
}

export const config = {
  matcher: ['/', '/((?!_next/static|_next/image|.*\\.png$|.*\\.ico$).*)']
}
