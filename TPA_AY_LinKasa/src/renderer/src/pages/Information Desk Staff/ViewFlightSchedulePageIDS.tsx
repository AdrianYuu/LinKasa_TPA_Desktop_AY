import Sidebar from '@renderer/components/Information Desk Staff/Sidebar'
import Navbar from '@renderer/components/Navbar'
import { getFlightCrew } from '@renderer/controllers/FlightCrewController'
import {
  getFlightSchedule,
  getFlightSchedules
} from '@renderer/controllers/FlightScheduleController'
import { db } from '@renderer/firebase'
import { collection, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'

const ViewFlightSchedulePageIDS = () => {
  const [flightSchedulesData, setFlightSchedulesData] = useState<FlightSchedule[] | null>(null)
  const [flightCrewData, setFlightCrewData] = useState<Record<string, FlightCrew>>({})
  const [selectedCrewDetails, setSelectedCrewDetails] = useState<FlightCrew | null>(null)
  const [selectedPassengerDetails, setSelectedPassengerDetails] = useState<Passenger[] | null>(null)
  const [flightScheduleData, setFlightScheduleData] = useState<FlightSchedule | null>(null)
  const [isModalVisible, setIsModalVisible] = useState(false)

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'flight-schedule'), fetchData)
    return () => {
      unsubscribe()
    }
  }, [])

  const handleToggleClick = async (crewID, passengers, flightID) => {
    try {
      const crew = await getFlightCrew(crewID)
      if (crew) {
        setSelectedCrewDetails(crew)
        setSelectedPassengerDetails(passengers)
        setFlightScheduleData(await getFlightSchedule(flightID))
        setIsModalVisible(true)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const fetchData = async () => {
    try {
      setFlightSchedulesData(await getFlightSchedules())
    } catch (error) {
      console.log(error)
    }
  }

  const fetchCrewData = async (crewID: string) => {
    try {
      const crew = await getFlightCrew(crewID)
      if (crew) {
        setFlightCrewData((prevData) => ({
          ...prevData,
          [crewID]: crew
        }))
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (flightSchedulesData) {
      flightSchedulesData.forEach((flightSchedule) => {
        if (!flightCrewData[flightSchedule.crewID]) {
          fetchCrewData(flightSchedule.crewID)
        }
      })
    }
  }, [flightSchedulesData])

  return (
    <div className="d-flex vh-100">
      <Sidebar />
      <div className="w-100 overflow-auto">
        <Navbar />
        <div className="px-5 py-4 overflow-hidden">
          {flightSchedulesData && flightSchedulesData.length > 0 ? (
            <h5 className="mt-2 mb-4 text-muted">
              Information Desk Staff
              <i className="bi bi-arrow-right mx-2"></i>
              View Flight Schedules
            </h5>
          ) : (
            <></>
          )}
          {flightSchedulesData && flightSchedulesData.length > 0 ? (
            <table className="table table-striped table-hover table-responsive">
              <thead className="table-dark">
                <tr>
                  <th scope="col">No.</th>
                  <th scope="col">Flight ID</th>
                  <th scope="col">Plane Name</th>
                  <th scope="col">Flight Date</th>
                  <th scope="col">Flight Time</th>
                  <th scope="col">Arrival Time</th>
                  <th scope="col">Start Location</th>
                  <th scope="col">Destination</th>
                  <th scope="col">Flight Status</th>
                  <th scope="col">Flight Details</th>
                </tr>
              </thead>
              <tbody>
                {flightSchedulesData.map((flightSchedule, index) => (
                  <tr key={flightSchedule.id}>
                    <th scope="row">{index + 1}.</th>
                    <td>{flightSchedule.id}</td>
                    <td>{flightSchedule.planeName}</td>
                    <td>{flightSchedule.flightDate}</td>
                    <td>{flightSchedule.flightTime}</td>
                    <td>{flightSchedule.arrivalTime}</td>
                    <td>{flightSchedule.startLocation}</td>
                    <td>{flightSchedule.destination}</td>
                    <td>{flightSchedule.flightStatus}</td>
                    <td>
                      <div
                        style={{ cursor: 'pointer' }}
                        onClick={() =>
                          handleToggleClick(
                            flightSchedule.crewID,
                            flightSchedule.passengers,
                            flightSchedule.id
                          )
                        }
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Click to view flight details"
                        className="text-center"
                      >
                        <i className="bi bi-search text-dark"></i>
                      </div>
                    </td>
                  </tr>
                ))}
                {isModalVisible && (
                  <div className="modal fade show" style={{ display: 'block' }}>
                    <div
                      className="modal-dialog modal-dialog-centered modal-xl"
                      style={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
                    >
                      <div className="modal-content bg-dark text-light">
                        <div className="modal-header">
                          <h5 className="modal-title">Flight Details</h5>
                        </div>
                        <div className="modal-body">
                          <div className="d-flex flex-column gap-3">
                            <div className="d-flex flex-row gap-5">
                              <div>
                                <p className="m-0 fw-bold">
                                  Crew Name: <br />
                                </p>
                                <p>{selectedCrewDetails?.crewName}</p>
                                <p className="m-0 fw-bold">
                                  Pilot: <br />
                                </p>
                                <p>{selectedCrewDetails?.pilot}</p>
                                <p className="m-0 fw-bold">
                                  Co-Pilot: <br />
                                </p>
                                <p>{selectedCrewDetails?.coPilot}</p>
                                <p className="m-0 fw-bold">
                                  Cabin Crews: <br />
                                </p>
                                {selectedCrewDetails?.cabinCrews.map((crew) => (
                                  <p className="m-0" key={crew}>
                                    {crew}
                                  </p>
                                ))}
                              </div>
                              <div>
                                <p className="m-0 fw-bold">
                                  Airport Operation Manager Baggage Status: <br />
                                </p>
                                <p>{flightScheduleData && flightScheduleData.baggageStatusAOM}</p>
                                <p className="m-0 fw-bold">
                                  Baggage Security Supervisor Baggage Status: <br />
                                </p>
                                <p>{flightScheduleData && flightScheduleData.baggageStatusBSS}</p>
                                <p className="m-0 fw-bold">
                                  Ground Handling Manager Baggage Status: <br />
                                </p>
                                <p>{flightScheduleData && flightScheduleData.baggageStatusGHM}</p>
                              </div>
                            </div>
                            <div className="d-flex flex-column w-100">
                              <p className="fw-bold">
                                Passenger: <br />
                              </p>
                              <table className="table table-bordered table-hover table-responsive">
                                <thead className="table-dark">
                                  <tr>
                                    <th scope="col">No.</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Class Type</th>
                                    <th scope="col">Seat Number</th>
                                    <th scope="col">Luggage Weight</th>
                                    <th scope="col">Luggage Dimension</th>
                                    <th scope="col">Luggage Content</th>
                                    <th scope="col">Luggage Photo</th>
                                  </tr>
                                </thead>
                                <tbody className="table-dark">
                                  {selectedPassengerDetails?.map((passenger, index) => (
                                    <tr>
                                      <td>{index + 1}.</td>
                                      <td>{passenger.name}</td>
                                      <td>{passenger.classType}</td>
                                      <td>{passenger.seatNumber}</td>
                                      <td>{passenger.luggage.weight}</td>
                                      <td>{passenger.luggage.dimension}</td>
                                      <td>{passenger.luggage.content}</td>
                                      <td>
                                        <img src={passenger.luggage.photoURL} alt="" width={50} />
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-outline-light"
                            onClick={() => setIsModalVisible(false)}
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </tbody>
            </table>
          ) : (
            <div className="text-center my-4">
              <p className="lead">No flight schedule data records found.</p>
              <i className="bi bi-emoji-frown" style={{ fontSize: '2rem', color: '#6c757d' }}></i>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ViewFlightSchedulePageIDS
