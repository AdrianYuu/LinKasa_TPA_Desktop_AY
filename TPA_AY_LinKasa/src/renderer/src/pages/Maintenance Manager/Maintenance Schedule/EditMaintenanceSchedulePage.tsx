import Sidebar from '../../../components/Maintenance Manager/Sidebar'
import Navbar from '../../../components/Navbar'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getEmployeesBasedOnRole } from '@renderer/controllers/EmployeeController'
import { getEquipments } from '@renderer/controllers/EquipmentController'
import { getMaintenanceSchedule, updateMaintenanceSchedule } from '@renderer/controllers/MaintenanceScheduleController'

const EditMaintenanceSchedulePage = () => {
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

  const [errorEquipmentID, setErrorEquipmentID] = useState('')
  const [errorDate, setErrorDate] = useState('')
  const [errorStartTime, setErrorStartTime] = useState('')
  const [errorFinishTime, setErrorFinishTime] = useState('')
  const [errorAssignedEmployees, setErrorAssignedEmployees] = useState('')

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

  const setEmployeesCheckbox = (checked: boolean, id: string) => {
    if (checked) {
      setAssignedEmployees((prevSelected) => [...prevSelected, id])
    } else {
      setAssignedEmployees((prevSelected) => prevSelected.filter((e) => e !== id))
    }
  }

  const selectAllEmployees = () => {
    const allEmployeeIds = employeesData?.map((employee) => employee.id) || []
    setAssignedEmployees(allEmployeeIds)
  }

  const unselectAllEmployees = () => {
    setAssignedEmployees([])
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

  useEffect(() => {
    setErrorEquipmentID('')
    if (equipmentID === '') setErrorEquipmentID("Equipment name can't be empty!")
  }, [equipmentID])

  useEffect(() => {
    const currentDate = new Date()
    const selectedDate = new Date(date)

    setErrorDate('')
    if (date === '') {
      setErrorDate("Date can't be empty!")
    } else if (selectedDate <= currentDate) {
      setErrorDate('Date must be in the future!')
    }
  }, [date])

  useEffect(() => {
    setErrorStartTime('')
    if (startTime === '') setErrorStartTime("Maintenance schedule start time can't be empty!")
  }, [startTime])

  useEffect(() => {
    const startDateTime = new Date(`${date} ${startTime}`)
    const finishDateTime = new Date(`${date} ${finishTime}`)

    setErrorFinishTime('')
    if (finishTime === '') {
      setErrorFinishTime("Maintenance schedule finish time can't be empty!")
    } else if (startDateTime >= finishDateTime) {
      setErrorFinishTime(
        'Maintenance schedule finish time must be after maintenance schedule start time!'
      )
    }
  }, [date, startTime, finishTime])

  useEffect(() => {
    setErrorAssignedEmployees('')
    if (assignedEmployees.length === 0)
      setErrorAssignedEmployees("Assigned employees can't be empty!")
  }, [assignedEmployees])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const isValid =
      !errorEquipmentID &&
      !errorStartTime &&
      !errorFinishTime &&
      !errorDate &&
      !errorAssignedEmployees

    if (!isValid) return

    const newMaintenanceSchedule: MaintenanceSchedule = {
      id: '',
      equipmentID: equipmentID,
      date: date,
      startTime: startTime,
      finishTime: finishTime,
      assignedEmployees: assignedEmployees
    }

    await updateMaintenanceSchedule(newMaintenanceSchedule, id)
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
            Edit Maintenance Schedule
          </h5>
          <form ref={formRef} onSubmit={handleSubmit}>
            <div>
              <label htmlFor="equipmentID" className="form-label">
                Equipment Name
              </label>
              <select
                id="equipmentID"
                name="equipmentID"
                className="form-select form-select-m"
                onChange={(e) => setEquipmentID(e.target.value)}
                value={equipmentID}
              >
                <option value="">Please select one...</option>
                {equipmentsData &&
                  equipmentsData.map((equipment) => (
                    <option value={equipment.id}>{equipment.name}</option>
                  ))}
              </select>
              <p className="text-danger">{errorEquipmentID}</p>
            </div>
            <div>
              <label htmlFor="date" className="form-label">
                Maintenance Schedule Date
              </label>
              <input
                id="date"
                name="date"
                type="date"
                className="form-control"
                onChange={(e) => setDate(e.target.value)}
                value={date}
              />
              <p className="text-danger">{errorDate}</p>
            </div>
            <div>
              <label htmlFor="startTime" className="form-label">
                Start Time
              </label>
              <input
                id="startTime"
                name="startTime"
                type="time"
                className="form-control"
                onChange={(e) => setStartTime(e.target.value)}
                value={startTime}
              />
              <p className="text-danger">{errorStartTime}</p>
            </div>
            <div>
              <label htmlFor="finishTime" className="form-label">
                Finish Time
              </label>
              <input
                id="finishTime"
                name="finishTime"
                type="time"
                className="form-control"
                onChange={(e) => setFinishTime(e.target.value)}
                value={finishTime}
              />
              <p className="text-danger">{errorFinishTime}</p>
            </div>
            <div>
              <label htmlFor="assignedEmployees" className="form-label">
                Assigned Employees
              </label>
              <div className="d-flex flex-row gap-2 mb-2">
                <button
                  className="btn btn-outline-dark mb-2"
                  onClick={selectAllEmployees}
                  type="button"
                >
                  Select All
                </button>
                <button
                  className="btn btn-outline-dark mb-2"
                  onClick={unselectAllEmployees}
                  type="button"
                >
                  Unselect All
                </button>
              </div>
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
                              onChange={(e) => setEmployeesCheckbox(e.target.checked, employee.id)}
                              style={{ backgroundColor: 'black', borderColor: 'black' }}
                            />
                          </div>
                        </td>
                        <td>{employee.fullName}</td>
                        <td>{employee.role}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <p className="text-danger">{errorAssignedEmployees}</p>
            </div>
            <div className="d-flex mt-4 gap-2">
              <button className="btn btn-outline-dark" type="submit">
                Update
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

export default EditMaintenanceSchedulePage
