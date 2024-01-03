import Sidebar from '@renderer/components/Customs and Border Control Officers/Sidebar'
import Navbar from '@renderer/components/Navbar'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { storage } from '@renderer/firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { createInspectionRecord } from '@renderer/controllers/InspectionRecordController'

const CreateInspectionRecordPage = () => {
  const navigate = useNavigate()

  const [description, setDescription] = useState('')
  const [notes, setNotes] = useState('')
  const [photograph, setPhotograph] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const [errorDescription, setErrorDescription] = useState('')
  const [errorNotes, setErrorNotes] = useState('')
  const [errorPhotograph, setErrorPhotograph] = useState('')

  const formRef = useRef<HTMLFormElement | null>(null)
  const allowedExtensions = ['jpg', 'jpeg', 'png']

  useEffect(() => {
    setErrorDescription('')
    if (description === '') setErrorDescription("Description can't be empty!")
  }, [description])

  useEffect(() => {
    setErrorNotes('')
    if (notes === '') setErrorNotes("Notes can't be empty!")
  }, [notes])

  useEffect(() => {
    setErrorPhotograph('')
    if (!photograph) setErrorPhotograph("Photograph can't be empty!")
  }, [photograph])

  const resetData = () => {
    setDescription('')
    setNotes('')
    setPhotograph(null)

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
          setPhotograph(file)
          setPreviewUrl(fileReader.result as string)
          setErrorPhotograph('')
        }

        fileReader.readAsDataURL(file)
      } else {
        setPhotograph(null)
        setPreviewUrl(null)
        setErrorPhotograph(
          "Invalid file extension. Please select a valid image file ['.jpg', '.jpeg', '.png']"
        )
      }
    } else {
      setPhotograph(null)
      setPreviewUrl(null)
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const isValid = !errorDescription && !errorNotes && !errorPhotograph

    if (!isValid) return

    if (!photograph) return

    const fileName = Date.now() + '_' + photograph.name
    const storageRef = ref(storage, 'inspectionRecordsPhoto/' + fileName)
    await uploadBytes(storageRef, photograph)
    const downloadUrl = await getDownloadURL(storageRef)

    const currentDate = new Date()
    const formattedDate = currentDate.toISOString().split('T')[0]

    const newInspectionRecord: InspectionRecord = {
      id: '',
      description: description,
      notes: notes,
      photographURL: downloadUrl,
      inspectionDate: formattedDate
    }

    await createInspectionRecord(newInspectionRecord)
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
            Create Inspection Record
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
              <label htmlFor="notes" className="form-label">
                Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                className="form-control"
                onChange={(e) => setNotes(e.target.value)}
              />
              <p className="text-danger">{errorNotes}</p>
            </div>
            <div>
              <label htmlFor="photograph" className="form-label">
                Photograph
              </label>
              <input
                id="photograph"
                name="photograph"
                type="file"
                className="form-control"
                onChange={handleFileChange}
              ></input>
              <p className="text-danger">{errorPhotograph}</p>
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
                Submit
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

export default CreateInspectionRecordPage
