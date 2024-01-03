import Sidebar from '../../../components/Human Resources Director/Sidebar'
import Navbar from '../../../components/Navbar'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getEmployees } from '@renderer/controllers/EmployeeController'
import {
  deleteEmployeeDevelopmentProgram,
  getEmployeeDevelopmentProgram
} from '@renderer/controllers/EmployeeDevelopmentProgramController'

const DeleteEmployeeDevelopmentProgramPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const [employeeDevelopmentProgramData, setEmployeeDevelopmentProgramData] =
    useState<EmployeeDevelopmentProgram | null>(null)
  const [employeesData, setEmployeesData] = useState<Employee[] | null>(null)

  const [developmentProgramName, setDevelopmentProgramName] = useState('')
  const [developmentProgramObjective, setDevelopmentProgramObjective] = useState('')
  const [developmentProgramDescription, setDevelopmentProgramDescription] = useState('')
  const [developmentProgramDate, setDevelopmentProgramDate] = useState('')
  const [developmentProgramStartTime, setDevelopmentProgramStartTime] = useState('')
  const [developmentProgramFinishTime, setDevelopmentProgramFinishTime] = useState('')
  const [involvedEmployees, setInvolvedEmployees] = useState<string[]>([])

  const formRef = useRef<HTMLFormElement | null>(null)

  const fetchData = async () => {
    try {
      setEmployeesData(await getEmployees())
      setEmployeeDevelopmentProgramData(await getEmployeeDevelopmentProgram(id))
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

  const fillData = () => {
    if (!employeeDevelopmentProgramData) return

    setDevelopmentProgramName(employeeDevelopmentProgramData.developmentProgramName)
    setDevelopmentProgramObjective(employeeDevelopmentProgramData.developmentProgramObjective)
    setDevelopmentProgramDescription(employeeDevelopmentProgramData.developmentProgramDescription)
    setDevelopmentProgramDate(employeeDevelopmentProgramData.developmentProgramDate)
    setDevelopmentProgramStartTime(employeeDevelopmentProgramData.developmentProgramStartTime)
    setDevelopmentProgramFinishTime(employeeDevelopmentProgramData.developmentProgramFinishTime)
    setInvolvedEmployees(employeeDevelopmentProgramData.involvedEmployees)
  }

  useEffect(() => {
    fetchData()
  }, [id])

  useEffect(() => {
    fillData()
  }, [employeeDevelopmentProgramData])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    await deleteEmployeeDevelopmentProgram(id)
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
            Delete Employee Development Program
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
                value={developmentProgramName}
                aria-label="Disabled input example"
                disabled
              />
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
                value={developmentProgramObjective}
                aria-label="Disabled input example"
                disabled
              />
            </div>
            <div className="mb-3">
              <label htmlFor="developmentProgramDescription" className="form-label">
                Development Program Description
              </label>
              <textarea
                id="developmentProgramDescription"
                name="developmentProgramDescription"
                className="form-control"
                value={developmentProgramDescription}
                aria-label="Disabled input example"
                disabled
              />
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
                value={developmentProgramDate}
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
                value={developmentProgramStartTime}
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
                value={developmentProgramFinishTime}
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

export default DeleteEmployeeDevelopmentProgramPage
