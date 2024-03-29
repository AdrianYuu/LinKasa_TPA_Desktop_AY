import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className="d-flex flex-column align-items-center bg-dark col-2 py-3 px-4">
      <h1 className="text-white mb-5">
        <Link to="/cis" className="text-white" style={{ textDecoration: 'none' }}>
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
            Flight Schedule
          </button>
          <ul className="dropdown-menu w-100 text-center">
            <li>
              <Link to="/cis/view-flight-schedule" className="dropdown-item">
                View Flight Schedule
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
            Boarding Pass
          </button>
          <ul className="dropdown-menu w-100 text-center">
            <li>
              <Link to="/cis/view-boarding-pass" className="dropdown-item">
                View Boarding Pass
              </Link>
            </li>
            <li>
              <Link to="/cis/create-boarding-pass" className="dropdown-item">
                Create Boarding Pass
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
