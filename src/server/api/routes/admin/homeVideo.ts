import { Hono } from 'hono'
import { z } from 'zod'
import { Validator } from '@/server/api/validator'
import { responseSuccess } from '@/server/common/response'
import { getHomeVideoCache, setHomeVideoCache } from '@/server/common/redis'

const bodySchema = z.object({
  url: z.string().min(1, '视频链接不能为空')
})

const app = new Hono()
  .basePath('/admin/homeVideo')
  // 查找轮播图详情
  .get('/', async (c) => {
    const url = await getHomeVideoCache()
    return c.json(responseSuccess(url))
  })
  // 添加轮播图
  .put('/', Validator('json', bodySchema), async (c) => {
    const data = c.req.valid('json')
    await setHomeVideoCache(data.url)
    return c.json(responseSuccess(null, '添加成功'))
  })

export default app
