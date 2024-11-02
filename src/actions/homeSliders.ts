'use server'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { responseError, responseSuccess } from './utils'
// import { importSliders } from '@/app/(site)/components/Slider/data'

export type ListHomeSliderItem = Awaited<
  ReturnType<typeof getHomeSliders>
>[number]
export type ButtonItem = {
  text: string
  href: string
}

export type HomeSliderDetail = Awaited<ReturnType<typeof getHomeSliderDetail>>

export async function getHomeSliders({ status }: { status?: number } = {}) {
  const res = await prisma.homeSliders.findMany({
    where: {
      // 支持多个where，向下添加行即可
      ...(status !== undefined && { status })
    },
    orderBy: {
      id: 'asc'
    },
    select: {
      id: true,
      img: true,
      title: true,
      subtitle: true,
      buttons: true,
      order: true,
      status: true
    }
  })
  return res.map((item) => ({
    ...item,
    buttons: item.buttons as null | ButtonItem[]
  }))
}

export const getHomeSliderDetail = async (id?: number) => {
  const res = await prisma.homeSliders.findUnique({
    where: { id },
    select: {
      id: true,
      img: true,
      title: true,
      subtitle: true,
      buttons: true,
      order: true,
      status: true
    }
  })
  if (!res) return null
  return {
    ...res,
    buttons: res?.buttons as null | ButtonItem[]
  }
}

export const saveHomeSlider = async ({
  id,
  img,
  title,
  subtitle,
  buttons,
  order,
  status
}: {
  id?: number
  img: string
  title: string
  subtitle: string
  buttons: ButtonItem[]
  order: number
  status: number
}) => {
  if (!img) return responseError('图片不能为空')
  if (!title) return responseError('标题不能为空')
  if (!subtitle) return responseError('副标题不能为空')

  if (id) {
    await prisma.homeSliders.update({
      where: { id: +id },
      data: { img, title, subtitle, buttons, order, status }
    })
  } else {
    await prisma.homeSliders.create({
      data: { img, title, subtitle, buttons, order, status }
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
  // await importSliders()
  revalidatePath('/admin/home-sliders')
}
