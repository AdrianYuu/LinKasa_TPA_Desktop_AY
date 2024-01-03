import WeatherCard from '@renderer/components/Airport Operations Manager/CardWeather'
import Sidebar from '@renderer/components/Airport Operations Manager/Sidebar'
import Navbar from '@renderer/components/Navbar'

const AOMDashboard = () => {
  return (
    <div className="d-flex vh-100">
      <Sidebar />
      <div className="w-100 overflow-auto">
        <Navbar />
        <div className="px-5 py-4 overflow-hidden">
          <h5 className="mt-2 mb-4 text-muted">
            Airport Operations Manager
            <i className="bi bi-arrow-right mx-2"></i>
            Dashboard
          </h5>
          <WeatherCard />
        </div>
      </div>
    </div>
  )
}

export default AOMDashboard
