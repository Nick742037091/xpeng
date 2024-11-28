import { Hono } from 'hono'
import commonRoute from './routes/common'
import authRoute from './routes/auth'
import homeSlidersRoute from './routes/homeSliders'
import adminRoute from './routes/admin/index'
import navCarModelsRoute from './routes/navCarModels'
import { apiLog } from './middlewares/apiLog'
import { handleError } from './middlewares/error'
const app = new Hono().basePath('/api')

app.use('*', async (c, next) => apiLog({ c, next }))
app.onError(handleError)

export const routes = app
  .route('/', commonRoute)
  .route('/', authRoute)
  .route('/', homeSlidersRoute)
  .route('/', adminRoute)
  .route('/', navCarModelsRoute)

export default app

export type AppType = typeof routes
