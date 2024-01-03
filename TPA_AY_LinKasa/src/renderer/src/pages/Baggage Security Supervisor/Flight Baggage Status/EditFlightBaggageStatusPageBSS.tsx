import Sidebar from '@renderer/components/Baggage Security Supervisor/Sidebar'
import Navbar from '@renderer/components/Navbar'
import { getFlightCrews } from '@renderer/controllers/FlightCrewController'
import {
  getFlightSchedule,
  updateFlightSchedule
} from '@renderer/controllers/FlightScheduleController'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditFlightBaggageStatusPageBSS = () => {
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
  const [baggageStatusAOM, setBaggageStatusAOM] = useState('')
  const [baggageStatusGHM, setBaggageStatusGHM] = useState('')
  const [baggageStatusBSS, setBaggageStatusBSS] = useState('')

  const [passengers, setPassengers] = useState<Passenger[] | null>(null)

  const [flightCrewsData, setFlightCrewsData] = useState<FlightCrew[] | null>(null)

  const [errorBaggageStatusGHM, setErrorBaggageStatusGHM] = useState('')

  useEffect(() => {
    setErrorBaggageStatusGHM('')
    if (baggageStatusGHM === '') setErrorBaggageStatusGHM("Baggage Status can't be empty!")
  }, [baggageStatusGHM])

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
    setBaggageStatusAOM(flightScheduleData.baggageStatusAOM)
    setBaggageStatusGHM(flightScheduleData.baggageStatusGHM)
    setBaggageStatusBSS(flightScheduleData.baggageStatusBSS)
    setPassengers(flightScheduleData.passengers)
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

    const isValid = !errorBaggageStatusGHM

    if (!isValid) return

    if (!flightScheduleData) return

    if (!passengers) return

    const flightID = flightScheduleData?.id

    const newFlightSchedule: FlightSchedule = {
      id: flightID,
      planeName: planeName,
      flightTime: flightTime,
      arrivalTime: arrivalTime,
      startLocation: startLocation,
      destination: destination,
      flightDate: flightDate,
      flightStatus: flightStatus,
      crewID: crewID,
      passengers: passengers,
      baggageStatusAOM: baggageStatusAOM,
      baggageStatusGHM: baggageStatusGHM,
      baggageStatusBSS: baggageStatusBSS
    }

    await updateFlightSchedule(newFlightSchedule, flightID)
    resetData()
    navigate('/bss/view-flight-baggage-status')
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
            Edit Flight Baggage Status
          </h5>
          <form ref={formRef} onSubmit={handleSubmit}>
            <div>
              <label htmlFor="planeName" className="form-label">
                Plane Name
              </label>
              <input
                id="planeName"
                name="planeName"
                type="text"
                className="form-control"
                onChange={(e) => setPlaneName(e.target.value)}
                value={planeName}
                disabled
              />
              <p className="text-danger"></p>
            </div>
            <div>
              <label htmlFor="startLocation" className="form-label">
                Start Location
              </label>
              <select
                id="startLocation"
                name="startLocation"
                className="form-select form-select-m"
                onChange={(e) => setStartLocation(e.target.value)}
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
              <p className="text-danger"></p>
            </div>
            <div>
              <label htmlFor="destination" className="form-label">
                Destination
              </label>
              <select
                id="destination"
                name="destination"
                className="form-select form-select-m"
                onChange={(e) => setDestination(e.target.value)}
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
              <p className="text-danger"></p>
            </div>
            <div>
              <label htmlFor="flightDate" className="form-label">
                Flight Date
              </label>
              <input
                id="flightDate"
                name="flightDate"
                type="date"
                className="form-control"
                onChange={(e) => setFlightDate(e.target.value)}
                value={flightDate}
                disabled
              />
              <p className="text-danger"></p>
            </div>
            <div>
              <label htmlFor="flightTime" className="form-label">
                Flight Time
              </label>
              <input
                id="flightTime"
                name="flightTime"
                type="time"
                className="form-control"
                onChange={(e) => setFlightTime(e.target.value)}
                value={flightTime}
                disabled
              />
              <p className="text-danger"></p>
            </div>
            <div>
              <label htmlFor="arrivalTime" className="form-label">
                Arrival Time
              </label>
              <input
                id="arrivalTime"
                name="arrivalTime"
                type="time"
                className="form-control"
                value={arrivalTime}
                onChange={(e) => setArrivalTime(e.target.value)}
                disabled
              />
              <p className="text-danger"></p>
            </div>
            <div>
              <label htmlFor="crewID" className="form-label">
                Crew Name
              </label>
              <select
                id="crewID"
                name="crewID"
                className="form-select form-select-m"
                onChange={(e) => setCrewID(e.target.value)}
                value={crewID}
                disabled
              >
                <option value="">Please select one...</option>
                {flightCrewsData &&
                  flightCrewsData.map((flightCrew) => (
                    <option value={flightCrew.id}>{flightCrew.crewName}</option>
                  ))}
              </select>
              <p className="text-danger"></p>
            </div>
            <div>
              <label htmlFor="flightStatus" className="form-label">
                Flight Status
              </label>
              <select
                id="flightStatus"
                name="flightStatus"
                className="form-select form-select-m"
                onChange={(e) => setFlightStatus(e.target.value)}
                value={flightStatus}
                disabled
              >
                <option value="None">None</option>
                <option value="Delayed">Delayed</option>
                <option value="Arrived">Arrived</option>
                <option value="In-Transit">In-Transit</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <p className="text-danger"></p>
            </div>
            <div>
              <label htmlFor="baggageStatusAOM" className="form-label">
                Baggage Status AOM
              </label>
              <select
                id="baggageStatusAOM"
                name="baggageStatusAOM"
                className="form-select form-select-m"
                onChange={(e) => setBaggageStatusAOM(e.target.value)}
                value={baggageStatusAOM}
                disabled
              >
                <option value="None">None</option>
                <option value="Loading">Loading</option>
                <option value="Unloading">Unloading</option>
                <option value="Transfers">Transfers</option>
              </select>
              <p className="text-danger"></p>
            </div>
            <div>
              <label htmlFor="baggageStatusGHM" className="form-label">
                Baggage Status GHM
              </label>
              <select
                id="baggageStatusGHM"
                name="baggageStatusGHM"
                className="form-select form-select-m"
                onChange={(e) => setBaggageStatusGHM(e.target.value)}
                value={baggageStatusGHM}
                disabled
              >
                <option value="None">None</option>
                <option value="Received for transport">Received for transport</option>
                <option value="In transit">In transit</option>
                <option value="Ready for pick-up">Ready for pick-up</option>
                <option value="Claimed by passenger">Claimed by passenger</option>
              </select>
              <p className="text-danger">{errorBaggageStatusGHM}</p>
            </div>
            <div>
              <label htmlFor="baggageStatusBSS" className="form-label">
                Baggage Status BSS
              </label>
              <select
                id="baggageStatusBSS"
                name="baggageStatusBSS"
                className="form-select form-select-m"
                onChange={(e) => setBaggageStatusBSS(e.target.value)}
                value={baggageStatusBSS}
              >
                <option value="None">None</option>
                <option value="Checked">Checked</option>
                <option value="Loading">Loading</option>
                <option value="Transfer">Transfer</option>
                <option value="In transit">In transit</option>
                <option value="Unloading">Unloading</option>
                <option value="Received">Received</option>
                <option value="Delayed">Delayed</option>
              </select>
              <p className="text-danger"></p>
            </div>
            <div className="d-flex mt-4 gap-2">
              <button className="btn btn-outline-dark" type="submit">
                Update
              </button>
              <button
                className="btn btn-secondary"
                type="button"
                onClick={() => navigate('/bss/view-flight-baggage-status')}
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

export default EditFlightBaggageStatusPageBSS
