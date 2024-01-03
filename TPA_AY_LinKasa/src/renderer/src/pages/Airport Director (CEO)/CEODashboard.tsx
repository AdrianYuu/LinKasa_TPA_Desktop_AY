import Sidebar from '@renderer/components/Airport Director (CEO)/Sidebar'
import CardInformation from '@renderer/components/CardInformation'
import Navbar from '@renderer/components/Navbar'
import { getEmployeesCount } from '@renderer/controllers/EmployeeController'
import { getEmployeeDevelopmentProgramsCount } from '@renderer/controllers/EmployeeDevelopmentProgramController'
import { getEmployeeTrainingsCount } from '@renderer/controllers/EmployeeTrainingController'
import { getJobVacancyCount } from '@renderer/controllers/JobVacancyController'
import { getLogsCount } from '@renderer/controllers/LostAndFoundItemLogController'
import { useEffect, useState } from 'react'

const CEODashboard = () => {
  const [employeesCount, setEmployeesCount] = useState(0)
  const [employeeTrainingCount, setEmployeeTrainingCount] = useState(0)
  const [employeeDevelopmentCount, setEmployeeDevelopmentCount] = useState(0)
  const [jobVacancyCount, setJobVacancyCount] = useState(0)
  const [itemCount, setItemCount] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      const employeeCount = await getEmployeesCount()
      const trainingCount = await getEmployeeTrainingsCount()
      const developmentCount = await getEmployeeDevelopmentProgramsCount()
      const jobCount = await getJobVacancyCount()
      const item = await getLogsCount()
      setItemCount(item)
      setEmployeesCount(employeeCount)
      setEmployeeTrainingCount(trainingCount)
      setEmployeeDevelopmentCount(developmentCount)
      setJobVacancyCount(jobCount)
    }

    fetchData()
  }, [])
  return (
    <div className="d-flex vh-100">
      <Sidebar />
      <div className="w-100 overflow-auto">
        <Navbar />
        <div className="px-5 py-4 overflow-hidden">
          <h5 className="mt-2 mb-4 text-muted">
            Airport Director (CEO)
            <i className="bi bi-arrow-right mx-2"></i>
            Dashboard
          </h5>
          <CardInformation count={employeesCount} type="employee" />
          <CardInformation count={employeeTrainingCount} type="employee-training" />
          <CardInformation count={employeeDevelopmentCount} type="employee-development" />
          <CardInformation count={jobVacancyCount} type="job-vacancy" />
          <CardInformation count={itemCount} type="laf" />
        </div>
      </div>
    </div>
  )
}

export default CEODashboard
