import Sidebar from '../../../components/Human Resources Director/Sidebar'
import Navbar from '../../../components/Navbar'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { deleteEmployee, getEmployee } from '@renderer/controllers/EmployeeController'
import { useNavigate, useParams } from 'react-router-dom'
import { auth } from '@renderer/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { getCurrentUser } from '@renderer/controllers/AuthController'

const DeleteEmployeePage = () => {
  const navigate = useNavigate()

  const { id } = useParams()
  const [employeeData, setEmployeeData] = useState<Employee | null>(null)

  const [fullName, setFullName] = useState('')
  const [gender, setGender] = useState('')
  const [personalEmail, setPersonalEmail] = useState('')
  const [role, setRole] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')

  const formRef = useRef<HTMLFormElement | null>(null)

  const fillData = () => {
    if (!employeeData) return
    setFullName(employeeData.fullName)
    setGender(employeeData.gender)
    setPersonalEmail(employeeData.personalEmail)
    setRole(employeeData.role)
    setPhoneNumber(employeeData.phoneNumber)
    setDateOfBirth(employeeData.dateOfBirth)
  }

  const fetchData = async () => {
    try {
      setEmployeeData(await getEmployee(id))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [id])

  useEffect(() => {
    fillData()
  }, [employeeData])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    await deleteEmployee(id)

    const currentUser = await getCurrentUser()
    if (!currentUser) return

    const currentEmail = currentUser.workEmail
    const currentPassword = currentUser.password

    // Kalau delete akun orang lain di Authentication tidak bisa secara langsung
    // makanya login dulu ke akun orang ini baru delete.
    if (!employeeData) return
    await signInWithEmailAndPassword(auth, employeeData?.workEmail, employeeData?.password)
    auth.currentUser?.delete()

    await signInWithEmailAndPassword(auth, currentEmail, currentPassword)

    navigate('/hrd/view-employee')
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
            Delete Employee
          </h5>
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="fullName" className="form-label">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                className="form-control"
                value={fullName}
                aria-label="Disabled input example"
                disabled
              />
            </div>
            <div className="mb-3">
              <label htmlFor="gender" className="form-label">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                className="form-select form-select-m"
                value={gender}
                aria-label="Disabled input example"
                disabled
              >
                <option value="">Please select one...</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="personalEmail" className="form-label">
                Personal Email
              </label>
              <input
                id="personalEmail"
                name="personalEmail"
                type="text"
                className="form-control"
                value={personalEmail}
                aria-label="Disabled input example"
                disabled
              />
            </div>
            <div className="mb-3">
              <label htmlFor="role" className="form-label">
                Role
              </label>
              <select
                id="role"
                name="role"
                className="form-select form-select-m"
                value={role}
                aria-label="Disabled input example"
                disabled
              >
                <option value="">Please select one...</option>
                <option value="Customer Service Manager">Customer Service Manager</option>
                <option value="Information Desk Staff">Information Desk Staff</option>
                <option value="Lost and Found Staff">Lost and Found Staff</option>
                <option value="Check-in Staff">Check-in Staff</option>
                <option value="Gate Agents">Gate Agents</option>
                <option value="Air Operations Manager">Air Operations Manager</option>
                <option value="Flight Operations Manager">Flight Operations Manager</option>
                <option value="Ground Handling Manager">Ground Handling Manager</option>
                <option value="Ground Handling Staff">Ground Handling Staff</option>
                <option value="Landside Operation Manager">Landside Operation Manager</option>
                <option value="Landside Operation Staff">Landside Operation Staff</option>
                <option value="Maintenance Manager">Maintenance Manager</option>
                <option value="Maintenance Staff">Maintenance Staff</option>
                <option value="Customs and Border Control Officers">
                  Customs and Border Control Officers
                </option>
                <option value="Baggage Security Supervisor">Baggage Security Supervisor</option>
                <option value="Baggage Security Staff">Baggage Security Staff</option>
                <option value="Cargo Manager">Cargo Manager</option>
                <option value="Logistic Manager">Logistic Manager</option>
                <option value="Fuel Manager">Fuel Manager</option>
                <option value="Cargo Handlers">Cargo Handlers</option>
                <option value="Civil Engineering Manager">Civil Engineering Manager</option>
                <option value="Airport Director/CEO">Airport Director/CEO</option>
                <option value="Chief Financial Officer (CFO)">Chief Financial Officer (CFO)</option>
                <option value="Chief Operations Officer (COO)">
                  Chief Operations Officer (COO)
                </option>
                <option value="Chief Security Officer (CSO)">Chief Security Officer (CSO)</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="phoneNumber" className="form-label">
                Phone Number
              </label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                className="form-control"
                value={phoneNumber}
                aria-label="Disabled input example"
                disabled
              />
            </div>
            <div className="mb-3">
              <label htmlFor="dateOfBirth" className="form-label">
                Date of Birth
              </label>
              <input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                className="form-control"
                value={dateOfBirth}
                aria-label="Disabled input example"
                disabled
              />
            </div>
            <div className="d-flex mt-4 gap-2">
              <button className="btn btn-outline-dark" type="submit">
                Delete
              </button>
              <button
                className="btn btn-secondary"
                type="button"
                onClick={() => navigate('/hrd/view-employee')}
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

export default DeleteEmployeePage
