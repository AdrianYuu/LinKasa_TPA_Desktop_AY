interface CargoShipment {
  id: string
  storageStartID: string
  storageDestinationID: string
  currentLocation: string
  status: string
  date: string
  storageStartName?: string
  storageDestinationName?: string
}
