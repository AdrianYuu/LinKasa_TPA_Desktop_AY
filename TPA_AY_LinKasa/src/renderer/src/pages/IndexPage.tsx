import { Link } from 'react-router-dom'

const IndexPage = () => {
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center flex-column gap-3">
      <h1>Welcome to LinKasa Application</h1>
      <Link to="/login" className="btn btn-outline-dark">
        Go to Application
      </Link>
    </div>
  )
}

export default IndexPage
