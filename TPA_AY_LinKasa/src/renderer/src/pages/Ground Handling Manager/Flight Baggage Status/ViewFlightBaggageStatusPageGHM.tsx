import Sidebar from '@renderer/components/Ground Handling Manager/Sidebar'
import Navbar from '@renderer/components/Navbar'
import { getFlightSchedules } from '@renderer/controllers/FlightScheduleController'
import { db } from '@renderer/firebase'
import { collection, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const ViewFlightBaggageStatusPageGHM = () => {
  const [flightSchedulesData, setFlightSchedulesData] = useState<FlightSchedule[] | null>(null)

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'flight-schedule'), fetchData)
    return () => {
      unsubscribe()
    }
  }, [])

  const fetchData = async () => {
    try {
      setFlightSchedulesData(await getFlightSchedules())
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
          {flightSchedulesData && flightSchedulesData.length > 0 ? (
            <h5 className="mt-2 mb-4 text-muted">
              Ground Handling Manager
              <i className="bi bi-arrow-right mx-2"></i>
              View Flight Baggage Status
            </h5>
          ) : (
            <></>
          )}
          {flightSchedulesData && flightSchedulesData.length > 0 ? (
            <table className="table table-striped table-hover table-responsive">
              <thead className="table-dark">
                <tr>
                  <th scope="col">No.</th>
                  <th scope="col">Flight ID</th>
                  <th scope="col">Plane Name</th>
                  <th scope="col">Flight Date</th>
                  <th scope="col">Baggage Status AOM</th>
                  <th scope="col">Baggage Status GHM</th>
                  <th scope="col">Baggage Status BSS</th>
                  <th scope="col" className="text-center">
                    Edit
                  </th>
                </tr>
              </thead>
              <tbody>
                {flightSchedulesData.map((flightSchedule, index) => (
                  <tr key={flightSchedule.id}>
                    <th scope="row">{index + 1}.</th>
                    <td>{flightSchedule.id}</td>
                    <td>{flightSchedule.planeName}</td>
                    <td>{flightSchedule.flightDate}</td>
                    <td>{flightSchedule.baggageStatusAOM}</td>
                    <td>{flightSchedule.baggageStatusGHM}</td>
                    <td>{flightSchedule.baggageStatusBSS}</td>
                    <td className="text-center">
                      <Link to={`/ghm/edit-flight-baggage-status/${flightSchedule.id}`}>
                        <i className="bi bi-pencil-fill text-primary"></i>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center my-4">
              <p className="lead">No flight schedule data records found.</p>
              <i className="bi bi-emoji-frown" style={{ fontSize: '2rem', color: '#6c757d' }}></i>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ViewFlightBaggageStatusPageGHM
