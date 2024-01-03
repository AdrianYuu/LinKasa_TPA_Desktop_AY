import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className="d-flex flex-column align-items-center bg-dark col-2 py-3 px-4">
      <h1 className="text-white mb-5">
        <Link to="/laf" className="text-white" style={{ textDecoration: 'none' }}>
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
            Lost and Found
          </button>
          <ul className="dropdown-menu w-100 text-center">
            <li>
              <Link to="/laf/view-laf-item-log" className="dropdown-item">
                View Lost and Found
              </Link>
            </li>
            <li>
              <Link to="/laf/create-laf-item-log" className="dropdown-item">
                Create Lost and Found
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
