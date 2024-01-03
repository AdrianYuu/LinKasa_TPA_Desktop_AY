import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className="d-flex flex-column align-items-center bg-dark col-2 py-3 px-4">
      <h1 className="text-white mb-5">
        <Link to="/lom" className="text-white" style={{ textDecoration: 'none' }}>
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
            Transportation Route
          </button>
          <ul className="dropdown-menu w-100 text-center">
            <li>
              <Link to="/lom/view-transportation-route" className="dropdown-item">
                View Route
              </Link>
            </li>
            <li>
              <Link to="/lom/create-transportation-route" className="dropdown-item">
                Create Route
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
            Transportation Schedule
          </button>
          <ul className="dropdown-menu w-100 text-center">
            <li>
              <Link to="/lom/view-transportation-schedule" className="dropdown-item">
                View Schedule
              </Link>
            </li>
            <li>
              <Link to="/lom/create-transportation-schedule" className="dropdown-item">
                Create Schedule
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
