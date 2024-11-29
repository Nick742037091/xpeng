import logger from '@/server/common/logger'
import { LOGGER_TYPE_API_LOG } from '@/server/common/logger/constant'
import type { Context, Next } from 'hono'

const excludeRoutes = ['/api/common/pageError']

export const apiLog = async ({ c, next }: { c: Context; next: Next }) => {
  const startTime = Date.now()
  await next()
  // 页面异常请求不记录日志
  if (excludeRoutes.includes(c.req.routePath)) {
    return
  }
  const endTime = Date.now()
  const duration = endTime - startTime
  logger.info({
    type: LOGGER_TYPE_API_LOG,
    msg: `${c.req.method} ${c.req.routePath} ${c.res.status} in ${duration}ms`,
    req: {
      method: c.req.method,
      path: c.req.routePath,
      query: c.req.query(),
      body: await c.req.json().catch(() => ({})),
      headers: Object.fromEntries(c.req.raw.headers.entries())
    },
    res: {
      status: c.res.status,
      headers: Object.fromEntries(c.res.headers.entries()),
      body: await c.res
        .clone()
        .json()
        .catch(() => ({}))
    }
  })
}
