import Sidebar from '../../../components/Cargo Manager/Sidebar'
import Navbar from '../../../components/Navbar'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getStorageSpaces } from '@renderer/controllers/StorageSpaceController'
import {
  deleteCargoShipment,
  getCargoShipment
} from '@renderer/controllers/CargoShipmentController'

const DeleteCargoShipmentPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [cargoShipmentData, setCargoShipmentData] = useState<CargoShipment | null>(null)

  const [storageSpacesData, setStorageSpacesData] = useState<StorageSpace[] | null>(null)

  const [storageStartID, setStorageStartID] = useState('')
  const [storageDestinationID, setStorageDestinationID] = useState('')
  const [currentLocation, setCurrentLocation] = useState('')
  const [status, setStatus] = useState('')
  const [date, setDate] = useState('')

  const formRef = useRef<HTMLFormElement | null>(null)

  const fillData = () => {
    if (!cargoShipmentData) return

    setStorageStartID(cargoShipmentData.storageStartID)
    setStorageDestinationID(cargoShipmentData.storageDestinationID)
    setStatus(cargoShipmentData.status)
    setDate(cargoShipmentData.date)
    setCurrentLocation(cargoShipmentData.currentLocation)
  }

  const fetchData = async () => {
    try {
      setStorageSpacesData(await getStorageSpaces())
      setCargoShipmentData(await getCargoShipment(id))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [id])

  useEffect(() => {
    fillData()
  }, [cargoShipmentData])

  const resetData = () => {
    setStorageStartID('')
    setStorageDestinationID('')
    setCurrentLocation('')
    setStatus('')
    setDate('')

    if (!formRef.current) return
    formRef.current.reset()
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    await deleteCargoShipment(id)
    resetData()
    navigate('/cm/view-cargo-shipment')
  }

  return (
    <div className="d-flex vh-100">
      <Sidebar />
      <div className="w-100 overflow-auto">
        <Navbar />
        <div className="px-5 py-4 overflow-hidden">
          <h5 className="mt-2 mb-4 text-muted">
            Cargo Manager
            <i className="bi bi-arrow-right mx-2"></i>
            Delete Cargo Shipment
          </h5>
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="storageStartID" className="form-label">
                Storage Start Name
              </label>
              <select
                id="storageStartID"
                name="storageStartID"
                className="form-select form-select-m"
                value={storageStartID}
                disabled
              >
                <option value="">Please select one...</option>
                {storageSpacesData &&
                  storageSpacesData.map((space) => <option value={space.id}>{space.name}</option>)}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="storageDestinationID" className="form-label">
                Storage Destination Name
              </label>
              <select
                id="storageDestinationID"
                name="storageDestinationID"
                className="form-select form-select-m"
                value={storageDestinationID}
                disabled
              >
                <option value="">Please select one...</option>
                {storageSpacesData &&
                  storageSpacesData.map((space) => <option value={space.id}>{space.name}</option>)}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="currentLocation" className="form-label">
                Current Location
              </label>
              <input
                id="currentLocation"
                name="currentLocation"
                type="text"
                className="form-control"
                value={currentLocation}
                disabled
              />
            </div>
            <div className="mb-3">
              <label htmlFor="status" className="form-label">
                Status
              </label>
              <select id="status" name="status" className="form-control" value={status} disabled>
                <option value="">Please select one...</option>
                <option value="Awaiting pickup">Awaiting pickup</option>
                <option value="In transit">In transit</option>
                <option value="Under inspection">Under inspection</option>
                <option value="Stored">Stored</option>
                <option value="Delayed">Delayed</option>
                <option value="Delivered">Delivered</option>
                <option value="Lost">Lost</option>
                <option value="Pending customs">Pending customs</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="date" className="form-label">
                Date
              </label>
              <input
                id="date"
                name="date"
                type="date"
                className="form-control"
                value={date}
                disabled
              />
            </div>
            <div className="d-flex mt-4 gap-2">
              <button className="btn btn-outline-dark" type="submit">
                Delete
              </button>
              <button
                className="btn btn-secondary"
                type="button"
                onClick={() => navigate('/cm/view-cargo-shipment')}
              >
                Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default DeleteCargoShipmentPage
