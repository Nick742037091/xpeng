'use client'

import { logout } from '@/app/admin/sign-in/actions'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'

export function Logout() {
  return (
    <DropdownMenuItem className="cursor-pointer" onClick={() => logout()}>
      <span>退出登录</span>
    </DropdownMenuItem>
  )
}
