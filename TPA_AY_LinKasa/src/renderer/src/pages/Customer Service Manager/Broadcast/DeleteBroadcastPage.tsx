import Sidebar from '@renderer/components/Customer Service Manager/Sidebar'
import Navbar from '@renderer/components/Navbar'
import { deleteBroadcast, getBroadcast } from '@renderer/controllers/BroadcastController'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const DeleteBroadcastPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [broadcastData, setBroadcastData] = useState<Broadcast | null>(null)

  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [priorityLevel, setPriorityLevel] = useState('')

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
  }

  useEffect(() => {
    fetchData()
  }, [id])

  useEffect(() => {
    fillData()
  }, [broadcastData])

  const resetData = () => {
    setTitle('')
    setMessage('')
    setPriorityLevel('')

    if (!formRef.current) return
    formRef.current.reset()
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    await deleteBroadcast(id)
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
            Delete Broadcast
          </h5>
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Broadcast Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                className="form-control"
                value={title}
                disabled
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                className="form-control"
                value={message}
                disabled
              />
            </div>
            <div className="mb-3">
              <label htmlFor="priorityLevel" className="form-label">
                Priority Level
              </label>
              <select
                id="priorityLevel"
                name="priorityLevel"
                className="form-select form-select-m"
                value={priorityLevel}
                disabled
              >
                <option value="">Please select one...</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div className="d-flex mt-4 gap-2">
              <button className="btn btn-outline-dark" type="submit">
                Delete
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

export default DeleteBroadcastPage
