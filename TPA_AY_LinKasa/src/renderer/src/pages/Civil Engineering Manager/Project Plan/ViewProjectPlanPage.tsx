import { useEffect, useState } from 'react'
import Sidebar from '../../../components/Civil Engineering Manager/Sidebar'
import Navbar from '../../../components/Navbar'
import { Link } from 'react-router-dom'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '@renderer/firebase'
import { getProjectPlans } from '@renderer/controllers/ProjectPlanController'

const ViewProjectPlanPage = () => {
  const [projectPlansData, setProjectPlansData] = useState<ProjectPlan[] | null>(null)

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'project-plan'), fetchData)
    return () => {
      unsubscribe()
    }
  }, [])

  const fetchData = async () => {
    try {
      setProjectPlansData(await getProjectPlans())
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
          {projectPlansData && projectPlansData.length > 0 ? (
            <h5 className="mt-2 mb-4 text-muted">
              Civil Engineering Manager
              <i className="bi bi-arrow-right mx-2"></i>
              View Project Plan List
            </h5>
          ) : (
            <></>
          )}
          {projectPlansData && projectPlansData.length > 0 ? (
            <table className="table table-striped table-hover table-responsive">
              <thead className="table-dark">
                <tr>
                  <th scope="col">No.</th>
                  <th scope="col">Name</th>
                  <th scope="col">Type</th>
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
                {projectPlansData.map((plan, index) => (
                  <tr key={plan.id}>
                    <th scope="row">{index + 1}.</th>
                    <td>{plan.name}</td>
                    <td>{plan.type}</td>
                    <td>{plan.description}</td>
                    <td>
                      <ul>
                        {plan.timeLines.map((timeLine, index) => (
                          <li key={index}>{`${timeLine} -> ${plan.mileStones[index]}`}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="text-center">
                      <Link to={`/cem/edit-project-plan/${plan.id}`}>
                        <i className="bi bi-pencil-fill text-primary"></i>
                      </Link>
                    </td>
                    <td className="text-center">
                      <Link to={`/cem/delete-project-plan/${plan.id}`}>
                        <i className="bi bi-trash3-fill text-danger"></i>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center my-4">
              <p className="lead">No project plan data records found.</p>
              <i className="bi bi-emoji-frown" style={{ fontSize: '2rem', color: '#6c757d' }}></i>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ViewProjectPlanPage
