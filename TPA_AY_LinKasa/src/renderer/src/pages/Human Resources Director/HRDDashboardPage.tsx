import Navbar from '@renderer/components/Navbar'
import Sidebar from '@renderer/components/Human Resources Director/Sidebar'
import CardInformation from '@renderer/components/CardInformation'
import { useEffect, useState } from 'react'
import { getEmployeesCount } from '@renderer/controllers/EmployeeController'
import { getEmployeeTrainingsCount } from '@renderer/controllers/EmployeeTrainingController'
import { getEmployeeDevelopmentProgramsCount } from '@renderer/controllers/EmployeeDevelopmentProgramController'
import { getJobVacancyCount } from '@renderer/controllers/JobVacancyController'

const HRDDashboardPage = () => {
  const [employeesCount, setEmployeesCount] = useState(0)
  const [employeeTrainingCount, setEmployeeTrainingCount] = useState(0)
  const [employeeDevelopmentCount, setEmployeeDevelopmentCount] = useState(0)
  const [jobVacancyCount, setJobVacancyCount] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      const employeeCount = await getEmployeesCount()
      const trainingCount = await getEmployeeTrainingsCount()
      const developmentCount = await getEmployeeDevelopmentProgramsCount()
      const jobCount = await getJobVacancyCount()
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
            Human Resources Director
            <i className="bi bi-arrow-right mx-2"></i>
            Dashboard
          </h5>
          <CardInformation count={employeesCount} type="employee" />
          <CardInformation count={employeeTrainingCount} type="employee-training" />
          <CardInformation count={employeeDevelopmentCount} type="employee-development" />
          <CardInformation count={jobVacancyCount} type="job-vacancy" />
        </div>
      </div>
    </div>
  )
}

export default HRDDashboardPage
