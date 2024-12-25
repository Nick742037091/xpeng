'use client'

import { cn, success } from '@/lib/utils'
import { useEffect, useRef, useState } from 'react'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { cos, upload } from '@/server/upload'
import COS from 'cos-js-sdk-v5'
import { api } from '@/server/api/client'
import Loading from '@/components/admin/Loading'
type ProgressParam = Parameters<
  NonNullable<COS.UploadFileParams['onProgress']>
>[0]

const toMB = (value: number) => (value / 1024 / 1024).toFixed(1)
const calculateRestTime = (total: number, loaded: number, speed: number) => {
  if (speed === 0) return '0分'
  const restTime = (total - loaded) / speed
  return restTime > 60
    ? `${(restTime / 60).toFixed(0)}分`
    : `${restTime.toFixed(0)}秒`
}
function UploadInfo(props: {
  fileName: string
  isUploading: boolean
  onPause: () => void
  progressData: ProgressParam
}) {
  const { loaded, total, speed, percent } = props.progressData
  const progressText = `${toMB(loaded)}MB/${toMB(total)}MB`
  const speedText = `${toMB(speed)}MB/s`
  const restTimeText = `剩余时间：${calculateRestTime(total, loaded, speed)}`
  return (
    <div className="flex flex-col">
      <div className="text-[16px]">{props.fileName}</div>
      <div className="flex items-center">
        <div className="flex items-center">
          <Progress className="w-[600px]" value={percent * 100} />
          <div className="text-[16px] text-[#333] font-bold ml-[10px]">
            {(percent * 100).toFixed(0)}%
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="ml-[20px]"
          onClick={props.onPause}
        >
          {props.isUploading && <Loading color="black" />}
          {props.isUploading ? '暂停' : '继续'}
        </Button>
      </div>
      <div className="flex mt-[10px] text-[#333] justify-between">
        <div>
          上传进度：<span className="font-bold">{progressText}</span>
        </div>
        <div>
          上传速度：<span className="font-bold">{speedText}</span>
        </div>
        <div>
          剩余时间：<span className="font-bold">{restTimeText}</span>
        </div>
      </div>
    </div>
  )
}

export default function HomeVideo() {
  const [videoUrl, setVideoUrl] = useState('')
  const [loading, setLoading] = useState(true)
  const [isUploading, setIsUploading] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const taskId = useRef<string | null>(null)
  const ref = useRef<HTMLInputElement>(null)
  const [progressData, setProgressData] = useState<ProgressParam>({
    loaded: 0,
    total: 0,
    speed: 0,
    percent: 0
  })

  const handleUpload = () => {
    if (!ref.current) return
    ref.current.value = ''
    ref.current.click()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setFile(file)
    setIsUploading(true)
    setVideoUrl('')
    setProgressData({
      loaded: 0,
      total: 0,
      speed: 0,
      percent: 0
    })
    const url = await upload(file, 'hom-video ', {
      onTaskReady: (id) => {
        taskId.current = id
      },
      onProgress: (progress) => {
        // 避免继续上传进度归零
        if (progress.speed === 0) return
        console.log('progress', progress)
        setProgressData(progress)
      }
    })
    if (!url) return
    await api.admin.homeVideo.$put({ json: { url } })
    success('上传成功')
    setVideoUrl(url)
    setFile(null)
  }

  // TODO 重新上传时间和上一次上传进度无法精确对应
  const handlePause = () => {
    if (!taskId.current) return
    if (isUploading) {
      cos?.pauseTask(taskId.current)
      setIsUploading(false)
    } else {
      cos?.restartTask(taskId.current)
      setIsUploading(true)
    }
  }

  useEffect(() => {
    const fetchHomeVideo = async () => {
      setLoading(true)
      const resp = await api.admin.homeVideo.$get()
      const { data } = await resp.json()
      setLoading(false)
      if (!data) return
      setVideoUrl(data)
    }
    fetchHomeVideo()
  }, [])

  if (loading) {
    return (
      <div className="flex m-[20px]">
        <div className="animate-pulse">
          <div className="w-[600px] h-[300px] bg-gray-200 rounded mb-[10px]"></div>
          <div className="w-[100px] h-[40px] bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }
  return (
    <div className="m-[20px]">
      {videoUrl && (
        <video src={videoUrl} controls className="w-[600px] mb-[10px]" />
      )}
      <div
        className={cn(
          'border border-[#aaa] rounded-[4px] p-[10px] ',
          ' flex flex-col items-center justify-center overflow-hidden',
          file ? 'w-[760px]' : 'w-[100px]'
        )}
      >
        {file ? (
          <UploadInfo
            isUploading={isUploading}
            fileName={file?.name || ''}
            onPause={handlePause}
            progressData={progressData}
          />
        ) : (
          <div
            className="text-[16px] font-bold cursor-pointer"
            onClick={handleUpload}
          >
            {videoUrl ? '重新上传' : '上传视频'}
          </div>
        )}
        <input
          type="file"
          accept="video/*"
          className="hidden"
          ref={ref}
          onChange={handleFileChange}
        />
      </div>
    </div>
  )
}
