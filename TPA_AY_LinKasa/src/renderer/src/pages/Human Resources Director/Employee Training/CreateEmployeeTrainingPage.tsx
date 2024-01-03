import Sidebar from '../../../components/Human Resources Director/Sidebar'
import Navbar from '../../../components/Navbar'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getEmployees } from '@renderer/controllers/EmployeeController'
import { createEmployeeTraining } from '@renderer/controllers/EmployeeTrainingController'

const CreateEmployeeTrainingPage = () => {
  const navigate = useNavigate()

  const [employeesData, setEmployeesData] = useState<Employee[] | null>(null)

  const [trainingName, setTrainingName] = useState('')
  const [trainingObjective, setTrainingObjective] = useState('')
  const [trainingDescription, setTrainingDescription] = useState('')
  const [trainingDate, setTrainingDate] = useState('')
  const [trainingStartTime, setTrainingStartTime] = useState('')
  const [trainingFinishTime, setTrainingFinishTime] = useState('')
  const [involvedEmployees, setInvolvedEmployees] = useState<string[]>([])

  const [errorTrainingName, setErrorTrainingName] = useState('')
  const [errorTrainingObjective, setErrorTrainingObjective] = useState('')
  const [errorTrainingDescription, setErrorTrainingDescription] = useState('')
  const [errorTrainingDate, setErrorTrainingDate] = useState('')
  const [errorTrainingStartTime, setErrorTrainingStartTime] = useState('')
  const [errorTrainingFinishTime, setErrorTrainingFinishTime] = useState('')
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
    setTrainingName('')
    setTrainingObjective('')
    setTrainingDescription('')
    setTrainingDate('')
    setTrainingStartTime('')
    setTrainingFinishTime('')
    setInvolvedEmployees([''])

    if (!formRef.current) return
    formRef.current.reset()
  }

  useEffect(() => {
    setErrorTrainingName('')
    if (trainingName === '') setErrorTrainingName("Training name can't be empty!")
  }, [trainingName])

  useEffect(() => {
    setErrorTrainingObjective('')
    if (trainingObjective === '') setErrorTrainingObjective("Training objective can't be empty!")
  }, [trainingObjective])

  useEffect(() => {
    const wordCount = trainingDescription.split(/\s+/).filter((word) => word !== '').length
    setErrorTrainingDescription('')
    if (trainingDescription === '')
      setErrorTrainingDescription("Training description can't be empty!")
    else if (wordCount < 3) {
      setErrorTrainingDescription('Training description must have a minimum of 3 words!')
    }
  }, [trainingDescription])

  useEffect(() => {
    const currentDate = new Date()
    const selectedDate = new Date(trainingDate)
    setErrorTrainingDate('')
    if (trainingDate === '') setErrorTrainingDate("Training date can't be empty!")
    else if (selectedDate <= currentDate) {
      setErrorTrainingDate('Training date must be in the future!')
    }
  }, [trainingDate])

  useEffect(() => {
    setErrorTrainingStartTime('')
    if (trainingStartTime === '') setErrorTrainingStartTime("Training start time can't be empty!")
  }, [trainingStartTime])

  useEffect(() => {
    const startDateTime = new Date(`${trainingDate} ${trainingStartTime}`)
    const finishDateTime = new Date(`${trainingDate} ${trainingFinishTime}`)

    setErrorTrainingFinishTime('')
    if (trainingFinishTime === '') {
      setErrorTrainingFinishTime("Training finish time can't be empty!")
    } else if (startDateTime >= finishDateTime) {
      setErrorTrainingFinishTime('Training finish time must be after training start time!')
    }
  }, [trainingDate, trainingStartTime, trainingFinishTime])

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
      !errorTrainingName &&
      !errorTrainingObjective &&
      !errorTrainingDescription &&
      !errorTrainingDate &&
      !errorTrainingStartTime &&
      !errorTrainingFinishTime &&
      !errorInvolvedEmployees

    if (!isValid) return

    const newEmployeeTraining: EmployeeTraining = {
      id: '',
      trainingName: trainingName,
      trainingObjective: trainingObjective,
      trainingDescription: trainingDescription,
      trainingStartTime: trainingStartTime,
      trainingFinishTime: trainingFinishTime,
      trainingDate: trainingDate,
      involvedEmployees: involvedEmployees
    }

    createEmployeeTraining(newEmployeeTraining)

    resetData()
    navigate('/hrd/view-employee-training')
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
            Create Employee Training
          </h5>
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="trainingName" className="form-label">
                Training Name
              </label>
              <input
                id="trainingName"
                name="trainingName"
                type="text"
                className="form-control"
                onChange={(e) => setTrainingName(e.target.value)}
              />
              <p className="text-danger">{errorTrainingName}</p>
            </div>
            <div className="mb-3">
              <label htmlFor="trainingObjective" className="form-label">
                Training Objective
              </label>
              <input
                id="trainingObjective"
                name="trainingObjective"
                type="text"
                className="form-control"
                onChange={(e) => setTrainingObjective(e.target.value)}
              />
              <p className="text-danger">{errorTrainingObjective}</p>
            </div>
            <div className="mb-3">
              <label htmlFor="trainingDescription" className="form-label">
                Training Description
              </label>
              <textarea
                id="trainingDescription"
                name="trainingDescription"
                className="form-control"
                onChange={(e) => setTrainingDescription(e.target.value)}
              />
              <p className="text-danger">{errorTrainingDescription}</p>
            </div>
            <div className="mb-3">
              <label htmlFor="trainingDate" className="form-label">
                Training Date
              </label>
              <input
                id="trainingDate"
                name="trainingDate"
                type="date"
                className="form-control"
                onChange={(e) => setTrainingDate(e.target.value)}
              />
              <p className="text-danger">{errorTrainingDate}</p>
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
                onChange={(e) => setTrainingStartTime(e.target.value)}
              />
              <p className="text-danger">{errorTrainingStartTime}</p>
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
                onChange={(e) => setTrainingFinishTime(e.target.value)}
              />
              <p className="text-danger">{errorTrainingFinishTime}</p>
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
                onClick={() => navigate('/hrd/view-employee-training')}
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

export default CreateEmployeeTrainingPage
