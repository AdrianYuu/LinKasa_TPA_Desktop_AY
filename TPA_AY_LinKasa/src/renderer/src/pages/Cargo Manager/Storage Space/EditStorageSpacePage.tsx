import Sidebar from '../../../components/Cargo Manager/Sidebar'
import Navbar from '../../../components/Navbar'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getStorageSpace, updateStorageSpace } from '@renderer/controllers/StorageSpaceController'

const EditStorageSpacePage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [storageSpaceData, setStorageSpaceData] = useState<StorageSpace | null>(null)

  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [status, setStatus] = useState('')

  const formRef = useRef<HTMLFormElement | null>(null)

  const resetData = () => {
    setName('')
    setLocation('')
    setStatus('')

    if (!formRef.current) return
    formRef.current.reset()
  }

  const fillData = () => {
    if (!storageSpaceData) return

    setName(storageSpaceData.name)
    setLocation(storageSpaceData.location)
    setStatus(storageSpaceData.status)
  }

  const fetchData = async () => {
    try {
      setStorageSpaceData(await getStorageSpace(id))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [id])

  useEffect(() => {
    fillData()
  }, [storageSpaceData])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const updatedStorageSpace: StorageSpace = {
      id: '',
      name: name,
      location: location,
      status: status
    }

    await updateStorageSpace(updatedStorageSpace, id)
    resetData()
    navigate('/cm/view-storage-space')
  }

  return (
    <div className="d-flex vh-100">
      <Sidebar />
      <div className="w-100 overflow-auto">
        <Navbar />
        <div className="px-5 py-4 overflow-hidden">
          <h5 className="mt-2 mb-4 text-muted">
            Cargo Manager
            <i className="bi bi-arrow-right mx-2"></i>
            Edit Storage Space
          </h5>
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Storage Name
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
              <label htmlFor="type" className="form-label">
                Storage Location
              </label>
              <input
                id="type"
                name="type"
                type="type"
                className="form-control"
                value={location}
                disabled
              />
            </div>
            <div className="mb-3">
              <label htmlFor="status" className="form-label">
                Storage Status
              </label>
              <select
                id="status"
                name="status"
                className="form-select form-select-m"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Available">Available</option>
                <option value="Not available">Not available</option>
                <option value="Under maintenance">Under maintenance</option>
              </select>
            </div>
            <div className="d-flex mt-4 gap-2">
              <button className="btn btn-outline-dark" type="submit">
                Update
              </button>
              <button
                className="btn btn-secondary"
                type="button"
                onClick={() => navigate('/cm/view-storage-space')}
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

export default EditStorageSpacePage
