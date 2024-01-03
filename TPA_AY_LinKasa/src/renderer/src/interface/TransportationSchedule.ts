interface TransportationSchedule {
  id: string
  description: string
  date: string
  time: string
  transportationRouteID: string
  transportationRoute?: TransportationRoute
}
