import Sidebar from '@renderer/components/Landside Operations Manager/Sidebar'
import Navbar from '@renderer/components/Navbar'
import { getTransportationRoute } from '@renderer/controllers/TransporationRouteController'
import { getTransportationSchedules } from '@renderer/controllers/TransportationScheduleController'
import { db } from '@renderer/firebase'
import { collection, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const ViewTransportationSchedulePage = () => {
  const [transportationScheduleData, setTransportationScheduleData] = useState<
    TransportationSchedule[] | null
  >(null)

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'transportation-schedule'), fetchData)
    return () => {
      unsubscribe()
    }
  }, [])

  const fetchData = async () => {
    try {
      const schedules = await getTransportationSchedules()
      if (!schedules) return

      const schedulesWithRouteDetails = await Promise.all(
        schedules.map(async (schedule) => {
          const routeDetails = await getTransportationRoute(schedule.transportationRouteID)
          return routeDetails ? { ...schedule, transportationRoute: routeDetails } : null
        })
      )

      const validSchedulesWithRoutes = schedulesWithRouteDetails.filter(
        (scheduleWithRoute) => scheduleWithRoute !== null
      ) as TransportationSchedule[]

      setTransportationScheduleData(validSchedulesWithRoutes)
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
        <div className="px-5 py-4 overflow-hidden">
          {transportationScheduleData && transportationScheduleData.length > 0 ? (
            <h5 className="mt-2 mb-4 text-muted">
              Landside Operations Manager
              <i className="bi bi-arrow-right mx-2"></i>
              View Transportation Schedule
            </h5>
          ) : (
            <></>
          )}
          {transportationScheduleData && transportationScheduleData.length > 0 ? (
            <table className="table table-striped table-hover table-responsive">
              <thead className="table-dark">
                <tr>
                  <th scope="col">No.</th>
                  <th scope="col">Description</th>
                  <th scope="col">Date</th>
                  <th scope="col">Time</th>
                  <th scope="col">Start Location</th>
                  <th scope="col">Stops</th>
                  <th scope="col">Destination</th>
                  <th scope="col" className="text-center">
                    Edit
                  </th>
                  <th scope="col" className="text-center">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {transportationScheduleData.map((schedule, index) => (
                  <tr key={schedule.id}>
                    <th scope="row">{index + 1}.</th>
                    <td>{schedule.description}</td>
                    <td>{schedule.date}</td>
                    <td>{schedule.time}</td>
                    <td>
                      {schedule.transportationRoute && schedule.transportationRoute.startLocation}
                    </td>
                    <td>
                      <ul>
                        {schedule.transportationRoute &&
                          schedule.transportationRoute.stops.map((stop, index) => (
                            <li key={index}>{stop}</li>
                          ))}
                      </ul>
                    </td>
                    <td>
                      {schedule.transportationRoute && schedule.transportationRoute.destination}
                    </td>
                    <td className="text-center">
                      <Link to={`/lom/edit-transportation-schedule/${schedule.id}`}>
                        <i className="bi bi-pencil-fill text-primary"></i>
                      </Link>
                    </td>
                    <td className="text-center">
                      <Link to={`/lom/delete-transportation-schedule/${schedule.id}`}>
                        <i className="bi bi-trash3-fill text-danger"></i>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center my-4">
              <p className="lead">No transportation schedule data records found.</p>
              <i className="bi bi-emoji-frown" style={{ fontSize: '2rem', color: '#6c757d' }}></i>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ViewTransportationSchedulePage
