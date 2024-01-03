import Sidebar from '@renderer/components/Customs and Border Control Officers/Sidebar'
import Navbar from '@renderer/components/Navbar'
import { getInspectionRecords } from '@renderer/controllers/InspectionRecordController'
import { db } from '@renderer/firebase'
import { collection, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const ViewInspectionRecordPage = () => {
  const [inspectionRecordsData, setInspectionRecordsData] = useState<InspectionRecord[] | null>(
    null
  )

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'inspection-record'), fetchData)
    return () => {
      unsubscribe()
    }
  }, [])

  const fetchData = async () => {
    try {
      setInspectionRecordsData(await getInspectionRecords())
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
          {inspectionRecordsData && inspectionRecordsData.length > 0 ? (
            <div>
              <h5 className="mt-2 mb-4 text-muted">
                Customs and Border Control Officers
                <i className="bi bi-arrow-right mx-2"></i>
                View Inspection Record
              </h5>
              <table className="table table-striped table-hover table-responsive">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">No.</th>
                    <th scope="col">Description</th>
                    <th scope="col">Notes</th>
                    <th scope="col">Inspection Date</th>
                    <th scope="col">Photograph</th>
                    <th scope="col" className="text-center">
                      Edit
                    </th>
                    <th scope="col" className="text-center">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {inspectionRecordsData.map((data, index) => (
                    <tr key={data.id}>
                      <th scope="row">{index + 1}.</th>
                      <td>{data.description}</td>
                      <td>{data.notes}</td>
                      <td>{data.inspectionDate}</td>
                      <td>
                        <img src={data.photographURL} alt="" width={100} />
                      </td>
                      <td className="text-center">
                        <Link to={`/cabco/edit-inspection-record/${data.id}`}>
                          <i className="bi bi-pencil-fill text-primary"></i>
                        </Link>
                      </td>
                      <td className="text-center">
                        <Link to={`/cabco/delete-inspection-record/${data.id}`}>
                          <i className="bi bi-trash3-fill text-danger"></i>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center my-4">
              <p className="lead">No inspection record log records found.</p>
              <i className="bi bi-emoji-frown" style={{ fontSize: '2rem', color: '#6c757d' }}></i>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ViewInspectionRecordPage
