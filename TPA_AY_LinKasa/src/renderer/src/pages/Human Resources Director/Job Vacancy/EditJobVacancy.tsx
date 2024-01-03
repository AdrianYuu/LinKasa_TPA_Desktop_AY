import Navbar from '@renderer/components/Navbar'
import Sidebar from '@renderer/components/Human Resources Director/Sidebar'
import { getJobVacancy, updateJobVacancy } from '@renderer/controllers/JobVacancyController'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditJobVacancyPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [requirement, setRequirement] = useState('')
  const [salary, setSalary] = useState('')

  const [jobVacancyData, setJobVacancyData] = useState<JobVacancy | null>(null)

  const [errorTitle, setErrorTitle] = useState('')
  const [errorDescription, setErrorDescription] = useState('')
  const [errorRequirement, setErrorRequirement] = useState('')
  const [errorSalary, setErrorSalary] = useState('')

  const formRef = useRef<HTMLFormElement | null>(null)

  const fillData = () => {
    if (!jobVacancyData) return

    setTitle(jobVacancyData.jobTitle)
    setDescription(jobVacancyData.jobDescription)
    setRequirement(jobVacancyData.jobRequirement)
    setSalary(jobVacancyData.jobSalary)
  }

  useEffect(() => {
    setErrorTitle('')
    if (title.length === 0) setErrorTitle("Job title can't be empty!")
  }, [title])

  useEffect(() => {
    const wordCount = description.split(/\s+/).filter((word) => word !== '').length
    setErrorDescription('')
    if (description.length === 0) setErrorDescription("Description can't be empty!")
    else if (wordCount < 3) setErrorDescription('Description must have a minimum of 3 words!')
  }, [description])

  useEffect(() => {
    setErrorSalary('')
    if (salary.length === 0) setErrorSalary("Salary can't be empty!")
    else if (!/^\d+$/.test(salary)) setErrorSalary('Salary must be numeric!')
  }, [salary])

  useEffect(() => {
    setErrorRequirement('')
    if (requirement.length === 0) setErrorRequirement("Requirement can't be empty!")
  }, [requirement])

  useEffect(() => {
    fetchData()
  }, [id])

  useEffect(() => {
    fillData()
  }, [jobVacancyData])

  const fetchData = async () => {
    try {
      setJobVacancyData(await getJobVacancy(id))
    } catch (error) {
      console.log(error)
    }
  }

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

    const isValid = !errorTitle && !errorDescription && !errorRequirement && !errorSalary

    if (!isValid) return

    const newJobVacancy: JobVacancy = {
      id: '',
      jobTitle: title,
      jobDescription: description,
      jobSalary: salary,
      jobRequirement: requirement
    }

    await updateJobVacancy(newJobVacancy, id)
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
            Edit Job Vacancy
          </h5>
          <form ref={formRef} onSubmit={handleSubmit}>
            <div>
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
                onChange={(e) => setTitle(e.target.value)}
              />
              <p className="text-danger">{errorTitle}</p>
            </div>
            <div>
              <label htmlFor="jobDescription" className="form-label">
                Description
              </label>
              <textarea
                id="jobDescription"
                name="jobDescription"
                className="form-control"
                placeholder="ex: Manage lost and found items"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <p className="text-danger">{errorDescription}</p>
            </div>
            <div>
              <label htmlFor="jobSalary" className="form-label">
                Salary
              </label>
              <input
                id="jobSalary"
                name="jobSalary"
                className="form-control"
                placeholder="ex: 5000"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              />
              <p className="text-danger">{errorSalary}</p>
            </div>
            <div>
              <label htmlFor="jobRequirement" className="form-label">
                Requirement
              </label>
              <textarea
                id="jobRequirement"
                name="jobRequirement"
                className="form-control"
                placeholder="ex: Have a degree"
                value={requirement}
                onChange={(e) => setRequirement(e.target.value)}
              />
              <p className="text-danger">{errorRequirement}</p>
            </div>
            <div className="d-flex mt-4 gap-2">
              <button className="btn btn-outline-dark" type="submit">
                Update
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

export default EditJobVacancyPage
