import Sidebar from '@renderer/components/Check-in Staff/Sidebar'
import Navbar from '@renderer/components/Navbar'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { storage } from '@renderer/firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { getBoardingPass, updateBoardingPass } from '@renderer/controllers/BoardingPassController'
import {
  getFlightSchedules,
  updatePassengerInFlightSchedule
} from '@renderer/controllers/FlightScheduleController'

const EditBoardingPassPage = () => {
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
  const [luggagePhoto, setLuggagePhoto] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [passengerID, setPassengerID] = useState('')
  const [oldURL, setOldURL] = useState('')

  const [errorName, setErrorName] = useState('')
  const [errorFlightID, setErrorFlightID] = useState('')
  const [errorClassType, setErrorClassType] = useState('')
  const [errorSeatNumber, setErrorSeatNumber] = useState('')
  const [errorWeight, setErrorWeight] = useState('')
  const [errorDimension, setErrorDimension] = useState('')
  const [errorContent, setErrorContent] = useState('')
  const [errorLuggagePhoto, setErrorLuggagePhoto] = useState('')

  const formRef = useRef<HTMLFormElement | null>(null)
  const allowedExtensions = ['jpg', 'jpeg', 'png']

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
    setOldURL(boardingPassData.passengerData.luggage.photoURL)
  }

  useEffect(() => {
    fetchData()
  }, [id])

  useEffect(() => {
    fillData()
  }, [boardingPassData])

  useEffect(() => {
    setErrorName('')
    if (name === '') setErrorName("Passenger's name can't be empty!")
  }, [name])

  useEffect(() => {
    setErrorFlightID('')
    if (flightID === '') setErrorFlightID("Flight ID can't be empty!")
  }, [flightID])

  useEffect(() => {
    setErrorClassType('')
    if (classType === '') setErrorClassType("Flight ID can't be empty!")
  }, [classType])

  useEffect(() => {
    const seatNumberRegex = /^[0-9]{2}[A-Z]$/
    setErrorSeatNumber('')
    if (seatNumber === '') setErrorSeatNumber("Seat number can't be empty!")
    else if (!seatNumberRegex.test(seatNumber)) {
      setErrorSeatNumber('Invalid seat number format. It should be "XXY" (X: 0-9, Y: A-Z).')
    }
  }, [seatNumber])

  useEffect(() => {
    const numericRegex = /^\d+(\.\d+)?$/
    setErrorWeight('')
    if (weight === '') setErrorWeight("Luggage's weight can't be empty!")
    else if (!numericRegex.test(weight) || isNaN(parseFloat(weight))) {
      setErrorWeight('Invalid weight format. Must be a numeric value (can include decimals).')
    }
  }, [weight])

  useEffect(() => {
    const numericRegex = /^\d+(\.\d+)?$/
    setErrorDimension('')
    if (dimension === '') setErrorDimension("Luggage's dimension can't be empty!")
    else if (!numericRegex.test(dimension) || isNaN(parseFloat(dimension))) {
      setErrorDimension('Invalid dimension format. Must be a numeric value (can include decimals).')
    }
  }, [dimension])

  useEffect(() => {
    setErrorContent('')
    if (content === '') setErrorContent("Luggage's content can't be empty!")
  }, [content])

  const resetData = () => {
    setName('')
    setFlightID('')
    setClassType('')
    setSeatNumber('')
    setWeight('')
    setDimension('')
    setContent('')
    setLuggagePhoto(null)

    if (!formRef.current) return
    formRef.current.reset()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      const extension = file.name.split('.').pop()?.toLowerCase() || ''

      if (allowedExtensions.includes(extension)) {
        const fileReader = new FileReader()

        fileReader.onloadend = () => {
          setLuggagePhoto(file)
          setPreviewUrl(fileReader.result as string)
          setErrorLuggagePhoto('')
        }

        fileReader.readAsDataURL(file)
      } else {
        setLuggagePhoto(null)
        setPreviewUrl(null)
        setErrorLuggagePhoto(
          "Invalid file extension. Please select a valid image file ['.jpg', '.jpeg', '.png']"
        )
      }
    } else {
      setLuggagePhoto(null)
      setPreviewUrl(null)
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const isValid =
      !errorName &&
      !errorFlightID &&
      !errorClassType &&
      !errorSeatNumber &&
      !errorWeight &&
      !errorDimension &&
      !errorContent &&
      !errorLuggagePhoto

    if (!isValid) return

    let downloadUrl = oldURL

    if (luggagePhoto) {
      const fileName = Date.now() + '_' + luggagePhoto.name
      const storageRef = ref(storage, 'itemsPhoto/' + fileName)
      await uploadBytes(storageRef, luggagePhoto)
      downloadUrl = await getDownloadURL(storageRef)
    }

    const newLuggage: Luggage = {
      weight: weight,
      dimension: dimension,
      content: content,
      photoURL: downloadUrl
    }

    const newPassenger: Passenger = {
      id: passengerID,
      name: name,
      luggage: newLuggage,
      classType: classType,
      seatNumber: seatNumber
    }

    const newBoardingPass: BoardingPass = {
      id: '',
      passengerData: newPassenger,
      flightID: flightID
    }

    await updateBoardingPass(newBoardingPass, id)
    await updatePassengerInFlightSchedule(flightID, passengerID, newPassenger)
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
            Edit Boarding Pass
          </h5>
          <form ref={formRef} onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="form-label">
                Passenger Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <p className="text-danger">{errorName}</p>
            </div>
            <div>
              <label htmlFor="flightID" className="form-label">
                Flight ID
              </label>
              <select
                id="flightID"
                name="flightID"
                className="form-select form-select-m"
                onChange={(e) => setFlightID(e.target.value)}
                value={flightID}
              >
                <option value="">Please select one...</option>
                {flightSchedulesData &&
                  flightSchedulesData.map((flightSchedule) => (
                    <option value={flightSchedule.id}>{flightSchedule.id}</option>
                  ))}
              </select>
              <p className="text-danger">{errorFlightID}</p>
            </div>
            <div>
              <label htmlFor="classType" className="form-label">
                Class Type
              </label>
              <select
                id="classType"
                name="classType"
                className="form-select form-select-m"
                onChange={(e) => setClassType(e.target.value)}
                value={classType}
              >
                <option value="">Please select one...</option>
                <option value="Economy">Economy</option>
                <option value="Premium Economy">Premium Economy</option>
                <option value="Business">Business</option>
                <option value="First Class">First Class</option>
              </select>
              <p className="text-danger">{errorClassType}</p>
            </div>
            <div>
              <label htmlFor="seatNumber" className="form-label">
                Seat Number
              </label>
              <input
                id="seatNumber"
                name="seatNumber"
                type="text"
                className="form-control"
                onChange={(e) => setSeatNumber(e.target.value)}
                value={seatNumber}
              />
              <p className="text-danger">{errorSeatNumber}</p>
            </div>
            <div>
              <label htmlFor="weight" className="form-label">
                Luggage Weight
              </label>
              <input
                id="weight"
                name="weight"
                type="text"
                className="form-control"
                onChange={(e) => setWeight(e.target.value)}
                value={weight}
              />
              <p className="text-danger">{errorWeight}</p>
            </div>
            <div>
              <label htmlFor="dimension" className="form-label">
                Luggage Dimension
              </label>
              <input
                id="dimension"
                name="dimension"
                type="text"
                className="form-control"
                onChange={(e) => setDimension(e.target.value)}
                value={dimension}
              />
              <p className="text-danger">{errorDimension}</p>
            </div>
            <div>
              <label htmlFor="content" className="form-label">
                Luggage Content
              </label>
              <textarea
                id="content"
                name="content"
                className="form-control"
                onChange={(e) => setContent(e.target.value)}
                value={content}
              />
              <p className="text-danger">{errorContent}</p>
            </div>
            <div>
              <label htmlFor="luggagePhoto" className="form-label">
                Luggage Photo
              </label>
              <input
                id="luggagePhoto"
                name="luggagePhoto"
                type="file"
                className="form-control"
                onChange={handleFileChange}
              ></input>
              <p className="text-danger">{errorLuggagePhoto}</p>
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
                Update
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

export default EditBoardingPassPage
