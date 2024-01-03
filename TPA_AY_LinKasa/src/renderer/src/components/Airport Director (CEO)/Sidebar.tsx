import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className="d-flex flex-column align-items-center bg-dark col-2 py-3 px-4">
      <h1 className="text-white mb-5">
        <Link to="/ceo" className="text-white" style={{ textDecoration: 'none' }}>
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
            Airport Goal
          </button>
          <ul className="dropdown-menu w-100 text-center">
            <li>
              <Link to="/ceo/view-airport-goal" className="dropdown-item">
                View Goal
              </Link>
            </li>
            <li>
              <Link to="/ceo/create-airport-goal" className="dropdown-item">
                Create Goal
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
