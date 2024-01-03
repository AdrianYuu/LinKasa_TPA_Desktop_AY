import Navbar from '@renderer/components/Navbar'
import Sidebar from '@renderer/components/Human Resources Director/Sidebar'
import { createJobVacancy } from '@renderer/controllers/JobVacancyController'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CreateJobVacancyPage = () => {
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [requirement, setRequirement] = useState('')
  const [salary, setSalary] = useState('')

  const [errorTitle, setErrorTitle] = useState('')
  const [errorDescription, setErrorDescription] = useState('')
  const [errorRequirement, setErrorRequirement] = useState('')
  const [errorSalary, setErrorSalary] = useState('')

  const formRef = useRef<HTMLFormElement | null>(null)

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

    await createJobVacancy(newJobVacancy)
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
            Create Job Vacancy
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
                type="text"
                className="form-control"
                placeholder="ex: 5000"
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
                onChange={(e) => setRequirement(e.target.value)}
              />
              <p className="text-danger">{errorRequirement}</p>
            </div>
            <div className="d-flex mt-4 gap-2">
              <button className="btn btn-outline-dark" type="submit">
                Submit
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

export default CreateJobVacancyPage
