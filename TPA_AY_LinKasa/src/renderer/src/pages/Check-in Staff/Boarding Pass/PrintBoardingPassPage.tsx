import { getBoardingPass } from '@renderer/controllers/BoardingPassController'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import linkasaLogo from '../../../assets/linkasaLogo.png'
import { db } from '@renderer/firebase'
import { collection, onSnapshot } from 'firebase/firestore'

const PrintBoardingPassPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [boardingPassData, setBoardingPassData] = useState<BoardingPass | null>(null)

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'boarding-pass'), fetchData)
    return () => {
      unsubscribe()
    }
  }, [])

  const fetchData = async () => {
    try {
      setBoardingPassData(await getBoardingPass(id))
    } catch (error) {
      console.log(error)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  useEffect(() => {
    fetchData()
  }, [id])

  return (
    <div className="container mt-5">
      <div className="card border-dark">
        <div className="card-header bg-dark text-white">
          <h4 className="card-title mb-0">Boarding Pass</h4>
        </div>
        <div className="card-body d-flex justify-content-between">
          <div className="row">
            <div className="col">
              <p className="card-text">
                <strong>Passenger Name:</strong>{' '}
                {boardingPassData && boardingPassData.passengerData.name}
              </p>
              <p className="card-text">
                <strong>Flight ID:</strong> {boardingPassData && boardingPassData.flightID}
              </p>
              <p className="card-text">
                <strong>Class Type:</strong>{' '}
                {boardingPassData && boardingPassData.passengerData.classType}
              </p>
              <p className="card-text">
                <strong>Seat Number:</strong>{' '}
                {boardingPassData && boardingPassData.passengerData.seatNumber}
              </p>
              <p className="card-text">
                <strong>Luggage Weight:</strong>{' '}
                {boardingPassData && boardingPassData.passengerData.luggage.weight}
              </p>
              <p className="card-text">
                <strong>Luggage Dimension:</strong>{' '}
                {boardingPassData && boardingPassData.passengerData.luggage.dimension}
              </p>
              <p className="card-text">
                <strong>Luggage Content:</strong>{' '}
                {boardingPassData && boardingPassData.passengerData.luggage.content}
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <img src={linkasaLogo} alt="Linkasa Logo" className="img-fluid" />
          </div>
        </div>
      </div>
      <div className="d-flex gap-2 mt-3">
        <button className="btn btn-dark" onClick={handlePrint}>
          Print
        </button>
        <button
          className="btn btn-secondary"
          type="button"
          onClick={() => navigate('/cis/view-boarding-pass')}
        >
          Back
        </button>
      </div>
    </div>
  )
}

export default PrintBoardingPassPage
