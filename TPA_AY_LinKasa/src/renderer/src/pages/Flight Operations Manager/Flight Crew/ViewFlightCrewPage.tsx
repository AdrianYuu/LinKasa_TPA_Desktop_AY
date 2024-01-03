import Sidebar from '@renderer/components/Flight Operations Manager/Sidebar'
import Navbar from '@renderer/components/Navbar'
import { getFlightCrews } from '@renderer/controllers/FlightCrewController'
import { db } from '@renderer/firebase'
import { collection, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const ViewFlightCrewPage = () => {
  const [flightCrewsData, setFlightCrewsData] = useState<FlightCrew[] | null>(null)

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'flight-crew'), fetchData)
    return () => {
      unsubscribe()
    }
  }, [])

  const fetchData = async () => {
    try {
      setFlightCrewsData(await getFlightCrews())
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
          {flightCrewsData && flightCrewsData.length > 0 ? (
            <h5 className="mt-2 mb-4 text-muted">
              Flight Operations Manager
              <i className="bi bi-arrow-right mx-2"></i>
              View Flight Crew
            </h5>
          ) : (
            <></>
          )}
          {flightCrewsData && flightCrewsData.length > 0 ? (
            <table className="table table-striped table-hover table-responsive">
              <thead className="table-dark">
                <tr>
                  <th scope="col">No.</th>
                  <th scope="col">Crew Name</th>
                  <th scope="col">Pilot</th>
                  <th scope="col">Co-Pilot</th>
                  <th scope="col">Cabin Crews</th>
                  <th scope="col" className="text-center">
                    Edit
                  </th>
                  <th scope="col" className="text-center">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {flightCrewsData.map((flightCrew, index) => (
                  <tr key={flightCrew.id}>
                    <th scope="row">{index + 1}.</th>
                    <td>{flightCrew.crewName}</td>
                    <td>{flightCrew.pilot}</td>
                    <td>{flightCrew.coPilot}</td>
                    <td>
                      {flightCrew.cabinCrews.map((cabinCrew) => (
                        <li>{cabinCrew}</li>
                      ))}
                    </td>
                    <td className="text-center">
                      <Link to={`/fom/edit-flight-crew/${flightCrew.id}`}>
                        <i className="bi bi-pencil-fill text-primary"></i>
                      </Link>
                    </td>
                    <td className="text-center">
                      <Link to={`/fom/delete-flight-crew/${flightCrew.id}`}>
                        <i className="bi bi-trash3-fill text-danger"></i>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center my-4">
              <p className="lead">No flight crew data records found.</p>
              <i className="bi bi-emoji-frown" style={{ fontSize: '2rem', color: '#6c757d' }}></i>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ViewFlightCrewPage
