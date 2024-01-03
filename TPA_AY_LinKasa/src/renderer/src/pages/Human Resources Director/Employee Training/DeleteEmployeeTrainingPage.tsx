import Sidebar from '../../../components/Human Resources Director/Sidebar'
import Navbar from '../../../components/Navbar'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getEmployees } from '@renderer/controllers/EmployeeController'
import {
  deleteEmployeeTraining,
  getEmployeeTraining
} from '@renderer/controllers/EmployeeTrainingController'

const DeleteEmployeeTrainingPage = () => {
  const navigate = useNavigate()

  const { id } = useParams()
  const [employeeTrainingData, setEmployeeTrainingData] = useState<EmployeeTraining | null>(null)
  const [employeesData, setEmployeesData] = useState<Employee[] | null>(null)

  const [trainingName, setTrainingName] = useState('')
  const [trainingObjective, setTrainingObjective] = useState('')
  const [trainingDescription, setTrainingDescription] = useState('')
  const [trainingDate, setTrainingDate] = useState('')
  const [trainingStartTime, setTrainingStartTime] = useState('')
  const [trainingFinishTime, setTrainingFinishTime] = useState('')
  const [involvedEmployees, setInvolvedEmployees] = useState<string[]>([])

  const formRef = useRef<HTMLFormElement | null>(null)

  const fetchData = async () => {
    try {
      setEmployeesData(await getEmployees())
      setEmployeeTrainingData(await getEmployeeTraining(id))
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

  const fillData = () => {
    if (!employeeTrainingData) return

    setTrainingName(employeeTrainingData.trainingName)
    setTrainingObjective(employeeTrainingData.trainingObjective)
    setTrainingDescription(employeeTrainingData.trainingDescription)
    setTrainingDate(employeeTrainingData.trainingDate)
    setTrainingStartTime(employeeTrainingData.trainingStartTime)
    setTrainingFinishTime(employeeTrainingData.trainingFinishTime)
    setInvolvedEmployees(employeeTrainingData.involvedEmployees)
  }

  useEffect(() => {
    fetchData()
  }, [id])

  useEffect(() => {
    fillData()
  }, [employeeTrainingData])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    await deleteEmployeeTraining(id)
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
            Delete Employee Training
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
                value={trainingName}
                aria-label="Disabled input example"
                disabled
              />
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
                value={trainingObjective}
                aria-label="Disabled input example"
                disabled
              />
            </div>
            <div className="mb-3">
              <label htmlFor="trainingDescription" className="form-label">
                Training Description
              </label>
              <textarea
                id="trainingDescription"
                name="trainingDescription"
                className="form-control"
                value={trainingDescription}
                aria-label="Disabled input example"
                disabled
              />
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
                value={trainingDate}
                aria-label="Disabled input example"
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
                value={trainingStartTime}
                aria-label="Disabled input example"
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
                value={trainingFinishTime}
                aria-label="Disabled input example"
                disabled
              />
            </div>
            <div className="mb-3">
              <label htmlFor="involvedEmployees" className="form-label">
                Involved Employees
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
                              checked={involvedEmployees.includes(employee.id)}
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

export default DeleteEmployeeTrainingPage
