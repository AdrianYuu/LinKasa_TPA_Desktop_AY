import Navbar from '@renderer/components/Navbar'
import Sidebar from '@renderer/components/Customs and Border Control Officers/Sidebar'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  deleteCustomDeclaration,
  getCustomDeclaration
} from '@renderer/controllers/CustomDeclarationController'

const DeleteCustomDeclarationPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const [customDeclarationData, setCustomDeclarationData] = useState<CustomDeclaration | null>(null)

  const [passengerName, setPassengerName] = useState('')
  const [passportNumber, setPassportNumber] = useState('')
  const [visaNumber, setVisaNumber] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [nationality, setNationality] = useState('')
  const [purposeOfVisit, setPurposeOfVisit] = useState('')
  const [itinerary, setItinerary] = useState('')

  const formRef = useRef<HTMLFormElement | null>(null)

  const fillData = () => {
    if (!customDeclarationData) return

    setPassengerName(customDeclarationData.passengerName)
    setPassportNumber(customDeclarationData.passportNumber)
    setVisaNumber(customDeclarationData.visaNumber)
    setPhoneNumber(customDeclarationData.phoneNumber)
    setDateOfBirth(customDeclarationData.dateOfBirth)
    setNationality(customDeclarationData.nationality)
    setPurposeOfVisit(customDeclarationData.purposeOfVisit)
    setItinerary(customDeclarationData.itinerary)
  }

  const fetchData = async () => {
    try {
      setCustomDeclarationData(await getCustomDeclaration(id))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [id])

  useEffect(() => {
    fillData()
  }, [customDeclarationData])

  const resetData = () => {
    setPassengerName('')
    setPassportNumber('')
    setVisaNumber('')
    setPhoneNumber('')
    setDateOfBirth('')
    setNationality('')
    setPurposeOfVisit('')
    setItinerary('')

    if (!formRef.current) return
    formRef.current.reset()
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    await deleteCustomDeclaration(id)
    resetData()
    navigate('/cabco/view-custom-declaration')
  }

  return (
    <div className="d-flex vh-100">
      <Sidebar />
      <div className="w-100 overflow-auto">
        <Navbar />
        <div className="px-5 py-4 overflow-hidden">
          <h5 className="mt-2 mb-4 text-muted">
            Customs and Border Control Officers
            <i className="bi bi-arrow-right mx-2"></i>
            Delete Custom Declaration
          </h5>
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="passengerName" className="form-label">
                Passenger Name
              </label>
              <input
                id="passengerName"
                name="passengerName"
                type="text"
                className="form-control"
                value={passengerName}
                disabled
              />
            </div>
            <div className="mb-3">
              <label htmlFor="passportNumber" className="form-label">
                Passport Number
              </label>
              <input
                id="passportNumber"
                name="passportNumber"
                type="text"
                className="form-control"
                value={passportNumber}
                disabled
              />
            </div>
            <div className="mb-3">
              <label htmlFor="visaNumber" className="form-label">
                Visa Number
              </label>
              <input
                id="visaNumber"
                name="visaNumber"
                type="text"
                className="form-control"
                value={visaNumber}
                disabled
              />
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
                disabled
              />
            </div>
            <div className="mb-3">
              <label htmlFor="dob" className="form-label">
                Date of Birth
              </label>
              <input
                id="dob"
                name="dob"
                type="date"
                className="form-control"
                value={dateOfBirth}
                disabled
              />
            </div>
            <div className="mb-3">
              <label htmlFor="nationality" className="form-label">
                Nationality
              </label>
              <select
                id="nationality"
                name="nationality"
                className="form-select form-select-m"
                value={nationality}
                disabled
              >
                <option value="">Please select one...</option>
                <option value="United States">United States</option>
                <option value="China">China</option>
                <option value="India">India</option>
                <option value="Brazil">Brazil</option>
                <option value="Russia">Russia</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="France">France</option>
                <option value="Germany">Germany</option>
                <option value="Japan">Japan</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
                <option value="South Africa">South Africa</option>
                <option value="Mexico">Mexico</option>
                <option value="Italy">Italy</option>
                <option value="Spain">Spain</option>
                <option value="Argentina">Argentina</option>
                <option value="Saudi Arabia">Saudi Arabia</option>
                <option value="United Arab Emirates">United Arab Emirates</option>
                <option value="South Korea">South Korea</option>
                <option value="Singapore">Singapore</option>
                <option value="Netherlands">Netherlands</option>
                <option value="Switzerland">Switzerland</option>
                <option value="Sweden">Sweden</option>
                <option value="New Zealand">New Zealand</option>
                <option value="Norway">Norway</option>
                <option value="Denmark">Denmark</option>
                <option value="Ireland">Ireland</option>
                <option value="Greece">Greece</option>
                <option value="Thailand">Thailand</option>
                <option value="Indonesia">Indonesia</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="purposeOfVisit" className="form-label">
                Purpose of Visit
              </label>
              <textarea
                id="dob"
                name="dob"
                className="form-control"
                value={purposeOfVisit}
                disabled
              />
            </div>
            <div className="mb-3">
              <label htmlFor="itinerary" className="form-label">
                Itinerary
              </label>
              <textarea
                id="itinerary"
                name="itinerary"
                className="form-control"
                value={itinerary}
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
                onClick={() => navigate('/cabco/view-custom-declaration')}
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

export default DeleteCustomDeclarationPage
