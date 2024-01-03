import { useEffect, useState } from 'react'
import Sidebar from '../../../components/Chief Financial Officer (CFO)/Sidebar'
import Navbar from '../../../components/Navbar'
import { Link } from 'react-router-dom'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '@renderer/firebase'
import { getBudgetRequests } from '@renderer/controllers/BudgetRequestController'

const ViewBudgetRequestPageCFO = () => {
  const [budgetRequestsData, setBudgetRequestsData] = useState<BudgetRequest[] | null>(null)

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'budget-request'), fetchData)
    return () => {
      unsubscribe()
    }
  }, [])

  const fetchData = async () => {
    try {
      setBudgetRequestsData(await getBudgetRequests())
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
          {budgetRequestsData && budgetRequestsData.length > 0 ? (
            <h5 className="mt-2 mb-4 text-muted">
              Chief Financial Officer (CFO)
              <i className="bi bi-arrow-right mx-2"></i>
              View Budget Request
            </h5>
          ) : (
            <></>
          )}
          {budgetRequestsData && budgetRequestsData.length > 0 ? (
            <table className="table table-striped table-hover table-responsive">
              <thead className="table-dark">
                <tr>
                  <th scope="col">No.</th>
                  <th scope="col">Purpose</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Status</th>
                  <th scope="col" className="text-center">
                    Edit
                  </th>
                </tr>
              </thead>
              <tbody>
                {budgetRequestsData.map((request, index) => (
                  <tr key={request.id}>
                    <th scope="row">{index + 1}.</th>
                    <td>{request.purpose}</td>
                    <td>${request.amount}</td>
                    <td>{request.status}</td>
                    <td className="text-center">
                      <Link to={`/cfo/edit-budget-request/${request.id}`}>
                        <i className="bi bi-pencil-fill text-primary"></i>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center my-4">
              <p className="lead">No budget request data records found.</p>
              <i className="bi bi-emoji-frown" style={{ fontSize: '2rem', color: '#6c757d' }}></i>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ViewBudgetRequestPageCFO
