import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className="d-flex flex-column align-items-center bg-dark col-2 py-3 px-4">
      <h1 className="text-white mb-5">
        <Link to="/csm" className="text-white" style={{ textDecoration: 'none' }}>
          LinKasa
        </Link>
      </h1>
      <div className="d-flex flex-column w-100 gap-4">
        <div className="dropdown-center">
          <button
            className="btn btn-outline-light dropdown-toggle w-100"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Broadcast
          </button>
          <ul className="dropdown-menu w-100 text-center">
            <li>
              <Link to="/csm/view-broadcast" className="dropdown-item">
                View Broadcast
              </Link>
            </li>
            <li>
              <Link to="/csm/create-broadcast" className="dropdown-item">
                Create Broadcast
              </Link>
            </li>
          </ul>
        </div>
        <div className="dropdown-center">
          <button
            className="btn btn-outline-light dropdown-toggle w-100"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Feedback
          </button>
          <ul className="dropdown-menu w-100 text-center">
            <li>
              <Link to="/csm/view-feedback-form" className="dropdown-item">
                View Feedback
              </Link>
            </li>
            <li>
              <Link to="/csm/create-feedback-form" className="dropdown-item">
                Create Feedback
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
