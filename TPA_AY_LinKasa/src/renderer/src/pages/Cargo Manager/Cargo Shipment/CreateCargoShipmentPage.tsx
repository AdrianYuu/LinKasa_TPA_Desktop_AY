import Sidebar from '../../../components/Cargo Manager/Sidebar'
import Navbar from '../../../components/Navbar'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getStorageSpaces } from '@renderer/controllers/StorageSpaceController'
import { createCargoShipment } from '@renderer/controllers/CargoShipmentController'

const CreateCargoShipmentPage = () => {
  const navigate = useNavigate()

  const [storageSpacesData, setStorageSpacesData] = useState<StorageSpace[] | null>(null)

  const [storageStartID, setStorageStartID] = useState('')
  const [storageDestinationID, setStorageDestinationID] = useState('')
  const [currentLocation, setCurrentLocation] = useState('')
  const [status, setStatus] = useState('')
  const [date, setDate] = useState('')

  const [errorStorageStartID, setErrorStorageStartID] = useState('')
  const [errorStorageDestinationID, setErrorStorageDestinationID] = useState('')
  const [errorCurrentLocation, setErrorCurrentLocation] = useState('')
  const [errorStatus, setErrorStatus] = useState('')
  const [errorDate, setErrorDate] = useState('')

  const formRef = useRef<HTMLFormElement | null>(null)

  const fetchData = async () => {
    try {
      setStorageSpacesData(await getStorageSpaces())
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const resetData = () => {
    setStorageStartID('')
    setStorageDestinationID('')
    setCurrentLocation('')
    setStatus('')
    setDate('')

    if (!formRef.current) return
    formRef.current.reset()
  }

  useEffect(() => {
    setErrorStorageStartID('')
    setErrorStorageDestinationID('')

    if (storageStartID === '') {
      setErrorStorageStartID("Storage start name can't be empty!")
    }

    if (storageDestinationID === '') {
      setErrorStorageDestinationID("Storage destination name can't be empty!")
    }

    if (storageStartID === storageDestinationID) {
      setErrorStorageStartID("Storage start and destination names can't be the same!")
      setErrorStorageDestinationID("Storage start and destination names can't be the same!")
    }
  }, [storageStartID, storageDestinationID])

  useEffect(() => {
    setErrorCurrentLocation('')
    if (currentLocation === '') setErrorCurrentLocation("Current location can't be empty!")
  }, [currentLocation])

  useEffect(() => {
    setErrorStatus('')
    if (status === '') setErrorStatus("Status can't be empty!")
  }, [status])

  useEffect(() => {
    const currentDate = new Date()
    const selectedDate = new Date(date)

    setErrorDate('')
    if (date === '') {
      setErrorDate("Date can't be empty!")
    } else if (selectedDate <= currentDate) {
      setErrorDate('Date must be in the future!')
    }
  }, [date])

  useEffect(() => {
    fetchData()
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const isValid =
      !errorStorageStartID &&
      !errorStorageDestinationID &&
      !errorCurrentLocation &&
      !errorStatus &&
      !errorDate

    if (!isValid) return

    const newCargoShipment: CargoShipment = {
      id: '',
      storageStartID: storageStartID,
      storageDestinationID: storageDestinationID,
      currentLocation: currentLocation,
      status: status,
      date: date
    }

    await createCargoShipment(newCargoShipment)
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
            Create Cargo Shipment
          </h5>
          <form ref={formRef} onSubmit={handleSubmit}>
            <div>
              <label htmlFor="storageStartID" className="form-label">
                Storage Start Name
              </label>
              <select
                id="storageStartID"
                name="storageStartID"
                className="form-select form-select-m"
                onChange={(e) => setStorageStartID(e.target.value)}
              >
                <option value="">Please select one...</option>
                {storageSpacesData &&
                  storageSpacesData.map((space) => <option value={space.id}>{space.name}</option>)}
              </select>
              <p className="text-danger">{errorStorageStartID}</p>
            </div>
            <div>
              <label htmlFor="storageDestinationID" className="form-label">
                Storage Destination Name
              </label>
              <select
                id="storageDestinationID"
                name="storageDestinationID"
                className="form-select form-select-m"
                onChange={(e) => setStorageDestinationID(e.target.value)}
              >
                <option value="">Please select one...</option>
                {storageSpacesData &&
                  storageSpacesData.map((space) => <option value={space.id}>{space.name}</option>)}
              </select>
              <p className="text-danger">{errorStorageDestinationID}</p>
            </div>
            <div>
              <label htmlFor="currentLocation" className="form-label">
                Current Location
              </label>
              <input
                id="currentLocation"
                name="currentLocation"
                type="text"
                className="form-control"
                onChange={(e) => setCurrentLocation(e.target.value)}
              />
              <p className="text-danger">{errorCurrentLocation}</p>
            </div>
            <div>
              <label htmlFor="status" className="form-label">
                Status
              </label>
              <select
                id="status"
                name="status"
                className="form-control"
                onChange={(e) => setStatus(e.target.value)}
              >
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

              <p className="text-danger">{errorStatus}</p>
            </div>
            <div>
              <label htmlFor="date" className="form-label">
                Date
              </label>
              <input
                id="date"
                name="date"
                type="date"
                className="form-control"
                onChange={(e) => setDate(e.target.value)}
              />
              <p className="text-danger">{errorDate}</p>
            </div>
            <div className="d-flex mt-4 gap-2">
              <button className="btn btn-outline-dark" type="submit">
                Submit
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

export default CreateCargoShipmentPage
