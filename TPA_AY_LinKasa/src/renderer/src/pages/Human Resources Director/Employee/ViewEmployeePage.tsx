import { useEffect, useState } from 'react'
import { getEmployees } from '../../../controllers/EmployeeController'
import Sidebar from '../../../components/Human Resources Director/Sidebar'
import Navbar from '../../../components/Navbar'
import { Link } from 'react-router-dom'
import { getCurrentUser } from '@renderer/controllers/AuthController'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '@renderer/firebase'

const ViewEmployeePage = () => {
  const [currentUser, setCurrentUser] = useState<Employee | null>(null)
  const [employeesData, setEmployeesData] = useState<Employee[] | null>(null)

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'users'), fetchData)
    return () => {
      unsubscribe()
    }
  }, [])

  const fetchData = async () => {
    try {
      setEmployeesData(await getEmployees())
    } catch (error) {
      console.log(error)
    }
  }

  const getCurrentUserLogin = async () => {
    try {
      setCurrentUser(await getCurrentUser())
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
    getCurrentUserLogin()
  }, [])

  return (
    <div className="d-flex vh-100">
      <Sidebar />
      <div className="w-100 overflow-auto">
        <Navbar />
        <div className="px-5 py-4 overflow-hidden">
          {employeesData && employeesData.length > 0 ? (
            <h5 className="mt-2 mb-4 text-muted">
              Human Resources Director
              <i className="bi bi-arrow-right mx-2"></i>
              View Employee List
            </h5>
          ) : (
            <></>
          )}
          {employeesData && employeesData.length > 0 ? (
            <table className="table table-striped table-hover table-responsive">
              <thead className="table-dark">
                <tr>
                  <th scope="col">No.</th>
                  <th scope="col">Full Name</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Personal Email</th>
                  <th scope="col">Phone Number</th>
                  <th scope="col">Date Of Birth</th>
                  <th scope="col">Role</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {employeesData.map((employee, index) => (
                  <tr key={employee.id}>
                    <th scope="row">{index + 1}.</th>
                    <td>{employee.fullName}</td>
                    <td>{employee.gender}</td>
                    <td>{employee.personalEmail}</td>
                    <td>{employee.phoneNumber}</td>
                    <td>{employee.dateOfBirth}</td>
                    <td>{employee.role}</td>
                    <td className="text-center">
                      <Link to={`/hrd/edit-employee/${employee.id}`}>
                        <i className="bi bi-pencil-fill text-primary"></i>
                      </Link>
                    </td>
                    <td className="text-center">
                      {currentUser?.id !== employee.id ? (
                        <Link to={`/hrd/delete-employee/${employee.id}`}>
                          <i className="bi bi-trash3-fill text-danger"></i>
                        </Link>
                      ) : (
                        <i className="bi bi-exclamation-circle-fill text-danger"></i>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center my-4">
              <p className="lead">No employee data records found.</p>
              <i className="bi bi-emoji-frown" style={{ fontSize: '2rem', color: '#6c757d' }}></i>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ViewEmployeePage
