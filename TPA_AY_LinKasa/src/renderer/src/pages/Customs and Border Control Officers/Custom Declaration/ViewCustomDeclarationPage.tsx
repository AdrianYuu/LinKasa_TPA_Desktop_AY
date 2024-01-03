import { useEffect, useState } from 'react'
import Sidebar from '../../../components/Customs and Border Control Officers/Sidebar'
import Navbar from '../../../components/Navbar'
import { Link } from 'react-router-dom'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '@renderer/firebase'
import { getCustomDeclarations } from '@renderer/controllers/CustomDeclarationController'

const ViewCustomDeclarationPage = () => {
  const [customDeclarationsData, setCustomDeclarationsData] = useState<CustomDeclaration[] | null>(
    null
  )

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'custom-declaration'), fetchData)
    return () => {
      unsubscribe()
    }
  }, [])

  const fetchData = async () => {
    try {
      setCustomDeclarationsData(await getCustomDeclarations())
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
          {customDeclarationsData && customDeclarationsData.length > 0 ? (
            <h5 className="mt-2 mb-4 text-muted">
              Customs and Border Control Officers
              <i className="bi bi-arrow-right mx-2"></i>
              View Custom Declaration
            </h5>
          ) : (
            <></>
          )}
          {customDeclarationsData && customDeclarationsData.length > 0 ? (
            <table className="table table-striped table-hover table-responsive">
              <thead className="table-dark">
                <tr>
                  <th scope="col">No.</th>
                  <th scope="col">Name</th>
                  <th scope="col">Passport Number</th>
                  <th scope="col">Visa Number</th>
                  <th scope="col">Phone</th>
                  <th scope="col">DOB</th>
                  <th scope="col">Nationality</th>
                  <th scope="col">Purpose of Visit</th>
                  <th scope="col">Itinerary</th>
                  <th scope="col" className="text-center">
                    Edit
                  </th>
                  <th scope="col" className="text-center">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {customDeclarationsData.map((data, index) => (
                  <tr key={data.id}>
                    <th scope="row">{index + 1}.</th>
                    <td>{data.passengerName}</td>
                    <td>{data.passportNumber}</td>
                    <td>{data.visaNumber}</td>
                    <td>{data.phoneNumber}</td>
                    <td>{data.dateOfBirth}</td>
                    <td>{data.nationality}</td>
                    <td>{data.purposeOfVisit}</td>
                    <td>{data.itinerary}</td>
                    <td className="text-center">
                      <Link to={`/cabco/edit-custom-declaration/${data.id}`}>
                        <i className="bi bi-pencil-fill text-primary"></i>
                      </Link>
                    </td>
                    <td className="text-center">
                      <Link to={`/cabco/delete-custom-declaration/${data.id}`}>
                        <i className="bi bi-trash3-fill text-danger"></i>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center my-4">
              <p className="lead">No custom declaration data records found.</p>
              <i className="bi bi-emoji-frown" style={{ fontSize: '2rem', color: '#6c757d' }}></i>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ViewCustomDeclarationPage
