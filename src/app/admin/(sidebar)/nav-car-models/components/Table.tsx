'use client'

import { ColumnDef } from '@tanstack/react-table'
import {
  deleteNavCarModel,
  type ListCarModelItem
} from '@/actions/navCarModels'
import { DataTable } from '@/components/ui/data-table'
import { Button } from '@/components/ui/button'
import RefreshButton from './RefreshButton'
import { useRef } from 'react'
import EditDialog, { EditDialogRef } from './EditDialog'
import { confirm, error } from '@/lib/utils'
import { success } from '@/lib/utils'

export default function Table({ data }: { data: ListCarModelItem[] }) {
  const columns: ColumnDef<ListCarModelItem>[] = [
    {
      header: '车型',
      accessorKey: 'modelName'
    },
    {
      header: '图片',
      accessorKey: 'modelImg'
    },
    {
      accessorKey: "order",
      header: "排序",
    },
    {
      header: '操作',
      cell: ({ row }) => {
        return (
          <div>
            <Button onClick={() => handleEditItem(row.original.id)}>
              编辑
            </Button>
            <Button
              className="ml-[10px]"
              variant="destructive"
              onClick={() => handleDeleteItem(row.original.id)}
            >
              删除
            </Button>
          </div>
        )
      }
    }
  ]

  const editDialogRef = useRef<EditDialogRef>(null)

  const handleEditItem = (id: number) => {
    editDialogRef.current?.open(id)
  }

  const handleDeleteItem = async (id: number) => {
    const isConfirm = await confirm({
      title: '删除车型',
      description: '确定要删除该车型吗？'
    })
    if (!isConfirm) return
    const { isSuccess, message } = await deleteNavCarModel(id)
    if (isSuccess) {
      success(message)
    } else {
      error(message)
    }
  }

  return (
    <div>
      <div className="mb-[10px] flex items-center">
        <Button
          className="mr-[12px]"
          onClick={() => {
            editDialogRef.current?.open(0)
          }}
        >
          新增车型
        </Button>
        <RefreshButton />
      </div>
      <DataTable columns={columns} data={data} />
      <EditDialog ref={editDialogRef} />
    </div>
  )
}
