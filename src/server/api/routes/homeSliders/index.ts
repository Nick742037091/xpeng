import { Hono } from 'hono'
import { z } from 'zod'
import prisma from '@/lib/prisma'
import { Validator } from '@/server/api/validator'

export type ButtonItem = {
  text: string
  href: string
}

const paramSchema = z.object({
  id: z.string().min(1, 'id不能为空')
})

const bodySchema = z.object({
  img: z.string().min(1, '图片不能为空'),
  title: z.string().min(1, '标题不能为空'),
  subtitle: z.string().min(1, '副标题不能为空'),
  buttons: z.array(
    z.object({
      text: z.string().min(1, '按钮文本不能为空'),
      href: z.string().min(1, '按钮链接不能为空')
    })
  ),
  order: z.number(),
  status: z.number()
})

const app = new Hono()
  .basePath('/homeSliders')
  // 查找轮播图详情
  .get('/:id', Validator('param', paramSchema), async (c) => {
    const { id } = c.req.valid('param')
    const res = await prisma.homeSliders.findUnique({
      where: { id: +id },
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
    if (res) {
      return c.json({
        data: {
          ...res,
          buttons: res?.buttons as null | ButtonItem[]
        },
        message: '请求成功',
        code: 0
      })
    } else {
      return c.json({
        message: '数据不存在',
        data: null,
        code: -1
      })
    }
  })
  // 保存轮播图
  .post(
    '/:id',
    Validator('param', paramSchema),
    Validator('json', bodySchema),
    async (c) => {
      const { id } = c.req.valid('param')
      const data = c.req.valid('json')

      if (id) {
        await prisma.homeSliders.update({
          where: { id: +id },
          data
        })
      } else {
        await prisma.homeSliders.create({
          data
        })
      }

      return c.json({
        data: null,
        message: '保存成功',
        code: 0
      })
    }
  )
  .delete('/:id', Validator('param', paramSchema), async (c) => {
    const { id } = c.req.valid('param')
    await prisma.homeSliders.delete({ where: { id: +id } })
    return c.json({
      data: null,
      message: '删除成功',
      code: 0
    })
  })

export default app
