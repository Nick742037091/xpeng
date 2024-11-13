import { api } from '@/server/client'
import Table from './components/Table'

export default async function HomeSlider() {
  const resp = await api.homeSliders.$get({
    query: {
      status: '1'
    }
  })

  const { code, data, message } = await resp.json()
  if (code !== 0) {
    throw new Error(message)
  }

  return (
    <div className="p-4">
      <Table data={data} />
    </div>
  )
}
