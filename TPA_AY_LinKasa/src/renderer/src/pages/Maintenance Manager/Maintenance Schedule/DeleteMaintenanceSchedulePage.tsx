import Sidebar from '../../../components/Maintenance Manager/Sidebar'
import Navbar from '../../../components/Navbar'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getEmployeesBasedOnRole } from '@renderer/controllers/EmployeeController'
import { getEquipments } from '@renderer/controllers/EquipmentController'
import {
  deleteMaintenanceSchedule,
  getMaintenanceSchedule
} from '@renderer/controllers/MaintenanceScheduleController'

const DeleteMaintenanceSchedulePage = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const [maintenanceScheduleData, setMaintenanceScheduleData] =
    useState<MaintenanceSchedule | null>(null)

  const [employeesData, setEmployeesData] = useState<Employee[] | null>(null)
  const [equipmentsData, setEquipmentsData] = useState<Equipment[] | null>(null)

  const [equipmentID, setEquipmentID] = useState('')
  const [date, setDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [finishTime, setFinishTime] = useState('')
  const [assignedEmployees, setAssignedEmployees] = useState<string[]>([])

  const formRef = useRef<HTMLFormElement | null>(null)

  const fetchData = async () => {
    try {
      setEquipmentsData(await getEquipments())
      setEmployeesData(await getEmployeesBasedOnRole('Maintenance Staff'))
      setMaintenanceScheduleData(await getMaintenanceSchedule(id))
    } catch (error) {
      console.log(error)
    }
  }

  const resetData = () => {
    setEquipmentID('')
    setDate('')
    setStartTime('')
    setFinishTime('')
    setAssignedEmployees([''])

    if (!formRef.current) return
    formRef.current.reset()
  }

  const fillData = () => {
    if (!maintenanceScheduleData) return

    setEquipmentID(maintenanceScheduleData.equipmentID)
    setDate(maintenanceScheduleData.date)
    setStartTime(maintenanceScheduleData.startTime)
    setFinishTime(maintenanceScheduleData.finishTime)
    setAssignedEmployees(maintenanceScheduleData.assignedEmployees)
  }

  useEffect(() => {
    fetchData()
  }, [id])

  useEffect(() => {
    fillData()
  }, [maintenanceScheduleData])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    await deleteMaintenanceSchedule(id)
    resetData()
    navigate('/mm/view-maintenance-schedule')
  }

  return (
    <div className="d-flex vh-100">
      <Sidebar />
      <div className="w-100 overflow-auto">
        <Navbar />
        <div className="px-5 py-4 overflow-hidden">
          <h5 className="mt-2 mb-4 text-muted">
            Maintenance Manager
            <i className="bi bi-arrow-right mx-2"></i>
            Delete Maintenance Schedule
          </h5>
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="equipmentID" className="form-label">
                Equipment Name
              </label>
              <select
                id="equipmentID"
                name="equipmentID"
                className="form-select form-select-m"
                value={equipmentID}
                disabled
              >
                <option value="">Please select one...</option>
                {equipmentsData &&
                  equipmentsData.map((equipment) => (
                    <option value={equipment.id}>{equipment.name}</option>
                  ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="date" className="form-label">
                Maintenance Schedule Date
              </label>
              <input
                id="date"
                name="date"
                type="date"
                className="form-control"
                value={date}
                disabled
              />
            </div>
            <div className="mb-3">
              <label htmlFor="startTime" className="form-label">
                Start Time
              </label>
              <input
                id="startTime"
                name="startTime"
                type="time"
                className="form-control"
                value={startTime}
                disabled
              />
            </div>
            <div className="mb-3">
              <label htmlFor="finishTime" className="form-label">
                Finish Time
              </label>
              <input
                id="finishTime"
                name="finishTime"
                type="time"
                className="form-control"
                value={finishTime}
                disabled
              />
            </div>
            <div className="mb-3">
              <label htmlFor="assignedEmployees" className="form-label">
                Assigned Employees
              </label>
              <table className="table table-bordered table-hover">
                <thead className="table-dark">
                  <tr>
                    <th scope="col" style={{ width: '1%' }}>
                      Select
                    </th>
                    <th scope="col">Name</th>
                    <th scope="col">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {employeesData &&
                    employeesData.map((employee) => (
                      <tr key={employee.id}>
                        <td style={{ width: '1%' }}>
                          <div className="form-check d-flex justify-content-center align-items-center">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value={employee.id}
                              checked={assignedEmployees.includes(employee.id)}
                              style={{ backgroundColor: 'black', borderColor: 'black' }}
                              disabled
                            />
                          </div>
                        </td>
                        <td>{employee.fullName}</td>
                        <td>{employee.role}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="d-flex mt-4 gap-2">
              <button className="btn btn-outline-dark" type="submit">
                Delete
              </button>
              <button
                className="btn btn-secondary"
                type="button"
                onClick={() => navigate('/mm/view-maintenance-schedule')}
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

export default DeleteMaintenanceSchedulePage
