'use server'

import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/dist/server/web/spec-extension/revalidate'

export async function getNavCarModels() {
  return await prisma.navCarModels.findMany()
}

export type ListCarModelItem = Awaited<
  ReturnType<typeof getNavCarModels>
>[number]

export const getNavCarModelDetail = async (id?: number) => {
  if (id) {
    return await prisma.navCarModels.findUnique({ where: { id } })
  }
}

export const saveNavCarModel = async ({
  id,
  modelName,
  modelImg
}: {
  id?: number
  modelName: string
  modelImg: string
}) => {
  if (!modelName) {
    return {
      isSuccess: false,
      message: '车型不能为空',
      code: -1
    }
  }
  if (!modelImg) {
    return {
      isSuccess: false,
      message: '图片不能为空',
      code: -1
    }
  }
  if (id) {
    await prisma.navCarModels.update({
      where: { id: +id },
      data: { modelName, modelImg }
    })
  } else {
    await prisma.navCarModels.create({
      data: { modelName, modelImg }
    })
  }
  refreshNavCarModelsPage()
  return {
    isSuccess: true,
    message: '保存成功',
    code: 0
  }
}

export const deleteNavCarModel = async (id: number) => {
  const detail = await prisma.navCarModels.findUnique({ where: { id } })
  if (!detail) {
    return {
      isSuccess: false,
      message: '记录不存在',
      code: -1
    }
  }
  await prisma.navCarModels.delete({ where: { id } })
  refreshNavCarModelsPage()
  return {
    isSuccess: true,
    message: '删除成功',
    code: 0
  }
}

export const refreshNavCarModelsPage = async () => {
  revalidatePath('/admin/nav-car-models', 'page')
}
