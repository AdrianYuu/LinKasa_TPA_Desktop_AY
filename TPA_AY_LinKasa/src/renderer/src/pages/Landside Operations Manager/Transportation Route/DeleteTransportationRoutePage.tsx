import Sidebar from '../../../components/Landside Operations Manager/Sidebar'
import Navbar from '../../../components/Navbar'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getEmployeesBasedOnRole } from '@renderer/controllers/EmployeeController'
import {
  deleteTransportationRoute,
  getTransportationRoute
} from '@renderer/controllers/TransporationRouteController'

const DeleteTransportationRoutePage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [transporationRouteData, setTransporationRouteData] = useState<TransportationRoute | null>(
    null
  )

  const [employeesData, setEmployeesData] = useState<Employee[] | null>(null)

  const [startLocation, setStartLocation] = useState('')
  const [destination, setDestination] = useState('')
  const [stops, setStops] = useState([''])
  const [responsibleEmplyoees, setResponsibleEmplyoees] = useState<string[]>([])

  const formRef = useRef<HTMLFormElement | null>(null)

  const fillData = () => {
    if (!transporationRouteData) return

    setStartLocation(transporationRouteData.startLocation)
    setDestination(transporationRouteData.destination)
    setStops(transporationRouteData.stops)
    setResponsibleEmplyoees(transporationRouteData.responsibleEmployees)
  }

  useEffect(() => {
    fetchData()
  }, [id])

  useEffect(() => {
    fillData()
  }, [transporationRouteData])

  const fetchData = async () => {
    try {
      setEmployeesData(await getEmployeesBasedOnRole('Landside Operations Staff'))
      setTransporationRouteData(await getTransportationRoute(id))
    } catch (error) {
      console.log(error)
    }
  }

  const resetData = () => {
    setStartLocation('')
    setDestination('')
    setStops([''])
    setResponsibleEmplyoees([''])

    if (!formRef.current) return
    formRef.current.reset()
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    await deleteTransportationRoute(id)
    resetData()
    navigate('/lom/view-transportation-route')
  }

  return (
    <div className="d-flex vh-100">
      <Sidebar />
      <div className="w-100 overflow-auto">
        <Navbar />
        <div className="px-5 py-4 overflow-hidden">
          <h5 className="mt-2 mb-4 text-muted">
            Landside Operations Manager
            <i className="bi bi-arrow-right mx-2"></i>
            Delete Transporation Route
          </h5>
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="startLocation" className="form-label">
                Start Location
              </label>
              <input
                id="startLocation"
                name="startLocation"
                type="text"
                className="form-select form-select-m"
                value={startLocation}
                disabled
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="destination" className="form-label">
                Destination
              </label>
              <input
                id="destination"
                name="destination"
                type="text"
                className="form-control"
                value={destination}
                disabled
              />
            </div>
            <div className="mb-3">
              <label htmlFor="stops" className="form-label">
                Stops
              </label>
              {stops.map((stop, index) => (
                <div key={index} className="d-flex mb-2">
                  <input type="text" className="form-control me-2" disabled value={stop} />
                </div>
              ))}
            </div>
            <div className="mb-3">
              <label htmlFor="responsibleEmployees" className="form-label">
                Responsible Employees
              </label>
              <table className="table table-bordered table-hover">
                <thead className="table-dark">
                  <tr>
                    <th scope="col" style={{ width: '1%' }}>
                      Select
                    </th>
                    <th scope="col">Name</th>
                    <th scope="col">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {employeesData &&
                    employeesData.map((employee) => (
                      <tr key={employee.id}>
                        <td style={{ width: '1%' }}>
                          <div className="form-check d-flex justify-content-center align-items-center">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value={employee.id}
                              checked={responsibleEmplyoees.includes(employee.id)}
                              style={{ backgroundColor: 'black', borderColor: 'black' }}
                              disabled
                            />
                          </div>
                        </td>
                        <td>{employee.fullName}</td>
                        <td>{employee.role}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="d-flex mt-4 gap-2">
              <button className="btn btn-outline-dark" type="submit">
                Delete
              </button>
              <button
                className="btn btn-secondary"
                type="button"
                onClick={() => navigate('/lom/view-transportation-route')}
              >
                Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default DeleteTransportationRoutePage
