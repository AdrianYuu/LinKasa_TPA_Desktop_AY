import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className="d-flex flex-column align-items-center bg-dark col-2 py-3 px-4">
      <h1 className="text-white mb-5">
        <Link to="/ghm" className="text-white" style={{ textDecoration: 'none' }}>
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
            Baggage Status
          </button>
          <ul className="dropdown-menu w-100 text-center">
            <li>
              <Link to="/ghm/view-flight-baggage-status" className="dropdown-item">
                View Baggage Status
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
            Refueling Schedule
          </button>
          <ul className="dropdown-menu w-100 text-center">
            <li>
              <Link to="/ghm/view-refueling-schedule" className="dropdown-item">
                View Schedule
              </Link>
            </li>
            <li>
              <Link to="/ghm/create-refueling-schedule" className="dropdown-item">
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
