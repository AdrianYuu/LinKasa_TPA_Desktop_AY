import Sidebar from '@renderer/components/Customs and Border Control Officers/Sidebar'
import Navbar from '@renderer/components/Navbar'

const CABCODashboard = () => {
  return (
    <div className="d-flex vh-100">
      <Sidebar />
      <div className="w-100 overflow-auto">
        <Navbar />
        <div className="px-5 py-4 overflow-hidden">
          <h5 className="mt-2 mb-4 text-muted">
            Customs and Border Control Officers
            <i className="bi bi-arrow-right mx-2"></i>
            Dashboard
          </h5>
        </div>
      </div>
    </div>
  )
}

export default CABCODashboard
