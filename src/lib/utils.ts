import { toast } from '@/hooks/use-toast'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
export { confirm } from '@/components/admin/Confirm/index'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function success(message: string) {
  toast({ description: message })
}

export function error(message: string) {
  toast({ description: message, variant: 'destructive' })
}
