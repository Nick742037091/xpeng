import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import { useRef, useState } from 'react'

function Link({ href, text }: { href: string; text: string }) {
  return (
    <a href={href} className="text-[#6da23a]" target="_blank">
      {text}
    </a>
  )
}

function Button({
  children,
  className,
  onClick
}: {
  children: string
  className?: string
  onClick: () => void
}) {
  return (
    <button
      className={cn('flex-1 py-[15Px] hover:bg-[#000000]/10', className)}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default function PolicyConfirmDialog({
  open,
  onCancel,
  onConfirm
}: {
  open: boolean
  onCancel: () => void
  onConfirm: () => void
}) {
  const t = useTranslations('LoginPage')
  if (!open) return null
  return (
    <div className="absolute h-full w-full flex justify-center items-center bg-black/50">
      <div className="w-[420Px] pt-[20Px] bg-white">
        <div className="font-400 text-center" style={{ fontSize: '18Px' }}>
          {t('policy.confirmDialog.title')}
        </div>
        <div className="p-[20Px]">
          {t('policy.confirmDialog.loginAndAgree')}
          <Link
            href="https://events.xiaopeng.com/nx9w4x.html?ch=00977&ps=event"
            text={t('policy.userAgreement')}
          />
          {t('policy.and')}
          <Link
            href="https://events.xiaopeng.com/22p4p4.html?ch=00977&ps=event"
            text={t('policy.privacyPolicy')}
          />
        </div>
        <div className="flex justify-center">
          <Button onClick={onCancel}>{t('policy.confirmDialog.cancel')}</Button>
          <Button onClick={onConfirm} className="text-[#6da23a]">
            {t('policy.confirmDialog.confirm')}
          </Button>
        </div>
      </div>
    </div>
  )
}

export function usePolicyConfirmDialog() {
  const [open, setOpen] = useState(false)
  const confirmResolve = useRef<((value: boolean) => void) | null>(null)
  const confirm = () => {
    return new Promise((resolve) => {
      confirmResolve.current = resolve
      setOpen(true)
    })
  }
  const handleCancel = () => {
    setOpen(false)
    confirmResolve.current?.(false)
  }

  const handleConfirm = () => {
    setOpen(false)
    confirmResolve.current?.(true)
  }

  const context = (
    <PolicyConfirmDialog
      open={open}
      onCancel={handleCancel}
      onConfirm={handleConfirm}
    />
  )
  return { confirm, context }
}
