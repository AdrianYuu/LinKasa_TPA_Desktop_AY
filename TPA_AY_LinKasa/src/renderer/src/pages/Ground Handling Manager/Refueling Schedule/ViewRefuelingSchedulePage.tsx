import Navbar from '@renderer/components/Navbar'
import Sidebar from '@renderer/components/Ground Handling Manager/Sidebar'
import { getEmployee } from '@renderer/controllers/EmployeeController'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getRefuelingSchedules } from '@renderer/controllers/RefuelingScheduleController'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '@renderer/firebase'

const ViewRefuelingSchedulePage = () => {
  const [refuelingSchedules, setRefuelingSchedules] = useState<RefuelingSchedule[] | null>(null)

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'refueling-schedule'), fetchData)
    return () => {
      unsubscribe()
    }
  }, [])

  const fetchData = async () => {
    try {
      const schedules = await getRefuelingSchedules()
      if (!schedules) return

      const schedulesWithEmployeeDetails = await Promise.all(
        schedules.map(async (schedule) => {
          const assignedEmployeeDetails = await Promise.all(
            schedule.assignedEmployees.map(async (employeeId) => {
              const employee = await getEmployee(employeeId)
              return employee ? employee.fullName : ''
            })
          )
          return { ...schedule, assignedEmployees: assignedEmployeeDetails }
        })
      )
      setRefuelingSchedules(schedulesWithEmployeeDetails)
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
          {refuelingSchedules && refuelingSchedules.length > 0 ? (
            <h5 className="mt-2 mb-4 text-muted">
              Ground Handling Manager
              <i className="bi bi-arrow-right mx-2"></i>
              View Refueling Schedule
            </h5>
          ) : (
            <></>
          )}
          {refuelingSchedules && refuelingSchedules.length > 0 ? (
            <div className="d-flex flex-column gap-5">
              <table className="table table-striped table-hover table-responsive">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">No.</th>
                    <th scope="col">FlightID</th>
                    <th scope="col">Location</th>
                    <th scope="col">Date</th>
                    <th scope="col">Start Time</th>
                    <th scope="col">Finish Time</th>
                    <th scope="col">Assigned Employees</th>
                    <th scope="col" className="text-center">
                      Edit
                    </th>
                    <th scope="col" className="text-center">
                      Delete
                    </th>
                  </tr>
                </thead>
                {refuelingSchedules.map((schedule, index) => (
                  <tbody>
                    <tr key={schedule.id}>
                      <th scope="row">{index + 1}.</th>
                      <td>{schedule.flightID}</td>
                      <td>{schedule.location}</td>
                      <td>{schedule.date}</td>
                      <td>{schedule.startTime}</td>
                      <td>{schedule.finishTime}</td>
                      <td>
                        {schedule.assignedEmployees.map((employee) => (
                          <li>{employee}</li>
                        ))}
                      </td>
                      <td className="text-center">
                        <Link to={`/ghm/edit-refueling-schedule/${schedule.id}`}>
                          <i className="bi bi-pencil-fill text-primary"></i>
                        </Link>
                      </td>
                      <td className="text-center">
                        <Link to={`/ghm/delete-refueling-schedule/${schedule.id}`}>
                          <i className="bi bi-trash3-fill text-danger"></i>
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          ) : (
            <div className="text-center my-4">
              <p className="lead">No refueling schedule records found.</p>
              <i className="bi bi-emoji-frown" style={{ fontSize: '2rem', color: '#6c757d' }}></i>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ViewRefuelingSchedulePage
