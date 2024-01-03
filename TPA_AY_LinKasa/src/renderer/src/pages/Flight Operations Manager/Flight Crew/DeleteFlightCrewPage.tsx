import Sidebar from '@renderer/components/Flight Operations Manager/Sidebar'
import Navbar from '@renderer/components/Navbar'
import { deleteFlightCrew, getFlightCrew } from '@renderer/controllers/FlightCrewController'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const DeleteFlightCrewPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [flightCrewData, setFlightCrewData] = useState<FlightCrew | null>(null)

  const [crewName, setCrewName] = useState('')
  const [pilot, setPilot] = useState('')
  const [coPilot, setCoPilot] = useState('')
  const [cabinCrews, setCabinCrews] = useState([''])

  const formRef = useRef<HTMLFormElement | null>(null)

  const fetchData = async () => {
    try {
      setFlightCrewData(await getFlightCrew(id))
    } catch (error) {
      console.log(error)
    }
  }

  const fillData = () => {
    if (!flightCrewData) return

    setCrewName(flightCrewData.crewName)
    setPilot(flightCrewData.pilot)
    setCoPilot(flightCrewData.coPilot)
    setCabinCrews(flightCrewData.cabinCrews)
  }

  useEffect(() => {
    fetchData()
  }, [id])

  useEffect(() => {
    fillData()
  }, [flightCrewData])

  const resetData = () => {
    setCrewName('')
    setPilot('')
    setCoPilot('')
    setCabinCrews([''])

    if (!formRef.current) return
    formRef.current.reset()
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    await deleteFlightCrew(id)
    resetData()
    navigate('/fom/view-flight-crew')
  }

  return (
    <div className="d-flex vh-100">
      <Sidebar />
      <div className="w-100 overflow-auto">
        <Navbar />
        <div className="px-5 py-4 overflow-hidden">
          <h5 className="mt-2 mb-4 text-muted">
            Flight Operations Manager
            <i className="bi bi-arrow-right mx-2"></i>
            Delete Flight Crew
          </h5>
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="crewName" className="form-label">
                Crew Name
              </label>
              <input
                id="crewName"
                name="crewName"
                type="text"
                className="form-control"
                value={crewName}
                disabled
              />
            </div>
            <div className="mb-3">
              <label htmlFor="pilot" className="form-label">
                Pilot Name
              </label>
              <input
                id="pilot"
                name="pilot"
                type="text"
                className="form-control"
                value={pilot}
                disabled
              />
            </div>
            <div className="mb-3">
              <label htmlFor="coPilot" className="form-label">
                Co-Pilot Name
              </label>
              <input
                id="coPilot"
                name="coPilot"
                type="text"
                className="form-control"
                value={coPilot}
                disabled
              />
            </div>
            <div className="mb-3">
              <label htmlFor="cabinCrew" className="form-label">
                Cabin Crew
              </label>
              <div className="d-flex flex-column gap-3">
                {cabinCrews.map((crew, index) => (
                  <div key={index} className="input-group">
                    <input type="text" className="form-control" value={crew} disabled />
                  </div>
                ))}
              </div>
            </div>

            <div className="d-flex mt-4 gap-2">
              <button className="btn btn-outline-dark" type="submit">
                Delete
              </button>
              <button
                className="btn btn-secondary"
                type="button"
                onClick={() => navigate('/fom/view-flight-crew')}
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

export default DeleteFlightCrewPage
