import Sidebar from '@renderer/components/Customs and Border Control Officers/Sidebar'
import Navbar from '@renderer/components/Navbar'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  deleteInspectionRecord,
  getInspectionRecord
} from '@renderer/controllers/InspectionRecordController'

const DeleteInspectionRecordPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [inspectionRecordData, setInspectionRecordData] = useState<InspectionRecord | null>(null)

  const [description, setDescription] = useState('')
  const [notes, setNotes] = useState('')
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const formRef = useRef<HTMLFormElement | null>(null)

  const fetchData = async () => {
    try {
      setInspectionRecordData(await getInspectionRecord(id))
    } catch (error) {
      console.log(error)
    }
  }

  const fillData = () => {
    if (!inspectionRecordData) return
    setDescription(inspectionRecordData.description)
    setNotes(inspectionRecordData.notes)
    setPreviewUrl(inspectionRecordData.photographURL)
  }

  useEffect(() => {
    fetchData()
  }, [id])

  useEffect(() => {
    fillData()
  }, [inspectionRecordData])

  const resetData = () => {
    setDescription('')
    setNotes('')

    if (!formRef.current) return
    formRef.current.reset()
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    await deleteInspectionRecord(id)
    resetData()
    navigate('/cabco/view-inspection-record')
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
            Delete Inspection Record
          </h5>
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                className="form-control"
                value={description}
                disabled
              />
            </div>
            <div className="mb-3">
              <label htmlFor="notes" className="form-label">
                Notes
              </label>
              <textarea id="notes" name="notes" className="form-control" value={notes} disabled />
            </div>
            <div className="mb-3">
              <label htmlFor="photograph" className="form-label">
                Photograph
              </label>
              <input
                id="photograph"
                name="photograph"
                type="file"
                className="form-control"
                disabled
              ></input>
            </div>
            {previewUrl && (
              <div className="card border-0 shadow-sm mt-3">
                <img src={previewUrl} alt="Preview" className="card-img-top img-fluid rounded" />
                <div className="card-body text-center">
                  <h5 className="card-title">Photograph Preview</h5>
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
                onClick={() => navigate('/cabco/view-inspection-record')}
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

export default DeleteInspectionRecordPage
