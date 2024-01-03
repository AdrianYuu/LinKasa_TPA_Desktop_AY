import { createAllEquipment } from '@renderer/factory/EquipmentFactory'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  const generateEquipment = async () => {
    await createAllEquipment()
  }

  return (
    <div className="d-flex flex-column align-items-center bg-dark col-2 py-3 px-4">
      <h1 className="text-white mb-5">
        <Link to="/mm" className="text-white" style={{ textDecoration: 'none' }}>
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
            Equipment
          </button>
          <ul className="dropdown-menu w-100 text-center">
            <li>
              <Link to="/mm/view-equipment" className="dropdown-item">
                View Equipment
              </Link>
            </li>
            <li>
              <button className="btn btn-danger w-100" onClick={generateEquipment} disabled>
                Generate Equipment
              </button>
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
            Maintenance Schedule
          </button>
          <ul className="dropdown-menu w-100 text-center">
            <li>
              <Link to="/mm/view-maintenance-schedule" className="dropdown-item">
                View Schedule
              </Link>
            </li>
            <li>
              <Link to="/mm/create-maintenance-schedule" className="dropdown-item">
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
