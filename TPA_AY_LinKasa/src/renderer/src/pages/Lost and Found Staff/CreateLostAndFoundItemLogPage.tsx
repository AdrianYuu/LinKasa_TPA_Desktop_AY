import Sidebar from '@renderer/components/Lost and Found Staff/Sidebar'
import Navbar from '@renderer/components/Navbar'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createLog } from '@renderer/controllers/LostAndFoundItemLogController'
import { storage } from '@renderer/firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

const CreateLostAndFoundItemLog = () => {
  const navigate = useNavigate()

  const [description, setDescription] = useState('')
  const [time, setTime] = useState('')
  const [date, setDate] = useState('')
  const [founderName, setFounderName] = useState('')
  const [status, setStatus] = useState('')
  const [itemPhoto, setItemPhoto] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const [errorDescription, setErrorDescription] = useState('')
  const [errorTime, setErrorTime] = useState('')
  const [errorDate, setErrorDate] = useState('')
  const [errorFounderName, setErrorFounderName] = useState('')
  const [errorStatus, setErrorStatus] = useState('')
  const [errorItemPhoto, setErrorItemPhoto] = useState('')

  const formRef = useRef<HTMLFormElement | null>(null)
  const allowedExtensions = ['jpg', 'jpeg', 'png']

  useEffect(() => {
    setErrorDescription('')
    if (description.length === 0) setErrorDescription("Description can't be empty!")
  }, [description])

  useEffect(() => {
    setErrorTime('')
    if (time === '') {
      setErrorTime("Time can't be empty!")
    } else {
      const selectedDateTime = new Date(`${date} ${time}`)
      const currentDateTime = new Date()

      if (selectedDateTime >= currentDateTime) {
        setErrorTime('Selected date and time must be in the past!')
      }
    }
  }, [time, date])

  useEffect(() => {
    setErrorDate('')
    if (date === '') {
      setErrorDate("Date can't be empty!")
    } else {
      const selectedDateTime = new Date(`${date} ${time}`)
      const currentDateTime = new Date()

      if (selectedDateTime >= currentDateTime) {
        setErrorDate('Selected date and time must be in the past!')
      }
    }
  }, [date, time])

  useEffect(() => {
    setErrorFounderName('')
    if (founderName === '') setErrorFounderName("Founder name can't be empty!")
  }, [founderName])

  useEffect(() => {
    setErrorStatus('')
    if (status === '') setErrorStatus("Status can't be empty!")
  }, [status])

  useEffect(() => {
    setErrorItemPhoto('')
    if (!itemPhoto) setErrorItemPhoto("Item photo can't be empty!")
  }, [itemPhoto])

  const resetData = () => {
    setDescription('')
    setTime('')
    setDate('')
    setFounderName('')
    setStatus('')
    setItemPhoto(null)

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
          setItemPhoto(file)
          setPreviewUrl(fileReader.result as string)
          setErrorItemPhoto('')
        }

        fileReader.readAsDataURL(file)
      } else {
        setItemPhoto(null)
        setPreviewUrl(null)
        setErrorItemPhoto(
          "Invalid file extension. Please select a valid image file ['.jpg', '.jpeg', '.png']"
        )
      }
    } else {
      setItemPhoto(null)
      setPreviewUrl(null)
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const isValid =
      !errorDescription &&
      !errorTime &&
      !errorDate &&
      !errorFounderName &&
      !errorItemPhoto &&
      !errorStatus

    if (!isValid) return

    if (!itemPhoto) return

    const fileName = Date.now() + '_' + itemPhoto.name
    const storageRef = ref(storage, 'itemsPhoto/' + fileName)
    await uploadBytes(storageRef, itemPhoto)
    const downloadUrl = await getDownloadURL(storageRef)

    const newLog: LostAndFoundItemLog = {
      id: '',
      description: description,
      time: time,
      date: date,
      founderName: founderName,
      status: status,
      itemPhotoURL: downloadUrl
    }

    await createLog(newLog)
    resetData()
    navigate('/laf/view-laf-item-log')
  }

  return (
    <div className="d-flex vh-100">
      <Sidebar />
      <div className="w-100 overflow-auto">
        <Navbar />
        <div className="px-5 py-4 overflow-hidden">
          <h5 className="mt-2 mb-4 text-muted">
            Lost and Found
            <i className="bi bi-arrow-right mx-2"></i>
            Create Lost and Found Item Log
          </h5>
          <form ref={formRef} onSubmit={handleSubmit}>
            <div>
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                className="form-control"
                onChange={(e) => setDescription(e.target.value)}
              />
              <p className="text-danger">{errorDescription}</p>
            </div>
            <div>
              <label htmlFor="date" className="form-label">
                Date
              </label>
              <input
                id="date"
                name="date"
                type="date"
                className="form-control"
                onChange={(e) => setDate(e.target.value)}
                value={date}
              />
              <p className="text-danger">{errorDate}</p>
            </div>
            <div>
              <label htmlFor="time" className="form-label">
                Time
              </label>
              <input
                id="time"
                name="time"
                type="time"
                className="form-control"
                onChange={(e) => setTime(e.target.value)}
              />
              <p className="text-danger">{errorTime}</p>
            </div>
            <div>
              <label htmlFor="founderName" className="form-label">
                Founder Name
              </label>
              <input
                id="founderName"
                name="founderName"
                type="text"
                className="form-control"
                onChange={(e) => setFounderName(e.target.value)}
              />
              <p className="text-danger">{errorFounderName}</p>
            </div>
            <div>
              <label htmlFor="status" className="form-label">
                Status
              </label>
              <select
                id="status"
                name="status"
                className="form-select form-select-m"
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Please select one...</option>
                <option value="Unclaimed">Unclaimed</option>
                <option value="Returned">Returned</option>
              </select>
              <p className="text-danger">{errorStatus}</p>
            </div>
            <div>
              <label htmlFor="itemPhoto" className="form-label">
                Item Photo
              </label>
              <input
                id="itemPhoto"
                name="itemPhoto"
                type="file"
                className="form-control"
                onChange={handleFileChange}
              ></input>
              <p className="text-danger">{errorItemPhoto}</p>
            </div>
            {previewUrl && (
              <div className="card border-0 shadow-sm mt-3">
                <img src={previewUrl} alt="Preview" className="card-img-top img-fluid rounded" />
                <div className="card-body text-center">
                  <h5 className="card-title">Item Photo Preview</h5>
                </div>
              </div>
            )}
            <div className="d-flex mt-4 gap-2">
              <button className="btn btn-outline-dark" type="submit">
                Submit
              </button>
              <button
                className="btn btn-secondary"
                type="button"
                onClick={() => navigate('/laf/view-laf-item-log')}
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

export default CreateLostAndFoundItemLog
