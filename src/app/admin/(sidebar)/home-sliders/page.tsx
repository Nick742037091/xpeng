import Table from './components/Table'
import { getHomeSliders } from '@/actions/homeSliders'

export default async function HomeSlider() {
  const data = await getHomeSliders()
  return (
    <div className="p-4">
      <Table data={data} />
    </div>
  )
}
