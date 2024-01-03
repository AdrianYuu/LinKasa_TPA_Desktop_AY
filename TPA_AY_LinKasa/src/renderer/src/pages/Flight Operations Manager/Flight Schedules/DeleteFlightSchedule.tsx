import Sidebar from '@renderer/components/Flight Operations Manager/Sidebar'
import Navbar from '@renderer/components/Navbar'
import { getFlightCrews } from '@renderer/controllers/FlightCrewController'
import { getFlightSchedule } from '@renderer/controllers/FlightScheduleController'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteFlightSchedule } from './../../../controllers/FlightScheduleController'

const DeleteFlightSchedulePage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [flightScheduleData, setFlightScheduleData] = useState<FlightSchedule | null>(null)

  const [planeName, setPlaneName] = useState('')
  const [flightTime, setFlightTime] = useState('')
  const [arrivalTime, setArrivalTime] = useState('')
  const [startLocation, setStartLocation] = useState('')
  const [destination, setDestination] = useState('')
  const [flightDate, setFlightDate] = useState('')
  const [crewID, setCrewID] = useState('')
  const [flightStatus, setFlightStatus] = useState('')

  const [flightCrewsData, setFlightCrewsData] = useState<FlightCrew[] | null>(null)

  const formRef = useRef<HTMLFormElement | null>(null)

  const fetchData = async () => {
    try {
      setFlightScheduleData(await getFlightSchedule(id))
    } catch (error) {
      console.log(error)
    }
  }

  const fetchCrewData = async () => {
    try {
      const crews = await getFlightCrews()
      setFlightCrewsData(crews)
    } catch (error) {
      console.log(error)
    }
  }

  const fillData = () => {
    if (!flightScheduleData) return
    setPlaneName(flightScheduleData.planeName)
    setFlightTime(flightScheduleData.flightTime)
    setArrivalTime(flightScheduleData.arrivalTime)
    setStartLocation(flightScheduleData.startLocation)
    setDestination(flightScheduleData.destination)
    setFlightDate(flightScheduleData.flightDate)
    setCrewID(flightScheduleData.crewID)
    setFlightStatus(flightScheduleData.flightStatus)
  }

  useEffect(() => {
    fetchData()
  }, [id])

  useEffect(() => {
    fillData()
  }, [flightScheduleData])

  useEffect(() => {
    fetchCrewData()
  }, [])

  const resetData = () => {
    setPlaneName('')
    setFlightTime('')
    setArrivalTime('')
    setStartLocation('')
    setDestination('')
    setFlightDate('')
    setCrewID('')
    setFlightStatus('')

    if (!formRef.current) return
    formRef.current.reset()
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!flightScheduleData) return
    const flightID = flightScheduleData?.id
    
    await deleteFlightSchedule(flightID)
    resetData()
    navigate('/fom/view-flight-schedule')
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
            Edit Flight Schedule
          </h5>
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="planeName" className="form-label">
                Plane Name
              </label>
              <input
                id="planeName"
                name="planeName"
                type="text"
                className="form-control"
                value={planeName}
                disabled
              />
            </div>
            <div className="mb-3">
              <label htmlFor="startLocation" className="form-label">
                Start Location
              </label>
              <select
                id="startLocation"
                name="startLocation"
                className="form-select form-select-m"
                value={startLocation}
                disabled
              >
                <option value="">Please select one...</option>
                <option value="JFK - New York">JFK - New York</option>
                <option value="LAX - Los Angeles">LAX - Los Angeles</option>
                <option value="ORD - Chicago">ORD - Chicago</option>
                <option value="ATL - Atlanta">ATL - Atlanta</option>
                <option value="DFW - Dallas/Fort Worth">DFW - Dallas/Fort Worth</option>
                <option value="DEN - Denver">DEN - Denver</option>
                <option value="SFO - San Francisco">SFO - San Francisco</option>
                <option value="SEA - Seattle">SEA - Seattle</option>
                <option value="LAS - Las Vegas">LAS - Las Vegas</option>
                <option value="MCO - Orlando">MCO - Orlando</option>
                <option value="PHX - Phoenix">PHX - Phoenix</option>
                <option value="IAH - Houston">IAH - Houston</option>
                <option value="MIA - Miami">MIA - Miami</option>
                <option value="DTW - Detroit">DTW - Detroit</option>
                <option value="BOS - Boston">BOS - Boston</option>
                <option value="MSP - Minneapolis/St. Paul">MSP - Minneapolis/St. Paul</option>
                <option value="FLL - Fort Lauderdale">FLL - Fort Lauderdale</option>
                <option value="BWI - Baltimore/Washington">BWI - Baltimore/Washington</option>
                <option value="SLC - Salt Lake City">SLC - Salt Lake City</option>
                <option value="IAD - Washington Dulles">IAD - Washington Dulles</option>
                <option value="TPA - Tampa">TPA - Tampa</option>
                <option value="PHL - Philadelphia">PHL - Philadelphia</option>
                <option value="SAN - San Diego">SAN - San Diego</option>
                <option value="BNA - Nashville">BNA - Nashville</option>
                <option value="AUS - Austin">AUS - Austin</option>
                <option value="MSY - New Orleans">MSY - New Orleans</option>
                <option value="PDX - Portland">PDX - Portland</option>
                <option value="HNL - Honolulu">HNL - Honolulu</option>
                <option value="STL - St. Louis">STL - St. Louis</option>
                <option value="DAL - Dallas Love Field">DAL - Dallas Love Field</option>
                <option value="MDW - Chicago Midway">MDW - Chicago Midway</option>
                <option value="RDU - Raleigh/Durham">RDU - Raleigh/Durham</option>
                <option value="CLE - Cleveland">CLE - Cleveland</option>
                <option value="OAK - Oakland">OAK - Oakland</option>
                <option value="SMF - Sacramento">SMF - Sacramento</option>
                <option value="PIT - Pittsburgh">PIT - Pittsburgh</option>
                <option value="MCI - Kansas City">MCI - Kansas City</option>
                <option value="CMH - Columbus">CMH - Columbus</option>
                <option value="SJC - San Jose">SJC - San Jose</option>
                <option value="RSW - Fort Myers">RSW - Fort Myers</option>
                <option value="IND - Indianapolis">IND - Indianapolis</option>
                <option value="JAX - Jacksonville">JAX - Jacksonville</option>
                <option value="MEM - Memphis">MEM - Memphis</option>
                <option value="AUS - Austin">AUS - Austin</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="destination" className="form-label">
                Destination
              </label>
              <select
                id="destination"
                name="destination"
                className="form-select form-select-m"
                value={destination}
                disabled
              >
                <option value="">Please select one...</option>
                <option value="JFK - New York">JFK - New York</option>
                <option value="LAX - Los Angeles">LAX - Los Angeles</option>
                <option value="ORD - Chicago">ORD - Chicago</option>
                <option value="ATL - Atlanta">ATL - Atlanta</option>
                <option value="DFW - Dallas/Fort Worth">DFW - Dallas/Fort Worth</option>
                <option value="DEN - Denver">DEN - Denver</option>
                <option value="SFO - San Francisco">SFO - San Francisco</option>
                <option value="SEA - Seattle">SEA - Seattle</option>
                <option value="LAS - Las Vegas">LAS - Las Vegas</option>
                <option value="MCO - Orlando">MCO - Orlando</option>
                <option value="PHX - Phoenix">PHX - Phoenix</option>
                <option value="IAH - Houston">IAH - Houston</option>
                <option value="MIA - Miami">MIA - Miami</option>
                <option value="DTW - Detroit">DTW - Detroit</option>
                <option value="BOS - Boston">BOS - Boston</option>
                <option value="MSP - Minneapolis/St. Paul">MSP - Minneapolis/St. Paul</option>
                <option value="FLL - Fort Lauderdale">FLL - Fort Lauderdale</option>
                <option value="BWI - Baltimore/Washington">BWI - Baltimore/Washington</option>
                <option value="SLC - Salt Lake City">SLC - Salt Lake City</option>
                <option value="IAD - Washington Dulles">IAD - Washington Dulles</option>
                <option value="TPA - Tampa">TPA - Tampa</option>
                <option value="PHL - Philadelphia">PHL - Philadelphia</option>
                <option value="SAN - San Diego">SAN - San Diego</option>
                <option value="BNA - Nashville">BNA - Nashville</option>
                <option value="AUS - Austin">AUS - Austin</option>
                <option value="MSY - New Orleans">MSY - New Orleans</option>
                <option value="PDX - Portland">PDX - Portland</option>
                <option value="HNL - Honolulu">HNL - Honolulu</option>
                <option value="STL - St. Louis">STL - St. Louis</option>
                <option value="DAL - Dallas Love Field">DAL - Dallas Love Field</option>
                <option value="MDW - Chicago Midway">MDW - Chicago Midway</option>
                <option value="RDU - Raleigh/Durham">RDU - Raleigh/Durham</option>
                <option value="CLE - Cleveland">CLE - Cleveland</option>
                <option value="OAK - Oakland">OAK - Oakland</option>
                <option value="SMF - Sacramento">SMF - Sacramento</option>
                <option value="PIT - Pittsburgh">PIT - Pittsburgh</option>
                <option value="MCI - Kansas City">MCI - Kansas City</option>
                <option value="CMH - Columbus">CMH - Columbus</option>
                <option value="SJC - San Jose">SJC - San Jose</option>
                <option value="RSW - Fort Myers">RSW - Fort Myers</option>
                <option value="IND - Indianapolis">IND - Indianapolis</option>
                <option value="JAX - Jacksonville">JAX - Jacksonville</option>
                <option value="MEM - Memphis">MEM - Memphis</option>
                <option value="AUS - Austin">AUS - Austin</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="flightDate" className="form-label">
                Flight Date
              </label>
              <input
                id="flightDate"
                name="flightDate"
                type="date"
                className="form-control"
                value={flightDate}
                disabled
              />
            </div>
            <div className="mb-3">
              <label htmlFor="flightTime" className="form-label">
                Flight Time
              </label>
              <input
                id="flightTime"
                name="flightTime"
                type="time"
                className="form-control"
                value={flightTime}
                disabled
              />
            </div>
            <div className="mb-3">
              <label htmlFor="arrivalTime" className="form-label">
                Arrival Time
              </label>
              <input
                id="arrivalTime"
                name="arrivalTime"
                type="time"
                className="form-control"
                value={arrivalTime}
                disabled
              />
            </div>
            <div className="mb-3">
              <label htmlFor="crewID" className="form-label">
                Crew Name
              </label>
              <select
                id="crewID"
                name="crewID"
                className="form-select form-select-m"
                value={crewID}
                disabled
              >
                <option value="">Please select one...</option>
                {flightCrewsData &&
                  flightCrewsData.map((flightCrew) => (
                    <option value={flightCrew.id}>{flightCrew.crewName}</option>
                  ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="flightStatus" className="form-label">
                Flight Status
              </label>
              <select
                id="flightStatus"
                name="flightStatus"
                className="form-select form-select-m"
                value={flightStatus}
                disabled
              >
                <option value="">Please select one...</option>
                <option value="None">None</option>
                <option value="Delayed">Delayed</option>
                <option value="Arrived">Arrived</option>
                <option value="In-Transit">In-Transit</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <div className="d-flex mt-4 gap-2">
              <button className="btn btn-outline-dark" type="submit">
                Delete
              </button>
              <button
                className="btn btn-secondary"
                type="button"
                onClick={() => navigate('/fom/view-flight-schedule')}
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

export default DeleteFlightSchedulePage
