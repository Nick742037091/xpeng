import pino from 'pino'
import pinoLoki from 'pino-loki'

// pino日志
const pinoLogger = pino(
  {
    base: undefined,
    formatters: {
      level: (label) => {
        return { level: label }
      }
    }
  },
  // loki配置
  // 生产环境删除loki配置之后会记录到日志文件里面
  pinoLoki({
    host: process.env.LOKI_HOST!,
    labels: {
      app: `xpeng-${process.env.NEXT_PUBLIC_ENV}`
    },
    batching: true,
    interval: 5,
    basicAuth: {
      username: process.env.LOKI_USER!,
      password: process.env.LOKI_TOKEN!
    }
  })
)

const createLogMethod = (
  method: 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace'
) => {
  return (options: Record<string, unknown>) => {
    if (!pinoLogger) return
    // 本地开发环境终端有异常报错，不记录日志
    if (process.env.NODE_ENV === 'development') return
    pinoLogger[method](options)
  }
}
// 自定义logger，根据环境判断是否打日志
const logger = {
  info: createLogMethod('info'),
  error: createLogMethod('error'),
  warn: createLogMethod('warn')
}

export default logger
