import Sidebar from '@renderer/components/Baggage Security Supervisor/Sidebar'
import Navbar from '../../../components/Navbar'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getEmployeesBasedOnRole } from '@renderer/controllers/EmployeeController'
import { getFlightSchedules } from '@renderer/controllers/FlightScheduleController'
import { createBaggageHandlingTask } from '@renderer/controllers/BaggageHandlingTaskController'

const CreateBaggageHandlingTaskPage = () => {
  const navigate = useNavigate()

  const [employeesData, setEmployeesData] = useState<Employee[] | null>(null)
  const [flightSchedulesData, setFlightSchedulesData] = useState<FlightSchedule[] | null>(null)

  const [taskName, setTaskName] = useState('')
  const [flightID, setFlightID] = useState('')
  const [location, setLocation] = useState('')
  const [startTime, setStartTime] = useState('')
  const [finishTime, setFinishTime] = useState('')
  const [date, setDate] = useState('')
  const [assignedEmployees, setAssignedEmployees] = useState<string[]>([])

  const [errorTaskName, setErrorTaskName] = useState('')
  const [errorFlightID, setErrorFlightID] = useState('')
  const [errorLocation, setErrorLocation] = useState('')
  const [errorStartTime, setErrorStartTime] = useState('')
  const [errorFinishTime, setErrorFinishTime] = useState('')
  const [errorDate, setErrorDate] = useState('')
  const [errorAssignedEmployees, setErrorAssignedEmployees] = useState('')

  const formRef = useRef<HTMLFormElement | null>(null)

  const fetchData = async () => {
    try {
      setFlightSchedulesData(await getFlightSchedules())
      setEmployeesData(await getEmployeesBasedOnRole('Baggage Security Staff'))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

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
    setTaskName('')
    setFlightID('')
    setStartTime('')
    setFinishTime('')
    setDate('')
    setAssignedEmployees([''])

    if (!formRef.current) return
    formRef.current.reset()
  }

  useEffect(() => {
    setErrorTaskName('')
    if (taskName === '') setErrorTaskName("Task name can't be empty!")
  }, [taskName])

  useEffect(() => {
    setErrorFlightID('')
    if (flightID === '') setErrorFlightID("Flight ID can't be empty!")
  }, [flightID])

  useEffect(() => {
    setErrorLocation('')
    if (location === '') setErrorLocation("Location can't be empty!")
  }, [location])

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
    if (startTime === '') setErrorStartTime("Baggage handling task start time can't be empty!")
  }, [startTime])

  useEffect(() => {
    const startDateTime = new Date(`${date} ${startTime}`)
    const finishDateTime = new Date(`${date} ${finishTime}`)

    setErrorFinishTime('')
    if (finishTime === '') {
      setErrorFinishTime("Baggage handling task finish time can't be empty!")
    } else if (startDateTime >= finishDateTime) {
      setErrorFinishTime(
        'Baggage handling task finish time must be after baggage handling task start time!'
      )
    }
  }, [date, startTime, finishTime])

  useEffect(() => {
    setErrorAssignedEmployees('')
    if (assignedEmployees.length === 0)
      setErrorAssignedEmployees("Assigned employees can't be empty!")
  }, [assignedEmployees])

  useEffect(() => {
    fetchData()
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const isValid =
      !errorFlightID &&
      !errorStartTime &&
      !errorFinishTime &&
      !errorDate &&
      !errorAssignedEmployees &&
      !errorLocation &&
      !errorTaskName

    if (!isValid) return

    const newBaggageHandlingTask: BaggageHandlingTask = {
      id: '',
      taskName: taskName,
      location: location,
      flightID: flightID,
      startTime: startTime,
      finishTime: finishTime,
      date: date,
      assignedEmployees: assignedEmployees
    }

    await createBaggageHandlingTask(newBaggageHandlingTask)
    resetData()
    navigate('/bss/view-baggage-handling-task')
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
            Create Baggage Handling Task
          </h5>
          <form ref={formRef} onSubmit={handleSubmit}>
            <div>
              <label htmlFor="taskName" className="form-label">
                Task Name
              </label>
              <input
                id="taskName"
                name="taskName"
                type="text"
                className="form-control"
                onChange={(e) => setTaskName(e.target.value)}
              />
              <p className="text-danger">{errorTaskName}</p>
            </div>
            <div>
              <label htmlFor="flightID" className="form-label">
                Flight ID
              </label>
              <select
                id="flightID"
                name="flightID"
                className="form-select form-select-m"
                onChange={(e) => setFlightID(e.target.value)}
              >
                <option value="">Please select one...</option>
                {flightSchedulesData &&
                  flightSchedulesData.map((flightSchedule) => (
                    <option value={flightSchedule.id}>{flightSchedule.id}</option>
                  ))}
              </select>
              <p className="text-danger">{errorFlightID}</p>
            </div>
            <div>
              <label htmlFor="location" className="form-label">
                Baggage Handling Location
              </label>
              <input
                id="location"
                name="location"
                type="text"
                className="form-control"
                onChange={(e) => setLocation(e.target.value)}
              />
              <p className="text-danger">{errorLocation}</p>
            </div>
            <div>
              <label htmlFor="date" className="form-label">
                Refueling Schedule Date
              </label>
              <input
                id="date"
                name="date"
                type="date"
                className="form-control"
                onChange={(e) => setDate(e.target.value)}
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
                Submit
              </button>
              <button
                className="btn btn-secondary"
                type="button"
                onClick={() => navigate('/bss/view-baggage-handling-task')}
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

export default CreateBaggageHandlingTaskPage
