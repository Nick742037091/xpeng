import { z } from 'zod'
import type { Context } from 'hono'
import { ClientCode, ServerCode } from '@/server/common/code'
import logger from '@/server/common/logger/index'
import { LOGGER_TYPE_API_ERROR } from '@/server/common/logger/constant'
import { responseError } from '@/server/common/response'

export async function handleError(err: Error, c: Context): Promise<Response> {
  // 校验错误为常规错误，记录在请求日志
  if (err instanceof z.ZodError) {
    // zod校验错误
    const firstError = err.errors[0]
    return c.json(
      { code: ClientCode.Validate, message: `${firstError.message}` },
      ClientCode.Validate
    )
  }
  // 其他错误额外添加error日志
  logger.error({
    type: LOGGER_TYPE_API_ERROR,
    msg: err.message,
    method: c.req.method,
    url: c.req.routePath,
    query: c.req.query(),
    body: await c.req.json().catch(() => ({}))
  })

  return c.json(
    responseError('出了点问题, 请稍后再试。', ServerCode.Common),
    ServerCode.Common
  )
}
