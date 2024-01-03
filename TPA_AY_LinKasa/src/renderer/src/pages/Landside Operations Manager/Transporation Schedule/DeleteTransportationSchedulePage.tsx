import Sidebar from '@renderer/components/Landside Operations Manager/Sidebar'
import Navbar from '@renderer/components/Navbar'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getTransportationRoutes } from '@renderer/controllers/TransporationRouteController'
import {
  deleteTransportationSchedule,
  getTransportationSchedule
} from '@renderer/controllers/TransportationScheduleController'

const DeleteTransportationSchedulePage = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const [transportationRoutesData, setTransportationRoutesData] = useState<
    TransportationRoute[] | null
  >(null)
  const [transportationScheduleData, setTransportationScheduleData] =
    useState<TransportationSchedule | null>(null)

  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [transportationRouteID, setTransportationRouteID] = useState('')

  const formRef = useRef<HTMLFormElement | null>(null)

  const fillData = () => {
    if (!transportationScheduleData) return

    setDescription(transportationScheduleData.description)
    setDate(transportationScheduleData.date)
    setTime(transportationScheduleData.time)
    setTransportationRouteID(transportationScheduleData.transportationRouteID)
  }

  const fetchData = async () => {
    try {
      setTransportationRoutesData(await getTransportationRoutes())
      setTransportationScheduleData(await getTransportationSchedule(id))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [id])

  useEffect(() => {
    fillData()
  }, [transportationScheduleData])

  const resetData = () => {
    setDescription('')
    setTransportationRouteID('')
    setDate('')
    setTime('')

    if (!formRef.current) return
    formRef.current.reset()
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    await deleteTransportationSchedule(id)
    resetData()
    navigate('/lom/view-transportation-schedule')
  }

  return (
    <div className="d-flex vh-100">
      <Sidebar />
      <div className="w-100 overflow-auto">
        <Navbar />
        <div className="px-5 py-4 overflow-hidden">
          <h5 className="mt-2 mb-4 text-muted">
            Landside Operations Manager
            <i className="bi bi-arrow-right mx-2"></i>
            Delete Transportation Schedule
          </h5>
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                className="form-control"
                value={description}
                disabled
              />
            </div>
            <div className="mb-3">
              <label htmlFor="transporationRouteID" className="form-label">
                Route
              </label>
              <select
                id="transporationRouteID"
                name="transporationRouteID"
                className="form-select form-select-m"
                value={transportationRouteID}
                disabled
              >
                <option value="">Please select one...</option>
                {transportationRoutesData &&
                  transportationRoutesData.map((routes) => (
                    <option value={routes.id}>
                      <span className="text-danger">{routes.startLocation} - </span>
                      {routes.stops.map((stop, index) => (
                        <span key={index}>{stop} - </span>
                      ))}
                      <span className="text-danger">{routes.destination}</span>
                    </option>
                  ))}
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
            <div className="mb-3">
              <label htmlFor="time" className="form-label">
                Time
              </label>
              <input
                id="time"
                name="time"
                type="time"
                className="form-control"
                value={time}
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
                onClick={() => navigate('/lom/view-transportation-schedule')}
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

export default DeleteTransportationSchedulePage
