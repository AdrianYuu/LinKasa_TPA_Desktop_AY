import { useState, useRef, FormEvent, useEffect } from 'react'
import Sidebar from '@renderer/components/Airport Director (CEO)/Sidebar'
import Navbar from '@renderer/components/Navbar'
import { useNavigate } from 'react-router-dom'
import { createAirportGoal } from '@renderer/controllers/AirportGoalController'

const CreateAirportGoalPage = () => {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [goals, setGoals] = useState([{ timeLine: '', mileStone: '' }])

  const [errorName, setErrorName] = useState('')
  const [errorDescription, setErrorDescription] = useState('')
  const [errorGoals, setErrorGoals] = useState('')

  const formRef = useRef<HTMLFormElement | null>(null)

  useEffect(() => {
    setErrorName('')
    if (name === '') setErrorName("Goal's name can't be empty!")
  }, [name])

  useEffect(() => {
    setErrorDescription('')
    if (description === '') setErrorDescription("Goal's description can't be empty!")
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

    const newAirportGoal: AirportGoal = {
      id: '',
      name: name,
      description: description,
      timeLines: goals.map((goal) => goal.timeLine),
      mileStones: goals.map((goal) => goal.mileStone)
    }

    await createAirportGoal(newAirportGoal)
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
            Create Airport Goal
          </h5>
          <form ref={formRef} onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="form-label">
                Airport Goal Name
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
              <label htmlFor="description" className="form-label">
                Airport Goal Description
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
                Submit
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

export default CreateAirportGoalPage
