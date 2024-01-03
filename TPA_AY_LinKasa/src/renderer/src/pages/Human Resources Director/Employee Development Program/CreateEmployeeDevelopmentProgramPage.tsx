import Sidebar from '../../../components/Human Resources Director/Sidebar'
import Navbar from '../../../components/Navbar'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getEmployees } from '@renderer/controllers/EmployeeController'
import { createEmployeeDevelopmentProgram } from './../../../controllers/EmployeeDevelopmentProgramController'

const CreateEmployeeDevelopmentProgramPage = () => {
  const navigate = useNavigate()

  const [employeesData, setEmployeesData] = useState<Employee[] | null>(null)

  const [developmentProgramName, setDevelopmentProgramName] = useState('')
  const [developmentProgramObjective, setDevelopmentProgramObjective] = useState('')
  const [developmentProgramDescription, setDevelopmentProgramDescription] = useState('')
  const [developmentProgramDate, setDevelopmentProgramDate] = useState('')
  const [developmentProgramStartTime, setDevelopmentProgramStartTime] = useState('')
  const [developmentProgramFinishTime, setDevelopmentProgramFinishTime] = useState('')
  const [involvedEmployees, setInvolvedEmployees] = useState<string[]>([])

  const [errorDevelopmentProgramName, setErrorDevelopmentProgramName] = useState('')
  const [errorDevelopmentProgramObjective, setErrorDevelopmentProgramObjective] = useState('')
  const [errorDevelopmentProgramDescription, setErrorDevelopmentProgramDescription] = useState('')
  const [errorDevelopmentProgramDate, setErrorDevelopmentProgramDate] = useState('')
  const [errorDevelopmentProgramStartTime, setErrorDevelopmentProgramStartTime] = useState('')
  const [errorDevelopmentProgramFinishTime, setErrorDevelopmentProgramFinishTime] = useState('')
  const [errorInvolvedEmployees, setErrorInvolvedEmployees] = useState('')

  const formRef = useRef<HTMLFormElement | null>(null)

  const setEmployeesCheckbox = (checked: boolean, id: string) => {
    if (checked) {
      setInvolvedEmployees((prevSelected) => [...prevSelected, id])
    } else {
      setInvolvedEmployees((prevSelected) => prevSelected.filter((e) => e !== id))
    }
  }

  const selectAllEmployees = () => {
    const allEmployeeIds = employeesData?.map((employee) => employee.id) || []
    setInvolvedEmployees(allEmployeeIds)
  }

  const unselectAllEmployees = () => {
    setInvolvedEmployees([])
  }

  const fetchData = async () => {
    try {
      setEmployeesData(await getEmployees())
    } catch (error) {
      console.log(error)
    }
  }

  const resetData = () => {
    setDevelopmentProgramName('')
    setDevelopmentProgramObjective('')
    setDevelopmentProgramDescription('')
    setDevelopmentProgramDate('')
    setDevelopmentProgramStartTime('')
    setDevelopmentProgramFinishTime('')
    setInvolvedEmployees([''])

    if (!formRef.current) return
    formRef.current.reset()
  }

  useEffect(() => {
    setErrorDevelopmentProgramName('')
    if (developmentProgramName === '')
      setErrorDevelopmentProgramName("Development program name can't be empty!")
  }, [developmentProgramName])

  useEffect(() => {
    setErrorDevelopmentProgramObjective('')
    if (developmentProgramObjective === '')
      setErrorDevelopmentProgramObjective("Development program objective can't be empty!")
  }, [developmentProgramObjective])

  useEffect(() => {
    const wordCount = developmentProgramDescription
      .split(/\s+/)
      .filter((word) => word !== '').length
    setErrorDevelopmentProgramDescription('')
    if (developmentProgramDescription === '')
      setErrorDevelopmentProgramDescription("Development program description can't be empty!")
    else if (wordCount < 3) {
      setErrorDevelopmentProgramDescription(
        'Development program description must have a minimum of 3 words!'
      )
    }
  }, [developmentProgramDescription])

  useEffect(() => {
    const currentDate = new Date()
    const selectedDate = new Date(developmentProgramDate)
    setErrorDevelopmentProgramDate('')
    if (developmentProgramDate === '')
      setErrorDevelopmentProgramDate("Development program date can't be empty!")
    else if (selectedDate <= currentDate) {
      setErrorDevelopmentProgramDate('Development program date must be in the future!')
    }
  }, [developmentProgramDate])

  useEffect(() => {
    setErrorDevelopmentProgramStartTime('')
    if (developmentProgramStartTime === '')
      setErrorDevelopmentProgramStartTime("Development program start time can't be empty!")
  }, [developmentProgramStartTime])

  useEffect(() => {
    const startDateTime = new Date(`${developmentProgramDate} ${developmentProgramStartTime}`)
    const finishDateTime = new Date(`${developmentProgramDate} ${developmentProgramFinishTime}`)

    setErrorDevelopmentProgramFinishTime('')
    if (developmentProgramFinishTime === '') {
      setErrorDevelopmentProgramFinishTime("Development program finish time can't be empty!")
    } else if (startDateTime >= finishDateTime) {
      setErrorDevelopmentProgramFinishTime(
        'Development program finish time must be after development program start time!'
      )
    }
  }, [developmentProgramDate, developmentProgramStartTime, developmentProgramFinishTime])

  useEffect(() => {
    setErrorInvolvedEmployees('')
    if (involvedEmployees.length === 0)
      setErrorInvolvedEmployees("Involved employees can't be empty!")
  }, [involvedEmployees])

  useEffect(() => {
    fetchData()
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const isValid =
      !errorDevelopmentProgramName &&
      !errorDevelopmentProgramObjective &&
      !errorDevelopmentProgramDescription &&
      !errorDevelopmentProgramDate &&
      !errorDevelopmentProgramStartTime &&
      !errorDevelopmentProgramFinishTime &&
      !errorInvolvedEmployees

    if (!isValid) return

    const newEmployeeDevelopmentProgram: EmployeeDevelopmentProgram = {
      id: '',
      developmentProgramName: developmentProgramName,
      developmentProgramObjective: developmentProgramObjective,
      developmentProgramDescription: developmentProgramDescription,
      developmentProgramStartTime: developmentProgramStartTime,
      developmentProgramFinishTime: developmentProgramFinishTime,
      developmentProgramDate: developmentProgramDate,
      involvedEmployees: involvedEmployees
    }

    await createEmployeeDevelopmentProgram(newEmployeeDevelopmentProgram)
    resetData()
    navigate('/hrd/view-employee-development-program')
  }

  return (
    <div className="d-flex vh-100">
      <Sidebar />
      <div className="w-100 overflow-auto">
        <Navbar />
        <div className="px-5 py-4 overflow-hidden">
          <h5 className="mt-2 mb-4 text-muted">
            Human Resources Director
            <i className="bi bi-arrow-right mx-2"></i>
            Create Employee Development Program
          </h5>
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="developmentProgramName" className="form-label">
                Development Program Name
              </label>
              <input
                id="developmentProgramName"
                name="developmentProgramName"
                type="text"
                className="form-control"
                onChange={(e) => setDevelopmentProgramName(e.target.value)}
              />
              <p className="text-danger">{errorDevelopmentProgramName}</p>
            </div>
            <div className="mb-3">
              <label htmlFor="developmentProgramObjective" className="form-label">
                Development Program Objective
              </label>
              <input
                id="developmentProgramObjective"
                name="developmentProgramObjective"
                type="text"
                className="form-control"
                onChange={(e) => setDevelopmentProgramObjective(e.target.value)}
              />
              <p className="text-danger">{errorDevelopmentProgramObjective}</p>
            </div>
            <div className="mb-3">
              <label htmlFor="developmentProgramDescription" className="form-label">
                Development Program Description
              </label>
              <textarea
                id="developmentProgramDescription"
                name="developmentProgramDescription"
                className="form-control"
                onChange={(e) => setDevelopmentProgramDescription(e.target.value)}
              />
              <p className="text-danger">{errorDevelopmentProgramDescription}</p>
            </div>
            <div className="mb-3">
              <label htmlFor="developmentProgramDate" className="form-label">
                Development Program Date
              </label>
              <input
                id="developmentProgramDate"
                name="developmentProgramDate"
                type="date"
                className="form-control"
                onChange={(e) => setDevelopmentProgramDate(e.target.value)}
              />
              <p className="text-danger">{errorDevelopmentProgramDate}</p>
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
                onChange={(e) => setDevelopmentProgramStartTime(e.target.value)}
              />
              <p className="text-danger">{errorDevelopmentProgramStartTime}</p>
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
                onChange={(e) => setDevelopmentProgramFinishTime(e.target.value)}
              />
              <p className="text-danger">{errorDevelopmentProgramFinishTime}</p>
            </div>
            <div className="mb-3">
              <label htmlFor="involvedEmployees" className="form-label">
                Involved Employees
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
                              checked={involvedEmployees.includes(employee.id)}
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
              <p className="text-danger">{errorInvolvedEmployees}</p>
            </div>
            <div className="d-flex mt-4 gap-2">
              <button className="btn btn-outline-dark" type="submit">
                Submit
              </button>
              <button
                className="btn btn-secondary"
                type="button"
                onClick={() => navigate('/hrd/view-employee-development-program')}
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

export default CreateEmployeeDevelopmentProgramPage
