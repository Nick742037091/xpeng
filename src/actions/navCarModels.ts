'use server'
import { Prisma } from '@prisma/client'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/dist/server/web/spec-extension/revalidate'
import { responseError, responseSuccess } from './utils'
import { importCarModels } from '@/app/(site)/components/TopNavigator/data'

export type ListCarModelItem = Prisma.navCarModelsGetPayload<{
  select: {
    id: true
    modelName: true
    modelImg: true
  }
}>

export async function getNavCarModels() {
  return await prisma.navCarModels.findMany({
    orderBy: {
      id: 'asc'
    },
    select: {
      id: true,
      modelName: true,
      modelImg: true
    }
  })
}

export const getNavCarModelDetail = async (id?: number) => {
  return await prisma.navCarModels.findUnique({
    where: { id },
    select: {
      id: true,
      modelName: true,
      modelImg: true
    }
  })
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
    return responseError('车型不能为空')
  }
  if (!modelImg) {
    return responseError('图片不能为空')
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
  return responseSuccess(null, '保存成功')
}

export const deleteNavCarModel = async (id: number) => {
  const detail = await prisma.navCarModels.findUnique({ where: { id } })
  if (!detail) {
    return responseError('记录不存在')
  }
  await prisma.navCarModels.delete({ where: { id } })
  refreshNavCarModelsPage()
  return responseSuccess(null, '删除成功')
}

export const refreshNavCarModelsPage = async () => {
  // await importCarModels()
  revalidatePath('/admin/nav-car-models', 'page')
}
