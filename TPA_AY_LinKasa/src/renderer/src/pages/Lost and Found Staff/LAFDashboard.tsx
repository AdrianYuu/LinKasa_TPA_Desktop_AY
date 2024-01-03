import CardInformation from '@renderer/components/CardInformation'
import Sidebar from '@renderer/components/Lost and Found Staff/Sidebar'
import Navbar from '@renderer/components/Navbar'
import { getLogsCount } from '@renderer/controllers/LostAndFoundItemLogController'
import { useEffect, useState } from 'react'

const LAFDashboard = () => {
  const [itemCount, setItemCount] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      const item = await getLogsCount()
      setItemCount(item)
    }

    fetchData()
  }, [])

  return (
    <div className="d-flex vh-100">
      <Sidebar />
      <div className="w-100 overflow-auto">
        <Navbar />
        <div className="px-5 py-4">
          <h5 className="mt-2 mb-4 text-muted overflow-hidden">
            Lost and Found Staff
            <i className="bi bi-arrow-right mx-2"></i>
            Dashboard
          </h5>
          <CardInformation count={itemCount} type="laf" />
        </div>
      </div>
    </div>
  )
}

export default LAFDashboard
