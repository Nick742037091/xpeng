import Slider from './index'
import { api } from '@/server/client'

export default async function SliderWrapper() {
  const resp = await api.homeSliders.$get({
    query: { status: '1' }
  })
  const { code, data } = await resp.json()
  if (code !== 0) {
    return null
  }
  return <Slider sliderList={data} />
}
