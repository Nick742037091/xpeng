import { getHomeSliders } from '@/actions/homeSliders'
import Table from './components/Table'

export default async function HomeSlider() {
  const data = await getHomeSliders()

  return (
    <div className="p-4">
      <Table data={data} />
    </div>
  )
}
