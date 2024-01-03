import { getEmployee } from '@renderer/controllers/EmployeeController'
import { useEffect, useState } from 'react'

const BroadcastBubble = ({ id, title, message, priorityLevel, time, isSender }) => {
  const [employeeData, setEmployeeData] = useState<Employee | null>(null)

  const fetchData = async () => {
    try {
      setEmployeeData(await getEmployee(id))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [id])

  return (
    <div className="d-flex flex-column gap-2">
      {isSender ? (
        <p className="m-0 ms-1 fw-semibold d-flex justify-content-end">You</p>
      ) : (
        <p className="m-0 ms-1 fw-semibold">
          {employeeData?.fullName} - {employeeData?.role}
        </p>
      )}
      {isSender ? (
        <div className="d-flex flex-row align-items-end gap-2 justify-content-end">
          <p className="m-0 text-secondary text-sm mb-2" style={{ fontSize: '12px' }}>
            {time}
          </p>
          <div
            className="border rounded d-flex px-3 py-2 justify-content-end"
            style={{ maxWidth: '80%', wordWrap: 'break-word' }}
          >
            <p className="m-0" style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {priorityLevel === 'High' && (
                <p className="fw-bold m-0 text-danger">
                  {title} - {priorityLevel}
                </p>
              )}
              {priorityLevel === 'Medium' && (
                <p className="fw-bold m-0 text-warning">
                  {title} - {priorityLevel}
                </p>
              )}
              {priorityLevel === 'Low' && (
                <p className="fw-bold m-0 text-primary">
                  {title} - {priorityLevel}
                </p>
              )}
              {message}
            </p>
          </div>
        </div>
      ) : (
        <div className="d-flex flex-row align-items-end gap-2">
          <div
            className="border rounded px-3 py-2"
            style={{ maxWidth: '80%', wordWrap: 'break-word' }}
          >
            <p className="m-0" style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {priorityLevel === 'High' && (
                <p className="fw-bold m-0 text-danger">
                  {title} - {priorityLevel}
                </p>
              )}
              {priorityLevel === 'Medium' && (
                <p className="fw-bold m-0 text-warning">
                  {title} - {priorityLevel}
                </p>
              )}
              {priorityLevel === 'Low' && (
                <p className="fw-bold m-0 text-primary">
                  {title} - {priorityLevel}
                </p>
              )}
              {message}
            </p>
          </div>
          <p className="m-0 text-secondary text-sm mb-2" style={{ fontSize: '12px' }}>
            {time}
          </p>
        </div>
      )}
    </div>
  )
}

export default BroadcastBubble
