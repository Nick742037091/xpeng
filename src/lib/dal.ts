import 'server-only'

import { cookies } from 'next/headers'
import { decrypt } from '@/lib/session'
import { cache } from 'react'

export const getAdminProfile = cache(async () => {
  const cookie = cookies().get('session')?.value
  if (cookie) {
    const session = await decrypt(cookie)
    return {
      userId: session?.userId as string,
      userName: session?.userName as string
    }
  }
  return null
})
