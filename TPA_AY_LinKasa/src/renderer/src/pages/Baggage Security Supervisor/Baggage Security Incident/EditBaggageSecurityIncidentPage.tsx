import Navbar from '@renderer/components/Navbar'
import Sidebar from '@renderer/components/Baggage Security Supervisor/Sidebar'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  getBaggageSecurityIncident,
  updateBaggageSecurityIncident
} from '@renderer/controllers/BaggageSecurityIncidentController'

const EditBaggageSecurityIncidentPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const [baggageSecurityIncident, setBaggageSecurityIncident] =
    useState<BaggageSecurityIncident | null>(null)

  const [responseDate, setResponseDate] = useState('')
  const [responseTime, setResponseTime] = useState('')
  const [detailsOfIncident, setDetailsOfIncident] = useState('')
  const [actionTaken, setActionTaken] = useState('')

  const [errorResponseDate, setErrorResponseDate] = useState('')
  const [errorResponseTime, setErrorResponseTime] = useState('')
  const [errorDetailsOfIncident, setErrorDetailsOfIncident] = useState('')
  const [errorActionTaken, setErrorActionTaken] = useState('')

  const formRef = useRef<HTMLFormElement | null>(null)

  const fetchData = async () => {
    try {
      setBaggageSecurityIncident(await getBaggageSecurityIncident(id))
    } catch (error) {
      console.log(error)
    }
  }

  const fillData = () => {
    if (!baggageSecurityIncident) return

    setResponseDate(baggageSecurityIncident.responseDate)
    setResponseTime(baggageSecurityIncident.responseTime)
    setDetailsOfIncident(baggageSecurityIncident.detailsOfIncident)
    setActionTaken(baggageSecurityIncident.actionTaken)
  }

  useEffect(() => {
    fetchData()
  }, [id])

  useEffect(() => {
    fillData()
  }, [baggageSecurityIncident])

  useEffect(() => {
    setErrorResponseDate('')
    if (responseDate === '') {
      setErrorResponseDate("Response date can't be empty!")
    } else {
      const selectedDateTime = new Date(`${responseDate} ${responseTime}`)
      const currentDateTime = new Date()

      if (selectedDateTime >= currentDateTime) {
        setErrorResponseDate('Selected date and time must be in the past!')
      }
    }
  }, [responseDate, responseTime])

  useEffect(() => {
    setErrorResponseTime('')
    if (responseTime === '') {
      setErrorResponseTime("Response time can't be empty!")
    } else {
      const selectedDateTime = new Date(`${responseDate} ${responseTime}`)
      const currentDateTime = new Date()

      if (selectedDateTime >= currentDateTime) {
        setErrorResponseTime('Selected date and time must be in the past!')
      }
    }
  }, [responseTime, responseDate])

  useEffect(() => {
    setErrorDetailsOfIncident('')
    if (detailsOfIncident === '') setErrorDetailsOfIncident("Details of incident can't be empty!")
  }, [detailsOfIncident])

  useEffect(() => {
    setErrorActionTaken('')
    if (actionTaken === '') setErrorActionTaken("Action taken can't be empty!")
  }, [actionTaken])

  const resetData = () => {
    setResponseDate('')
    setResponseTime('')
    setDetailsOfIncident('')
    setActionTaken('')

    if (!formRef.current) return
    formRef.current.reset()
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const isValid =
      !errorResponseDate && !errorResponseTime && !errorDetailsOfIncident && !errorActionTaken

    if (!isValid) return

    const newBaggageSecurityIncident: BaggageSecurityIncident = {
      id: '',
      responseDate: responseDate,
      responseTime: responseTime,
      detailsOfIncident: detailsOfIncident,
      actionTaken: actionTaken
    }

    await updateBaggageSecurityIncident(newBaggageSecurityIncident, id)
    resetData()
    navigate('/bss/view-baggage-security-incident')
  }

  return (
    <div className="d-flex vh-100">
      <Sidebar />
      <div className="w-100 overflow-auto">
        <Navbar />
        <div className="px-5 py-4 overflow-hidden">
          <h5 className="mt-2 mb-4 text-muted">
            Baggage Security Supervisor
            <i className="bi bi-arrow-right mx-2"></i>
            Edit Baggage Security Incident
          </h5>
          <form ref={formRef} onSubmit={handleSubmit}>
            <div>
              <label htmlFor="responseDate" className="form-label">
                Response Date
              </label>
              <input
                id="responseDate"
                name="responseDate"
                type="date"
                className="form-control"
                onChange={(e) => setResponseDate(e.target.value)}
                value={responseDate}
              />
              <p className="text-danger">{errorResponseDate}</p>
            </div>
            <div>
              <label htmlFor="responseTime" className="form-label">
                Response Time
              </label>
              <input
                id="responseTime"
                name="responseTime"
                type="time"
                className="form-control"
                onChange={(e) => setResponseTime(e.target.value)}
                value={responseTime}
              />
              <p className="text-danger">{errorResponseTime}</p>
            </div>
            <div>
              <label htmlFor="detailsOfIncident" className="form-label">
                Details of Incident
              </label>
              <textarea
                id="detailsOfIncident"
                name="detailsOfIncident"
                className="form-control"
                onChange={(e) => setDetailsOfIncident(e.target.value)}
                value={detailsOfIncident}
              />
              <p className="text-danger">{errorDetailsOfIncident}</p>
            </div>
            <div>
              <label htmlFor="actionTaken" className="form-label">
                Action Taken
              </label>
              <textarea
                id="actionTaken"
                name="actionTaken"
                className="form-control"
                onChange={(e) => setActionTaken(e.target.value)}
                value={actionTaken}
              />
              <p className="text-danger">{errorActionTaken}</p>
            </div>
            <div className="d-flex mt-4 gap-2">
              <button className="btn btn-outline-dark" type="submit">
                Update
              </button>
              <button
                className="btn btn-secondary"
                type="button"
                onClick={() => navigate('/bss/view-baggage-security-incident')}
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

export default EditBaggageSecurityIncidentPage
