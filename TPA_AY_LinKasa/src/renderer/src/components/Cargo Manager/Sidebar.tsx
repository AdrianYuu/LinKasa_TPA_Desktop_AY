import { createAllStorageSpace } from '@renderer/factory/StorageSpaceFactory'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  const generateStorageSpace = async () => {
    await createAllStorageSpace()
  }

  return (
    <div className="d-flex flex-column align-items-center bg-dark col-2 py-3 px-4">
      <h1 className="text-white mb-5">
        <Link to="/cm" className="text-white" style={{ textDecoration: 'none' }}>
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
            Storage Space
          </button>
          <ul className="dropdown-menu w-100 text-center">
            <li>
              <Link to="/cm/view-storage-space" className="dropdown-item">
                View Storage Space
              </Link>
            </li>
            <li>
              <button className="btn btn-danger w-100" onClick={generateStorageSpace} disabled>
                Generate Storage Space
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
            Cargo Shipment
          </button>
          <ul className="dropdown-menu w-100 text-center">
            <li>
              <Link to="/cm/view-cargo-shipment" className="dropdown-item">
                View Cargo Shipment
              </Link>
            </li>
            <li>
              <Link to="/cm/create-cargo-shipment" className="dropdown-item">
                Create Cargo Shipment
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
