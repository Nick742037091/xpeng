import { AppType } from '@/server/api'
import { hc } from 'hono/client'

const baseUrl =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : ''

export const client = hc<AppType>(baseUrl)

export const api = client.api
