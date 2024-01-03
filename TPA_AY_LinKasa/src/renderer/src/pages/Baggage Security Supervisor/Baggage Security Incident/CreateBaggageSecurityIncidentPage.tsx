import Navbar from '@renderer/components/Navbar'
import Sidebar from '@renderer/components/Baggage Security Supervisor/Sidebar'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createBaggageSecurityIncident } from '@renderer/controllers/BaggageSecurityIncidentController'

const CreateBaggageSecurityIncidentPage = () => {
  const navigate = useNavigate()

  const [responseDate, setResponseDate] = useState('')
  const [responseTime, setResponseTime] = useState('')
  const [detailsOfIncident, setDetailsOfIncident] = useState('')
  const [actionTaken, setActionTaken] = useState('')

  const [errorResponseDate, setErrorResponseDate] = useState('')
  const [errorResponseTime, setErrorResponseTime] = useState('')
  const [errorDetailsOfIncident, setErrorDetailsOfIncident] = useState('')
  const [errorActionTaken, setErrorActionTaken] = useState('')

  const formRef = useRef<HTMLFormElement | null>(null)

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

    await createBaggageSecurityIncident(newBaggageSecurityIncident)
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
            Create Baggage Security Incident
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
              />
              <p className="text-danger">{errorActionTaken}</p>
            </div>
            <div className="d-flex mt-4 gap-2">
              <button className="btn btn-outline-dark" type="submit">
                Submit
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

export default CreateBaggageSecurityIncidentPage
