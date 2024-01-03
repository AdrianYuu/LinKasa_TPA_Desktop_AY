import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className="d-flex flex-column align-items-center bg-dark col-2 py-3 px-4">
      <h1 className="text-white mb-5">
        <Link to="/hrd" className="text-white" style={{ textDecoration: 'none' }}>
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
            Employee
          </button>
          <ul className="dropdown-menu w-100 text-center">
            <li>
              <Link to="/hrd/view-employee" className="dropdown-item">
                View Employee
              </Link>
            </li>
            <li>
              <Link to="/hrd/create-employee" className="dropdown-item">
                Create Employee
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
            Employee Training
          </button>
          <ul className="dropdown-menu w-100 text-center">
            <li>
              <Link to="/hrd/view-employee-training" className="dropdown-item">
                View Employee Training
              </Link>
            </li>
            <li>
              <Link to="/hrd/create-employee-training" className="dropdown-item">
                Create Employee Training
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
            Employee Program
          </button>
          <ul className="dropdown-menu w-100 text-center">
            <li>
              <Link to="/hrd/view-employee-development-program" className="dropdown-item">
                View Employee Program
              </Link>
            </li>
            <li>
              <Link to="/hrd/create-employee-development-program" className="dropdown-item">
                Create Employee Program
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
            Job Vacancy
          </button>
          <ul className="dropdown-menu w-100 text-center">
            <li>
              <Link to="/hrd/view-job-vacancy" className="dropdown-item">
                View Job Vacancy
              </Link>
            </li>
            <li>
              <Link to="/hrd/create-job-vacancy" className="dropdown-item">
                Create Job Vacancy
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
