import { getHomeSliders } from '@/actions/homeSliders'
import Slider from './index'

export default async function SliderWrapper() {
  const sliders = await getHomeSliders({ status: 1 })
  return <Slider sliderList={sliders} />
}