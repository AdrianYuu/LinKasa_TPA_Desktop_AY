import Sidebar from '@renderer/components/Customer Service Manager/Sidebar'
import Navbar from '@renderer/components/Navbar'
import { getFeedbackForms } from '@renderer/controllers/FeedbackFormController'
import { db } from '@renderer/firebase'
import { collection, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import Rating from 'react-rating-stars-component'
import { Link } from 'react-router-dom'

const ViewFeedbackFormPage = () => {
  const [formsData, setFormsData] = useState<FeedbackForm[] | null>(null)

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'feedback-form'), fetchData)
    return () => {
      unsubscribe()
    }
  }, [])

  const fetchData = async () => {
    try {
      setFormsData(await getFeedbackForms())
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
          {formsData && formsData.length > 0 ? (
            <h5 className="mt-2 mb-4 text-muted">
              Customer Service Manager
              <i className="bi bi-arrow-right mx-2"></i>
              View Feedback Form
            </h5>
          ) : (
            <></>
          )}
          {formsData && formsData.length > 0 ? (
            <div className="d-flex flex-column gap-4">
              {formsData.map((form) => (
                <div className="accordion" id="accordionExample">
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button text-dark bg-light fw-bold fs-5"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={'#' + form.id}
                        aria-expanded="true"
                        aria-controls={form.id}
                      >
                        {form.title}
                      </button>
                    </h2>
                    <div
                      id={form.id}
                      className="accordion-collapse collapse show bg-dark text-light"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body bg-dark text-light">
                        <form action="">
                          {form.questions.map((question, index) => (
                            <div className="d-flex flex-column mb-2">
                              <label className="form-label mb-2">{question}</label>
                              {form.answerType[index] === 'text' && (
                                <input className="form-control" type="text" />
                              )}
                              {form.answerType[index] === 'rating' && (
                                <Rating
                                  count={5}
                                  size={24}
                                  activeColor="#ffd700"
                                  isHalf={false}
                                  value={0}
                                  onChange={(rating) => console.log(rating)}
                                />
                              )}
                              {form.answerType[index] === 'date' && (
                                <input className="form-control" type="date" />
                              )}
                              {form.answerType[index] === 'time' && (
                                <input className="form-control" type="time" />
                              )}
                            </div>
                          ))}
                          <div className="mt-3 d-flex gap-2">
                            <Link
                              to={`/csm/edit-feedback-form/${form.id}`}
                              className="btn btn-outline-light"
                            >
                              <i className="bi bi-pencil-fill"></i> Edit
                            </Link>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center my-4">
              <p className="lead">No feedback form data records found.</p>
              <i className="bi bi-emoji-frown" style={{ fontSize: '2rem', color: '#6c757d' }}></i>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ViewFeedbackFormPage
