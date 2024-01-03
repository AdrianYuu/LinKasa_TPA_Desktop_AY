import Sidebar from '@renderer/components/Check-in Staff/Sidebar'
import Navbar from '@renderer/components/Navbar'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteBoardingPass, getBoardingPass } from '@renderer/controllers/BoardingPassController'
import {
  deletePassengerFromFlightSchedule,
  getFlightSchedules
} from '@renderer/controllers/FlightScheduleController'

const DeleteBoardingPassPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [boardingPassData, setBoardingPassData] = useState<BoardingPass | null>(null)

  const [flightSchedulesData, setFlightSchedulesData] = useState<FlightSchedule[] | null>(null)

  const [name, setName] = useState('')
  const [flightID, setFlightID] = useState('')
  const [classType, setClassType] = useState('')
  const [seatNumber, setSeatNumber] = useState('')
  const [weight, setWeight] = useState('')
  const [dimension, setDimension] = useState('')
  const [content, setContent] = useState('')
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [passengerID, setPassengerID] = useState('')

  const formRef = useRef<HTMLFormElement | null>(null)

  const fetchData = async () => {
    try {
      setBoardingPassData(await getBoardingPass(id))
      setFlightSchedulesData(await getFlightSchedules())
    } catch (error) {
      console.log(error)
    }
  }

  const fillData = () => {
    if (!boardingPassData) return
    setName(boardingPassData.passengerData.name)
    setFlightID(boardingPassData.flightID)
    setClassType(boardingPassData.passengerData.classType)
    setSeatNumber(boardingPassData.passengerData.seatNumber)
    setWeight(boardingPassData.passengerData.luggage.weight)
    setDimension(boardingPassData.passengerData.luggage.dimension)
    setContent(boardingPassData.passengerData.luggage.content)
    setPreviewUrl(boardingPassData.passengerData.luggage.photoURL)
    setPassengerID(boardingPassData.passengerData.id)
  }

  useEffect(() => {
    fetchData()
  }, [id])

  useEffect(() => {
    fillData()
  }, [boardingPassData])

  const resetData = () => {
    setName('')
    setFlightID('')
    setClassType('')
    setSeatNumber('')
    setWeight('')
    setDimension('')
    setContent('')

    if (!formRef.current) return
    formRef.current.reset()
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    await deleteBoardingPass(id)
    await deletePassengerFromFlightSchedule(flightID, passengerID)
    resetData()
    navigate('/cis/view-boarding-pass')
  }

  return (
    <div className="d-flex vh-100">
      <Sidebar />
      <div className="w-100 overflow-auto">
        <Navbar />
        <div className="px-5 py-4 overflow-hidden">
          <h5 className="mt-2 mb-4 text-muted">
            Check-in Staff
            <i className="bi bi-arrow-right mx-2"></i>
            Delete Boarding Pass
          </h5>
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Passenger Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="form-control"
                value={name}
                disabled
              />
            </div>
            <div className="mb-3">
              <label htmlFor="flightID" className="form-label">
                Flight ID
              </label>
              <select
                id="flightID"
                name="flightID"
                className="form-select form-select-m"
                value={flightID}
                disabled
              >
                <option value="">Please select one...</option>
                {flightSchedulesData &&
                  flightSchedulesData.map((flightSchedule) => (
                    <option value={flightSchedule.id}>{flightSchedule.id}</option>
                  ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="classType" className="form-label">
                Class Type
              </label>
              <select
                id="classType"
                name="classType"
                className="form-select form-select-m"
                value={classType}
                disabled
              >
                <option value="">Please select one...</option>
                <option value="Economy">Economy</option>
                <option value="Premium Economy">Premium Economy</option>
                <option value="Business">Business</option>
                <option value="First Class">First Class</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="seatNumber" className="form-label">
                Seat Number
              </label>
              <input
                id="seatNumber"
                name="seatNumber"
                type="text"
                className="form-control"
                value={seatNumber}
                disabled
              />
            </div>
            <div className="mb-3">
              <label htmlFor="weight" className="form-label">
                Luggage Weight
              </label>
              <input
                id="weight"
                name="weight"
                type="text"
                className="form-control"
                value={weight}
                disabled
              />
            </div>
            <div className="mb-3">
              <label htmlFor="dimension" className="form-label">
                Luggage Dimension
              </label>
              <input
                id="dimension"
                name="dimension"
                type="text"
                className="form-control"
                value={dimension}
                disabled
              />
            </div>
            <div className="mb-3">
              <label htmlFor="content" className="form-label">
                Luggage Content
              </label>
              <textarea
                id="content"
                name="content"
                className="form-control"
                value={content}
                disabled
              />
            </div>
            <div className="mb-3">
              <label htmlFor="luggagePhoto" className="form-label">
                Luggage Photo
              </label>
              <input
                id="luggagePhoto"
                name="luggagePhoto"
                type="file"
                className="form-control"
                disabled
              ></input>
            </div>
            {previewUrl && (
              <div className="card border-0 shadow-sm mt-3">
                <img src={previewUrl} alt="Preview" className="card-img-top img-fluid rounded" />
                <div className="card-body text-center">
                  <h5 className="card-title">Luggage Photo Preview</h5>
                </div>
              </div>
            )}
            <div className="d-flex mt-4 gap-2">
              <button className="btn btn-outline-dark" type="submit">
                Delete
              </button>
              <button
                className="btn btn-secondary"
                type="button"
                onClick={() => navigate('/cis/view-boarding-pass')}
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

export default DeleteBoardingPassPage
