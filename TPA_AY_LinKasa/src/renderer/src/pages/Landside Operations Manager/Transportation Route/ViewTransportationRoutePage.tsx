import Navbar from '@renderer/components/Navbar'
import Sidebar from '@renderer/components/Landside Operations Manager/Sidebar'
import { useEffect, useState } from 'react'
import { getTransportationRoutes } from '@renderer/controllers/TransporationRouteController'
import CardTransporationRoute from '@renderer/components/Landside Operations Manager/CardTransporationRoute'
import { getEmployee } from '@renderer/controllers/EmployeeController'
import { db } from '@renderer/firebase'
import { collection, onSnapshot } from 'firebase/firestore'

const ViewTransportationRoutePage = () => {
  const [transportationRoutes, setTransportationRoutes] = useState<TransportationRoute[] | null>(
    null
  )

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'transportation-route'), fetchData)
    return () => {
      unsubscribe()
    }
  }, [])

  const fetchData = async () => {
    try {
      const routes = await getTransportationRoutes()
      if (!routes) return

      const routesWithEmployeeDetails = await Promise.all(
        routes.map(async (route) => {
          const involvedEmployeeDetails = await Promise.all(
            route.responsibleEmployees.map(async (employeeId) => {
              const employee = await getEmployee(employeeId)
              return employee ? employee.fullName : ''
            })
          )
          return { ...route, responsibleEmployees: involvedEmployeeDetails }
        })
      )

      setTransportationRoutes(routesWithEmployeeDetails)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="d-flex vh-100">
      <Sidebar />
      <div className="w-100 overflow-auto">
        <Navbar />
        <div className="px-5 py-4 d-flex flex-column gap-3 overflow-hidden">
          {transportationRoutes && transportationRoutes.length > 0 && (
            <h5 className="mt-2 mb-4 text-muted">
              Landside Operations Manager
              <i className="bi bi-arrow-right mx-2"></i>
              View Transporation Route
            </h5>
          )}
          <div className="d-flex flex-wrap gap-4 m-auto">
            {transportationRoutes && transportationRoutes.length > 0 ? (
              transportationRoutes.map((route) => (
                <CardTransporationRoute
                  id={route.id}
                  startLocation={route.startLocation}
                  destination={route.destination}
                  stops={route.stops}
                  responsibleEmployees={route.responsibleEmployees}
                />
              ))
            ) : (
              <div className="text-center my-4">
                <p className="lead">No transportation route data records found.</p>
                <i className="bi bi-emoji-frown" style={{ fontSize: '2rem', color: '#6c757d' }}></i>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewTransportationRoutePage
