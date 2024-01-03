import Navbar from '@renderer/components/Navbar'
import Sidebar from '@renderer/components/Baggage Security Supervisor/Sidebar'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  deleteBaggageSecurityIncident,
  getBaggageSecurityIncident
} from '@renderer/controllers/BaggageSecurityIncidentController'

const DeleteBaggageSecurityIncidentPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const [baggageSecurityIncident, setBaggageSecurityIncident] =
    useState<BaggageSecurityIncident | null>(null)

  const [responseDate, setResponseDate] = useState('')
  const [responseTime, setResponseTime] = useState('')
  const [detailsOfIncident, setDetailsOfIncident] = useState('')
  const [actionTaken, setActionTaken] = useState('')

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

    await deleteBaggageSecurityIncident(id)
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
            Delete Baggage Security Incident
          </h5>
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="responseDate" className="form-label">
                Response Date
              </label>
              <input
                id="responseDate"
                name="responseDate"
                type="date"
                className="form-control"
                value={responseDate}
                disabled
              />
            </div>
            <div className="mb-3">
              <label htmlFor="responseTime" className="form-label">
                Response Time
              </label>
              <input
                id="responseTime"
                name="responseTime"
                type="time"
                className="form-control"
                value={responseTime}
                disabled
              />
            </div>
            <div className="mb-3">
              <label htmlFor="detailsOfIncident" className="form-label">
                Details of Incident
              </label>
              <textarea
                id="detailsOfIncident"
                name="detailsOfIncident"
                className="form-control"
                value={detailsOfIncident}
                disabled
              />
            </div>
            <div className="mb-3">
              <label htmlFor="actionTaken" className="form-label">
                Action Taken
              </label>
              <textarea
                id="actionTaken"
                name="actionTaken"
                className="form-control"
                value={actionTaken}
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

export default DeleteBaggageSecurityIncidentPage
