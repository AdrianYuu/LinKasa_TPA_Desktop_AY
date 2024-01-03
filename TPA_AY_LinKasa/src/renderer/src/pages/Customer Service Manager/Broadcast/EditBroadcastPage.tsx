import Sidebar from '@renderer/components/Customer Service Manager/Sidebar'
import Navbar from '@renderer/components/Navbar'
import { getBroadcast, updateBroadcast } from '@renderer/controllers/BroadcastController'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditBroadcastPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [broadcastData, setBroadcastData] = useState<Broadcast | null>(null)

  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [priorityLevel, setPriorityLevel] = useState('')
  const [senderID, setSenderID] = useState('')

  const [errorTitle, setErrorTitle] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [errorPriorityLevel, setErrorPriorityLevel] = useState('')

  const formRef = useRef<HTMLFormElement | null>(null)

  const fetchData = async () => {
    try {
      setBroadcastData(await getBroadcast(id))
    } catch (error) {
      console.log(error)
    }
  }

  const fillData = () => {
    if (!broadcastData) return

    setTitle(broadcastData.title)
    setMessage(broadcastData.message)
    setPriorityLevel(broadcastData.priorityLevel)
    setSenderID(broadcastData.senderID)
  }

  useEffect(() => {
    fetchData()
  }, [id])

  useEffect(() => {
    fillData()
  }, [broadcastData])

  useEffect(() => {
    setErrorTitle('')
    if (title === '') setErrorTitle("Title can't be empty!")
  }, [title])

  useEffect(() => {
    setErrorMessage('')
    if (message === '') setErrorMessage("Message can't be empty!")
  }, [message])

  useEffect(() => {
    setErrorPriorityLevel('')
    if (priorityLevel === '') setErrorPriorityLevel("Priority level can't be empty!")
  }, [priorityLevel])

  const resetData = () => {
    setTitle('')
    setMessage('')
    setPriorityLevel('')

    if (!formRef.current) return
    formRef.current.reset()
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const isValid = !errorTitle && !errorMessage && !errorPriorityLevel

    if (!isValid) return

    const date = new Date()

    const addLeadingZero = (number: number) => (number < 10 ? `0${number}` : number)

    const currentTime =
      date.toLocaleDateString('id-ID', { hour12: false }) +
      ' ' +
      addLeadingZero(date.getHours()) +
      ':' +
      addLeadingZero(date.getMinutes())

    const newBroadcast: Broadcast = {
      id: '',
      senderID: senderID,
      title: title,
      message: message,
      priorityLevel: priorityLevel,
      simpleTime: currentTime,
      date: date.toString()
    }

    await updateBroadcast(newBroadcast, id)
    resetData()
    navigate('/csm/view-broadcast')
  }

  return (
    <div className="d-flex vh-100">
      <Sidebar />
      <div className="w-100 overflow-auto">
        <Navbar />
        <div className="px-5 py-4 overflow-hidden">
          <h5 className="mt-2 mb-4 text-muted">
            Customer Service Manager
            <i className="bi bi-arrow-right mx-2"></i>
            Edit Broadcast
          </h5>
          <form ref={formRef} onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title" className="form-label">
                Broadcast Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                className="form-control"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
              <p className="text-danger">{errorTitle}</p>
            </div>
            <div>
              <label htmlFor="message" className="form-label">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                className="form-control"
                onChange={(e) => setMessage(e.target.value)}
                value={message}
              />
              <p className="text-danger">{errorMessage}</p>
            </div>
            <div>
              <label htmlFor="priorityLevel" className="form-label">
                Priority Level
              </label>
              <select
                id="priorityLevel"
                name="priorityLevel"
                className="form-select form-select-m"
                onChange={(e) => setPriorityLevel(e.target.value)}
                value={priorityLevel}
              >
                <option value="">Please select one...</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              <p className="text-danger">{errorPriorityLevel}</p>
            </div>
            <div className="d-flex mt-4 gap-2">
              <button className="btn btn-outline-dark" type="submit">
                Update
              </button>
              <button
                className="btn btn-secondary"
                type="button"
                onClick={() => navigate('/csm/view-broadcast')}
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

export default EditBroadcastPage
