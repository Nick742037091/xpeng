'use client'

import { api } from '@/server/api/client'
import { useEffect } from 'react'
import { AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'

export default function GlobalError({
  error
}: {
  error: Error & { digest?: string }
}) {
  const pathname = usePathname()
  // 捕获页面异常
  useEffect(() => {
    api.common.pageError.$post({
      json: {
        msg: error.message,
        path: pathname
      }
    })
  }, [error, pathname])

  return (
    <html>
      <body className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <div className="flex flex-col items-center text-center">
            <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">出错了</h1>
            <p className="text-gray-600 mb-6">{error.message}</p>
            <Button
              onClick={() => window.location.reload()}
              size="lg"
              className="bg-blue-500 hover:bg-blue-600 transition-colors"
            >
              刷新页面
            </Button>
          </div>
        </div>
      </body>
    </html>
  )
}
