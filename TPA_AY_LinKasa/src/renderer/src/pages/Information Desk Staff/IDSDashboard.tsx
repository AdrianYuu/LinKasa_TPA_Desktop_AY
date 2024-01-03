import Sidebar from '@renderer/components/Information Desk Staff/Sidebar'
import Navbar from '@renderer/components/Navbar'
import terminalMap from '../../assets/terminalMap.png'
import airportMap from '../../assets/airportMap.jpg'

const IDSDashboard = () => {
  return (
    <div className="d-flex vh-100">
      <Sidebar />
      <div className="w-100 overflow-auto">
        <Navbar />
        <div className="px-5 py-4 overflow-hidden">
          <h5 className="mt-2 mb-4 text-muted">
            Information Desk Staff
            <i className="bi bi-arrow-right mx-2"></i>
            Dashboard
          </h5>
          <div className="d-flex flex-column gap-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Terminal Map</h5>
              </div>
              <img src={terminalMap} alt="" className="card-img-top p-2" style={{ maxWidth: '50%' }} />
            </div>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Airport Map</h5>
              </div>
              <img src={airportMap} alt="" className="card-img-top p-4" style={{ maxWidth: '50%' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IDSDashboard
