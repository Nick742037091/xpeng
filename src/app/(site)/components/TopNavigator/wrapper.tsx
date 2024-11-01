import TopNavigator from './index'
import { getNavCarModels } from '@/actions/navCarModels'

export default async function TopNavigatorWrapper() {
  const carModelList = await getNavCarModels({ status: 1 })
  return <TopNavigator carModelList={carModelList} />
}
