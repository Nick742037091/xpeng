import { InferResponseType } from 'hono'
import { client } from '..'

export type HomeSliderList = InferResponseType<
  typeof client.api.homeSliders.$get
>['data']

export type HomeSliderListItem = HomeSliderList[number]
