import Sidebar from '@renderer/components/Customer Service Manager/Sidebar'
import Navbar from '@renderer/components/Navbar'
import { getCurrentUser } from '@renderer/controllers/AuthController'
import { createBroadcast } from '@renderer/controllers/BroadcastController'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CreateBroadcatPage = () => {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [priorityLevel, setPriorityLevel] = useState('')
  const [currentUser, setCurrentUser] = useState<Employee | null>(null)

  const [errorTitle, setErrorTitle] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [errorPriorityLevel, setErrorPriorityLevel] = useState('')

  const formRef = useRef<HTMLFormElement | null>(null)

  const getCurrentUserLogin = async () => {
    try {
      setCurrentUser(await getCurrentUser())
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCurrentUserLogin()
  }, [])

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

    if (!currentUser) return

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
      senderID: currentUser?.id,
      title: title,
      message: message,
      priorityLevel: priorityLevel,
      simpleTime: currentTime,
      date: date.toString()
    }

    await createBroadcast(newBroadcast)
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
            Create Broadcast
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
                Submit
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

export default CreateBroadcatPage
