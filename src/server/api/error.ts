import { z } from 'zod'
import type { Context } from 'hono'
import { HTTPException } from 'hono/http-exception'
import type { StatusCode } from 'hono/utils/http-status'
import { ClientCode, ServerCode } from '../common/code'

export class ApiError extends HTTPException {
  public readonly code?: StatusCode

  constructor({ code, message }: { code?: StatusCode; message: string }) {
    super(code, { message })
    this.code = code
  }
}

export function handleError(err: Error, c: Context): Response {
  console.log('handleError', err.message)
  if (err instanceof z.ZodError) {
    // zod校验错误
    const firstError = err.errors[0]
    return c.json(
      { code: ClientCode.Validate, message: `${firstError.message}` },
      ClientCode.Validate
    )
  }
  /**
   * This is a generic error, we should log it and return a 500
   */

  return c.json(
    {
      code: ServerCode.Common,
      message: '出了点问题, 请稍后再试。'
    },
    { status: ServerCode.Common }
  )
}