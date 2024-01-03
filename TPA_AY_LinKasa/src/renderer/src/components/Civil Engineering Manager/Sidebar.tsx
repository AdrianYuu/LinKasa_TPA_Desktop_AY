import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className="d-flex flex-column align-items-center bg-dark col-2 py-3 px-4">
      <h1 className="text-white mb-5">
        <Link to="/cso" className="text-white" style={{ textDecoration: 'none' }}>
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
            Project Plan
          </button>
          <ul className="dropdown-menu w-100 text-center">
            <li>
              <Link to="/cem/view-project-plan" className="dropdown-item">
                View Project Plan
              </Link>
            </li>
            <li>
              <Link to="/cem/create-project-plan" className="dropdown-item">
                Create Project Plan
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
            Budget Request
          </button>
          <ul className="dropdown-menu w-100 text-center">
            <li>
              <Link to="/cem/view-budget-request" className="dropdown-item">
                View Budget Request
              </Link>
            </li>
            <li>
              <Link to="/cem/create-budget-request" className="dropdown-item">
                Create Budget Request
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
