import { useState, useRef, FormEvent, useEffect } from 'react'
import Sidebar from '@renderer/components/Customer Service Manager/Sidebar'
import Navbar from '@renderer/components/Navbar'
import { useNavigate, useParams } from 'react-router-dom'
import { getFeedbackForm, updateFeedbackForm } from '@renderer/controllers/FeedbackFormController'

const EditFeedbackFormPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [feedbackFormData, setFeedbackFormData] = useState<FeedbackForm | null>(null)

  const [formTitle, setFormTitle] = useState('')
  const [questions, setQuestions] = useState([{ title: '', type: 'text' }])

  const [errorFormTitle, setErrorFormTitle] = useState('')
  const [errorQuestions, setErrorQuestions] = useState('')

  const formRef = useRef<HTMLFormElement | null>(null)

  const fetchData = async () => {
    try {
      setFeedbackFormData(await getFeedbackForm(id))
    } catch (error) {
      console.log(error)
    }
  }

  const fillData = () => {
    if (!feedbackFormData) return

    setFormTitle(feedbackFormData.title)

    const newQuestions = feedbackFormData.questions.map((question, index) => ({
      title: question,
      type: feedbackFormData.answerType[index]
    }))

    setQuestions(newQuestions)
  }

  useEffect(() => {
    fetchData()
  }, [id])

  useEffect(() => {
    fillData()
  }, [feedbackFormData])

  useEffect(() => {
    setErrorFormTitle('')
    if (formTitle === '') setErrorFormTitle("Form title can't be empty!")
  }, [formTitle])

  useEffect(() => {
    setErrorQuestions('')
    if (questions.some((question) => question.title.trim() === ''))
      setErrorQuestions('All questions must be filled.')
  }, [questions])

  const addQuestion = () => {
    setQuestions((prevQuestions) => [...prevQuestions, { title: '', type: 'text' }])
  }

  const handleQuestionChange = (index: number, key: 'title' | 'type', value: string) => {
    setQuestions((prevQuestions) => {
      const newQuestions = [...prevQuestions]
      newQuestions[index][key] = value
      return newQuestions
    })
  }

  const removeQuestion = (index: number) => {
    if (questions.length > 1) {
      setQuestions((prevQuestions) => {
        const newQuestions = [...prevQuestions]
        newQuestions.splice(index, 1)
        return newQuestions
      })
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const isValid = !errorFormTitle && !errorQuestions

    if (!isValid) return

    const newFeedbackForm: FeedbackForm = {
      id: '',
      title: formTitle,
      questions: questions.map((question) => question.title),
      answerType: questions.map((question) => question.type)
    }

    await updateFeedbackForm(newFeedbackForm, id)
    resetData()
    navigate('/csm/view-feedback-form')
  }

  const resetData = () => {
    setFormTitle('')
    setQuestions([])
    if (formRef.current) formRef.current.reset()
  }

  return (
    <div className="d-flex vh-100">
      <Sidebar />
      <div className="w-100 overflow-auto">
        <Navbar />
        <div className="px-5 py-4 overflow-hidden">
          <h5 className="mt-2 mb-4 text-muted">
            Customer Service Manager
            <i className="bi bi-arrow-right mx-2"></i>
            Edit Feedback Form
          </h5>
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="formTitle" className="form-label">
                Form Title
              </label>
              <input
                id="formTitle"
                name="formTitle"
                type="text"
                className="form-control"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
              />
              <p className="text-danger">{errorFormTitle}</p>
            </div>
            {questions.map((question, index) => (
              <div key={index} className="d-flex flex-column mb-3">
                <div className="d-flex w-100">
                  <div className="flex-grow-1">
                    <label htmlFor="questionTitle" className="form-label">
                      Question
                    </label>
                    <input
                      id="questionTitle"
                      name="questionTitle"
                      type="text"
                      className="form-control"
                      value={question.title}
                      onChange={(e) => handleQuestionChange(index, 'title', e.target.value)}
                    />
                  </div>
                  <div className="ms-2 flex-shrink-0">
                    <label htmlFor="questionType" className="form-label">
                      Type
                    </label>
                    <select
                      id="questionType"
                      name="questionType"
                      className="form-select"
                      value={question.type}
                      onChange={(e) => handleQuestionChange(index, 'type', e.target.value)}
                    >
                      <option value="text">Text Input</option>
                      <option value="rating">Rating</option>
                      <option value="date">Date</option>
                      <option value="time">Time</option>
                    </select>
                  </div>
                  <button
                    type="button"
                    className="btn btn-danger ms-2 align-self-end"
                    onClick={() => removeQuestion(index)}
                  >
                    Remove Question
                  </button>
                </div>
              </div>
            ))}
            <p className="text-danger">{errorQuestions}</p>

            <button type="button" className="btn btn-dark" onClick={addQuestion}>
              Add Question
            </button>
            <div className="d-flex mt-4 gap-2">
              <button className="btn btn-outline-dark" type="submit">
                Update
              </button>
              <button
                className="btn btn-secondary"
                type="button"
                onClick={() => navigate('/csm/view-feedback-form')}
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

export default EditFeedbackFormPage
