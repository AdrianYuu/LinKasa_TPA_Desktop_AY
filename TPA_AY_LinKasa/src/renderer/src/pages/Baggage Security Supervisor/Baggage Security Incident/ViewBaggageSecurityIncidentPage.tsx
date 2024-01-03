import { useEffect, useState } from 'react'
import Sidebar from '../../../components/Baggage Security Supervisor/Sidebar'
import Navbar from '../../../components/Navbar'
import { Link } from 'react-router-dom'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '@renderer/firebase'
import { getBaggageSecurityIncidents } from './../../../controllers/BaggageSecurityIncidentController'

const ViewBaggageSecurityIncidentPage = () => {
  const [baggageSecurityIncidents, setBaggageSecurityIncidents] = useState<
    BaggageSecurityIncident[] | null
  >(null)

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'baggage-security-incident'), fetchData)
    return () => {
      unsubscribe()
    }
  }, [])

  const fetchData = async () => {
    try {
      setBaggageSecurityIncidents(await getBaggageSecurityIncidents())
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
          {baggageSecurityIncidents && baggageSecurityIncidents.length > 0 ? (
            <h5 className="mt-2 mb-4 text-muted">
              Baggage Security Supervisor
              <i className="bi bi-arrow-right mx-2"></i>
              View Baggage Security Incident
            </h5>
          ) : (
            <></>
          )}
          {baggageSecurityIncidents && baggageSecurityIncidents.length > 0 ? (
            <table className="table table-striped table-hover table-responsive">
              <thead className="table-dark">
                <tr>
                  <th scope="col">No.</th>
                  <th scope="col">Details of Incident</th>
                  <th scope="col">Response Date</th>
                  <th scope="col">Response Time</th>
                  <th scope="col">Action Taken</th>
                  <th scope="col" className="text-center">
                    Edit
                  </th>
                  <th scope="col" className="text-center">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {baggageSecurityIncidents.map((incident, index) => (
                  <tr key={incident.id}>
                    <th scope="row">{index + 1}.</th>
                    <td>{incident.detailsOfIncident}</td>
                    <td>{incident.responseDate}</td>
                    <td>{incident.responseTime}</td>
                    <td>{incident.actionTaken}</td>
                    <td className="text-center">
                      <Link to={`/bss/edit-baggage-security-incident/${incident.id}`}>
                        <i className="bi bi-pencil-fill text-primary"></i>
                      </Link>
                    </td>
                    <td className="text-center">
                      <Link to={`/bss/delete-baggage-security-incident/${incident.id}`}>
                        <i className="bi bi-trash3-fill text-danger"></i>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center my-4">
              <p className="lead">No baggage security incident data records found.</p>
              <i className="bi bi-emoji-frown" style={{ fontSize: '2rem', color: '#6c757d' }}></i>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ViewBaggageSecurityIncidentPage
