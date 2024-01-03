import Sidebar from '@renderer/components/Landside Operations Manager/Sidebar'
import Navbar from '@renderer/components/Navbar'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getTransportationRoutes } from '@renderer/controllers/TransporationRouteController'
import {
  getTransportationSchedule,
  updateTransportationSchedule
} from '@renderer/controllers/TransportationScheduleController'

const EditTransportationSchedulePage = () => {
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

  const [errorDate, setErrorDate] = useState('')
  const [errorTime, setErrorTime] = useState('')
  const [errorDescription, setErrorDescription] = useState('')
  const [errorTransportationRouteID, setErrorTransportationRouteID] = useState('')

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

  useEffect(() => {
    setErrorDescription('')
    if (description === '') setErrorDescription("Description can't be empty!")
  }, [description])

  useEffect(() => {
    setErrorTransportationRouteID('')
    if (transportationRouteID === '')
      setErrorTransportationRouteID("Transporation route can't be empty!")
  }, [transportationRouteID])

  useEffect(() => {
    setErrorTime('')
    if (time === '') {
      setErrorTime("Time can't be empty!")
    } else {
      const selectedDateTime = new Date(`${date} ${time}`)
      const currentDateTime = new Date()

      if (selectedDateTime < currentDateTime) {
        setErrorTime('Selected date and time must be in the future!')
      }
    }
  }, [time, date])

  useEffect(() => {
    setErrorDate('')
    if (date === '') {
      setErrorDate("Date can't be empty!")
    } else {
      const selectedDateTime = new Date(`${date} ${time}`)
      const currentDateTime = new Date()

      if (selectedDateTime < currentDateTime) {
        setErrorDate('Selected date and time must be in the future!')
      }
    }
  }, [date, time])

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

    const isValid = !errorDescription && !errorDate && !errorTime && !errorTransportationRouteID

    if (!isValid) return

    const newTransportationSchedule: TransportationSchedule = {
      id: '',
      description: description,
      date: date,
      time: time,
      transportationRouteID: transportationRouteID
    }

    await updateTransportationSchedule(newTransportationSchedule, id)
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
            Edit Transportation Schedule
          </h5>
          <form ref={formRef} onSubmit={handleSubmit}>
            <div>
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                className="form-control"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
              <p className="text-danger">{errorDescription}</p>
            </div>
            <div>
              <label htmlFor="transporationRouteID" className="form-label">
                Route
              </label>
              <select
                id="transporationRouteID"
                name="transporationRouteID"
                className="form-select form-select-m"
                onChange={(e) => setTransportationRouteID(e.target.value)}
                value={transportationRouteID}
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
              <p className="text-danger">{errorTransportationRouteID}</p>
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
                value={date}
              />
              <p className="text-danger">{errorDate}</p>
            </div>
            <div>
              <label htmlFor="time" className="form-label">
                Time
              </label>
              <input
                id="time"
                name="time"
                type="time"
                className="form-control"
                onChange={(e) => setTime(e.target.value)}
                value={time}
              />
              <p className="text-danger">{errorTime}</p>
            </div>
            <div className="d-flex mt-4 gap-2">
              <button className="btn btn-outline-dark" type="submit">
                Update
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

export default EditTransportationSchedulePage
