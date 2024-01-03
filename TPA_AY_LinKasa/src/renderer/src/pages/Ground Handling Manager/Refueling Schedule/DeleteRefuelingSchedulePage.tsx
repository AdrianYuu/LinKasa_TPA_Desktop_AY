import Sidebar from '../../../components/Ground Handling Manager/Sidebar'
import Navbar from '../../../components/Navbar'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getEmployeesBasedOnRole } from '@renderer/controllers/EmployeeController'
import { getFlightSchedules } from '@renderer/controllers/FlightScheduleController'
import {
  deleteRefuelingSchedule,
  getRefuelingSchedule
} from '@renderer/controllers/RefuelingScheduleController'

const DeleteRefuelingSchedulePage = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const [refuelingScheduleData, setRefuelingScheduleData] = useState<RefuelingSchedule | null>(null)

  const [employeesData, setEmployeesData] = useState<Employee[] | null>(null)
  const [flightSchedulesData, setFlightSchedulesData] = useState<FlightSchedule[] | null>(null)

  const [flightID, setFlightID] = useState('')
  const [location, setLocation] = useState('')
  const [startTime, setStartTime] = useState('')
  const [finishTime, setFinishTime] = useState('')
  const [date, setDate] = useState('')
  const [assignedEmployees, setAssignedEmployees] = useState<string[]>([])

  const formRef = useRef<HTMLFormElement | null>(null)

  const fetchData = async () => {
    try {
      setFlightSchedulesData(await getFlightSchedules())
      setEmployeesData(await getEmployeesBasedOnRole('Ground Handling Staff'))
      setRefuelingScheduleData(await getRefuelingSchedule(id))
    } catch (error) {
      console.log(error)
    }
  }

  const resetData = () => {
    setFlightID('')
    setStartTime('')
    setFinishTime('')
    setDate('')
    setAssignedEmployees([''])

    if (!formRef.current) return
    formRef.current.reset()
  }

  const fillData = () => {
    if (!refuelingScheduleData) return

    setLocation(refuelingScheduleData.location)
    setFlightID(refuelingScheduleData.flightID)
    setStartTime(refuelingScheduleData.startTime)
    setFinishTime(refuelingScheduleData.finishTime)
    setDate(refuelingScheduleData.date)
    setAssignedEmployees(refuelingScheduleData.assignedEmployees)
  }

  useEffect(() => {
    fetchData()
  }, [id])

  useEffect(() => {
    fillData()
  }, [refuelingScheduleData])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    await deleteRefuelingSchedule(id)
    resetData()
    navigate('/ghm/view-refueling-schedule')
  }

  return (
    <div className="d-flex vh-100">
      <Sidebar />
      <div className="w-100 overflow-auto">
        <Navbar />
        <div className="px-5 py-4 overflow-hidden">
          <h5 className="mt-2 mb-4 text-muted">
            Ground Handling Manager
            <i className="bi bi-arrow-right mx-2"></i>
            Delete Refueling Schedule
          </h5>
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="flightID" className="form-label">
                Flight ID
              </label>
              <select
                id="flightID"
                name="flightID"
                className="form-select form-select-m"
                value={flightID}
                disabled
              >
                <option value="">Please select one...</option>
                {flightSchedulesData &&
                  flightSchedulesData.map((flightSchedule) => (
                    <option value={flightSchedule.id}>{flightSchedule.id}</option>
                  ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="location" className="form-label">
                Refueling Location
              </label>
              <input
                id="location"
                name="location"
                type="text"
                className="form-control"
                value={location}
                disabled
              />
            </div>
            <div className="mb-3">
              <label htmlFor="date" className="form-label">
                Refueling Schedule Date
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
                onClick={() => navigate('/ghm/view-refueling-schedule')}
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

export default DeleteRefuelingSchedulePage
