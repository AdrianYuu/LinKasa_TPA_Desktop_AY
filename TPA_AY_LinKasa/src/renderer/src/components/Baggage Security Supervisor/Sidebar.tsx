import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className="d-flex flex-column align-items-center bg-dark col-2 py-3 px-4">
      <h1 className="text-white mb-5">
        <Link to="/bss" className="text-white" style={{ textDecoration: 'none' }}>
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
              <Link to="/bss/view-flight-baggage-status" className="dropdown-item">
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
            Baggage Handling Task
          </button>
          <ul className="dropdown-menu w-100 text-center">
            <li>
              <Link to="/bss/view-baggage-handling-task" className="dropdown-item">
                View Handling Task
              </Link>
            </li>
            <li>
              <Link to="/bss/create-baggage-handling-task" className="dropdown-item">
                Create Handling Task
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
            Baggage Security
          </button>
          <ul className="dropdown-menu w-100 text-center">
            <li>
              <Link to="/bss/view-baggage-security-incident" className="dropdown-item">
                View Security Incident
              </Link>
            </li>
            <li>
              <Link to="/bss/create-baggage-security-incident" className="dropdown-item">
                Create Security Incident
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
