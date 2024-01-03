import { useState, useRef, FormEvent, useEffect } from 'react'
import Sidebar from '@renderer/components/Civil Engineering Manager/Sidebar'
import Navbar from '@renderer/components/Navbar'
import { useNavigate, useParams } from 'react-router-dom'
import { getProjectPlan, updateProjectPlan } from '@renderer/controllers/ProjectPlanController'

const EditProjectPlanPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [projectPlanData, setProjectPlanData] = useState<ProjectPlan | null>(null)

  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [description, setDescription] = useState('')
  const [goals, setGoals] = useState([{ timeLine: '', mileStone: '' }])

  const [errorName, setErrorName] = useState('')
  const [errorType, setErrorType] = useState('')
  const [errorDescription, setErrorDescription] = useState('')
  const [errorGoals, setErrorGoals] = useState('')

  const formRef = useRef<HTMLFormElement | null>(null)

  const fillData = () => {
    if (!projectPlanData) return

    setName(projectPlanData.name)
    setType(projectPlanData.type)
    setDescription(projectPlanData.description)

    const newGoals = projectPlanData.timeLines.map((timeLine, index) => ({
      timeLine: timeLine,
      mileStone: projectPlanData.mileStones[index]
    }))

    setGoals(newGoals)
  }

  const fetchData = async () => {
    try {
      setProjectPlanData(await getProjectPlan(id))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [id])

  useEffect(() => {
    fillData()
  }, [projectPlanData])

  useEffect(() => {
    setErrorName('')
    if (name === '') setErrorName("Project's name can't be empty!")
  }, [name])

  useEffect(() => {
    setErrorType('')
    if (type === '') setErrorType("Project's type can't be empty!")
  }, [type])

  useEffect(() => {
    setErrorDescription('')
    if (description === '') setErrorDescription("Project's description can't be empty!")
  }, [description])

  useEffect(() => {
    setErrorGoals('')
    if (goals.some((goal) => goal.timeLine.trim() === ''))
      setErrorGoals('All timeline must be filled.')
    if (goals.some((goal) => goal.mileStone.trim() === ''))
      setErrorGoals('All milestone must be filled.')
  }, [goals])

  const addGoals = () => {
    setGoals((prevGoals) => [...prevGoals, { timeLine: '', mileStone: '' }])
  }

  const handleGoalsChange = (index: number, key: 'timeLine' | 'mileStone', value: string) => {
    setGoals((prevGoals) => {
      const newGoals = [...prevGoals]
      prevGoals[index][key] = value
      return newGoals
    })
  }

  const removeGoals = (index: number) => {
    if (goals.length > 1) {
      setGoals((prevGoals) => {
        const newGoals = [...prevGoals]
        newGoals.splice(index, 1)
        return newGoals
      })
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const newProjectPlan: ProjectPlan = {
      id: '',
      name: name,
      type: type,
      description: description,
      timeLines: goals.map((goal) => goal.timeLine),
      mileStones: goals.map((goal) => goal.mileStone)
    }

    await updateProjectPlan(newProjectPlan, id)
    resetData()
    navigate('/cem/view-project-plan')
  }

  const resetData = () => {
    setName('')
    setType('')
    setGoals([])

    if (formRef.current) formRef.current.reset()
  }

  return (
    <div className="d-flex vh-100">
      <Sidebar />
      <div className="w-100 overflow-auto">
        <Navbar />
        <div className="px-5 py-4 overflow-hidden">
          <h5 className="mt-2 mb-4 text-muted">
            Civil Engineering Manager
            <i className="bi bi-arrow-right mx-2"></i>
            Edit Project Plan
          </h5>
          <form ref={formRef} onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="form-label">
                Project Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <p className="text-danger">{errorName}</p>
            </div>
            <div>
              <label htmlFor="type" className="form-label">
                Project Type
              </label>
              <select
                id="type"
                name="type"
                className="form-select form-select-m"
                onChange={(e) => setType(e.target.value)}
                value={type}
              >
                <option value="">Please select one...</option>
                <option value="Construction">Construction</option>
                <option value="Renovation">Renovation</option>
              </select>
              <p className="text-danger">{errorType}</p>
            </div>
            <div>
              <label htmlFor="description" className="form-label">
                Project Description
              </label>
              <textarea
                id="description"
                name="description"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <p className="text-danger">{errorDescription}</p>
            </div>
            {goals.map((goals, index) => (
              <div key={index} className="d-flex flex-column mb-3">
                <div className="d-flex w-100">
                  <div className="flex-shrink-0 me-3">
                    <label htmlFor="timeLine" className="form-label">
                      Timeline
                    </label>
                    <input
                      id="timeLine"
                      name="timeLine"
                      type="date"
                      className="form-control"
                      value={goals.timeLine}
                      onChange={(e) => handleGoalsChange(index, 'timeLine', e.target.value)}
                    />
                  </div>
                  <div className="flex-grow-1">
                    <label htmlFor="mileStone" className="form-label">
                      Milestone
                    </label>
                    <input
                      id="mileStone"
                      name="mileStone"
                      type="text"
                      className="form-control"
                      value={goals.mileStone}
                      onChange={(e) => handleGoalsChange(index, 'mileStone', e.target.value)}
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-danger ms-2 align-self-end"
                    onClick={() => removeGoals(index)}
                  >
                    Remove Goal
                  </button>
                </div>
              </div>
            ))}
            <p className="text-danger">{errorGoals}</p>

            <button type="button" className="btn btn-dark" onClick={addGoals}>
              Add Goal
            </button>
            <div className="d-flex mt-4 gap-2">
              <button className="btn btn-outline-dark" type="submit">
                Update
              </button>
              <button
                className="btn btn-secondary"
                type="button"
                onClick={() => navigate('/cem/view-project-plan')}
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

export default EditProjectPlanPage
