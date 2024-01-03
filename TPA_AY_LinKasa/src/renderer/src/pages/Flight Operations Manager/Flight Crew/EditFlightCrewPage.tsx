import Sidebar from '@renderer/components/Flight Operations Manager/Sidebar'
import Navbar from '@renderer/components/Navbar'
import {
  checkCrewNameUnique,
  getFlightCrew,
  updateFlightCrew
} from '@renderer/controllers/FlightCrewController'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditFlightCrewPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [flightCrewData, setFlightCrewData] = useState<FlightCrew | null>(null)

  const [crewName, setCrewName] = useState('')
  const [pilot, setPilot] = useState('')
  const [coPilot, setCoPilot] = useState('')
  const [cabinCrews, setCabinCrews] = useState([''])

  const [errorCrewName, setErrorCrewName] = useState('')
  const [errorPilot, setErrorPilot] = useState('')
  const [errorCoPilot, setErrorCoPilot] = useState('')
  const [errorCabinCrews, setErrorCabinCrews] = useState('')

  const [oldCrewName, setOldCrewName] = useState('')

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
    setOldCrewName(flightCrewData.crewName)
  }

  useEffect(() => {
    fetchData()
  }, [id])

  useEffect(() => {
    fillData()
  }, [flightCrewData])

  const validateCrewName = async () => {
    setErrorCrewName('')
    if (crewName === '') setErrorCrewName("Crew name can't be empty!")
    else if (!(await checkCrewNameUnique(crewName)) && crewName != oldCrewName)
      setErrorCrewName('Crew name already exists!')
  }

  const handleCabinCrewChange = (index: number, value: string) => {
    const updatedCabinCrews = [...cabinCrews]
    updatedCabinCrews[index] = value
    setCabinCrews(updatedCabinCrews)
  }

  const handleAddCabinCrew = () => {
    setCabinCrews([...cabinCrews, ''])
  }

  const handleRemoveCabinCrew = (index: number) => {
    if (cabinCrews.length > 1) {
      const updatedCabinCrews = [...cabinCrews]
      updatedCabinCrews.splice(index, 1)
      setCabinCrews(updatedCabinCrews)
    }
  }

  useEffect(() => {
    validateCrewName()
  }, [crewName])

  useEffect(() => {
    setErrorPilot('')
    if (pilot === '') setErrorPilot("Pilot name can't be empty!")
  }, [pilot])

  useEffect(() => {
    setErrorCoPilot('')
    if (coPilot === '') setErrorCoPilot("Co-Pilot name can't be empty!")
  }, [coPilot])

  useEffect(() => {
    setErrorCabinCrews('')
    if (!cabinCrews.some((crew) => crew !== '')) {
      setErrorCabinCrews('There must be at least 1 cabin crew!')
    }
  }, [cabinCrews])

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

    const isValid = !errorCrewName && !errorPilot && !errorCoPilot && !errorCabinCrews

    if (!isValid) return

    const newFlightCrew: FlightCrew = {
      id: '',
      crewName: crewName,
      pilot: pilot,
      coPilot: coPilot,
      cabinCrews: cabinCrews
    }

    await updateFlightCrew(newFlightCrew, id)
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
            Edit Flight Crew
          </h5>
          <form ref={formRef} onSubmit={handleSubmit}>
            <div>
              <label htmlFor="crewName" className="form-label">
                Crew Name
              </label>
              <input
                id="crewName"
                name="crewName"
                type="text"
                className="form-control"
                onChange={(e) => setCrewName(e.target.value)}
                value={crewName}
              />
              <p className="text-danger">{errorCrewName}</p>
            </div>
            <div>
              <label htmlFor="pilot" className="form-label">
                Pilot Name
              </label>
              <input
                id="pilot"
                name="pilot"
                type="text"
                className="form-control"
                onChange={(e) => setPilot(e.target.value)}
                value={pilot}
              />
              <p className="text-danger">{errorPilot}</p>
            </div>
            <div>
              <label htmlFor="coPilot" className="form-label">
                Co-Pilot Name
              </label>
              <input
                id="coPilot"
                name="coPilot"
                type="text"
                className="form-control"
                onChange={(e) => setCoPilot(e.target.value)}
                value={coPilot}
              />
              <p className="text-danger">{errorCoPilot}</p>
            </div>
            <div>
              <label htmlFor="cabinCrew" className="form-label">
                Cabin Crew
              </label>
              <div className="d-flex flex-column gap-3">
                {cabinCrews.map((crew, index) => (
                  <div key={index} className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      value={crew}
                      onChange={(e) => handleCabinCrewChange(index, e.target.value)}
                    />
                    <button
                      className="btn btn-danger"
                      type="button"
                      onClick={() => handleRemoveCabinCrew(index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <p className="text-danger">{errorCabinCrews}</p>
              <button className="btn btn-dark" type="button" onClick={handleAddCabinCrew}>
                Add Cabin Crew
              </button>
            </div>

            <div className="d-flex mt-4 gap-2">
              <button className="btn btn-outline-dark" type="submit">
                Update
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

export default EditFlightCrewPage
