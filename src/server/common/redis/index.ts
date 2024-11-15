import Redis from 'ioredis'
import { COS_CREDENTIAL_KEY } from './keys'

const redis = new Redis(process.env.REDIS_URL!)

export default redis

/**
 * 获取 COS 凭证缓存
 * @returns 凭证
 */
export const getCosCredentialCache = async () => {
  const credential = await redis.get(COS_CREDENTIAL_KEY)
  return credential
}

/**
 * 设置 COS 凭证缓存
 * @param credential 凭证
 */
export const setCosCredentialCache = async (credential: string) => {
  // COS凭证缓存时间为 凭证有效期 - 5 分钟
  await redis.set(
    COS_CREDENTIAL_KEY,
    credential,
    'EX',
    parseInt(process.env.COS_CREDENTIAL_DURATION!) - 5 * 60
  )
  return
}
