import { toast } from '@/hooks/use-toast'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
export { confirm } from '@/components/admin/Confirm/index'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function success(message: string, duration = 2000) {
  toast({ description: message, duration })
}

export function error(message: string, duration = 2000) {
  toast({ description: message, variant: 'destructive', duration })
}

// 判断是否是客户端组件
export function isClient() {
  return typeof window !== 'undefined'
}

export function readFile(file: File) {
  return new Promise<ArrayBuffer>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      resolve(e.target?.result as ArrayBuffer)
    }
    reader.onerror = reject
    reader.readAsArrayBuffer(file)
  })
}

// // 字符串转ArrayBuffer，因为FileReader.readAsBinaryString()返回的是字符串
// function str2ab(str: string) {
//   const buf = new ArrayBuffer(str.length)
//   const bufView = new Uint8Array(buf)
//   for (let i = 0, strLen = str.length; i < strLen; i++) {
//     bufView[i] = str.charCodeAt(i)
//   }
//   return buf
// }
