'use server'
import { Prisma } from '@prisma/client'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { responseError, responseSuccess } from './utils'
import { importSliders } from '@/app/(site)/components/Slider/data'

export type ListHomeSliderItem = Prisma.homeSlidersGetPayload<{
  select: {
    id: true
    img: true
    title: true
    subtitle: true
    buttons: true
  }
}>

export type ButtonItem = {
  text: string
  href: string
}

export async function getHomeSliders() {
  return await prisma.homeSliders.findMany({
    orderBy: {
      id: 'asc'
    },
    select: {
      id: true,
      img: true,
      title: true,
      subtitle: true,
      buttons: true,
      order: true
    }
  })
}

export const getHomeSliderDetail = async (id?: number) => {
  return await prisma.homeSliders.findUnique({
    where: { id },
    select: {
      id: true,
      img: true,
      title: true,
      subtitle: true,
      buttons: true,
      order: true
    }
  })
}

export const saveHomeSlider = async ({
  id,
  img,
  title,
  subtitle,
  buttons,
  order
}: {
  id?: number
  img: string
  title: string
  subtitle: string
  buttons: ButtonItem[]
  order: number
}) => {
  if (!img) return responseError('图片不能为空')
  if (!title) return responseError('标题不能为空')
  if (!subtitle) return responseError('副标题不能为空')
  if (!buttons) return responseError('按钮配置不能为空')

  if (id) {
    await prisma.homeSliders.update({
      where: { id: +id },
      data: { img, title, subtitle, buttons, order }
    })
  } else {
    await prisma.homeSliders.create({
      data: { img, title, subtitle, buttons, order }
    })
  }
  refreshHomeSliderPage()
  return responseSuccess(null, '保存成功')
}

export const deleteHomeSlider = async (id: number) => {
  const detail = await prisma.homeSliders.findUnique({ where: { id } })
  if (!detail) return responseError('记录不存在')

  await prisma.homeSliders.delete({ where: { id } })
  refreshHomeSliderPage()
  return responseSuccess(null, '删除成功')
}

export const refreshHomeSliderPage = async () => {
  await importSliders()
  revalidatePath('/admin/home-slider')
}
