import Navbar from '@renderer/components/Navbar'
import Sidebar from '@renderer/components/Baggage Security Supervisor/Sidebar'
import { getEmployee } from '@renderer/controllers/EmployeeController'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '@renderer/firebase'
import { getBaggageHandlingTasks } from '@renderer/controllers/BaggageHandlingTaskController'

const ViewBaggageHandlingTaskPage = () => {
  const [baggageHandlingTasks, setBaggageHandlingTasks] = useState<BaggageHandlingTask[] | null>(
    null
  )

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'baggage-handling-task'), fetchData)
    return () => {
      unsubscribe()
    }
  }, [])

  const fetchData = async () => {
    try {
      const tasks = await getBaggageHandlingTasks()
      if (!tasks) return

      const tasksWithEmployeeDetails = await Promise.all(
        tasks.map(async (task) => {
          const assignedEmployeeDetails = await Promise.all(
            task.assignedEmployees.map(async (employeeId) => {
              const employee = await getEmployee(employeeId)
              return employee ? employee.fullName : ''
            })
          )
          return { ...task, assignedEmployees: assignedEmployeeDetails }
        })
      )
      setBaggageHandlingTasks(tasksWithEmployeeDetails)
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
          {baggageHandlingTasks && baggageHandlingTasks.length > 0 ? (
            <h5 className="mt-2 mb-4 text-muted">
              Baggage Security Supervisor
              <i className="bi bi-arrow-right mx-2"></i>
              View Baggage Handling Task
            </h5>
          ) : (
            <></>
          )}
          {baggageHandlingTasks && baggageHandlingTasks.length > 0 ? (
            <div className="d-flex flex-column gap-5">
              <table className="table table-striped table-hover table-responsive">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">No.</th>
                    <th scope="col">Task Name</th>
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
                {baggageHandlingTasks.map((task, index) => (
                  <tbody>
                    <tr key={task.id}>
                      <th scope="row">{index + 1}.</th>
                      <td>{task.taskName}</td>
                      <td>{task.flightID}</td>
                      <td>{task.location}</td>
                      <td>{task.date}</td>
                      <td>{task.startTime}</td>
                      <td>{task.finishTime}</td>
                      <td>
                        {task.assignedEmployees.map((employee) => (
                          <li>{employee}</li>
                        ))}
                      </td>
                      <td className="text-center">
                        <Link to={`/bss/edit-baggage-handling-task/${task.id}`}>
                          <i className="bi bi-pencil-fill text-primary"></i>
                        </Link>
                      </td>
                      <td className="text-center">
                        <Link to={`/bss/delete-baggage-handling-task/${task.id}`}>
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
              <p className="lead">No baggage handling task schedule records found.</p>
              <i className="bi bi-emoji-frown" style={{ fontSize: '2rem', color: '#6c757d' }}></i>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ViewBaggageHandlingTaskPage
