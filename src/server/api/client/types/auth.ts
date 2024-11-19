import { api } from '@/server/api/client'
import { InferResponseType } from 'hono'

export type Profile = InferResponseType<typeof api.auth.profile.$get>['data']
