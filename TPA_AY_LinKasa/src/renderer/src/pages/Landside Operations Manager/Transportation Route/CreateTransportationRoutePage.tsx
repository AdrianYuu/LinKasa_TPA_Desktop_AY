import Sidebar from '../../../components/Landside Operations Manager/Sidebar'
import Navbar from '../../../components/Navbar'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getEmployeesBasedOnRole } from '@renderer/controllers/EmployeeController'
import { createTransportationRoute } from '@renderer/controllers/TransporationRouteController'

const CreateTransportationRoutePage = () => {
  const navigate = useNavigate()

  const [employeesData, setEmployeesData] = useState<Employee[] | null>(null)

  const [startLocation, setStartLocation] = useState('')
  const [destination, setDestination] = useState('')
  const [stops, setStops] = useState([''])
  const [responsibleEmplyoees, setResponsibleEmplyoees] = useState<string[]>([])

  const [errorStartLocation, setErrorStartLocation] = useState('')
  const [errorDestination, setErrorDestination] = useState('')
  const [errorStops, setErrorStops] = useState('')
  const [errorResponsibleEmplyoees, setErrorResponsibleEmployees] = useState('')

  const formRef = useRef<HTMLFormElement | null>(null)

  const fetchData = async () => {
    try {
      setEmployeesData(await getEmployeesBasedOnRole('Landside Operations Staff'))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const setEmployeesCheckbox = (checked: boolean, id: string) => {
    if (checked) {
      setResponsibleEmplyoees((prevSelected) => [...prevSelected, id])
    } else {
      setResponsibleEmplyoees((prevSelected) => prevSelected.filter((e) => e !== id))
    }
  }

  const selectAllEmployees = () => {
    const allEmployeeIds = employeesData?.map((employee) => employee.id) || []
    setResponsibleEmplyoees(allEmployeeIds)
  }

  const unselectAllEmployees = () => {
    setResponsibleEmplyoees([])
  }

  const addStop = () => {
    setStops((prevStops) => [...prevStops, ''])
  }

  const removeStop = (index: number) => {
    if (stops.length > 1) {
      setStops((prevStops) => {
        const newStops = [...prevStops]
        newStops.splice(index, 1)
        return newStops
      })
    }
  }

  const updateStop = (index: number, value: string) => {
    setStops((prevStops) => {
      const newStops = [...prevStops]
      newStops[index] = value
      return newStops
    })
  }

  const resetData = () => {
    setStartLocation('')
    setDestination('')
    setStops([''])
    setResponsibleEmplyoees([''])

    if (!formRef.current) return
    formRef.current.reset()
  }

  useEffect(() => {
    setErrorStartLocation('')
    if (startLocation === '') setErrorStartLocation("Start location can't be empty!")
  }, [startLocation])

  useEffect(() => {
    setErrorDestination('')
    if (destination === '') setErrorDestination("Destination can't be empty!")
  }, [destination])

  useEffect(() => {
    setErrorStops('')
    if (stops.some((stop) => stop.trim() === '')) setErrorStops("All stops can't be empty!")
  }, [stops])

  useEffect(() => {
    setErrorResponsibleEmployees('')
    if (responsibleEmplyoees.length === 0)
      setErrorResponsibleEmployees("Responsible employees can't be empty!")
  }, [responsibleEmplyoees])

  useEffect(() => {
    fetchData()
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const isValid =
      !errorStartLocation && !errorDestination && !errorStops && !errorResponsibleEmplyoees

    if (!isValid) return

    const newTransporationRoute: TransportationRoute = {
      id: '',
      startLocation: startLocation,
      destination: destination,
      stops: stops,
      responsibleEmployees: responsibleEmplyoees
    }

    await createTransportationRoute(newTransporationRoute)
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
            Create Transporation Route
          </h5>
          <form ref={formRef} onSubmit={handleSubmit}>
            <div>
              <label htmlFor="startLocation" className="form-label">
                Start Location
              </label>
              <input
                id="startLocation"
                name="startLocation"
                type="text"
                className="form-select form-select-m"
                onChange={(e) => setStartLocation(e.target.value)}
              ></input>
              <p className="text-danger">{errorStartLocation}</p>
            </div>
            <div>
              <label htmlFor="destination" className="form-label">
                Destination
              </label>
              <input
                id="destination"
                name="destination"
                type="text"
                className="form-control"
                onChange={(e) => setDestination(e.target.value)}
              />
              <p className="text-danger">{errorDestination}</p>
            </div>
            <div>
              <label htmlFor="stops" className="form-label">
                Stops
              </label>
              {stops.map((stop, index) => (
                <div key={index} className="d-flex mb-2">
                  <input
                    type="text"
                    className="form-control me-2"
                    value={stop}
                    onChange={(e) => updateStop(index, e.target.value)}
                  />
                  <button
                    className="btn btn-danger"
                    type="button"
                    onClick={() => removeStop(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button className="btn btn-outline-dark" type="button" onClick={addStop}>
                Add Stop
              </button>
              <p className="text-danger">{errorStops}</p>
            </div>
            <div>
              <label htmlFor="responsibleEmployees" className="form-label">
                Responsible Employees
              </label>
              <div className="d-flex flex-row gap-2 mb-2">
                <button
                  className="btn btn-outline-dark mb-2"
                  onClick={selectAllEmployees}
                  type="button"
                >
                  Select All
                </button>
                <button
                  className="btn btn-outline-dark mb-2"
                  onClick={unselectAllEmployees}
                  type="button"
                >
                  Unselect All
                </button>
              </div>
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
                              onChange={(e) => setEmployeesCheckbox(e.target.checked, employee.id)}
                              style={{ backgroundColor: 'black', borderColor: 'black' }}
                            />
                          </div>
                        </td>
                        <td>{employee.fullName}</td>
                        <td>{employee.role}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <p className="text-danger">{errorResponsibleEmplyoees}</p>
            </div>
            <div className="d-flex mt-4 gap-2">
              <button className="btn btn-outline-dark" type="submit">
                Submit
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

export default CreateTransportationRoutePage
