import Navbar from '@renderer/components/Navbar'
import Sidebar from '@renderer/components/Civil Engineering Manager/Sidebar'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  deleteBudgetRequest,
  getBudgetRequest
} from '@renderer/controllers/BudgetRequestController'

const DeleteBudgetRequestPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [budgetRequestData, setBudgetRequestData] = useState<BudgetRequest | null>(null)

  const [purpose, setPurpose] = useState('')
  const [amount, setAmount] = useState('')
  const [deadlineDate, setDeadlineDate] = useState('')

  const formRef = useRef<HTMLFormElement | null>(null)

  const fillData = () => {
    if (!budgetRequestData) return

    setPurpose(budgetRequestData.purpose)
    setAmount(budgetRequestData.amount)
    setDeadlineDate(budgetRequestData.deadlineDate)
  }

  const fetchData = async () => {
    try {
      setBudgetRequestData(await getBudgetRequest(id))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [id])

  useEffect(() => {
    fillData()
  }, [budgetRequestData])

  const resetData = () => {
    setPurpose('')
    setAmount('')
    setDeadlineDate('')

    if (!formRef.current) return
    formRef.current.reset()
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    await deleteBudgetRequest(id)
    resetData()
    navigate('/cem/view-budget-request')
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
            Delete Budget Request
          </h5>
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="purpose" className="form-label">
                Purpose
              </label>
              <input
                id="purpose"
                name="purpose"
                type="text"
                className="form-control"
                value={purpose}
                disabled
              />
            </div>
            <div className="mb-3">
              <label htmlFor="amount" className="form-label">
                Amount
              </label>
              <input
                id="amount"
                name="amount"
                type="text"
                className="form-control"
                value={amount}
                disabled
              />
            </div>
            <div className="mb-3">
              <label htmlFor="deadlineDate" className="form-label">
                Deadline Date
              </label>
              <input
                id="deadlineDate"
                name="deadlineDate"
                className="form-control"
                type="date"
                value={deadlineDate}
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
                onClick={() => navigate('/cem/view-budget-request')}
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

export default DeleteBudgetRequestPage
