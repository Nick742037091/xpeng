import { getHomeSliders } from '@/actions/homeSliders'

export type HomeSliderList = Awaited<ReturnType<typeof getHomeSliders>>

export type HomeSliderListItem = HomeSliderList[number]
