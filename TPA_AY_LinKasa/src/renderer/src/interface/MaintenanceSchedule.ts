interface MaintenanceSchedule {
  id: string
  equipmentID: string
  date: string
  startTime: string
  finishTime: string
  assignedEmployees: string[]
  equipmentName?: string
}
