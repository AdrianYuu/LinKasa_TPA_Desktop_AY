import { useEffect, useState } from 'react'
import Sidebar from '../../../components/Cargo Manager/Sidebar'
import Navbar from '../../../components/Navbar'
import { Link } from 'react-router-dom'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '@renderer/firebase'
import { getStorageSpaces } from '@renderer/controllers/StorageSpaceController'

const ViewStorageSpacePage = () => {
  const [storageSpacesData, setStorageSpacesData] = useState<StorageSpace[] | null>(null)

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'storage-space'), fetchData)
    return () => {
      unsubscribe()
    }
  }, [])

  const fetchData = async () => {
    try {
      setStorageSpacesData(await getStorageSpaces())
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="d-flex vh-100">
      <Sidebar />
      <div className="w-100 overflow-auto">
        <Navbar />
        <div className="px-5 py-4 overflow-hidden">
          {storageSpacesData && storageSpacesData.length > 0 ? (
            <h5 className="mt-2 mb-4 text-muted">
              Cargo Manager
              <i className="bi bi-arrow-right mx-2"></i>
              View Storage Space List
            </h5>
          ) : (
            <></>
          )}
          {storageSpacesData && storageSpacesData.length > 0 ? (
            <table className="table table-striped table-hover table-responsive">
              <thead className="table-dark">
                <tr>
                  <th scope="col">No.</th>
                  <th scope="col">Name</th>
                  <th scope="col">Location</th>
                  <th scope="col">Status</th>
                  <th scope="col" className="text-center">
                    Edit
                  </th>
                </tr>
              </thead>
              <tbody>
                {storageSpacesData.map((storage, index) => (
                  <tr key={storage.id}>
                    <th scope="row">{index + 1}.</th>
                    <td>{storage.name}</td>
                    <td>{storage.location}</td>
                    <td>{storage.status}</td>
                    <td className="text-center">
                      <Link to={`/cm/edit-storage-space/${storage.id}`}>
                        <i className="bi bi-pencil-fill text-primary"></i>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center my-4">
              <p className="lead">No storage space data records found.</p>
              <i className="bi bi-emoji-frown" style={{ fontSize: '2rem', color: '#6c757d' }}></i>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ViewStorageSpacePage
