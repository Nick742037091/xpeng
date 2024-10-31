'use server'

import { createSession, deleteSession } from '@/lib/session'
import { redirect } from 'next/navigation'

export async function login({
  username,
  password
}: {
  username: string
  password: string
}) {
  if (
    username === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    await createSession(username, username)
    return {
      message: '请求成功',
      data: null,
      code: 0
    }
  } else {
    return {
      message: '用户名或密码错误',
      data: null,
      code: -1
    }
  }
}

export async function logout() {
  await deleteSession()
  redirect('/admin/sign-in')
}
