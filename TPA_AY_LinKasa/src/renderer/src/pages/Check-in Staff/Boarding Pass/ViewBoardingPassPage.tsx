import { useEffect, useState } from 'react'
import Sidebar from '../../../components/Check-in Staff/Sidebar'
import Navbar from '../../../components/Navbar'
import { Link } from 'react-router-dom'
import { getBoardingPasses } from '@renderer/controllers/BoardingPassController'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '@renderer/firebase'

const ViewBoardingPassPage = () => {
  const [boardingPassesData, setBoardingPassesData] = useState<BoardingPass[] | null>(null)

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'boarding-pass'), fetchData)
    return () => {
      unsubscribe()
    }
  }, [])

  const fetchData = async () => {
    try {
      setBoardingPassesData(await getBoardingPasses())
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
          {boardingPassesData && boardingPassesData.length > 0 ? (
            <h5 className="mt-2 mb-4 text-muted">
              Check-in Staff
              <i className="bi bi-arrow-right mx-2"></i>
              View Boarding Pass List
            </h5>
          ) : (
            <></>
          )}
          {boardingPassesData && boardingPassesData.length > 0 ? (
            <table className="table table-striped table-hover table-responsive">
              <thead className="table-dark">
                <tr>
                  <th scope="col">No.</th>
                  <th scope="col">Name</th>
                  <th scope="col">FlightID</th>
                  <th scope="col">Class Type</th>
                  <th scope="col">Seat Number</th>
                  <th scope="col">Luggage Weight</th>
                  <th scope="col">Luggage Dimension</th>
                  <th scope="col">Luggage Content</th>
                  <th scope="col">Luggage Photo</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                  <th scope="col">Print</th>
                </tr>
              </thead>
              <tbody>
                {boardingPassesData.map((bp, index) => (
                  <tr key={bp.id}>
                    <th scope="row">{index + 1}.</th>
                    <td>{bp.passengerData.name}</td>
                    <td>{bp.flightID}</td>
                    <td>{bp.passengerData.classType}</td>
                    <td>{bp.passengerData.seatNumber}</td>
                    <td>{bp.passengerData.luggage.weight}</td>
                    <td>{bp.passengerData.luggage.dimension}</td>
                    <td>{bp.passengerData.luggage.content}</td>
                    <td>
                      <img src={bp.passengerData.luggage.photoURL} alt="" width={100} />
                    </td>
                    <td className="text-center">
                      <Link to={`/cis/edit-boarding-pass/${bp.id}`}>
                        <i className="bi bi-pencil-fill text-primary"></i>
                      </Link>
                    </td>
                    <td className="text-center">
                      <Link to={`/cis/delete-boarding-pass/${bp.id}`}>
                        <i className="bi bi-trash3-fill text-danger"></i>
                      </Link>
                    </td>
                    <td className="text-center">
                      <Link to={`/cis/print-boarding-pass/${bp.id}`}>
                        <i className="bi bi-printer text-black"></i>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center my-4">
              <p className="lead">No boarding pass data records found.</p>
              <i className="bi bi-emoji-frown" style={{ fontSize: '2rem', color: '#6c757d' }}></i>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ViewBoardingPassPage
