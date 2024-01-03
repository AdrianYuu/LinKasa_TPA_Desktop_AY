import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className="d-flex flex-column align-items-center bg-dark col-2 py-3 px-4">
      <h1 className="text-white mb-5">
        <Link to="/fom" className="text-white" style={{ textDecoration: 'none' }}>
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
            Flight Schedules
          </button>
          <ul className="dropdown-menu w-100 text-center">
            <li>
              <Link to="/fom/view-flight-schedule" className="dropdown-item">
                View Flight Schedules
              </Link>
            </li>
            <li>
              <Link to="/fom/create-flight-schedule" className="dropdown-item">
                Create Flight Schedules
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
            Flight Crew
          </button>
          <ul className="dropdown-menu w-100 text-center">
            <li>
              <Link to="/fom/view-flight-crew" className="dropdown-item">
                View Flight Crew
              </Link>
            </li>
            <li>
              <Link to="/fom/create-flight-crew" className="dropdown-item">
                Create Flight Crew
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
