import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { getNavCarModelDetail, saveNavCarModel } from '@/actions/navCarModels'
import { forwardRef, useImperativeHandle, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useFormStatus } from 'react-dom'
import { success, error } from '@/lib/utils'
import Loading from '@/components/admin/Loading'
import { Switch } from '@/components/ui/switch'

type Detail = {
  modelName: string
  modelImg: string
  order: number
  status: number
}

export interface EditDialogRef {
  open: (id: number) => void
}

const EditDialog = forwardRef<EditDialogRef>(function EditDialog({}, ref) {
  const [visible, setVisible] = useState<boolean>(false)
  const [id, setId] = useState<number>(0)
  const title = id ? '编辑车型' : '新增车型'
  const [detail, setDetail] = useState<Detail>({
    modelName: '',
    modelImg: '',
    order: 0,
    status: 1
  })

  const getDetail = async (id: number) => {
    const detail = await getNavCarModelDetail(id)
    if (!detail) return
    setDetail(detail)
  }

  const open = (id: number) => {
    setId(id)
    setVisible(true)
    if (id) {
      getDetail(id)
    } else {
      setDetail({
        modelName: '',
        modelImg: '',
        order: 0,
        status: 1
      })
    }
  }

  useImperativeHandle(ref, () => ({
    open
  }))

  const handleAction = async () => {
    const { isSuccess, message } = await saveNavCarModel({
      id: +id,
      modelName: detail.modelName,
      modelImg: detail.modelImg,
      order: detail.order,
      status: detail.status
    })
    if (isSuccess) {
      success(message)
      setVisible(false)
    } else {
      error(message)
    }
  }

  return (
    <Dialog open={visible} onOpenChange={setVisible}>
      <DialogContent className="sm:max-w-[425px]">
        <form action={handleAction} autoComplete="off">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="modelName" className="text-right">
                车型
              </Label>
              <Input
                name="modelName"
                value={detail?.modelName}
                className="col-span-3"
                onChange={(e) => {
                  setDetail({ ...detail, modelName: e.target.value as string })
                }}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="modelImg" className="text-right">
                图片
              </Label>
              <Input
                name="modelImg"
                value={detail?.modelImg}
                className="col-span-3"
                onChange={(e) => {
                  setDetail({ ...detail, modelImg: e.target.value as string })
                }}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="order" className="text-right">
                排序
              </Label>
              <Input
                name="order"
                type="number"
                value={detail?.order}
                className="col-span-3"
                onChange={(e) => {
                  setDetail({ ...detail, order: parseInt(e.target.value) })
                }}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                状态
              </Label>
              <div className="col-span-3 flex items-center space-x-2">
                <Switch
                  id="status"
                  checked={detail?.status === 1}
                  onCheckedChange={(checked) => {
                    setDetail({ ...detail, status: checked ? 1 : 0 })
                  }}
                />
                <Label
                  htmlFor="status"
                  className="text-sm text-muted-foreground"
                >
                  {detail?.status === 1 ? '启用' : '禁用'}
                </Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <ConfirmButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
})

export function ConfirmButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending}>
      {pending && <Loading />}保存
    </Button>
  )
}

export default EditDialog