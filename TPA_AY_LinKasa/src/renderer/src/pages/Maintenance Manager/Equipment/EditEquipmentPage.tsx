import Sidebar from '../../../components/Maintenance Manager/Sidebar'
import Navbar from '../../../components/Navbar'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getEquipment, updateEquipment } from '@renderer/controllers/EquipmentController'

const EditEquipmentPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [equipmentData, setEquipmentData] = useState<Equipment | null>(null)

  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [status, setStatus] = useState('')

  const formRef = useRef<HTMLFormElement | null>(null)

  const resetData = () => {
    setName('')
    setType('')
    setStatus('')

    if (!formRef.current) return
    formRef.current.reset()
  }

  const fillData = () => {
    if (!equipmentData) return

    setName(equipmentData.name)
    setType(equipmentData.type)
    setStatus(equipmentData.status)
  }

  const fetchData = async () => {
    try {
      setEquipmentData(await getEquipment(id))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [id])

  useEffect(() => {
    fillData()
  }, [equipmentData])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const updatedEquipment: Equipment = {
      id: '',
      name: name,
      type: type,
      status: status
    }

    await updateEquipment(updatedEquipment, id)
    resetData()
    navigate('/mm/view-equipment')
  }

  return (
    <div className="d-flex vh-100">
      <Sidebar />
      <div className="w-100 overflow-auto">
        <Navbar />
        <div className="px-5 py-4 overflow-hidden">
          <h5 className="mt-2 mb-4 text-muted">
            Maintenance Manager
            <i className="bi bi-arrow-right mx-2"></i>
            Edit Equipment
          </h5>
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Equipment Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="type" className="form-label">
                Equipment Type
              </label>
              <input
                id="type"
                name="type"
                type="type"
                className="form-control"
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="status" className="form-label">
                Equipment Status
              </label>
              <select
                id="status"
                name="status"
                className="form-select form-select-m"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Fully operational">Fully operational</option>
                <option value="Scheduled maintenance">Scheduled maintenance</option>
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
                onClick={() => navigate('/mm/view-equipment')}
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

export default EditEquipmentPage
