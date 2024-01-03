import { useEffect, useState } from 'react'
import Sidebar from '../../../components/Airport Director (CEO)/Sidebar'
import Navbar from '../../../components/Navbar'
import { Link } from 'react-router-dom'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '@renderer/firebase'
import { getAirportGoals } from '@renderer/controllers/AirportGoalController'

const ViewAirportGoalPage = () => {
  const [airportGoalsData, setAirportGoalsData] = useState<AirportGoal[] | null>(null)

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'project-plan'), fetchData)
    return () => {
      unsubscribe()
    }
  }, [])

  const fetchData = async () => {
    try {
      setAirportGoalsData(await getAirportGoals())
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="d-flex vh-100">
      <Sidebar />
      <div className="w-100 overflow-auto">
        <Navbar />
        <div className="px-5 py-4 overflow-hidden">
          {airportGoalsData && airportGoalsData.length > 0 ? (
            <h5 className="mt-2 mb-4 text-muted">
              Airport Director (CEO)
              <i className="bi bi-arrow-right mx-2"></i>
              View Airport Goal
            </h5>
          ) : (
            <></>
          )}
          {airportGoalsData && airportGoalsData.length > 0 ? (
            <table className="table table-striped table-hover table-responsive">
              <thead className="table-dark">
                <tr>
                  <th scope="col">No.</th>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Timelines & Milestones</th>
                  <th scope="col" className="text-center">
                    Edit
                  </th>
                  <th scope="col" className="text-center">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {airportGoalsData.map((goal, index) => (
                  <tr key={goal.id}>
                    <th scope="row">{index + 1}.</th>
                    <td>{goal.name}</td>
                    <td>{goal.description}</td>
                    <td>
                      <ul>
                        {goal.timeLines.map((timeLine, index) => (
                          <li key={index}>{`${timeLine} -> ${goal.mileStones[index]}`}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="text-center">
                      <Link to={`/ceo/edit-airport-goal/${goal.id}`}>
                        <i className="bi bi-pencil-fill text-primary"></i>
                      </Link>
                    </td>
                    <td className="text-center">
                      <Link to={`/ceo/delete-airport-goal/${goal.id}`}>
                        <i className="bi bi-trash3-fill text-danger"></i>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center my-4">
              <p className="lead">No airport goal data records found.</p>
              <i className="bi bi-emoji-frown" style={{ fontSize: '2rem', color: '#6c757d' }}></i>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ViewAirportGoalPage
