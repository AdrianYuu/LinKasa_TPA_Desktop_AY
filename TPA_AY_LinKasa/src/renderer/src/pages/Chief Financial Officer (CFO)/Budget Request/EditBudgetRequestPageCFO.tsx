import Navbar from '@renderer/components/Navbar'
import Sidebar from '@renderer/components/Chief Financial Officer (CFO)/Sidebar'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  getBudgetRequest,
  updateBudgetRequest
} from '@renderer/controllers/BudgetRequestController'

const EditBudgetRequestPageCFO = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [budgetRequestData, setBudgetRequestData] = useState<BudgetRequest | null>(null)

  const [purpose, setPurpose] = useState('')
  const [amount, setAmount] = useState('')
  const [deadlineDate, setDeadlineDate] = useState('')
  const [status, setStatus] = useState('')

  const [errorPurpose, setErrorPurpose] = useState('')
  const [errorAmount, setErrorAmount] = useState('')
  const [errorDeadlineDate, setErrorDeadlineDate] = useState('')
  const [errorStatus, setErrorStatus] = useState('')

  const formRef = useRef<HTMLFormElement | null>(null)

  const fillData = () => {
    if (!budgetRequestData) return

    setPurpose(budgetRequestData.purpose)
    setAmount(budgetRequestData.amount)
    setDeadlineDate(budgetRequestData.deadlineDate)
    setStatus(budgetRequestData.status)
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

  useEffect(() => {
    setErrorPurpose('')
    if (purpose === '') setErrorPurpose("Purpose can't be empty!")
  }, [purpose])

  useEffect(() => {
    setErrorAmount('')
    if (amount === '') setErrorAmount("Amount can't be empty!")
    else if (!/^\d+$/.test(amount)) setErrorAmount('Amount must be numeric!')
  }, [amount])

  useEffect(() => {
    setErrorStatus('')
    if (status === '') setErrorStatus("Status can't be empty!")
  }, [status])

  useEffect(() => {
    const currentDate = new Date()
    const selectedDate = new Date(deadlineDate)

    setErrorDeadlineDate('')
    if (deadlineDate === '') {
      setErrorDeadlineDate("Deadline date can't be empty!")
    } else if (selectedDate <= currentDate) {
      setErrorDeadlineDate('Deadline date must be in the future!')
    }
  }, [deadlineDate])

  const resetData = () => {
    setPurpose('')
    setAmount('')
    setDeadlineDate('')

    if (!formRef.current) return
    formRef.current.reset()
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const isValid = !errorPurpose && !errorAmount && !errorDeadlineDate

    if (!isValid) return

    const newBudgetRequest: BudgetRequest = {
      id: '',
      purpose: purpose,
      amount: amount,
      status: status,
      deadlineDate: deadlineDate
    }

    await updateBudgetRequest(newBudgetRequest, id)
    resetData()
    navigate('/cfo/view-budget-request')
  }

  return (
    <div className="d-flex vh-100">
      <Sidebar />
      <div className="w-100 overflow-auto">
        <Navbar />
        <div className="px-5 py-4 overflow-hidden">
          <h5 className="mt-2 mb-4 text-muted">
            Chief Financial Officer (CFO)
            <i className="bi bi-arrow-right mx-2"></i>
            Edit Budget Request
          </h5>
          <form ref={formRef} onSubmit={handleSubmit}>
            <div>
              <label htmlFor="purpose" className="form-label">
                Purpose
              </label>
              <input
                id="purpose"
                name="purpose"
                type="text"
                className="form-control"
                onChange={(e) => setPurpose(e.target.value)}
                value={purpose}
              />
              <p className="text-danger">{errorPurpose}</p>
            </div>
            <div>
              <label htmlFor="amount" className="form-label">
                Amount
              </label>
              <input
                id="amount"
                name="amount"
                type="text"
                className="form-control"
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
              />
              <p className="text-danger">{errorAmount}</p>
            </div>
            <div>
              <label htmlFor="deadlineDate" className="form-label">
                Deadline Date
              </label>
              <input
                id="deadlineDate"
                name="deadlineDate"
                className="form-control"
                type="date"
                onChange={(e) => setDeadlineDate(e.target.value)}
                value={deadlineDate}
              />
              <p className="text-danger">{errorDeadlineDate}</p>
            </div>
            <div>
              <label htmlFor="status" className="form-label">
                Status
              </label>
              <select
                id="status"
                name="status"
                className="form-select form-select-m"
                onChange={(e) => setStatus(e.target.value)}
                value={status}
              >
                <option value="Not reviewed">Not reviewed</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
                <option value="Revised">Revised</option>
              </select>
              <p className="text-danger">{errorStatus}</p>
            </div>
            <div className="d-flex mt-4 gap-2">
              <button className="btn btn-outline-dark" type="submit">
                Update
              </button>
              <button
                className="btn btn-secondary"
                type="button"
                onClick={() => navigate('/cfo/view-budget-request')}
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

export default EditBudgetRequestPageCFO
