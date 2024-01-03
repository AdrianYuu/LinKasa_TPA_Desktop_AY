import Sidebar from '../../../components/Human Resources Director/Sidebar'
import Navbar from '../../../components/Navbar'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { checkPersonalEmailUnique, getCurrentUser } from '@renderer/controllers/AuthController'
import { createEmployee } from '@renderer/controllers/EmployeeController'
import { useNavigate } from 'react-router-dom'
import { auth } from '@renderer/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import UserFacade from '@renderer/facade/UserFacade'

const CreateEmployeePage = () => {
  const navigate = useNavigate()
  const uf = UserFacade.getInstance()

  const [fullName, setFullName] = useState('')
  const [gender, setGender] = useState('')
  const [personalEmail, setPersonalEmail] = useState('')
  const [role, setRole] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')

  const [errorFullName, setErrorFullName] = useState('')
  const [errorGender, setErrorGender] = useState('')
  const [errorPersonalEmail, setErrorPersonalEmail] = useState('')
  const [errorRole, setErrorRole] = useState('')
  const [errorPhoneNumber, setErrorPhoneNumber] = useState('')
  const [errorDateOfBirth, setErrorDateOfBirth] = useState('')

  const formRef = useRef<HTMLFormElement | null>(null)

  const resetData = () => {
    setFullName('')
    setGender('')
    setPersonalEmail('')
    setRole('')
    setPhoneNumber('')
    setDateOfBirth('')

    if (!formRef.current) return
    formRef.current.reset()
  }

  const validatePersonalEmail = async () => {
    setErrorPersonalEmail('')
    if (personalEmail === '') setErrorPersonalEmail("Personal email can't be empty!")
    else if (!personalEmail.endsWith('@gmail.com'))
      setErrorPersonalEmail("Personal email must end with '@gmail.com'!")
    else if (!(await checkPersonalEmailUnique(personalEmail)))
      setErrorPersonalEmail('Personal email must be unique!')
  }

  useEffect(() => {
    setErrorFullName('')
    if (fullName === '') setErrorFullName("Full name can't be empty!")
  }, [fullName])

  useEffect(() => {
    setErrorGender('')
    if (gender === '') setErrorGender("Gender can't be empty!")
  }, [gender])

  useEffect(() => {
    validatePersonalEmail()
  }, [personalEmail])

  useEffect(() => {
    setErrorRole('')
    if (role === '') setErrorRole("Role can't be empty!")
  }, [role])

  useEffect(() => {
    setErrorPhoneNumber('')
    if (phoneNumber === '') setErrorPhoneNumber("Phone number can't be empty!")
    else if (!/^\d+$/.test(phoneNumber)) setErrorPhoneNumber('Phone number must be numeric!')
    else if (phoneNumber.length < 10)
      setErrorPhoneNumber('Phone number length must be equals to 10 or more!')
  }, [phoneNumber])

  useEffect(() => {
    setErrorDateOfBirth('')
    if (dateOfBirth === '') setErrorDateOfBirth("Date of birth can't be empty!")
    else if (uf.getAge(dateOfBirth) <= 17) setErrorDateOfBirth('Age must be over 17 years old!')
  }, [dateOfBirth])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const isValid =
      !errorFullName &&
      !errorGender &&
      !errorPersonalEmail &&
      !errorRole &&
      !errorPhoneNumber &&
      !errorDateOfBirth

    if (!isValid) return

    const generatedWorkEmail = await uf.generateWorkEmail(fullName)
    const generatedPassword = uf.generatePassword(dateOfBirth, fullName)

    const currentUser = await getCurrentUser()
    if (!currentUser) return

    const currentEmail = currentUser.workEmail
    const currentPassword = currentUser.password

    await createUserWithEmailAndPassword(auth, generatedWorkEmail, generatedPassword)

    const newUID = auth.currentUser?.uid
    if (!newUID) return

    const newEmployee: Employee = {
      id: '',
      uid: newUID,
      fullName: fullName,
      gender: gender,
      personalEmail: personalEmail,
      role: role,
      phoneNumber: phoneNumber,
      dateOfBirth: dateOfBirth,
      workEmail: generatedWorkEmail,
      password: generatedPassword
    }

    // Login ulang karena createUser auto login dengan creds baru.
    await signInWithEmailAndPassword(auth, currentEmail, currentPassword)
    await createEmployee(newEmployee)

    resetData()
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
            Create Employee
          </h5>
          <form ref={formRef} onSubmit={handleSubmit}>
            <div>
              <label htmlFor="fullName" className="form-label">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                className="form-control"
                placeholder="ex: Adrian Yu"
                onChange={(e) => setFullName(e.target.value)}
              />
              <p className="text-danger">{errorFullName}</p>
            </div>
            <div>
              <label htmlFor="gender" className="form-label">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                className="form-select form-select-m"
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Please select one...</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <p className="text-danger">{errorGender}</p>
            </div>
            <div>
              <label htmlFor="personalEmail" className="form-label">
                Personal Email
              </label>
              <input
                id="personalEmail"
                name="personalEmail"
                type="text"
                className="form-control"
                placeholder="ex: adrianyu@gmail.com"
                onChange={(e) => setPersonalEmail(e.target.value)}
              />
              <p className="text-danger">{errorPersonalEmail}</p>
            </div>
            <div>
              <label htmlFor="role" className="form-label">
                Role
              </label>
              <select
                id="role"
                name="role"
                className="form-select form-select-m"
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Please select one...</option>
                <option value="Customer Service Manager">Customer Service Manager</option>
                <option value="Information Desk Staff">Information Desk Staff</option>
                <option value="Lost and Found Staff">Lost and Found Staff</option>
                <option value="Check-in Staff">Check-in Staff</option>
                <option value="Gate Agents">Gate Agents</option>
                <option value="Airport Operations Manager">Airport Operations Manager</option>
                <option value="Flight Operations Manager">Flight Operations Manager</option>
                <option value="Ground Handling Manager">Ground Handling Manager</option>
                <option value="Ground Handling Staff">Ground Handling Staff</option>
                <option value="Landside Operations Manager">Landside Operations Manager</option>
                <option value="Landside Operations Staff">Landside Operations Staff</option>
                <option value="Maintenance Manager">Maintenance Manager</option>
                <option value="Maintenance Staff">Maintenance Staff</option>
                <option value="Customs and Border Control Officers">
                  Customs and Border Control Officers
                </option>
                <option value="Baggage Security Supervisor">Baggage Security Supervisor</option>
                <option value="Baggage Security Staff">Baggage Security Staff</option>
                <option value="Cargo Manager">Cargo Manager</option>
                <option value="Logistics Manager">Logistics Manager</option>
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
              <p className="text-danger">{errorRole}</p>
            </div>
            <div>
              <label htmlFor="phoneNumber" className="form-label">
                Phone Number
              </label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                className="form-control"
                placeholder="ex: 08123456789"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <p className="text-danger">{errorPhoneNumber}</p>
            </div>
            <div>
              <label htmlFor="dateOfBirth" className="form-label">
                Date of Birth
              </label>
              <input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                className="form-control"
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
              <p className="text-danger">{errorDateOfBirth}</p>
            </div>
            <div className="d-flex mt-4 gap-2">
              <button className="btn btn-outline-dark" type="submit">
                Submit
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

export default CreateEmployeePage
