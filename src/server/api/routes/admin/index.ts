import { Hono } from 'hono'
import { z } from 'zod'
import { createAdminSession, deleteAdminSession } from '@/lib/session'
import { Validator } from '@/server/api/validator'
import { responseSuccess, responseError } from '@/server/common/response'

const loginSchema = z.object({
  username: z.string(),
  password: z.string()
})

const app = new Hono()
  .basePath('/admin')
  // 登录
  .post('/login', Validator('json', loginSchema), async (c) => {
    const { username, password } = c.req.valid('json')
    if (
      username === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      await createAdminSession(username, username)
      console.log('admin 登录成功', { username })
      return c.json(responseSuccess())
    } else {
      console.log('admin 登录失败')
      return c.json(responseError('用户名或密码错误'))
    }
  })
  // 退出登录
  .post('/logout', async (c) => {
    await deleteAdminSession()
    console.log('admin 退出登录成功')
    return c.json(responseSuccess())
  })

export default app
