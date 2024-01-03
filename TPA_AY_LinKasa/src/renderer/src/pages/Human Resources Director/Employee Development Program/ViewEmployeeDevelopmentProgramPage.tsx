import Navbar from '@renderer/components/Navbar'
import Sidebar from '@renderer/components/Human Resources Director/Sidebar'
import { getEmployeeDevelopmentPrograms } from '@renderer/controllers/EmployeeDevelopmentProgramController'
import { getEmployee } from '@renderer/controllers/EmployeeController'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '@renderer/firebase'

const ViewEmployeeDevelopmentProgramPage = () => {
  const [employeeDevelopmentProgram, setEmployeeDevelopmentProgram] = useState<
    EmployeeDevelopmentProgram[] | null
  >(null)

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'employee-development-program'), fetchData)
    return () => {
      unsubscribe()
    }
  }, [])

  const fetchData = async () => {
    try {
      const programs = await getEmployeeDevelopmentPrograms()
      if (!programs) return

      const programsWithEmployeeDetails = await Promise.all(
        programs.map(async (programs) => {
          const involvedEmployeeDetails = await Promise.all(
            programs.involvedEmployees.map(async (employeeId) => {
              const employee = await getEmployee(employeeId)
              return employee ? employee.fullName : ''
            })
          )
          return { ...programs, involvedEmployees: involvedEmployeeDetails }
        })
      )
      setEmployeeDevelopmentProgram(programsWithEmployeeDetails)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="d-flex vh-100">
      <Sidebar />
      <div className="w-100 overflow-auto">
        <Navbar />
        <div className="px-5 py-4 overflow-hidden">
          {employeeDevelopmentProgram && employeeDevelopmentProgram.length > 0 ? (
            <h5 className="mt-2 mb-4 text-muted">
              Human Resources Director
              <i className="bi bi-arrow-right mx-2"></i>
              View Employee Development Program
            </h5>
          ) : (
            <></>
          )}
          {employeeDevelopmentProgram && employeeDevelopmentProgram.length > 0 ? (
            <div className="card-group">
              {employeeDevelopmentProgram.map((developmentProgram, index) => (
                <div className="card" key={index}>
                  <div className="card-header bg-dark text-white fw-bold">
                    {developmentProgram.developmentProgramName}
                  </div>
                  <div className="card-body d-flex flex-column gap-1">
                    <p className="card-title">
                      <strong>Objective:</strong> <br />{' '}
                      {developmentProgram.developmentProgramObjective}
                    </p>
                    <p className="card-text mb-2">
                      <strong>Description:</strong> <br />{' '}
                      {developmentProgram.developmentProgramDescription}
                    </p>
                    <div className="d-flex flex-column mb-2">
                      <p className="card-text mb-2">
                        <strong>Date:</strong> <br /> <i className="bi bi-calendar me-2" />
                        {developmentProgram.developmentProgramDate}
                      </p>
                      <div className="mb-3">
                        <strong>Time:</strong> <br /> <i className="bi bi-clock me-2"></i>
                        <span>{developmentProgram.developmentProgramStartTime}</span>
                        <span className="mx-2">-</span>
                        <i className="bi bi-clock me-2"></i>
                        <span>{developmentProgram.developmentProgramFinishTime}</span>
                      </div>
                    </div>
                    {developmentProgram.involvedEmployees.length > 0 && (
                      <div>
                        <h6>Involved Employees:</h6>
                        <ul className="list-group">
                          {developmentProgram.involvedEmployees.map((employee, index) => (
                            <li className="list-group-item" key={index}>
                              {employee}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <div className="card-footer d-flex gap-3">
                    <Link
                      to={`/hrd/edit-employee-development-program/${developmentProgram.id}`}
                      className="btn btn-outline-primary"
                    >
                      <i className="bi bi-pencil-fill"></i> Edit
                    </Link>
                    <Link
                      to={`/hrd/delete-employee-development-program/${developmentProgram.id}`}
                      className="btn btn-outline-danger"
                    >
                      <i className="bi bi-trash3-fill"></i> Delete
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center my-4">
              <p className="lead">No employee development program records found.</p>
              <i className="bi bi-emoji-frown" style={{ fontSize: '2rem', color: '#6c757d' }}></i>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ViewEmployeeDevelopmentProgramPage
