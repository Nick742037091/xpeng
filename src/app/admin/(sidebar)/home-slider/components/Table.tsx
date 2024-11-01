'use client'

import { ColumnDef } from '@tanstack/react-table'
import {
  deleteHomeSlider,
  type ListHomeSliderItem
} from '@/actions/homeSliders'
import { DataTable } from '@/components/ui/data-table'
import { Button } from '@/components/ui/button'
import RefreshButton from './RefreshButton'
import { useRef } from 'react'
import EditDialog, { EditDialogRef } from './EditDialog'
import { confirm, error, success } from '@/lib/utils'

export default function Table({ data }: { data: ListHomeSliderItem[] }) {
  const columns: ColumnDef<ListHomeSliderItem>[] = [
    {
      header: '标题',
      accessorKey: 'title'
    },
    {
      header: '副标题',
      accessorKey: 'subtitle'
    },
    {
      header: '图片',
      accessorKey: 'img'
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
      title: '删除轮播图',
      description: '确定要删除该轮播图吗？'
    })
    if (!isConfirm) return
    const { isSuccess, message } = await deleteHomeSlider(id)
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
          新增轮播图
        </Button>
        <RefreshButton />
      </div>
      <DataTable columns={columns} data={data} />
      <EditDialog ref={editDialogRef} />
    </div>
  )
}
