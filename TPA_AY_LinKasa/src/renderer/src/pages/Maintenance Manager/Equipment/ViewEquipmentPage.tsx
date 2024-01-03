import { useEffect, useState } from 'react'
import Sidebar from '../../../components/Maintenance Manager/Sidebar'
import Navbar from '../../../components/Navbar'
import { Link } from 'react-router-dom'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '@renderer/firebase'
import { getEquipments } from '@renderer/controllers/EquipmentController'

const ViewEquipmentPage = () => {
  const [equipmentsData, setEquipmentsData] = useState<Equipment[] | null>(null)

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'equipment'), fetchData)
    return () => {
      unsubscribe()
    }
  }, [])

  const fetchData = async () => {
    try {
      setEquipmentsData(await getEquipments())
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
          {equipmentsData && equipmentsData.length > 0 ? (
            <h5 className="mt-2 mb-4 text-muted">
              Maintenance Manager
              <i className="bi bi-arrow-right mx-2"></i>
              View Equipment List
            </h5>
          ) : (
            <></>
          )}
          {equipmentsData && equipmentsData.length > 0 ? (
            <table className="table table-striped table-hover table-responsive">
              <thead className="table-dark">
                <tr>
                  <th scope="col">No.</th>
                  <th scope="col">Name</th>
                  <th scope="col">Type</th>
                  <th scope="col">Status</th>
                  <th scope="col">Edit</th>
                </tr>
              </thead>
              <tbody>
                {equipmentsData.map((equipment, index) => (
                  <tr key={equipment.id}>
                    <th scope="row">{index + 1}.</th>
                    <td>{equipment.name}</td>
                    <td>{equipment.type}</td>
                    <td>{equipment.status}</td>
                    <td className="text-center">
                      <Link to={`/mm/edit-equipment/${equipment.id}`}>
                        <i className="bi bi-pencil-fill text-primary"></i>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center my-4">
              <p className="lead">No equipment data records found.</p>
              <i className="bi bi-emoji-frown" style={{ fontSize: '2rem', color: '#6c757d' }}></i>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ViewEquipmentPage
