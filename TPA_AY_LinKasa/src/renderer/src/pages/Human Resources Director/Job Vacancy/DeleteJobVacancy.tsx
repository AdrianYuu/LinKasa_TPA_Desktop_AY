import Navbar from '@renderer/components/Navbar'
import Sidebar from '@renderer/components/Human Resources Director/Sidebar'
import { deleteJobVacancy, getJobVacancy } from '@renderer/controllers/JobVacancyController'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const DeleteJobVacancyPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [requirement, setRequirement] = useState('')
  const [salary, setSalary] = useState('')

  const [jobVacancyData, setJobVacancyData] = useState<JobVacancy | null>(null)

  const formRef = useRef<HTMLFormElement | null>(null)

  const fillData = () => {
    if (!jobVacancyData) return

    setTitle(jobVacancyData.jobTitle)
    setDescription(jobVacancyData.jobDescription)
    setRequirement(jobVacancyData.jobRequirement)
    setSalary(jobVacancyData.jobSalary)
  }

  const fetchData = async () => {
    try {
      setJobVacancyData(await getJobVacancy(id))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [id])

  useEffect(() => {
    fillData()
  }, [jobVacancyData])

  const resetData = () => {
    setTitle('')
    setDescription('')
    setRequirement('')
    setSalary('')

    if (!formRef.current) return
    formRef.current.reset()
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    await deleteJobVacancy(id)
    resetData()
    navigate('/hrd/view-job-vacancy')
  }

  return (
    <div className="d-flex vh-100">
      <Sidebar />
      <div className="w-100 overflow-auto">
        <Navbar />
        <div className="px-5 py-4 overflow-hidden">
          <h5 className="mt-2 mb-4 text-muted">
            Human Resources Director
            <i className="bi bi-arrow-right mx-2"></i>
            Delete Job Vacancy
          </h5>
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="jobTitle" className="form-label">
                Job Title
              </label>
              <input
                id="jobTitle"
                name="jobTitle"
                type="text"
                className="form-control"
                placeholder="ex: Lost and Found Staff"
                value={title}
                disabled
              />
            </div>
            <div className="mb-3">
              <label htmlFor="jobDescription" className="form-label">
                Description
              </label>
              <textarea
                id="jobDescription"
                name="jobDescription"
                className="form-control"
                placeholder="ex: Manage lost and found items"
                value={description}
                disabled
              />
            </div>
            <div className="mb-3">
              <label htmlFor="jobSalary" className="form-label">
                Salary
              </label>
              <input
                id="jobSalary"
                name="jobSalary"
                className="form-control"
                placeholder="ex: 5000"
                value={salary}
                disabled
              />
            </div>
            <div className="mb-3">
              <label htmlFor="jobRequirement" className="form-label">
                Requirement
              </label>
              <textarea
                id="jobRequirement"
                name="jobRequirement"
                className="form-control"
                placeholder="ex: Have a degree"
                value={requirement}
                disabled
              />
            </div>
            <div className="d-flex mt-4 gap-2">
              <button className="btn btn-outline-dark" type="submit">
                Delete
              </button>
              <button
                className="btn btn-secondary"
                type="button"
                onClick={() => navigate('/hrd/view-job-vacancy')}
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

export default DeleteJobVacancyPage
