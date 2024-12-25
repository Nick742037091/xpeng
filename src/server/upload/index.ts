import COS from 'cos-js-sdk-v5'
import { api } from '@/server/api/client'
import { md5 } from 'js-md5'
import { readFile } from '@/lib/utils'
export let cos: COS | null = null

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

export const upload = async (
  file: File | null,
  path: string,
  options?: Omit<COS.UploadFileParams, 'Bucket' | 'Region' | 'Key' | 'Body'>
) => {
  if (!file) return
  await initCos()
  if (!cos) return
  const env = process.env.NEXT_PUBLIC_ENV!
  const bucket = process.env.NEXT_PUBLIC_UPLOAD_BUCKET!
  const region = process.env.NEXT_PUBLIC_UPLOAD_REGION!
  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
  const fileData = await readFile(file)
  const key = md5(fileData)
  console.log(key)
  const result = await cos.uploadFile({
    Bucket: bucket,
    Region: region,
    Key: `${env}/${path}/${key}.${ext}`,
    Body: file,
    SliceSize: 1024 * 1024 * 10,
    AsyncLimit: 6,
    ...options
  })
  return 'https://' + result.Location
}
