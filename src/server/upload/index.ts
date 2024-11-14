import COS from 'cos-js-sdk-v5'
import { api } from '@/server/api/client'

let cos: COS | null = null

export const initCos = async () => {
  const resp = await api.common.qcloudCredential.$get()
  const { data, isSuccess, message } = await resp.json()
  if (!isSuccess || !data) return console.error(message)
  cos = new COS({
    SecretId: data.credentials.tmpSecretId,
    SecretKey: data.credentials.tmpSecretKey,
    SecurityToken: data.credentials.sessionToken,
    StartTime: data.startTime, // 建议传入服务端时间，可避免客户端时间不准导致的签名错误
    ExpiredTime: data.expiredTime // 临时密钥过期时间
  })
}

export const upload = async (file: File | null, path: string) => {
  if (!file) return
  if (!cos) return
  const key = Date.now()
  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
  const result = await cos.putObject({
    Bucket: 'xpeng-1253523970',
    Region: 'ap-guangzhou',
    Key: `${path}/${key}.${ext}`,
    Body: file
  })
  return 'https://' + result.Location
}
