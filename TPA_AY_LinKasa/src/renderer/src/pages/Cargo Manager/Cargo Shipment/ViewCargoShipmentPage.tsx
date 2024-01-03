import Navbar from '@renderer/components/Navbar'
import Sidebar from '@renderer/components/Cargo Manager/Sidebar'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '@renderer/firebase'
import { getCargoShipments } from '@renderer/controllers/CargoShipmentController'
import { getStorageSpace } from '@renderer/controllers/StorageSpaceController'

const ViewCargoShipmentPage = () => {
  const [cargoShipments, setCargoShipments] = useState<CargoShipment[] | null>(null)

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'cargo-shipment'), fetchData)
    return () => {
      unsubscribe()
    }
  }, [])

  const fetchData = async () => {
    try {
      const shipments = await getCargoShipments()
      if (!shipments) return

      const shipmentsWithDetails = await Promise.all(
        shipments.map(async (shipment) => {
          const storageSpaceStart = await getStorageSpace(shipment.storageStartID)
          const storageSpaceDestination = await getStorageSpace(shipment.storageDestinationID)

          const storageStartName = storageSpaceStart ? storageSpaceStart.name : ''
          const storageDestinationName = storageSpaceDestination ? storageSpaceDestination.name : ''

          return { ...shipment, storageStartName, storageDestinationName }
        })
      )

      setCargoShipments(shipmentsWithDetails)
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
          {cargoShipments && cargoShipments.length > 0 ? (
            <h5 className="mt-2 mb-4 text-muted">
              Cargo Manager
              <i className="bi bi-arrow-right mx-2"></i>
              View Cargo Shipment
            </h5>
          ) : (
            <></>
          )}
          {cargoShipments && cargoShipments.length > 0 ? (
            <div className="d-flex flex-column gap-5">
              <table className="table table-striped table-hover table-responsive">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">No.</th>
                    <th scope="col">Storage Start Name</th>
                    <th scope="col">Storage Destination Name</th>
                    <th scope="col">Current Location</th>
                    <th scope="col">Status</th>
                    <th scope="col">Date</th>
                    <th scope="col" className="text-center">
                      Edit
                    </th>
                    <th scope="col" className="text-center">
                      Delete
                    </th>
                  </tr>
                </thead>
                {cargoShipments.map((shipment, index) => (
                  <tbody>
                    <tr key={shipment.id}>
                      <th scope="row">{index + 1}.</th>
                      <td>{shipment.storageStartName}</td>
                      <td>{shipment.storageDestinationName}</td>
                      <td>{shipment.currentLocation}</td>
                      <td>{shipment.status}</td>
                      <td>{shipment.date}</td>
                      <td className="text-center">
                        <Link to={`/cm/edit-cargo-shipment/${shipment.id}`}>
                          <i className="bi bi-pencil-fill text-primary"></i>
                        </Link>
                      </td>
                      <td className="text-center">
                        <Link to={`/cm/delete-cargo-shipment/${shipment.id}`}>
                          <i className="bi bi-trash3-fill text-danger"></i>
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          ) : (
            <div className="text-center my-4">
              <p className="lead">No cargo shipment records found.</p>
              <i className="bi bi-emoji-frown" style={{ fontSize: '2rem', color: '#6c757d' }}></i>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ViewCargoShipmentPage
