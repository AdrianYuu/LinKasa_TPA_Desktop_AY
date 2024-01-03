interface FlightSchedule {
  id: string
  planeName: string
  flightTime: string
  arrivalTime: string
  startLocation: string
  destination: string
  flightDate: string
  flightStatus: string
  crewID: string
  passengers: Passenger[] | null
  baggageStatusAOM: string
  baggageStatusGHM: string
  baggageStatusBSS: string
}
