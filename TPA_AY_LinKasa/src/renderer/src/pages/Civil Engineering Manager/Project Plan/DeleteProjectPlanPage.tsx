import { useState, useRef, FormEvent, useEffect } from 'react'
import Sidebar from '@renderer/components/Civil Engineering Manager/Sidebar'
import Navbar from '@renderer/components/Navbar'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteProjectPlan, getProjectPlan } from '@renderer/controllers/ProjectPlanController'

const DeleteProjectPlanPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [projectPlanData, setProjectPlanData] = useState<ProjectPlan | null>(null)

  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [description, setDescription] = useState('')
  const [goals, setGoals] = useState([{ timeLine: '', mileStone: '' }])

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    await deleteProjectPlan(id)
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
            Delete Project Plan
          </h5>
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Project Name
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
                Project Type
              </label>
              <select
                id="type"
                name="type"
                className="form-select form-select-m"
                value={type}
                disabled
              >
                <option value="">Please select one...</option>
                <option value="Construction">Construction</option>
                <option value="Renovation">Renovation</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Project Description
              </label>
              <textarea
                id="description"
                name="description"
                className="form-control"
                value={description}
                disabled
              />
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
                      disabled
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
                      disabled
                    />
                  </div>
                </div>
              </div>
            ))}
            <div className="d-flex mt-4 gap-2">
              <button className="btn btn-outline-dark" type="submit">
                Delete
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

export default DeleteProjectPlanPage
