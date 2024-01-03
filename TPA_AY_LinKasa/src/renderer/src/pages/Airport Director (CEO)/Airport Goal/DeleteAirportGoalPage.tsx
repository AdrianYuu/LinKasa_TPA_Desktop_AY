import { useState, useRef, FormEvent, useEffect } from 'react'
import Sidebar from '@renderer/components/Airport Director (CEO)/Sidebar'
import Navbar from '@renderer/components/Navbar'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteAirportGoal, getAirportGoal } from '@renderer/controllers/AirportGoalController'

const DeleteAirportGoalPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [airportGoalData, setAirportGoalData] = useState<AirportGoal | null>(null)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [goals, setGoals] = useState([{ timeLine: '', mileStone: '' }])

  const formRef = useRef<HTMLFormElement | null>(null)

  const fillData = () => {
    if (!airportGoalData) return

    setName(airportGoalData.name)
    setDescription(airportGoalData.description)

    const newAirportGoals = airportGoalData.timeLines.map((timeLine, index) => ({
      timeLine: timeLine,
      mileStone: airportGoalData.mileStones[index]
    }))

    setGoals(newAirportGoals)
  }

  const fetchData = async () => {
    try {
      setAirportGoalData(await getAirportGoal(id))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [id])

  useEffect(() => {
    fillData()
  }, [airportGoalData])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    await deleteAirportGoal(id)
    resetData()
    navigate('/ceo/view-airport-goal')
  }

  const resetData = () => {
    setName('')
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
            Airport Director (CEO)
            <i className="bi bi-arrow-right mx-2"></i>
            Delete Airport Goal
          </h5>
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Airport Goal Name
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
              <label htmlFor="description" className="form-label">
                Airport Goal Description
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
                onClick={() => navigate('/ceo/view-airport-goal')}
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

export default DeleteAirportGoalPage
