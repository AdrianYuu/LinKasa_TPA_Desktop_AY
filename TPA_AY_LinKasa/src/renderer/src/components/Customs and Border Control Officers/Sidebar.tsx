import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className="d-flex flex-column align-items-center bg-dark col-2 py-3 px-4">
      <h1 className="text-white mb-5">
        <Link to="/cabco" className="text-white" style={{ textDecoration: 'none' }}>
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
            Passport And Visa
          </button>
          <ul className="dropdown-menu w-100 text-center">
            <li>
              <Link to="/cabco/view-passport-and-visa" className="dropdown-item">
                View Passport And Visa
              </Link>
            </li>
            <li>
              <Link to="/cabco/create-passport-and-visa" className="dropdown-item">
                Create Passport And Visa
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
            Custom Declaration
          </button>
          <ul className="dropdown-menu w-100 text-center">
            <li>
              <Link to="/cabco/view-custom-declaration" className="dropdown-item">
                View Declaration
              </Link>
            </li>
            <li>
              <Link to="/cabco/create-custom-declaration" className="dropdown-item">
                Create Declaration
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
            Inspection Record
          </button>
          <ul className="dropdown-menu w-100 text-center">
            <li>
              <Link to="/cabco/view-inspection-record" className="dropdown-item">
                View Inspection Record
              </Link>
            </li>
            <li>
              <Link to="/cabco/create-inspection-record" className="dropdown-item">
                Create Inspection Record
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
